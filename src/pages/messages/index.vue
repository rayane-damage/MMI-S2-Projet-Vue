<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import MessageInput from '@/components/MessageInput.vue';
import DiscussionProfileCard from '@/components/DiscussionProfileCard.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { ref, provide } from 'vue';
import type { Ref } from 'vue';

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

if (isActive.value == false) {
    isActive.value = true;
}

// const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
//     filter: `id = '${pb.authStore.model?.id}'`,
// });
// console.log("currentUser")
// console.log(currentUser)
// console.log(currentUser[0])
console.log("user=", pb.authStore.model)
console.log(pb.authStore.model?.friends)

const userFriends: UsersResponse[] = await pb.collection('users').getFullList({
    // filter: `id = '${pb.authStore.model?.id}'`,
    expand : 'friends'
});

const msgMode = ref(false)
const userFrom = ref('')
provide('userFrom', userFrom);
provide('msgMode', msgMode);

// const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
//     filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
//     expand : 'from && to',
// });

const allMessagesByUsers = ref() as Ref<any[]>;

provide('allMessagesByUsers', allMessagesByUsers);

</script>

<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood"/>

    <section v-if="isActive === true" >
        <div v-if="msgMode === false" class="flex flex-col gap-4">
            <DiscussionProfileCard v-for="friend in userFriends" :key="friend.id" v-bind="friend" />
        </div>
        <div v-if="msgMode === true" class="flex flex-col gap-2">
            <h1 @click="msgMode = false" class="p-4 bg-red-200">retour</h1>
            <MessageCard v-for="message in allMessagesByUsers" :key="message.id" v-bind="message" />
        <MessageInput />
        </div>
    </section>

    <section v-if="isActive === false">
        <ProfileCard v-for="friend in userFriends" :key="friend.id" v-bind="friend"  />
    </section>
</template>