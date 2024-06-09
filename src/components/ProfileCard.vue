<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconProfileSmall from './icons/IconProfileSmall.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import type { UsersResponse, MoodResponse } from '@/pocketbase-types';
import { pb, allUserMoods } from '@/backend';
import { ref } from 'vue';

const props = defineProps<UsersResponse<any>>();

// const userMoods: MoodResponse[] =await pb.collection('mood').getFullList({
//         filter : `user = "${props.expand.friends[0].friends[0]}"`,
//     });

// console.log("userMoods");
// console.log(userMoods);
// const currentMood = ref(userMoods[0].mood);
// console.log("currenMood");
// console.log(props.expand.friends);

// console.log(currentMood);
</script>


<template>
    <section class="flex justify-between items-center mx-4 p-4">
        <div class="flex gap-1">
            <IconProfileSmall/>
            <!-- <span class="relative flex items-end *:absolute *:w-8 *:h-8 *:right-0">
                <IconMoodGood v-if="currentMood === 'Bien'"/>
                <IconMoodMid v-if="currentMood === 'Moyen'" />
                <IconMoodBad v-if="currentMood === 'Mal'" />
            </span> -->
            <p class="self-start">{{ name }}</p>
        </div>
        <div>
            <IconSmallSettings/>
        </div>
    </section>
</template>