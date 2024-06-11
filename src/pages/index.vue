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
import type { UsersResponse } from '@/pocketbase-types'

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
//Permet de récupérer les memories de l'utilisateur et de ses amis
//Recupere les amis de l'utilisateur
const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id = '${pb.authStore.model?.id}'`,
    expand: 'friends'
});

const currentUserFriends = ref()
currentUserFriends.value = currentUser[0].friends
//Met dans un tableau tous les amis de l'utilisateur
const allFriends = ref();
for (let i = 0; i < currentUserFriends.value.length; i++) {
    if (allFriends.value === undefined) {
        allFriends.value =  await pb.collection('users').getFullList({
        filter: `id = '${currentUserFriends.value[i]}'`,
    });
    } else {
    const newuser = ref()
    newuser.value = await pb.collection('users').getFullList({
        filter: `id = '${currentUserFriends.value[i]}'`
    });
    console.log("newuser",newuser.value)
    allFriends.value.push( newuser.value[0])};
}

const memoriesList = ref<any[]>([]);
const oldmemoriesList = ref<any[]>([]);

const memoriesListBis = ref<any[]>([]);

//Recupere les memories de l'utilisateur et de ses amis
for (let i = 0; i < allFriends.value.length; i++) {
    memoriesListBis.value = await pb.collection('memories').getFullList({
        filter : `user = '${allFriends.value[i].id}' || user = '${pb.authStore.model?.id}'`,
        expand : 'user',
        sort: '-created'
    });
    memoriesList.value.push(memoriesListBis.value);
}

//Stocke les memories de l'utilisateur et de ses amis dans une constante pour l'afficher grace a un v-for
const memoriesListByUserAndFriends = memoriesList.value[0]

//Permet de changer de mode entre l'affichagedes memories et l'ajout de memories
const memorieMode = ref(true);
watch(isActive, (newValue) => {
    if (newValue === false) {
        memorieMode.value = true;

    }
});


const memorieStatus = ref('private');
const description = ref();
const errorMessage = ref('');
const file = ref();

//Permet d'uploader une image
function changeFileName(e:any) {
    console.log("FILENAME",e.target.files[0])
    file.value = e.target.files[0];
    console.log("FILENAMEVALUE",file.value)


}
//Permet d'ajouter une memorie dans la base de donnée
const doAddMemorie = () => {
    if (description.value && file.value != null && memorieStatus.value) {
        const formData = new FormData();

        formData.append('img', file.value);
        console.log("doaddMemorie, file.value = ", file.value, "fin")
        try {
        pb.collection('memories').create({
            img: file.value,
            description: description.value,
            status: memorieStatus.value,
            user: pb.authStore.model?.id
        });
        } catch (error) {
            alert('Erreur lors de la publication, essayez de changer d image')
            console.log(error)
        }
        memorieMode.value = !memorieMode.value
    } else {
        errorMessage.value = 'Champs manquants';
}};


//Permet de mettre a jour la liste des memories a chaque fois qu'un memory est ajouté ou supprimé
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
            v-for="memorie in memoriesListByUserAndFriends" v-bind="memorie" :key="memorie.id"/>
            <ButtonAdd @click=" memorieMode = !memorieMode, errorMessage = ''" />
        </div>
        <div
        v-scroll-lock="true"
        v-if="!memorieMode" class="flex flex-col h-screen gap-20 items-center">
            <div class="w-80 h-60 flex flex-col items-center gap-4 mt-10">
                <div class="flex justify-center items-center pt-4 relative">
                        <input type="file" @change="changeFileName"
                        class="bg-white rounded-3xl w-full place-content-center px-10 py-20
                        before:w-full before:block before:absolute before:h-full before:bg-transparent before:rounded-3xl before:place-content-center before:top-0 before:left-0 before:z-30
                        after:w-full after:block after:absolute after:h-full after:bg-white after:rounded-3xl after:place-content-center after:top-0 after:left-0 after:z-10

                        ">
                        <span class="absolute text-mainOrange font-bold z-20">Ajoutez une image !</span>
                </div>

                <input v-model="description" class="w-full h-full min-h-20 flex rounded-3xl" type="text" placeholder="Ajoutez une description !">
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