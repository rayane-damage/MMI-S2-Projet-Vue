<script setup lang="ts">
import IconProfileSmall from './icons/IconProfileSmall.vue';


import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { inject, ref } from 'vue';
import type { Ref } from 'vue';
import ImgPb from './ImgPb.vue';

const props = defineProps<UsersResponse<any>>();

const msgMode = inject('msgMode') as Ref<boolean>;
const userFrom = inject('userFrom') as Ref<string>;

const allMessagesByUsers = await inject('allMessagesByUsers') as Ref<any[]>;


const lastMessage = ref() as Ref<any>;
// lastMessage.value = allMessagesByUsers.value;

console.log('lastMessage', lastMessage.value)

const doLoadUser = async () => {
    console.log("doLoadUser")
    console.log(userFrom.value)
    userFrom.value = props.id;
    console.log('apresfunc', userFrom.value)
    const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
    filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
    expand : 'from && to',
    });
    allMessagesByUsers.value = allMessages;
}

// UserAvatar.value = props.avatar;

</script>



<template>
    <section class="flex justify-between items-center mx-4 p-4 bg-white rounded-full" @click="msgMode = true, doLoadUser()">
        <div class="flex gap-1">
            <ImgPb :record="props" :filename="props.avatar" class="rounded-full h-14 w-14 object-cover" />
            <span>
                <p class="self-start">{{ name }}</p>
                <p>{{ lastMessage }}</p>
            </span>
        </div>

    </section>
</template>