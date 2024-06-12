<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconProfileSmall from './icons/IconProfileSmall.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import type { UsersResponse, MoodResponse } from '@/pocketbase-types';
import { pb, allUserMoods } from '@/backend';
import { ref, onMounted } from 'vue';
import ImgPb from './ImgPb.vue';

const props = defineProps<UsersResponse<any>>();

// const userMoods = ref([]);
// onMounted( async () => {
//     userMoods.value = await pb.collection('mood').getFullList({
//         filter : `user = "${props.id}"`,});
// });

// console.log("userMoods");
// console.log(userMoods);
// const currentMood = ref(userMoods.value[0]?.mood);
// console.log("currenMood");
// console.log(currentMood);

// console.log("props", props);
</script>


<template>
    <section class="flex justify-between items-center mx-4 p-4">
        <div class="flex gap-2">
            <!-- <IconProfileSmall/> -->
             <ImgPb :record="props" :filename="props.avatar" class="rounded-full h-16 w-16 object-cover border-4 border-white" />
            <!-- <span class="relative flex items-end *:absolute *:w-8 *:h-8 *:right-0">
                <IconMoodGood v-if="currentMood === 'Bien'"/>
                <IconMoodMid v-if="currentMood === 'Moyen'" />
                <IconMoodBad v-if="currentMood === 'Mal'" />
            </span> -->
            <p class="self-start font-sniglet tracking-wider text-xl">{{ name }}</p>
        </div>
        <div>
            <IconSmallSettings/>
        </div>
    </section>
</template>