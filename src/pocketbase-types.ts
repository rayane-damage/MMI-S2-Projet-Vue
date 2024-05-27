/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Test = "Test",
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

export type TestRecord<Tmoods = unknown> = {
	date?: IsoDateString
	mood?: string
	moods?: null | Tmoods
	pseudo?: string
}

export type UsersRecord<Tmoods = unknown> = {
	avatar?: string
	mood?: string
	moods?: null | Tmoods
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type TestResponse<Tmoods = unknown, Texpand = unknown> = Required<TestRecord<Tmoods>> & BaseSystemFields<Texpand>
export type UsersResponse<Tmoods = unknown, Texpand = unknown> = Required<UsersRecord<Tmoods>> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	Test: TestRecord
	users: UsersRecord
}

export type CollectionResponses = {
	Test: TestResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'Test'): RecordService<TestResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
