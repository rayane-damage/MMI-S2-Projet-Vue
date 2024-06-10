<script setup lang="ts">
import type { MemoriesResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import VueClickAway from "vue3-click-away";

const props = defineProps<MemoriesResponse>();

console.log("props", props);

const doDeleteMemorie = () => {
    pb.collection('memories').delete(props.id);
};

// const cardClicked = inject('cardClicked') as Ref<boolean>;
const cardClicked = ref(false);

const onClickAway = () => {
    console.log("event")
    cardClicked.value = false;
};
</script>

<template>
    <section class="bg-white rounded-3xl m-4 relative">
        <div @click="cardClicked = !cardClicked">
            <div class="flex gap-2 p-2">
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
            <div class="max-h-96 w-auto overflow-hidden rounded-b-3xl">
                <img
                src="/public/img/background-image.png"
                alt="Image de souvenirs"
                class="w-full h-auto object-cover"
                >
            </div>
        </div>
        <div
        @click.stop="doDeleteMemorie"
        :class="cardClicked ? 'block' : 'hidden'"
        class="absolute top-0 right-0 p-4 bg-red-400">Supprimer</div>
    </section>
</template>