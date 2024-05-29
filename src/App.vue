<script setup lang="ts">
import { onErrorCaptured, computed} from 'vue'
import { RouterView, useRoute } from 'vue-router'

import FooterPage from '@/components/FooterPage.vue'

onErrorCaptured((err, instance, info) => {
  console.error('erreur : ', err, '\ninfo : ', info, '\ncomposant : ', instance)
  return true
})

// Cache le header et le footer sur les routes spécifiées
const route = useRoute()
const hideOnRoutes = ['/connexion']
const hide = computed(() => !hideOnRoutes.some(path => route.path.startsWith(path)));
</script>

<template>
      <FooterPage v-if="hide" />
      <main class="mb-footer bg-lightBeige">
        <RouterView v-slot="{ Component }">
          <Suspense>
            <component :is="Component" />
          </Suspense>
        </RouterView>
      </main>
      <FooterPage v-if="hide" />
      <HeaderPage active="Memories" inactive="Moods"/>

</template>
