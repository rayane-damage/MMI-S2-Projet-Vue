<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import ProfileCard from '@/components/ProfileCard.vue'


import { moodList } from '@/data';
import { isActive } from '@/components/HeaderPage.vue'
</script>

<template>
    <main class="bg-lightBeige">
        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive===false"
        >
            <MoodCard v-for="mood in moodList" v-bind="mood" :key="mood"/>
        </section>
        <section
        v-if="isActive===true"
        >
            <MemoriesCard v-for="memorie in moodList" v-bind="memorie" :key="memorie"/>
        </section>
  </main>
</template>