<script setup lang="ts">
import type { MemoriesResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { ref} from 'vue';
import { onClickOutside } from '@vueuse/core';
import ImgPb from '@/components/ImgPb.vue';

import IconSmallSettings from './icons/IconSmallSettings.vue';

const props = defineProps<MemoriesResponse>();

// Supprime la memorie
const doDeleteMemorie = () => {
    pb.collection('memories').delete(props.id);
};

const memorieCardSettings = ref(null);
const cardClicked = ref(false);

// Ferme les settings si on clique en dehors
onClickOutside(memorieCardSettings, () => {
    cardClicked.value = false;
});

</script>

<template>
    <section class="bg-white rounded-3xl m-4 relative">
        <div>
            <div class="flex justify-between items-center gap-2 p-2">
                <div class="flex gap-2">
                    <ImgPb :record="(props.expand as any).user" :filename="(props.expand as any).user.avatar" class="h-12 w-12 object-cover rounded-full" alt="photo de profil" />
                    <span>
                        <p class="font-bold">{{ (props.expand as any).user.name }}</p>
                        <span class="flex">
                            <p>{{ props.created[0] }}</p>
                            <p v-for="xValue in 10" :key="xValue" v-bind="xValue">{{props.created[xValue] }}</p>
                        </span>
                    </span>
                </div>
                <div
                v-if="(props.expand as any).user.id === pb.authStore.model?.id"
                class="relative">
                    <IconSmallSettings @click="cardClicked = !cardClicked" class="mx-4"/>
                    <div
                    ref="memorieCardSettings"
                    @click="doDeleteMemorie"
                    v-show="cardClicked"
                    class="absolute bg-mainRed text-white text-lg font-sniglet tracking-wide top-12 right-0 px-4 py-2 flex items-center justify-center rounded-xl">
                    Supprimer</div>
                </div>
            </div>
            <div class="max-h-96 w-auto overflow-hidden rounded-b-3xl">
                <ImgPb :record="props" :filename="props.img" class="w-full h-auto object-cover" alt="Photo de memories" />
            </div>
        </div>
    </section>
</template>