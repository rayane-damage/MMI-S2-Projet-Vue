<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        variant?: 'default' | 'white'
        text?: string
    }>(),
    {
        variant: 'default',
    }
)

const variantClass = {
    default: 'text-white bg-orange-300',
    white: 'text-black bg-white'
}

</script>

<template>
    <button 
    type="button"
    class="rounded-full p-2 w-full"
    :class="variantClass[variant]"
    >
        {{ text }}
    </button>
</template>