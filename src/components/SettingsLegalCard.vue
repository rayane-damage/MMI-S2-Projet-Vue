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
    <section class="*:text-white py-2">
        <button class="flex justify-between items-center w-full border-b-2 border-mainOrange py-2 px-10">
            <h4>{{ title }}</h4>
        <IconArrowLeft
        class="h-4 rotate-180"
        :class="{ '-rotate-90': sectionOpen === number }"
        />
        </button>
        <Transition
        class="transition-transform duration-300"
        enter-to-class="translate-y-0"
        leave-active-class="-translate-y-full"
        enter-from-class="-translate-y-full"
        >
        <p v-show="sectionOpen === number">
        {{ text }}
        </p>
    </Transition>

    </section>
</template>