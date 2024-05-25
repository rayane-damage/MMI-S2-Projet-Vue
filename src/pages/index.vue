<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import ProfileCard from '@/components/ProfileCard.vue'


import type { TestResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
const moodList: TestResponse[] = await pb.collection('Test').getFullList();

import { isActive } from '@/components/HeaderPage.vue'
</script>

<template>
    <main class="bg-lightBeige">
        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive===false"
        >
            <MoodCard v-for="mood in moodList" :key="mood.id" v-bind="mood"/>
        </section>
        <section
        v-if="isActive===true"
        >
            <MemoriesCard v-for="memorie in moodList" v-bind="memorie" :key="memorie"/>
        </section>
        <!-- <ProfileCard /> -->
  </main>
</template>