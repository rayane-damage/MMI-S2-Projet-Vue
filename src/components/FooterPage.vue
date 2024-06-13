<script setup lang="ts">
import IconMessage from './icons/IconMessage.vue';
import IconSettings from './icons/IconSettings.vue';
import IconHouse from './icons/IconHouse.vue';


</script>

<template>
    <footer class="bg-mainBlue fixed w-full p-1 bottom-0 z-50">
        <nav>
            <ul class="grid grid-cols-3 py-2 px-8 place-items-center">
                <li>
                    <RouterLink to="/">
                        <IconHouse
                        class="h-6"
                        :class="$route.path === '/' ? 'fill-mainOrange' : ''"
                        />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/messages">
                        <IconMessage
                        class="h-6"
                        :class="$route.path === '/messages' ? 'fill-mainOrange' : ''"
                        />
                    </RouterLink>
                </li>
                <li>
                    <RouterLink to="/settings">
                        <IconSettings
                        class="h-6"
                        :class="$route.path === '/settings' ? 'fill-mainOrange' : ''"
                        />
                    </RouterLink>
                </li>
            </ul>
        </nav>
    </footer>
</template>