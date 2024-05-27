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

import { onMounted } from 'vue';
onMounted(() => {
    if (pb.authStore.model === null) {
        route.push('/connexion');
    }
})

console.log("CurrentUser")
console.log(pb.authStore.model);
//-------------------------------------------------------------------------------
async function updateMood(userId: string, mood: string) {
    console.log("CurrentUser")
    console.log(pb.authStore.model?.id);
    // console.log(currentUser)
    // console.log(userId);
    try {
        const dataUpdate = {
            'moods': [`${mood}`]
        };

        await pb.collection('users').update(userId, dataUpdate);
        route.push('/');
    } catch (e) {
        console.error(e);
    }
}
</script>

<template>
    <h1 class="bg-red-600 text-white text-xl" @click="updateMood(`${pb.authStore.model?.id}`, 'Bien')">Change to bien</h1>
    <h1 class="bg-red-600 text-white text-xl" @click="updateMood(`${pb.authStore.model?.id}`, 'Mal')">Change to pasbien</h1>

        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive===false"
        >            <MoodCard v-for="mood in moodList" :key="mood.id" v-bind="mood"/>

        </section>
        <section
        v-if="isActive===true"
        >
            <MemoriesCard v-for="memorie in moodList" v-bind="memorie" :key="memorie.id"/>
        </section>
</template>