<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import { ref, inject, watch, watchEffect} from 'vue'
import type { Ref } from 'vue'
import { pb } from '@/backend';
// import { test } from '@/pages/index.vue';

// //Prend la liste des moods de l'utilisateur
const records = await pb.collection('mood').getFullList({
    filter: `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});
//Récupère le mood le plus récent
let currentMood = records[0]?.mood;


console.log("currentMoodHEADER:")
console.log(currentMood)
//Permet de changer le texte du Header en fonction de la page
const props = defineProps<{
    active: string
    inactive: string
}>();

// --------------------------------------------------------------------------------------------
let currentMood2 = inject<Ref<string | undefined>>('lastUserMood', ref(currentMood));

if (currentMood2) {
  watch(currentMood2, (newVal) => {
    console.log('Newvalheader')
    console.log(newVal)
    console.log(currentMood2.value)
  });
}
if (currentMood2) {
  watchEffect(() => {
    console.log('currentMood2 has changed:', currentMood2.value);
  });
}

console.log("currentMoodHEADER2:")
console.log(currentMood2)
console.log(currentMood2.value)

// console.log("currentMoodHEADER2:")
// console.log(currentMood2)

// let currentMood3 = ref(currentMood2)

// watchEffect(() => {
//     currentMood3.value = currentMood2
//     console.log("currentMoodHEADER3:")
//     console.log(currentMood3.value)
// })

// if (currentMood2 === undefined) {
//     currentMood2 = currentMood
// }

// if (currentMood3.value === undefined) {
//     currentMood3.value = currentMood
// }const isActiveValue = ref(props.activeValue);
</script>

<script lang="ts">
// //Utilisation d'un script normal pour pouvoir exporter des variables
//     export const isActiveValue = ref(activeValue);
//     export const isInactiveValue = ref(inactiveValue);
    export const isActive = ref(true);
</script>
<template>
        <header class="mb-header">
        <div class="bg-mainBlue fixed w-full top-0 z-50">
            <nav>
                <ul class="flex justify-between px-8 pt-4">
                    <li>
                        <RouterLink to="/">
                            <img src="/img/pfp default.png" alt="Profile picture" />
                            <span class="relative flex items-end *:absolute *:w-4 *:h-4 *:right-0">
                                <IconMoodGood v-if="currentMood2 === 'Bien'"/>
                                <IconMoodMid v-if="currentMood2 === 'Moyen'" />
                                <IconMoodBad v-if="currentMood2 === 'Mal'" />
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
                <ul class="grid grid-cols-2 place-items-center justify-center *:flex *:w-full">
                    <li>
                        <RouterLink to="/"
                        class="w-full text-center text-white py-2"
                        @click="isActive = true"
                        :class="{ 'shadow-inner-orange' : isActive}"
                        >
                            {{ active }}
                        </RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/"
                        class="w-full text-center text-white py-2"
                        @click="isActive = false"
                        :class="{ 'shadow-inner-orange' : !isActive}"
                        >
                            {{ inactive }}
                        </RouterLink>
                    </li>
                </ul>
            </nav>
        </div>
        </header>
    <div v-if="inactive=== 'Moods' && isActive===false" @click="currentMood2 = 'Mal'" class="bg-red-600 w-full p-4 text-center font-bold text-white text-2xl">
            TEST
        </div>
</template>