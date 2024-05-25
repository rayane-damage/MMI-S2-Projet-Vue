<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconProfileSmall from './icons/IconProfileSmall.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import type { TestResponse } from '@/pocketbase-types';
const props = defineProps<TestResponse>();

</script>


<template>
    <section class="flex justify-between items-center mx-4 p-4">
        <div class="flex gap-1">
            <IconProfileSmall/>
            <span class="relative flex items-end *:absolute *:w-8 *:h-8 *:right-0">
                <IconMoodGood v-if="mood === 'Bien'"/>
                <IconMoodMid v-if="mood === 'Moyen'" />
                <IconMoodBad v-if="mood === 'Mal'" />
            </span>
            <p class="self-start">{{ pseudo }}</p>
        </div>
        <div>
            <IconSmallSettings/>
        </div>
    </section>
</template>