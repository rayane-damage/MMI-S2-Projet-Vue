<script setup lang="ts">
import IconArrowLeft from './icons/IconArrowLeft.vue';
import { sectionOpen } from '@/pages/settings/index.vue';

const props = defineProps<{
    title: string
    text: string
    number: number
}>();

</script>

<template>
    <section class="*:text-white bg-mainBlue">
        <button class="flex justify-between items-center w-full border-b border-lightOrange h-10 px-10">
            <h4 class="font-sniglet text-base tracking-wide">{{ title }}</h4>
        <IconArrowLeft
        class="h-4 rotate-180 transition duration-200"
        :class="{ 'rotate-[270deg]': sectionOpen === number }"
        />
        </button>
        <p v-show="sectionOpen === number"
            class="indent-8 pt-2 px-4">
        {{ text }}
        </p>

    </section>
</template>