/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Memories = "memories",
	Messages = "messages",
	Mood = "mood",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type MemoriesRecord = {
	img?: string
	description?: string
	user?: RecordIdString
}

export type MessagesRecord = {
	message?: string
	from?: RecordIdString[]
	to?: RecordIdString[]
}

export type MoodRecord = {
	mood?: string
	user?: RecordIdString
}

export type UsersRecord = {
	avatar?: string
	friends?: RecordIdString[]
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type MemoriesResponse<Texpand = unknown> = Required<MemoriesRecord> & BaseSystemFields<Texpand>
export type MessagesResponse<Texpand = unknown> = Required<MessagesRecord> & BaseSystemFields<Texpand>
export type MoodResponse<Texpand = unknown> = Required<MoodRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	memories: MemoriesRecord
	messages: MessagesRecord
	mood: MoodRecord
	users: UsersRecord
}

export type CollectionResponses = {
	memories: MemoriesResponse
	messages: MessagesResponse
	mood: MoodResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'memories'): RecordService<MemoriesResponse>
	collection(idOrName: 'messages'): RecordService<MessagesResponse>
	collection(idOrName: 'mood'): RecordService<MoodResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
