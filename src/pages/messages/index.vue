<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import MessageInput from '@/components/MessageInput.vue';
import DiscussionProfileCard from '@/components/DiscussionProfileCard.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { ref, provide, onMounted } from 'vue';
import type { Ref } from 'vue';

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

if (isActive.value == false) {
    isActive.value = true;
}

// const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
//     filter: `id = '${pb.authStore.model?.id}'`,
// });
// console.log("currentUser")
// console.log(currentUser)
// console.log(currentUser[0])
console.log("user=", pb.authStore.model)
console.log(pb.authStore.model?.friends)

// const userFriends: UsersResponse[] = await pb.collection('users').getFullList({
//     // filter: `friends = '${pb.authStore.model?.friends}'`,
//     expand : 'friends'
// });
const userFriends: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id != '${pb.authStore.model?.id}'`,
    expand : 'friends'
});

const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id = '${pb.authStore.model?.id}'`,
    expand: 'friends'
});

console.log("currentUser", currentUser)

const currentUserFriends = ref()
currentUserFriends.value = currentUser[0].friends

console.log("currentUserFriends", currentUserFriends.value[0])

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

console.log("allFriends", allFriends)

const msgMode = ref(false)
const userFrom = ref('')
provide('userFrom', userFrom);
provide('msgMode', msgMode);

// const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
//     filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
//     expand : 'from && to',
// });

const allMessagesByUsers = ref() as Ref<any[]>;
const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
    filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
    expand : 'from && to',
});
allMessagesByUsers.value = allMessages;
// console.log("allMessagesByUsers", allMessagesByUsers)


provide('allMessagesByUsers', allMessagesByUsers);

let unsuscribe: () => void;

onMounted( async () =>{
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
const addfriendMode = ref(false)
const doAddFriend = async () => {
    return true
}

</script>


<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood" />
    <!-- :class="[msgMode ? 'overflow-hidden absolute top-0 w-full' : '']"  -->
    <section v-if="isActive === true" >
        <div v-if="msgMode === false" class="flex flex-col gap-4">
            <DiscussionProfileCard v-for="friend in allFriends" :key="friend.id" v-bind="friend" />
        </div>
        <div v-if="msgMode === true" class="flex flex-col gap-2" >
            <h1 @click="msgMode = false" class="p-4 fixed z-20 bg-red-200">retour</h1>
            <div class="w-full flex flex-col gap-1 mb-8">
                <MessageCard v-for="message in allMessagesByUsers" :key="message.id" v-bind="message" />
            </div>
        <MessageInput class="fixed bottom-[50px]"/>
        </div>
    </section>

    <section v-if="isActive === false">
        <ProfileCard
        v-if="!addfriendMode"
        v-for="friend in allFriends" :key="friend.id" v-bind="friend"
        />

        <ButtonAdd @click="addfriendMode = true, doAddFriend"/>

        <div v-if="addfriendMode">
            <p class="p-4 bg-red-200" @click="addfriendMode = false">Annuler</p>
            <h1>Ajouter un ami</h1>
        </div>
    </section>
</template>