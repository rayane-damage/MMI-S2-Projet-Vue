<script setup lang="ts">
import IconMoodSmile from './icons/IconMoodSmile.vue';
import IconSmallSettings from './icons/IconSmallSettings.vue';
</script>

<template>
    <section class="flex justify-between items-center mx-6 p-4 bg-white rounded-[35px]">
        <div class="flex gap-4 items-center">
            <div>
                <IconMoodSmile />
            </div>
            <div>
                <p>01/01/2001</p>
                <p>BIEN</p>
            </div>
        </div>
        <div>
            <IconSmallSettings />
        </div>
    </section>
</template>