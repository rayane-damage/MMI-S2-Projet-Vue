<script setup lang="ts">
import type { UsersResponse, MessagesResponse } from '@/pocketbase-types';
import { pb } from '@/backend';
import { inject, ref } from 'vue';
import type { Ref } from 'vue';
import ImgPb from './ImgPb.vue';

const props = defineProps<UsersResponse<any>>();

const msgMode = inject('msgMode') as Ref<boolean>;
const userFrom = inject('userFrom') as Ref<string>;

const allMessagesByUsers = await inject('allMessagesByUsers') as Ref<any[]>;



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

usernameBis.value = props.name;
</script>

<script lang=ts>
export const usernameBis = ref() as Ref<string>;
</script>

<template>
    <section class="flex justify-between items-center p-2 bg-white rounded-[36px]" @click="msgMode = true, doLoadUser()">
        <div class="flex gap-2">
            <ImgPb :record="props" :filename="props.avatar" class="rounded-full h-16 w-16 object-cover border-4 border-white" />
            <span>
                <p class="self-start font-sniglet tracking-wider text-xl">{{ name }}</p>
                <p>{{ lastMessage }}</p>
            </span>
        </div>

    </section>
</template>