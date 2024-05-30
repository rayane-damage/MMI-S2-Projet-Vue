<script setup lang="ts">
const props = defineProps<{
    title: string
}>();
</script>

<template>
    <Button>
        {{ title }}
    </Button>
</template>