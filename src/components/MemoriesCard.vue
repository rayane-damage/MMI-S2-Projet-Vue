<script setup lang="ts">
import type { MemoriesResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

import IconSmallSettings from './icons/IconSmallSettings.vue';

const props = defineProps<MemoriesResponse>();


const doDeleteMemorie = () => {
    pb.collection('memories').delete(props.id);
};

const memorieCardSettings = ref(null);
const cardClicked = ref(false);

onClickOutside(memorieCardSettings, () => {
    cardClicked.value = false;
});

</script>

<template>
    <section class="bg-white rounded-3xl m-4 relative">
        <div>
            <div class="flex justify-between items-center gap-2 p-2">
                <div class="flex gap-2">
                    <img
                    src="/public/img/pfp default.png"
                    alt="Profile Picture"
                    class="h-16"
                    >
                    <span>
                        <p class="font-bold">{{ (props.expand as any).user.name }}</p>
                        <p>3 hours ago</p>
                    </span>
                </div>
                <div class="relative">
                    <IconSmallSettings @click="cardClicked = !cardClicked" class="mx-4"/>
                    <div
                    ref="memorieCardSettings"
                    @click="doDeleteMemorie"
                    v-show="cardClicked"
                    class="absolute bg-red-300 -top-2 right-0 p-4 flex items-center justify-center rounded-xl"
                    >Supprimer</div>
                </div>
            </div>
            <div class="max-h-96 w-auto overflow-hidden rounded-b-3xl">
                <img
                src="/public/img/background-image.png"
                alt="Image de souvenirs"
                class="w-full h-auto object-cover"
                >
            </div>
        </div>
    </section>
</template>