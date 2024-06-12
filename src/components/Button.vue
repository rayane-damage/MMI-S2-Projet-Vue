<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        variant?: 'default' | 'white' | 'transparent' | 'blue'
        text?: string
    }>(),
    {
        variant: 'default',
    }
)

const variantClass = {
    default: 'text-dark bg-mainOrange',
    white: 'text-grayDark bg-white',
    transparent : 'text-grayDark bg-none',
    blue: 'text-white bg-mainBlue',
}

</script>

<template>
    <button 
    type="button"
    class="rounded-full p-2 w-full font-sniglet tracking-wider"
    :class="variantClass[variant]"
    >
        {{ text }}
    </button>
</template>