<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { RouterLink, RouterView } from 'vue-router/auto'
import HeaderPage from './components/HeaderPage.vue';
import FooterPage from './components/FooterPage.vue';

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
  <main class="bg-lightBeige">
  <p>g
    <br>
    g
    <br>
    ef
    <br>
    zfz
    <br>
    f
  </p>
  </main>
  <FooterPage />
</template>
