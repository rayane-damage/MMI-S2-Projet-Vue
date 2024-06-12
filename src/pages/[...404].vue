<script setup lang="ts">
import { useRouter } from 'vue-router';
import { pb
 } from '@/backend';
const router = useRouter();
</script>
<template>
    <section class="h-screen flex flex-col items-center justify-center gap-6" v-scroll-lock="true">
        <h2 class="font-Hegante text-4xl text-mainOrange">404</h2>
        <div class="flex flex-col items-center">
            <p>La page que vous cherchez n'existe pas</p>
            <span class="text-blue-500">
                <p
                v-if="pb.authStore.model"
                 @click="router.push('/')">Retourner a la page d'acceuil</p>
                 <p
                v-else
                 @click="router.push('/connexion')">Retourner a la page de connexion</p>
            </span>
        </div>
    </section>
</template>