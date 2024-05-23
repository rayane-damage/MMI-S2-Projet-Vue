<script setup lang="ts">
import IconMessage from './icons/IconMessage.vue';
import IconSettings from './icons/IconSettings.vue';
import IconHouse from './icons/IconHouse.vue';
import IconMoodSmile from './icons/IconMoodGood.vue';
</script>

<template>
    <footer class="bg-mainBlue">
        <nav>
            <ul class="grid grid-cols-4 py-4 px-8 place-items-center">
                <li class="relative flex justify-center">
                    <RouterLink to="/Memories"
                    class="absolute bottom-1/2"
                    >
                        <IconMoodSmile />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Index.html">
                        <IconHouse />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Messages">
                        <IconMessage />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Settings">
                        <IconSettings />
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>