<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import { pb } from '@/backend';
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import type { MoodResponse } from '@/pocketbase-types';
import { onClickOutside } from '@vueuse/core';

const props = defineProps<MoodResponse>();

const cardSettingClicked = ref(false);


const moodClass: { [key: string]: string } = {
    Bien: 'text-mainGreen',
    Moyen: 'text-mainOrange',
    Mal: 'text-mainRed',
};


const moodList = inject('moodList') as Ref<any[]>;
const currentMood = inject('currentMood') as Ref<string>;
console.log('moodList', moodList.value);
const deleteMood = async (mood: string) => {
    if (moodList.value.length > 1) {
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
    } else {
        alert('Vous ne pouvez pas supprimer votre dernier mood');
    }
}

const moodCardSettings = ref(null);

onClickOutside(moodCardSettings, () => {
    cardSettingClicked.value = false;
});

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
                <span class="flex">
                        <p>{{ props.created[0] }}</p>
                        <p v-for="xValue in 10" 
                            :key="xValue" 
                            v-bind="xValue" 
                            class="text-grayDark">
                            {{props.created[xValue] }}
                        </p>
                </span>
                <p class="font-Hegante text-xl"
                    :class="moodClass[mood || '']">
                    {{ mood }}
                </p>
            </div>
        </div>
        <div class="p-4" @click="cardSettingClicked = !cardSettingClicked">
            <IconSmallSettings />
        </div>
        <div v-show="cardSettingClicked"
            ref="moodCardSettings"
            class="absolute bg-mainRed text-white text-lg font-sniglet tracking-wide top-5 right-12 px-4 py-2 flex items-center justify-center rounded-xl"
            @click="deleteMood(mood)">
            Supprimer
        </div>
    </section>
</template>