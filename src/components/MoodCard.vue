<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import type { MoodResponse } from '@/pocketbase-types';

const props = defineProps<MoodResponse>();
// console.log("MOOD:")
// console.log(props.mood)

//Permet de changer la couleur du texte en fonction du mood
const moodClass: { [key: string]: string } = {
    Bien: 'text-green-500',
    Moyen: 'text-yellow-500',
    Mal: 'text-red-500',
};

</script>

<template>
    <section class="flex justify-between items-center mx-6 p-4 bg-white rounded-[35px]">
        <div class="flex gap-4 items-center">
            <div>
                <IconMoodGood v-if="mood === 'Bien'"/>
                <IconMoodMid v-if="mood === 'Moyen'" />
                <IconMoodBad v-if="mood === 'Mal'" />
            </div>
            <div>
                <p class="text-sm text-gray-600">{{ created }}</p>
                <p
                class="font-Hegante text-xl"
                :class="moodClass[mood]"
                >{{ mood }}</p>
            </div>
        </div>
        <div class="pr-1">
            <IconSmallSettings />
        </div>
    </section>
</template>