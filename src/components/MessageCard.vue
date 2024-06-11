<script setup lang="ts">
import ImgPb from './ImgPb.vue';

import type { MessagesResponse, UsersResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { ref, onMounted, watch, inject } from 'vue';
import type { Ref } from 'vue';

const msgMode = inject('msgMode') as Ref<boolean>;
const props = defineProps<MessagesResponse>();
const userName = ref() as Ref<string>;

console.log('props', props.to);
// const userByMessage = ref() as Ref<UsersResponse[]>;
onMounted (async () => {
    userByMessage.value = await pb.collection('users').getOne(String(props.from));
    console.log('userByMessage', userByMessage.value);
    if (userByMessage.value.id === pb.authStore.model?.id) {
        userName.value = "Vous"
        const getUser = await pb.collection('users').getOne(String(props.to));
        UserName.value = getUser.name
        UserAvatar.value = getUser.avatar
        UserId.value = getUser[0]
    } else {
        const getUser = await pb.collection('users').getOne(String(props.from));
        userName.value = getUser.name
        UserName.value = getUser.name
        UserAvatar.value = getUser.avatar
        UserId.value = getUser[0]

    }
    // imgUrl.value = userByMessage.value.avatar;

});

watch(msgMode, (newVal, oldVal) => {
    if (newVal !== oldVal) {
        console.log('CARD-----------------WATCH--------------------')
    }
})
</script>

<script lang="ts">
export const UserName = ref() as Ref<string>;
export const UserAvatar = ref() as Ref<string>;
export const userByMessage = ref() as Ref<UsersResponse[]>;
export const UserId = ref() as Ref<UsersResponse>;
</script>


<template>
    <div
    class="w-3/4 flex items-center mx-1"
    :class="[props.from == pb.authStore.model?.id ? 'self-end' : '']"
    >
        <div
        :class="[props.from == pb.authStore.model?.id ? '' : 'order-2']"
        class="w-full">
            <p
            class="font-bold w-full"
            :class="[props.from == pb.authStore.model?.id ? 'text-end' : '']"
            >{{ userName }}
            </p>

            <div
            :class="[props.from == pb.authStore.model?.id ? 'bg-blue-400' : 'bg-blue-200']"
            class="px-6 py-2 rounded-full ">
            <p> {{ props.message }}</p>
            </div>
        </div>
        <!-- <ImgPb :record="userByMessage" :filename="imgUrl" alt="Photo de profil" class="w-10 h-10"/> -->

    </div>
</template>