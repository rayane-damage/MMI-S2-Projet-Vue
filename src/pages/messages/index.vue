<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import MessageInput from '@/components/MessageInput.vue';
import DiscussionProfileCard from '@/components/DiscussionProfileCard.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconLogout from '@/components/icons/IconLogout.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { ref, provide, onMounted, toRaw } from 'vue';
import type { Ref } from 'vue';
import IconAdd from '@/components/icons/IconAdd.vue';

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

//Tous les utilisateurs sauf celui connecté et ses amis et le template
const allUsersNotFriend = ref([]) as Ref<any[]>;//&& id != '${currentUserFriends.value[0]}'
const allUsers: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id != '${pb.authStore.model?.id}'  && id != 'f2ydhe2w504k5r1'`,
});
console.log("allUsers",allUsers)
console.log("allUsersID",allUsers[0].id)
console.log("currentUserFriends", currentUserFriends.value)

console.log("allfriends -----------------------------",allFriends)

let allFriendsRecord = toRaw(allFriends.value)
console.log("allFriendsRecord",allFriendsRecord)

const currentuserfriendsRaw = toRaw(currentUserFriends.value)
// allUsersNotFriend.value = allUsers.filter(user => !allFriendsRecord.includes(user));
// console.log("allUsers",allUsers.length)
// console.log("allFriendsRecord",allFriendsRecord.length)
const allUsersNotFriendValue = allUsersNotFriend.value;
console.log("allUsersNotFriend",allUsersNotFriend)

if (allFriendsRecord === undefined) {
    allFriendsRecord = toRaw(allUsers)
}
for (let i = 0; i < allFriendsRecord.length; i++) {
    for (let j = 0; j < allUsers.length; j++) {
        console.log("allUsersNotFriend",i, j, allFriendsRecord[i].name, allUsers[j].name, "currentuserfriend", currentuserfriendsRaw)
        if (
            allFriendsRecord[i].name !== (allUsers[j].name)
            && !allUsersNotFriendValue.includes(allUsers[j])
            && !currentuserfriendsRaw.includes(allUsers[j].id)
        ) {
            allUsersNotFriend.value.push(allUsers[j]);
        } else {
            console.log("PAS DE PUSH")
        }
}
}

// console.log("allFriendsrecord",allFriendsRecord)

// console.log("allUsersNotFriend",allUsersNotFriend.value)
//Fonction pas encore implementée
const addfriendMode = ref(false)
const doAddFriend = async () => {
    return true
}

const realAllUsersNotFriend: UsersResponse[] = allUsersNotFriend.value
console.log("allFriendsRecord",allFriendsRecord)
console.log("currentUserFriends",currentUserFriends)
console.log("REALallUsersNotFriend",realAllUsersNotFriend)
// console.log("value",realAllUsersNotFriend[0].name)
</script>


<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood" />
    <section v-if="isActive === true" :class="msgMode ? '' : 'pt-4'">
        <div v-if="msgMode === false" class="flex flex-col gap-4 mx-6">
            <DiscussionProfileCard v-for="friend in allFriends" :key="friend.id" v-bind="friend" />
            <p v-if="allFriends === undefined" class="w-full text-center font-Hegante text-2xl pt-10 text-grayDark">Ajoutez un ami !</p>
        </div>
        <div v-if="msgMode === true" class="flex flex-col gap-2" >
            <div>
                <h1  class="fixed z-20 w-full bg-mainBlue p-4 flex gap-4 items-center">
                    <IconArrowLeft class="w-8 h-8" @click="msgMode = false"/>
                </h1>
            </div>
            <div class="w-full flex flex-col gap-2 mb-10 mt-16">
                <MessageCard v-for="message in allMessagesByUsers" :key="message.id" v-bind="message" />
            </div>
        <MessageInput class="fixed bottom-[50px]"/>
        </div>
    </section>

    <section v-if="isActive === false">
        <div v-if="!addfriendMode" class="divide-y divide-grayDark mx-6 pt-4">
            <p v-if="allFriends === undefined" class="w-full text-center font-Hegante text-2xl pt-10 text-grayDark">Ajoutez un ami !</p>
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

        <ButtonAdd @click="addfriendMode = true" v-if="!addfriendMode"/>

        <!-- ---------------------- AJOUTER DES AMIS ---------------------- -->
        <div v-if="addfriendMode" class=" h-screen bg-mainBlue flex flex-col gap-2">
            <IconArrowLeft @click="addfriendMode = false" class="mx-6"/>
            <div class="flex justify-between items-center w-full border-b border-lightOrange h-10 px-10 text-white">
                    <h4 class="font-sniglet text-base tracking-wide">Ajouter un ami</h4>
                    <IconAdd class="h-4 fill-white"/>
                </div>
            <div v-for="oneUser in realAllUsersNotFriend" :key="oneUser.id" class="text-white px-6">
                <RouterLink :to="{
                                name: '/messages/[id]',
                                params: {
                                id: oneUser.id
                                }
                            }">
                    <ProfileCard v-bind="oneUser" class="*:stroke-mainBlue relative
                                                        before:bg-mainBlue before:h-full before:w-14 before:absolute before:right-0"/>
                </RouterLink>
            </div>
        </div>
    </section>
</template>