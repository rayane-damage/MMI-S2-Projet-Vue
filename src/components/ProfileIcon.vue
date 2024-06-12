<script setup lang="ts">
import IconMoodBad from '@/components/icons/IconMoodBad.vue';
import IconMoodMid from '@/components/icons/IconMoodMid.vue';
import IconMoodGood from '@/components/icons/IconMoodGood.vue';
import ImgPb from './ImgPb.vue';

import { pb } from '@/backend';
import { type RecordModel } from 'pocketbase'


const props = defineProps<{
    record: RecordModel
}>();

const currentUser = pb.authStore.model;

const moodList = await pb.collection('mood').getFullList({
    filter : `user = '${props.record.id}'`,
    sort: '-created'
});
</script>

<template>
    <section aria-label="profile preview">
        <div class="border-white border-8 rounded-full w-44">
            <!-- <img src="../../public/img/pfp default.png" alt="Profile picture" class="w-full aspect-square"> -->
             <ImgPb :record="record" :filename="record?.avatar" class="w-full aspect-square rounded-full" />
        </div>

        <span class="relative flex items-end
                    *:absolute *:w-[72px] *:h-[72px] *:right-0">
            <IconMoodGood v-if="moodList[0].mood === 'Bien'"/>
            <IconMoodMid v-if="moodList[0].mood === 'Moyen'" />
            <IconMoodBad v-if="moodList[0].mood === 'Mal'" />
        </span>
    </section>
</template>