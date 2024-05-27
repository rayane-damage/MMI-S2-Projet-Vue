<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import Button from '@/components/Button.vue';


import type { TestResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
const moodList: TestResponse[] = await pb.collection('Test').getFullList();

import { isActive } from '@/components/HeaderPage.vue'

import { useRouter } from 'vue-router';
const route = useRouter();

const doLogout = () => {
    pb.authStore.clear();
    route.push('/connexion');
}

import { onMounted } from 'vue';
onMounted(() => {
    if (pb.authStore.model === null) {
        route.push('/connexion');
    }
})

</script>

<template>
        <Button text="Se déconnecter" @click="doLogout"/>
        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive===false"
        >
            <MoodCard v-for="mood in moodList" :key="mood.id" v-bind="mood"/>
        </section>
        <section
        v-if="isActive===true"
        >
            <MemoriesCard v-for="memorie in moodList" v-bind="memorie" :key="memorie.id"/>
        </section>
</template>