<script setup lang="ts">
import MemoriesCard from '@/components/MemoriesCard.vue'
import HeaderPage from '@/components/HeaderPage.vue'
import MoodCard from '@/components/MoodCard.vue'
import ButtonAdd from '@/components/ButtonAdd.vue'

import IconMoodBad from '@/components/icons/IconMoodBad.vue'
import IconMoodMid from '@/components/icons/IconMoodMid.vue'
import IconMoodGood from '@/components/icons/IconMoodGood.vue'
//Varibale pour savoir si on est sur la page des moods ou des memories
import { isActive } from '@/components/HeaderPage.vue'

import { useRouter } from 'vue-router';
import { onMounted, provide, ref, watch } from 'vue';
import { pb } from '@/backend';

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


provide('moodList', moodList);

let currentMood = ref();

//Mood par défaut si il n'y a pas de mood (arrive quand on supprime le dernier mood)
if (moodList.value.length > 0) {

    currentMood.value = moodList.value[0].mood;
    } else {
        currentMood.value = 'Bien';
    }
provide ('currentMood', currentMood);

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

//--------------------------------------- Memories ---------------------------------------
const memoriesList = ref<any[]>([]);
memoriesList.value = await pb.collection('memories').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    expand : 'user',
    sort: '-created'
});

console.log("memoriesList", memoriesList);

const memorieMode = ref(true);
watch(isActive, (newValue) => {
    if (newValue === false) {
        memorieMode.value = true;

    }
});


const memorieStatus = ref('private');
const description = ref();
const errorMessage = ref('');

const doAddMemorie = () => {
    if (description.value) {
        pb.collection('memories').create({
            description: description.value,
            status: memorieStatus.value,
            user: pb.authStore.model?.id
        });
        memorieMode.value = !memorieMode.value
    } else {
        errorMessage.value = 'Champs manquants';
}};



onMounted( async () =>{
    pb.collection('memories').subscribe('*', async ({action, record }) => {
        if (action === 'create') {
            memoriesList.value = await pb.collection('memories').getFullList({
                filter : `user = '${pb.authStore.model?.id}'`,
                expand : 'user',
                sort: '-created'
            });
        }
        if (action === 'delete') {
            memoriesList.value = await pb.collection('memories').getFullList({
                filter : `user = '${pb.authStore.model?.id}'`,
                expand : 'user',
                sort: '-created'
            });
        }
    });
});

</script>

<template>
        <HeaderPage active="Memories" inactive="Moods" :currentMood="currentMood"/>
        <section
        class="flex flex-col gap-4 pb-4"
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
        class="py-1"
        >
        <div v-if="memorieMode">
            <MemoriesCard
            v-for="memorie in memoriesList" v-bind="memorie" :key="memorie.id"/>
            <ButtonAdd @click=" memorieMode = !memorieMode, errorMessage = ''" />
        </div>
        <div
        v-scroll-lock="true"
        v-if="!memorieMode" class="flex flex-col h-screen gap-20 items-center">
            <div class="w-80 h-52 flex flex-col items-center gap-4">
                <div>Ajoutez une image !</div>
                <input v-model="description" class="w-full h-full flex" type="text" placeholder="Ajoutez une description !">
            </div>
            <div class="flex flex-col gap-4 relative">
                <p class="absolute text-red-500 -top-10">{{ errorMessage }}</p>
                <div class="flex *:py-2  *:w-40">
                    <button
                    @click="memorieStatus = 'private'"
                    class="border-2 border-mainOrange rounded-l-full"
                    :class="memorieStatus === 'private' ? 'bg-mainOrange' : 'bg-transparent'"
                    >Privé
                    </button>

                    <button
                    @click="memorieStatus = 'public'"
                    class="border-2 border-mainOrange  rounded-r-full"
                    :class="memorieStatus === 'public' ? 'bg-mainOrange' : 'bg-transparent'"
                    >Public
                    </button>
                </div>
                <div class="flex flex-col gap-4">
                    <button class="w-80 py-2 bg-mainBlue rounded-full text-white" @click="doAddMemorie">Publier</button>
                    <button @click="memorieMode = !memorieMode">Annuler</button>
                </div>
            </div>
        </div>
        </section>
</template>