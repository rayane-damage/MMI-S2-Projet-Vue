<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import DiscussionCardard from '@/components/DiscussionCard.vue';
import MessageInput from '@/components/MessageInput.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { ref, provide } from 'vue';

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

if (isActive.value == false) {
    isActive.value = true;
}

const userFriends: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `friends.username = '${pb.authStore.model?.username}'`,
    expand : 'friends'
});

// const userMessages: MessagesResponse[]  = await pb.collection('messages').getFullList({
//     filter: `user.id = '${pb.authStore.model?.id}'`,
//     expand : 'user'
// });

const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
    filter: `from = '${pb.authStore.model?.id}' && to = "jgd9q7r3l6u7loo" || to = '${pb.authStore.model?.id}' && from = "jgd9q7r3l6u7loo" `,
    expand : 'from && to'
});

const allMessagesByUsers = ref(allMessages)

provide('allMessagesByUsers', allMessagesByUsers);


</script>

<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood"/>

    <section v-if="isActive === true" >
        <div class="flex flex-col gap-2 p-4">
            <DiscussionCardard v-for="message in allMessagesByUsers" :key="message.id" v-bind="message" />
        </div>
        <MessageInput />
    </section>

    <section v-if="isActive === false">
        <ProfileCard v-for="friend in userFriends" :key="friend.id" v-bind="friend" />
    </section>
</template>