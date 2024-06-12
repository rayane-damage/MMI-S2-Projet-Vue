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
import { onMounted, onUnmounted, provide, ref, watch } from 'vue';
import { pb } from '@/backend';
import IconImg from '@/components/icons/IconImg.vue'
import Button from '@/components/Button.vue'


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

// Permet d'utiliser la variable moodList dans les composants enfants
provide('moodList', moodList);

let currentMood = ref();

//Mood par défaut si il n'y a pas de mood (arrive quand on supprime le dernier mood)
if (moodList.value.length > 0) {

    currentMood.value = moodList.value[0].mood;
    } else {
        currentMood.value = 'Bien';
    }
provide ('currentMood', currentMood);

//Permet d'ajouter un mood dans la base de donnée
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

const memoriesList = ref<any[]>([]);
const memoriesListBis = ref<any[]>([]);
const memoriesListByUserAndFriends = ref(<any>[]);
// async function createMemoriesList() {

const currentUserFriends = ref();
if (currentUser[0]) {
    currentUserFriends.value = currentUser[0].friends
} else {
    currentUserFriends.value = []
}
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



    //Recupere les memories de l'utilisateur et de ses amis
    console.log("allfriends",allFriends.value)
    if (allFriends.value !== undefined) {


    for (let i = 0; i < allFriends.value.length; i++) {
        memoriesListBis.value = await pb.collection('memories').getFullList({
            filter : `user = '${allFriends.value[i].id}' || user = '${pb.authStore.model?.id}'`,
            expand : 'user',
            sort: '-created'
        });
        memoriesList.value.push(memoriesListBis.value);
    }

    //Stocke les memories de l'utilisateur et de ses amis dans une constante pour l'afficher grace a un v-for
    memoriesListByUserAndFriends.value = memoriesList.value[0]
    console.log("memoriesListByUserAndFriends",memoriesListByUserAndFriends)
    } else {
        memoriesList.value = await pb.collection('memories').getFullList({
            filter : `user = '${pb.authStore.model?.id}'`,
            expand: 'user',
            sort: '-created'
        });
        console.log("memoriesList",memoriesList.value)
        memoriesListByUserAndFriends.value = memoriesList.value
    }
// }

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
            // memoriesList.value = await pb.collection('memories').getFullList({
            //     filter : `user = '${pb.authStore.model?.id}'`,
            //     expand : 'user',
            //     sort: '-created'
            // });
            memoriesList.value = []
            const currentUser2: UsersResponse[] = await pb.collection('users').getFullList({
                filter: `id = '${pb.authStore.model?.id}'`,
                expand: 'friends'
            });
            currentUserFriends.value = currentUser2[0].friends
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


    console.log("before", memoriesList.value[0])
    //Recupere les memories de l'utilisateur et de ses amis, sensé ne prendre que les memories publics des amis
    for (let i = 0; i < allFriends.value.length; i++) {
        memoriesListBis.value = await pb.collection('memories').getFullList({
            filter : (`user = '${allFriends.value[i].id}' && status = 'public'`) || `user = '${pb.authStore.model?.id}'`,
            expand : 'user',
            sort: '-created'
        });
        console.log("memoriesListBis",memoriesListBis.value)
        memoriesList.value.push(memoriesListBis.value);
    }
    console.log("after", memoriesList.value)

    //Stocke les memories de l'utilisateur et de ses amis dans une constante pour l'afficher grace a un v-for
    memoriesListByUserAndFriends.value = memoriesList.value[2]
        }
        if (action === 'delete') {
            // memoriesList.value = await pb.collection('memories').getFullList({
            //     filter : `user = '${pb.authStore.model?.id}'`,
            //     expand : 'user',
            //     sort: '-created'
            // });
            memoriesList.value = []
            const currentUser3: UsersResponse[] = await pb.collection('users').getFullList({
                filter: `id = '${pb.authStore.model?.id}'`,
                expand: 'friends'
            });
            currentUserFriends.value = currentUser3[0].friends
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



    //Recupere les memories de l'utilisateur et de ses amis
    console.log("before", memoriesList.value[0])
    for (let i = 0; i < allFriends.value.length; i++) {
        memoriesListBis.value = await pb.collection('memories').getFullList({
            filter : `user = '${allFriends.value[i].id}' || user = '${pb.authStore.model?.id}'`,
            expand : 'user',
            sort: '-created'
        });
        console.log("memoriesListBis",memoriesListBis.value)

        memoriesList.value.push(memoriesListBis.value);
    }
    console.log("after", memoriesList.value)

    //Stocke les memories de l'utilisateur et de ses amis dans une constante pour l'afficher grace a un v-for
    memoriesListByUserAndFriends.value = memoriesList.value[2]
        }
    });
});

console.log("memoriesListByUserAndFriends",memoriesListByUserAndFriends)

</script>


<template>
        <HeaderPage active="Memories" inactive="Moods" :currentMood="currentMood"/>
        <section v-if="isActive === false" class="flex flex-col gap-4 pb-4">
            <div class="flex flex-col mx-12 gap-4 mt-6">
                <h3 class="font-Hegante text-2xl text-grayDark text-center">Bonjour, comment allez-vous ?</h3>
                <div class="flex gap-5 w-full justify-center">
                    <IconMoodGood @click="addMood('Bien')"/>
                    <IconMoodMid @click="addMood('Moyen')" />
                    <IconMoodBad @click="addMood('Mal')"/>
                </div>
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
        <div v-if="!memorieMode" class="flex flex-col items-center m-8 gap-8">
                <div class="flex justify-center items-center relative bg-white rounded-3xl w-full aspect-square">
                    <input id="file"
                            type="file"
                            accept=".jpg, .png"
                            @change="changeFileName"
                            class="w-full aspect-square opacity-0 z-30">
                    <div class="absolute flex flex-col gap-4 justify-center items-center w-full">
                        <IconImg class="w-16 fill-mainOrange" />
                        <label for="file" class="text-center text-mainOrange font-bold z-20">Ajoutez une image </label>
                    </div>
                </div>
                <input v-model="description"
                        class="w-full h-full min-h-20 flex rounded-3xl px-4"
                        type="text"
                        placeholder="Ajoutez une description !">
                <p class="absolute text-mainRed -top-10">{{ errorMessage }}</p>
                <div class="flex *:py-2  *:w-40">
                    <button @click="memorieStatus = 'private'"
                            class="border-2 border-mainOrange rounded-l-full"
                            :class="memorieStatus === 'private' ? 'bg-mainOrange' : 'bg-transparent'">
                        Privé
                    </button>
                    <button @click="memorieStatus = 'public'"
                            class="border-2 border-mainOrange  rounded-r-full"
                            :class="memorieStatus === 'public' ? 'bg-mainOrange' : 'bg-transparent'">
                        Public
                    </button>
                </div>
                <div class="flex flex-col w-full">
                    <Button text="Publier" variant="blue" @click="doAddMemorie"/>
                    <Button text="Annuler" variant="transparent" @click="memorieMode = !memorieMode"/>
                </div>
        </div>
        </section>
</template>