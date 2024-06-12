<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import { useRouter } from 'vue-router'
import type { UsersResponse } from '@/pocketbase-types'
import { ref } from 'vue'
import { pb } from '@/backend';

import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';

const route = useRoute('/messages/[id]');
const router = useRouter();

const user = await pb.collection('users').getOne(route.params.id);


// Permet de recuperer tous les amis de l'utilisateur puis de les mettre dans un tableau
let currentUser: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id = '${pb.authStore.model?.id}'`,
    expand: 'friends'
});
const currentUserFriendsList = (currentUser[0].expand as any);
let currentUserFriendsListIds: string[] = []
if (currentUserFriendsList === undefined) {
    console.log("currentUserFriendsList is undefined")
} else {
    currentUserFriendsListIds = currentUserFriendsList.friends.map((user: any) => user.id);
}
const currentUserFriendsListIdsBis: string[] = currentUserFriendsListIds.map((user: any) => user.id);

// Permet de recuperer tous les amis de l'utilisateur cliqué puis de les mettre dans un tableau
let secondUser: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id = '${route.params.id}'`,
    expand: 'friends'
});

let secondUserFriendsList = (secondUser[0].expand as any);
let secondUserFriendsListBis: string[] = []
if (secondUserFriendsList === undefined) {
    console.log("secondUserFriendsList is undefined")
} else {
   secondUserFriendsListBis = secondUserFriendsList.friends
}
const secondUserFriendsListIds: string[] = secondUserFriendsListBis.map((user: any) => user.id);

console.log("currentUserFriendsList", currentUserFriendsList);
console.log("secondUserFriendsList", secondUserFriendsList);
console.log("currentUserFriendsListIds", currentUserFriendsListIds);
console.log("secondUserFriendsListIds", secondUserFriendsListIds);


const doAddFriend = async () => {
    // Ajout de l'utilisateur cliqué dans la liste d'amis de l'utilisateur connecté
    currentUserFriendsListIds.push(route.params.id);
    const dataCurrentUser = {
        'friends': currentUserFriendsListIds
    }
    console.log("dataCurrentUser", dataCurrentUser)
    pb.collection('users').update(pb.authStore.model?.id, dataCurrentUser);

    // Ajout de l'utilisateur connecté dans la liste d'amis de l'utilisateur cliqué
    secondUserFriendsListIds.push(pb.authStore.model?.id);
    const dataSecondUser = {
        'friends': secondUserFriendsListIds
    }
    console.log("dataSecondUser", dataSecondUser)
    console.log("route.params.id", route.params.id)
    pb.collection('users').update(route.params.id, dataSecondUser);
    console.log("doAddFriend - Status = Successful")

    // Retour à la page précédente
    router.back()
}
</script>


<template>
    <div class="w-full flex flex-col items-center" v-scroll-lock="false">
        <IconArrowLeft @click="router.back()" class="cursor-pointer stroke-black self-start m-6"/>
        <h1 @click="doAddFriend" class="font-bold text-xl p-4 bg-red-200 absolute top-1/3">Ajouter cet ami : {{ user.name }}</h1>
    </div>
</template>