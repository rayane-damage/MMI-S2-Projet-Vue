<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'
import { ref} from 'vue'
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

const props = defineProps<{
    active: string
    inactive: string
}>()
</script>
<script lang="ts">
export const isActive = ref(true);
</script>

<template>
    <header class="bg-mainBlue fixed w-full top-0 z-50">
        <nav>
            <ul class="flex justify-between px-8 pt-4">
                <li>
                    <RouterLink to="/">
                        <img src="/img/pfp default.png" alt="Profile picture" />
                        <span class="relative flex items-end *:absolute *:w-4 *:h-4 *:right-0">
                            <IconMoodGood />
                            <!-- <IconMoodGood v-if="mood === 'Bien'"/>
                            <IconMoodMid v-if="mood === 'Moyen'" />
                            <IconMoodBad v-if="mood === 'Mal'" /> -->
                        </span>
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