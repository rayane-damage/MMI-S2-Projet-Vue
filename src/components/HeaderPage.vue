<script setup lang="ts">
import IconLogo from './icons/IconLogo.vue'
import { ref} from 'vue'
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';
import { pb }from '@/backend';
import type { AuthSystemFields, UsersRecord } from '@/pocketbase-types';

const props = defineProps<{
    active: string
    inactive: string
}>();
const records: UsersRecord[] = await pb.collection('users').getFullList();
// type Props = {
//     active: string,
//     inactive: string
// } & TestResponse;

// const props = defineProps<Props>();
function moodDetermine(mood:string) {
    if (mood === 'Bien') {
        return "Bien";
    } else if (mood === 'Moyen') {
        return "Moyen";
    } else {
        return "Mal";
    }
}
const userMood = moodDetermine(records[0]?.mood || '');

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
                            <!-- <IconMoodMid /> -->
                            <IconMoodGood v-if="userMood === 'Bien'"/>
                            <IconMoodMid v-if="userMood === 'Moyen'" />
                            <IconMoodBad v-if="userMood === 'Mal'" />
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