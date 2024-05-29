<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import HeaderPage from '@/components/HeaderPage.vue'
//Varibale pour savoir si on est sur la page des moods ou des memories
import { isActive } from '@/components/HeaderPage.vue'

import { useRouter, useRoute } from 'vue-router';
import { onMounted, computed, watch, ref} from 'vue';
import { pb } from '@/backend';

//Importe les données de la base de données
let moodList = await pb.collection('mood').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});

console.log('MOODLIST')
console.log(moodList[0])

const memoriesList = await pb.collection('memorie').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});

console.log('MEMORIESLIST')
console.log(memoriesList[0])

//Renvoie l'utilisateur à la page de connexion si il n'est pas connecté
const route = useRouter();
onMounted(() => {
    if (pb.authStore.model === null) {
        route.push('/connexion');
    }
})


//-------------------------------------------------------------------------------
// let lastUserMood = ref("");
// let providedMood = ref("");

// provide('lastUserMood', providedMood);

// watch(lastUserMood, (newVal) => {
//     providedMood.value = newVal;
//     console.log('Newval')
//     console.log(newVal)
// });

// async function fetchMoods() {
//   const records = await pb.collection('mood').getFullList({
//     filter: `user = '${pb.authStore.model?.id}'`,
//     sort: '-created'
//   });
//   console.log(lastUserMood.value)
// lastUserMood.value = ""
//   lastUserMood.value = records[0].mood;
//   console.log("lastUserMood")
//   console.log(lastUserMood.value)
// }

// async function addMood(mood:string) {
//   await pb.collection('mood').create({ mood: mood, user: pb.authStore.model?.id});
//   fetchMoods();
// }

// const test = ref();
// test.value = 'test';
// console.log('test:', test);
// console.log('testvalue:', test.value);


// watch(test, (newVal) => {
//     console.log('test has changed:', newVal);
// });

// provide('testRef', test);

</script>

<template>
        <HeaderPage active="Memories" inactive="Moods"/>
        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive === false"
        >
            <MoodCard v-for="mood in moodList" v-bind="mood" :key="mood.id" />

        </section>
        <section
        v-if="isActive === true"
        >
            <MemoriesCard v-for="memorie in memoriesList" v-bind="memorie" :key="memorie.id"/>
        </section>
</template>