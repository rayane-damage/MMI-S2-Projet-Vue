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
    @input="$emit('update:modelValue', $event.target.value)"
    class="rounded-full p-2 w-full bg-white"
    >
</template>