<script setup lang="ts">
const props = defineProps<{
    title: string
}>();
</script>

<template>
    <button>
        {{ title }}
    </button>
</template>