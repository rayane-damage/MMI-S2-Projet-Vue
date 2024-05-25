<script setup lang="ts">
import { moodList } from '@/data';

const props = defineProps<{
    pseudo: string;
    date: string;
    mood: string;
}>();
</script>

<template>
    <section class="bg-white rounded-3xl m-4">
        <div class="flex gap-2 p-2">
            <img
            src="/public/img/pfp default.png"
            alt="Profile Picture"
            class="h-16"
            >
            <span>
                <p class="font-bold">{{ pseudo }}</p>
                <p>3 hours ago</p>
            </span>
        </div>
        <div class="max-h-96 w-auto overflow-hidden rounded-b-3xl">
            <img
            src="/public/img/background-image.png"
            alt="Image de souvenirs"
            class="w-full h-auto object-cover"
            >
        </div>
    </section>
</template>