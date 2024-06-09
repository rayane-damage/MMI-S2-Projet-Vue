<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import { pb } from '@/backend';
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import type { MoodResponse } from '@/pocketbase-types';

const props = defineProps<MoodResponse>();

const cardSettingClicked = ref(false);


const moodClass: { [key: string]: string } = {
    Bien: 'text-green-500',
    Moyen: 'text-yellow-500',
    Mal: 'text-red-500',
};

const moodList = inject('moodList') as Ref<any[]>;

const deleteMood = async (mood: string) => {
    await pb.collection('mood').delete(props.id);

    const updatedMoodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });
    console.log(moodList.value)
    moodList.value = updatedMoodList;
    console.log('Mood deleted')
    console.log(moodList.value)
}
</script>



<template>
    <section class="flex justify-between items-center mx-6 p-4 bg-white rounded-[35px] relative">
        <div class="flex gap-4 items-center">
            <div>
                <IconMoodGood v-if="mood === 'Bien'"/>
                <IconMoodMid v-if="mood === 'Moyen'" />
                <IconMoodBad v-if="mood === 'Mal'" />
            </div>
            <div>
                <p class="text-sm text-gray-600">{{ created }}</p>
                <p
                    class="font-Hegante text-xl"
                    :class="moodClass[mood || '']"
                >{{ mood }}</p>
            </div>
        </div>
        <div class="pr-1" @click="cardSettingClicked = !cardSettingClicked">
            <IconSmallSettings />
        </div>
        <div 
        v-show="cardSettingClicked" 
        class="absolute bg-red-300 right-0 h-1/2 p-4 flex items-center justify-center rounded-xl"
        @click="deleteMood(mood)"
        >
            Supprimer le mood
        </div>
    </section>
</template>