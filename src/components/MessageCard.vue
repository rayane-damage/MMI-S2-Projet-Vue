<script setup lang="ts">
import ImgPb from './ImgPb.vue';

import type { MessagesResponse, UsersResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';


const props = defineProps<MessagesResponse>();
const userName = ref() as Ref<string>;
const imgUrl = ref() as Ref<string>;

console.log('props', props.from);
// const userByMessage = ref() as Ref<UsersResponse[]>;
onMounted (async () => {
    userByMessage.value = await pb.collection('users').getOne(String(props.from));
    console.log('userByMessage', userByMessage.value);
    if (userByMessage.value.id === pb.authStore.model?.id) {
        userName.value = "Vous"
    } else {
        userName.value = userByMessage.value.name;
        UserName.value = userByMessage.value.name;
    }
    // imgUrl.value = userByMessage.value.avatar;
    // console.log("img", imgUrl.value)

});

console.log('userByMessage2', userByMessage.value);
</script>

<script lang="ts">
export const UserName = ref() as Ref<string>;
export const userByMessage = ref() as Ref<UsersResponse[]>;
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