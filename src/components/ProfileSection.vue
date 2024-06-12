<script setup lang="ts">
import type UsersResponse from '@/pocketbase-types';
import ProfileIcon from '@/components/ProfileIcon.vue';

const props = defineProps<UsersResponse>();

const moodList = await pb.collection('mood').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});
</script>

<template>
    <ProfileIcon :currentMood="moodList[0].mood"/>
    <h1>{{ name }}</h1>
    <p>Description</p>
</template>