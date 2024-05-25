<script setup lang="ts">
import IconMessage from './icons/IconMessage.vue';
import IconSettings from './icons/IconSettings.vue';
import IconHouse from './icons/IconHouse.vue';
import IconMoodSmile from './icons/IconMoodGood.vue';
</script>

<template>
    <footer class="bg-mainBlue fixed w-full bottom-0 z-50">
        <nav>
            <ul class="grid grid-cols-4 py-2 px-8 place-items-center">
                <li class="relative flex justify-center">
                    <RouterLink to="/Memories"
                    class="absolute bottom-1/2"
                    >
                        <IconMoodSmile class="h-10" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Index.html">
                        <IconHouse class="h-6" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Messages">
                        <IconMessage class="h-6" />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/Settings">
                        <IconSettings class="h-6" />
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>