<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'
import { ref } from 'vue'

const props = defineProps<{
    active: string
    inactive: string
}>()

const isActive = ref(true)
</script>

<template>
    <header class="bg-mainBlue">
        <nav>
            <ul class="flex justify-between px-8 pt-4">
                <li>
                    <RouterLink to="/">
                        <img src="#" alt="Profile picture" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/">
                        <IconLogo />
                    </RouterLink>
                </li>
            </ul>
        </nav>
        <nav>
            <ul class="grid grid-cols-2 place-items-center justify-center *:flex *:w-full">
                <li>
                    <RouterLink to="/"
                    class="w-full text-center text-white py-2"
                    @click="isActive = true"
                    :class="{ 'shadow-inner-orange' : isActive}"
                    >
                        {{ active }}
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/"
                    class="w-full text-center text-white py-2"
                    @click="isActive = false"
                    :class="{ 'shadow-inner-orange' : !isActive}"
                    >
                        {{ inactive }}
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </header>
</template>