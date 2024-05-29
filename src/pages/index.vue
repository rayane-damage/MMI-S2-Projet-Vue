<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import MoodCard from '@/components/MoodCard.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import IconMoodBad from '@/components/icons/IconMoodBad.vue'
import IconMoodMid from '@/components/icons/IconMoodMid.vue'
import IconMoodGood from '@/components/icons/IconMoodGood.vue'
//Varibale pour savoir si on est sur la page des moods ou des memories
import { isActive } from '@/components/HeaderPage.vue'

import { useRouter } from 'vue-router';
import { onMounted, provide, ref } from 'vue';
import { pb } from '@/backend';

// Importe les données de la base de données
const memoriesList: any[] = await pb.collection('memorie').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});


//Renvoie l'utilisateur à la page de connexion si il n'est pas connecté
const route = useRouter();
onMounted(() => {
    if (pb.authStore.model === null) {
        route.push('/connexion');
    }
})


let moodList = ref<any[]>([]);

moodList.value = await pb.collection('mood').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});


let currentMood = ref(moodList.value[0].mood);

async function addMood(mood:string) {
    await pb.collection('mood').create({ mood: mood, user: pb.authStore.model?.id});
    currentMood.value = mood;
    const updatedMoodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });
    moodList.value = updatedMoodList;
    console.log('Mood added')
}

//permet d'acceder a l'onglet de gauche a chaque fois que l'on revient sur la page
if (isActive.value == false) {
    isActive.value = true;
}
</script>

<template>
        <HeaderPage active="Memories" inactive="Moods" :currentMood="currentMood"/>
        <section
        class="flex flex-col gap-4 my-4"
        v-if="isActive === false"
        >
        <div class="flex gap-4 w-full justify-center p-4">
            <IconMoodGood @click="addMood('Bien')"/>
            <IconMoodMid @click="addMood('Moyen')" />
            <IconMoodBad @click="addMood('Mal')"/>
        </div>
            <MoodCard v-for="mood in moodList" v-bind="mood" :key="mood.id" />

        </section>
        <section
        v-if="isActive === true"
        >
            <MemoriesCard v-for="memorie in memoriesList" v-bind="memorie" :key="memorie.id"/>
        </section>
</template>