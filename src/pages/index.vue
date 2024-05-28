<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import Button from '@/components/Button.vue';
import { isActive } from '@/components/HeaderPage.vue'

import { useRouter } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import type { TestResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
const moodList: TestResponse[] = await pb.collection('Test').getFullList();


const route = useRouter();
onMounted(() => {
    if (pb.authStore.model === null) {
        route.push('/connexion');
    }
})

//-------------------------------------------------------------------------------
let currentUserMood = pb.authStore.model?.moods;


async function updateMood(userId: string, mood: Array<any>) {
    console.log("CurrentUser")
    console.log(pb.authStore.model?.id);
    // console.log(currentUser)
    // console.log(userId);
    try {
        const dataUpdate = {
            'moods': mood
        };

        await pb.collection('users').update(userId, dataUpdate);
        userMood.value = pb.authStore.model?.moods[pb.authStore.model?.moods.length - 1];
        route.push('/');
    } catch (e) {
        console.error(e);
    }
}

async function addMood(mood: string) {
    try {
        // const data = {
        //     'moods': [`${mood}`]
        // };
        if (currentUserMood) {
            currentUserMood.push(mood);
            console.log("currentUserMood in func=", currentUserMood);

        }
        if (pb.authStore.model) {
            updateMood(`${pb.authStore.model?.id}`, currentUserMood);
            console.log("yes")
        }
        console.log("addMood =>")
        console.log("model:")
        console.log(pb.authStore.model)
        console.group("moods:")
        console.log(pb.authStore.model?.moods)
    } catch (e) {
        console.error(e);
    }

}

// let userMood: any[] = pb.authStore.model?.moods[pb.authStore.model?.moods.length - 1];
// provide('userMood', userMood);
// console.log(userMood)

</script>
<script lang="ts">
// let userMood = pb.authStore.model?.moods[pb.authStore.model?.moods.length - 1];
// export let refUserMood = ref(userMood);
let userMood = ref(pb.authStore.model?.moods[pb.authStore.model?.moods.length - 1]);

watch(
  () => pb.authStore.model?.moods,
  (newMoods) => {
    userMood.value = newMoods[newMoods.length - 1];
  },
  { immediate: true }
);

export { userMood };
</script>

<template>
    <h1 class="bg-red-600 text-white text-xl" @click="addMood('Bien')">Change to bien</h1>
    <h1 class="bg-red-600 text-white text-xl" @click="addMood('Mal')">Change to pasbien</h1>
    <h1 @click="addMood('Moyen')">TEST</h1>
        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive===false"
        >            <MoodCard v-for="mood in moodList" :key="mood.id" v-bind="mood"/>

        </section>
        <section
        v-if="isActive===true"
        >
            <MemoriesCard v-for="memorie in moodList" v-bind="memorie" :key="memorie.id"/>
        </section>
</template>