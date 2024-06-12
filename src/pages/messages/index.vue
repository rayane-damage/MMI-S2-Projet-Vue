<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import MessageInput from '@/components/MessageInput.vue';
import DiscussionProfileCard from '@/components/DiscussionProfileCard.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';

import { UserId } from '@/components/MessageCard.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { ref, provide, onMounted, watch } from 'vue';
import type { Ref } from 'vue';

// Liste des moods par utilisateur
const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

//Permet de gerer le header
if (isActive.value == false) {
    isActive.value = true;
}

//Permet de recuperer tous les amis de l'utilisateur puis de les mettre dans un tableau
const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id = '${pb.authStore.model?.id}'`,
    expand: 'friends'
});

const currentUserFriends = ref()
currentUserFriends.value = currentUser[0].friends

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

// On exporte ces deux variables pour les utiliser dans les composants enfants
const msgMode = ref()
const userFrom = ref('')
provide('userFrom', userFrom);
provide('msgMode', msgMode);

// Permet de recuperer tous les messages de l'utilisateur en fonction de l'utilisateur avec qui il discute
const allMessagesByUsers = ref() as Ref<any[]>;
const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
    filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
    expand : 'from && to',
});
allMessagesByUsers.value = allMessages;


provide('allMessagesByUsers', allMessagesByUsers);

// Permet de recuperer les messages en temps reel
let unsuscribe: () => void;

onMounted( async () =>{
    msgMode.value = false;
    pb.collection('messages').subscribe('*', async ({action, record }) => {
        if (action === 'create') {
            allMessagesByUsers.value = await pb.collection('messages').getFullList({
                filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
                expand : 'from && to',
            });
        }
        if (action === 'delete') {
            allMessagesByUsers.value = allMessagesByUsers.value.filter((message) => message.id !== record.id);
        }
    });
});

// onDestroy(() => {
//     unsuscribe?.();
// });


// ----------------------------------------- Amis -----------------------------------------
//Fonction pas encore implementée
const addfriendMode = ref(false)
const doAddFriend = async () => {
    return true
}

console.log("INDEX, userid", UserId.value)
</script>


<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood" />
    <section v-if="isActive === true" :class="msgMode ? '' : 'pt-4'">
        <div v-if="msgMode === false" class="flex flex-col gap-4 mx-6">
            <DiscussionProfileCard v-for="friend in allFriends" :key="friend.id" v-bind="friend" />
        </div>
        <div v-if="msgMode === true" class="flex flex-col gap-2" >
            <div>
                <h1  class="fixed z-20 w-full bg-mainBlue p-4 flex gap-4 items-center">
                    <IconArrowLeft class="w-8 h-8" @click="msgMode = false"/>
                    <!-- <div class="flex gap-2">
                         <ImgPb :record="UserId" :filename="UserAvatar" alt="Photo de profil" class="w-10 h-10 object-cover rounded-full"/>
                        <span>
                            <p class="text-white">
                                {{ UserName }}
                            </p>

                        </span>
                    </div> -->
                </h1>
            </div>
            <div class="w-full flex flex-col gap-2 mb-10 mt-16">
                <MessageCard v-for="message in allMessagesByUsers" :key="message.id" v-bind="message" />
            </div>
        <MessageInput class="fixed bottom-[50px]"/>
        </div>
    </section>

    <section v-if="isActive === false" class="pt-4">
        <div v-if="!addfriendMode" class="divide-y divide-grayDark mx-6">
            <div v-for="friend in allFriends" :key="friend.id" >
                <RouterLink :to="{
                                name: '/profil/[id]',
                                params: {
                                id: friend.id
                                }
                            }">
                    <ProfileCard v-bind="friend"/>
                </RouterLink>
            </div>
        </div>

        <ButtonAdd @click="addfriendMode = true, doAddFriend"/>

        <div v-if="addfriendMode">
            <p class="p-4 bg-red-200" @click="addfriendMode = false">Annuler</p>
            <h1>Ajouter un ami</h1>
        </div>
    </section>
</template>