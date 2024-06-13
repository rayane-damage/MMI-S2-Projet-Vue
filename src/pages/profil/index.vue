<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileIcon from '@/components/ProfileIcon.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import IconPen from '@/components/icons/IconPen.vue';
import Button from '@/components/Button.vue';
import ImgPb from '@/components/ImgPb.vue';

import { pb } from '@/backend';
import type { UsersResponse } from '@/pocketbase-types';
import { provide, ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';

//Varibale pour savoir si on est sur la page des moods ou des memories
import { isActive } from '@/components/HeaderPage.vue';

const profileMode = ref(false);
provide('profileMode', profileMode);

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

//permet d'acceder a l'onglet de gauche a chaque fois que l'on revient sur la page
if (isActive.value == false) {
    isActive.value = true;
}

// const currentUser = pb.authStore.model;
let currentUser: UsersResponse[] = await pb.collection('users').getFullList({
        filter: `id = '${pb.authStore.model?.id}'`,
        expand: 'friends'
    });
console.log("currentuser", currentUser);

const friendList: UsersResponse = (currentUser[0].expand as any);


//------------------------------ Modification du profil ------------------------------
const route = useRouter();

const errorMessage = ref('');
const newName = ref('');
const newNameMode = ref(false);
const newBio = ref('');
const newBioMode = ref(false);

const fileForBackend = ref();
const file = ref<HTMLInputElement | null>(null);
const imageFile = ref<File | null>(null);
const imageUrl = computed(() => imageFile.value ? URL.createObjectURL(imageFile.value) : '');

function changeFileName(e: any) {
    if (e.target) {
        fileForBackend.value = e.target.files[0];
    }
    file.value = e.target as HTMLInputElement;
    if (file.value.files && file.value.files.length > 0) {
        imageFile.value = file.value.files[0];
    }
}

const doUpdateProfile = () => {
    // if () {
    console.log("doupdateprofile")
    console.log("newName", newName.value)
    console.log("newBio", newBio.value)
    let data = {}
    if (newName.value !== '' && newBio.value !== '') {
        data = {
            avatar: file.value,
            name: newName.value,
            bio: newBio.value
        }
        console.log("1")
        pb.collection('users').update(pb.authStore.model?.id, data);
        setTimeout(() => {
            route.go(0);
        }, 1000);
    }
    if (newName.value === '' && newBio.value !== '') {
        data = {
            avatar: file.value,
            bio: newBio.value
        }
        console.log("2")
        pb.collection('users').update(pb.authStore.model?.id, data);
        setTimeout(() => {
            route.go(0);
        }, 1000);
    }
    if (newName.value !== '' && newBio.value === '') {
        data = {
            avatar: file.value,
            name: newName.value
        }
        console.log("3")
        pb.collection('users').update(pb.authStore.model?.id, data);
        setTimeout(() => {
            route.go(0);
        }, 1000);
    }
    if (file.value && newName.value !== '' && newBio.value !== '') {
        data = {
            avatar: file.value,
            name: newName.value,
            bio: newBio.value
        }
        console.log("4")
        pb.collection('users').update(pb.authStore.model?.id, data);
        setTimeout(() => {
            route.go(0);
        }, 1000);
    } else {
        if (file.value && newName.value === '' && newBio.value === '') {
        data = {
            avatar: file.value
        }
        console.log("5")
        pb.collection('users').update(pb.authStore.model?.id, data);
        setTimeout(() => {
            route.go(0);
        }, 1000);
        }
    }
    
    // } else {
    //     errorMessage.value = 'Champs manquants';
    // }
}

//Met a jour en temps reel le profil
onMounted( async () =>{
    pb.collection('users').subscribe('*', async ({action, record }) => {
        if (action === 'update') {
            console.log("update")
            currentUser = await pb.collection('users').getFullList({
                filter: `id = '${pb.authStore.model?.id}'`,
                expand: 'friends'
            });
        }
    })
});

const currentUserBio = ref('');

if (currentUser[0].bio) {
    currentUserBio.value = currentUser[0].bio;
    console.log("currentUserBio", currentUserBio)
} else {
    currentUserBio.value = "Ajoutez une description";
}
</script>

<template>
    <HeaderPage active="Profil" inactive="Éditer" :currentMood="moodList[0].mood"/>
    <section v-if="isActive === true" class="h-screen" v-scroll-lock="false">
        <div
        v-if="profileMode === false"
        class="flex flex-col justify-between gap-6 mx-8">
            <div class="mt-16 flex flex-col items-center gap-2">
                <div class="h-44">
                    <ProfileIcon :record="currentUser[0]"/>
                </div>
                <div class="*:text-center">
                    <p class="text-2xl font-regular"> {{ currentUser[0].name }}</p>
                    <p class="text-grayDark tracking-wider">{{ currentUser[0].username }}</p>
                </div>
            </div>

            <div class="text-grayDark min-h-20 w-full">
                <p v-if="currentUser[0].bio">
                    {{ currentUser[0].bio }}
                </p>
                <p v-else class="text-center italic">
                    Vous n'avez pas de description
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <h4 class="text-2xl">Amis</h4>
                <div class="flex gap-2 overflow-x-auto" v-if="friendList" >
                    <div v-for="oneFriend  in friendList.friends"
                        @click="profileMode = true"
                        :key="oneFriend.id"
                        v-bind="oneFriend">
                         <RouterLink :to="{
                                        name: '/profil/[id]',
                                        params: {
                                        id: oneFriend.id
                                        }
                                    }">
                            <ImgPb :record="oneFriend" 
                                    :filename="oneFriend.avatar" 
                                    class="h-16 w-16 object-cover rounded-full border-white border-4" 
                                    alt="photo de profil" />
                         </RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <section v-if="isActive === false" v-scroll-lock="false">
        <div class="flex flex-col justify-between mx-6 h-screen pb-36">
            <div class="flex flex-col gap-6">
                <div class="mt-16 flex flex-col gap-2 items-center">
                    <div class="h-44 grid">
                        <div class="z-20 absolute justify-self-end grid grid-cols-1 grid-rows-1 *:col-span-1 *:row-span-1 items-center justify-center
                                bg-white rounded-full w-12 aspect-square">
                                    <input type="file" @change="changeFileName" class="z-20 opacity-0">
                                    <IconPen class="fill-mainOrange w-8 aspect-square absolute justify-self-center" />
                        </div>
                    <ProfileIcon :record="currentUser[0]"/>
                    </div>
                    <div class="flex relative gap-2 w-full justify-center">
                        <p v-if="!newNameMode" class="text-2xl font-regular text-center">{{ currentUser[0].name  }}</p>
                        <input v-if="newNameMode"
                                v-model="newName"
                                type="text"
                                placeholder="Nouveau nom"
                                class="text-grayDark px-4 py-2 rounded-xl outline-none"/>
                        <IconPen @click="newNameMode = !newNameMode" class="fill-grayDark w-4 aspect-square z-50"/>
                    </div>
                </div>
                <!-- <p class="text-grayDark bg-white rounded-lg px-4 py-2 min-h-20">{{ currentUser[0].bio }}</p> -->
                 <div class="w-full">
                    <p v-if="!newBioMode">Votre description</p>
                    <p v-if="newBioMode">Nouvelle description</p>
                <input v-model="newBio"
                        @change="newBioMode = true"
                        type="text"
                        class="text-grayDark bg-white rounded-lg px-4 py-2 min-h-20 w-full outline-none"
                        :placeholder="currentUserBio">
                 </div>
            </div>
            <div class="my-2">
                <Button @click="doUpdateProfile" text="Sauvegarder" variant="default" />
                <Button text="Annuler" variant="transparent" />
            </div>
        </div>
    </section>
</template>