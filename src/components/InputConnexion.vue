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
    <div class="indent-4">
        <label
            :for="`${labelfor}`">
            {{ text }}
        </label>

        <input
            :type="`${type}`"
            :name="`${name}`"
            :id="`${id}`"
            :placeholder="`${placeholder}`"
            @input="$event.target && $emit('update:modelValue', ($event.target as HTMLInputElement).value)"
            class="rounded-full p-2 w-full bg-white !text-black">
    </div>

</template>