<script setup lang="ts">
const props = defineProps<{
    title: string
}>();
</script>

<template>
    <button class="text-sm">
        {{ title }}
    </button>
</template>