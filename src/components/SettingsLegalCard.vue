<script setup lang="ts">
import { ref } from 'vue'
const sectionOpen = ref(0)

const props = defineProps<{
    title: string
    text: string
}>();

</script>

<template>
    <section>
        <button class="flex justify-between items-center w-full border-b-2 border-orange-400 py-2 px-10">
            <h4>{{ title }}</h4>
            <IconInfo class="h-4"/>
            <Transition
        class="transition-transform duration-300"
        enter-to-class="translate-x-0"
        leave-active-class="-translate-x-full"
        enter-from-class="-translate-x-full"
        >
        {{ text }}
        </Transition>
        </button>
    </section>
</template>