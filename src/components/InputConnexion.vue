<script setup lang="ts">
const props = withDefaults (
    defineProps<{
        text?: string
        labelfor: string
        type: string
        name: string
        id: string
        placeholder?: string
    }>(),
    {
        type: 'text',
    }
)
</script>

<template>
    <label
    :for="`${labelfor}`">
    {{ text }}
    </label>

    <input
    :type="`${type}`"
    :name="`${name}`"
    :id="`${id}`"
    :placeholder="`${placeholder}`"
    @input="$event.target && $emit('update:modelValue', ($event.target as HTMLInputElement).value)"    >
</template>