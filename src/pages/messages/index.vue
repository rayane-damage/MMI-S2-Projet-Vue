<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import MessageCard from '@/components/MessageCard.vue';
import MessageInput from '@/components/MessageInput.vue';
import DiscussionProfileCard from '@/components/DiscussionProfileCard.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';

import { UserName, UserId, UserAvatar } from '@/components/MessageCard.vue';

import { pb } from '@/backend';
import { isActive } from '@/components/HeaderPage.vue'
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { ref, provide, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import ImgPb from '@/components/ImgPb.vue';

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

if (isActive.value == false) {
    isActive.value = true;
}


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


const msgMode = ref()
const userFrom = ref('')
provide('userFrom', userFrom);
provide('msgMode', msgMode);



const allMessagesByUsers = ref() as Ref<any[]>;
const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
    filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
    expand : 'from && to',
});
allMessagesByUsers.value = allMessages;


provide('allMessagesByUsers', allMessagesByUsers);

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
const addfriendMode = ref(false)
const doAddFriend = async () => {
    return true
}
// console.log("INDEX, useravatar", UserAvatarIndex.value)

// watch(msgMode, (newVal, oldVal) => {
//     if (newVal !== oldVal) {
//         console.log('-----------------WATCH--------------------')
//         console.log(UserAvatar.value)
//         UserAvatar.value = UserAvatar.value
//         console.log(UserAvatar.value)
//     }
// })

console.log("INDEX, userid", UserId.value)
</script>


<template>
    <HeaderPage active="Discussions" inactive="Amis" :currentMood="moodList[0].mood" />
    <section v-if="isActive === true" class="pt-4">
        <div v-if="msgMode === false" class="flex flex-col gap-4">
            <DiscussionProfileCard v-for="friend in allFriends" :key="friend.id" v-bind="friend" />
        </div>
        <div v-if="msgMode === true" class="flex flex-col gap-2" >
            <div>
                <h1  class="fixed z-20 w-full bg-mainBlue p-4 flex gap-4 items-center">
                    <IconArrowLeft class="w-8 h-8" @click="msgMode = false"/>
                    <div class="flex gap-2">
                        <!-- <span class="h-10 w-10 bg-mainOrange rounded-full">{{ UserAvatar }}</span> -->
                         <ImgPb :record="UserId" :filename="UserAvatar" alt="Photo de profil" class="w-10 h-10 object-cover rounded-full"/>
                        <span>
                            <p class="text-white">
                                {{ UserName }}
                            </p>
                            <p class="text-mainOrange text-xs">
                                <!-- {{ userToUsername }} -->
                            </p>
                        </span>
                    </div>
                </h1>
            </div>
            <div class="w-full flex flex-col gap-1 mb-8 mt-20">
                <MessageCard v-for="message in allMessagesByUsers" :key="message.id" v-bind="message" />
            </div>
        <MessageInput class="fixed bottom-[50px]"/>
        </div>
    </section>

    <section v-if="isActive === false" class="pt-4">
        <div v-if="!addfriendMode">
            <ProfileCard
            v-for="friend in allFriends" :key="friend.id" v-bind="friend"
            />
        </div>

        <ButtonAdd @click="addfriendMode = true, doAddFriend"/>

        <div v-if="addfriendMode">
            <p class="p-4 bg-red-200" @click="addfriendMode = false">Annuler</p>
            <h1>Ajouter un ami</h1>
        </div>
    </section>
</template>