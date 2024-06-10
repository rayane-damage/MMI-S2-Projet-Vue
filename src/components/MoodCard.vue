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
const currentMood = inject('currentMood') as Ref<string>;

const deleteMood = async (mood: string) => {
    await pb.collection('mood').delete(props.id);

    const updatedMoodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });
    // Permet d'actualiser la liste des moods
    moodList.value = updatedMoodList;
    // Permet de changer le Header et mettre un Mood par défaut si il n'y a pas de mood (arrive quand on supprime le dernier mood)
    if (moodList.value.length > 0) {
    console.log('moodList.value[0].mood');
    console.log(moodList.value[0].mood);
    currentMood.value = moodList.value[0].mood;
    } else {
        currentMood.value = 'Bien';
    }
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
        <div class="p-4" @click="cardSettingClicked = !cardSettingClicked">
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