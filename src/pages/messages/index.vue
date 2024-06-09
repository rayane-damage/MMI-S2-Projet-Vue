<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MessagesCard from '@/components/MessagesCard.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import { getUserFriends } from '@/backend';
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

if (isActive.value == false) {
    isActive.value = true;
}

// const userFriends: UsersResponse[] = await getUserFriends();
const userFriends: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `friends.username = '${pb.authStore.model?.username}'`,
    expand : 'friends'
});

const userMessages: MessagesResponse[]  = await pb.collection('messages').getFullList({
    filter: `user = '${pb.authStore.model?.id}'`
});
console.log(pb.authStore.model?.id)
console.log(userMessages);
</script>

<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood"/>

    <section v-if="isActive === true">
        <h1>lol</h1>
        <MessagesCard v-for="message in userMessages" :key="message.id" v-bind="message" />
    </section>

    <section v-if="isActive === false">
        <ProfileCard v-for="friend in userFriends" :key="friend.id" v-bind="friend" />
    </section>
</template>