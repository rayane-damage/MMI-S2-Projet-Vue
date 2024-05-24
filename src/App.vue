<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';
import MoodCard from './components/MoodCard.vue';
import ProfileCard from './components/ProfileCard.vue';
import MemoriesCard from './components/MemoriesCard.vue';

import { moodList } from '@/data';

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})
</script>

<template>
  <HeaderPage active="Memories" inactive="Moods"/>
  <!-- <RouterView v-slot="{ Component }">
    <Suspense>
      <component :is="Component" />
    </Suspense>
  </RouterView> -->
  <main>
    <!-- <section class="flex flex-col gap-4">
      <MoodCard v-for="mood in moodList" v-bind="mood" :key="mood"/>
    </section> -->
    <!-- <ProfileCard v-for="mood in moodList" v-bind="mood" :key="mood"/> -->
    <MemoriesCard v-for="mood in moodList" v-bind="mood" :key="mood"/>
  </main>
  <FooterPage />
</template>
