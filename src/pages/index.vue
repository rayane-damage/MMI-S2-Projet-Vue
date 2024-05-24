<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import ProfileCard from '@/components/ProfileCard.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import FooterPage from '@/components/FooterPage.vue'

import { moodList } from '@/data';
import { isActive } from '@/components/HeaderPage.vue'
</script>

<template>
    <HeaderPage active="Memories" inactive="Moods"/>
    <main class="bg-lightBeige">
        <section class="flex flex-col gap-4" v-if="isActive===false">
            <MoodCard v-for="mood in moodList" v-bind="mood" :key="mood"/>
        </section>
        <section v-if="isActive===true">
            <MemoriesCard v-for="mood in moodList" v-bind="mood" :key="mood"/>
        </section>
  </main>
    <FooterPage />
</template>