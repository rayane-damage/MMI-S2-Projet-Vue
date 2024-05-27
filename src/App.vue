<script setup lang="ts">
import { onErrorCaptured, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import HeaderPage from '@/components/HeaderPage.vue'
import FooterPage from '@/components/FooterPage.vue'

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})

const route = useRoute()
const hideOnRoutes = ['/connexion']
const hide = computed(() => !hideOnRoutes.some(path => route.path.startsWith(path)));
</script>

<template>
      <HeaderPage v-if="hide" active="Memories" inactive="Moods"/>
      <main class="pt-header mb-footer bg-lightBeige">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </RouterView>
      </main>
      <FooterPage v-if="hide" />
</template>
