<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';
import ImgPb from './ImgPb.vue';

import { pb } from '@/backend';
import { ref } from 'vue'
// import { test } from '@/pages/index.vue';


//Permet de changer le texte du Header en fonction de la page
const props = defineProps<{
    active: string
    inactive: string
    currentMood: string
}>();

const currentUser = await pb.collection('users').getOne(pb.authStore.model?.id);
console.log(currentUser.avatar)
</script>
<script lang="ts">
// //Utilisation d'un script normal pour pouvoir exporter des variables
export const isActive = ref(true);
</script>


<template>
        <header class="mb-header">
        <div class="bg-mainBlue fixed w-full top-0 z-50">
            <nav>
                <ul class="flex justify-between px-8 pt-4">
                    <li>
                        <RouterLink to="/profil">
                             <ImgPb :record="currentUser" 
                                    :filename="currentUser.avatar" 
                                    alt="Photo de profil"
                                    class="w-10 h-10 first-letter:object-cover rounded-full border-2 border-white"/>
                            <span class="relative flex items-end *:absolute *:w-4 *:h-4 *:right-0">
                                <IconMoodGood v-if="props.currentMood === 'Bien'"/>
                                <IconMoodMid v-if="props.currentMood === 'Moyen'"/>
                                <IconMoodBad v-if="props.currentMood === 'Mal'"/>
                            </span>
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/">
                            <IconLogo />
                        </RouterLink>
                    </li>
                </ul>
            </nav>
            <nav>
                <ul class="grid grid-cols-2 place-items-center justify-center *:flex *:w-full *:justify-center">
                    <li
                        class="text-center text-white py-2"
                        @click="isActive = true"
                        :class="{ 'shadow-inner-orange' : isActive}"
                        >
                            {{ active }}
                    </li>
                    <li
                        class="text-center text-white py-2"
                        @click="isActive = false"
                        :class="{ 'shadow-inner-orange' : !isActive}"
                        >
                            {{ inactive }}
                    </li>
                </ul>
            </nav>
        </div>
        </header>
</template>