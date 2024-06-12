<script setup lang="ts">
import IconMoodBad from '@/components/icons/IconMoodBad.vue';
import IconMoodMid from '@/components/icons/IconMoodMid.vue';
import IconMoodGood from '@/components/icons/IconMoodGood.vue';
import ImgPb from './ImgPb.vue';

import { pb } from '@/backend';

const props = defineProps<{
    currentMood: string
}>();

const currentUser = pb.authStore.model;


</script>

<template>
    <section aria-label="profile preview">
        <div class="border-white border-8 rounded-full w-44">
            <!-- <img src="../../public/img/pfp default.png" alt="Profile picture" class="w-full aspect-square"> -->
             <ImgPb :record="currentUser" :filename="currentUser?.avatar" class="w-full aspect-square rounded-full" />
        </div>

        <span class="relative flex items-end
                    *:absolute *:w-[72px] *:h-[72px] *:right-0">
            <IconMoodGood v-if="props.currentMood === 'Bien'"/>
            <IconMoodMid v-if="props.currentMood === 'Moyen'" />
            <IconMoodBad v-if="props.currentMood === 'Mal'" />
        </span>
    </section>
</template>