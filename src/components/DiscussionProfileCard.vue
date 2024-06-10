<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconProfileSmall from './icons/IconProfileSmall.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

import type { UsersResponse, MoodResponse } from '@/pocketbase-types';
import { pb, allUserMoods } from '@/backend';
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import type { MessagesResponse } from '@/pocketbase-types';

const props = defineProps<UsersResponse<any>>();

const msgMode = inject('msgMode') as Ref<boolean>;
const userFrom = inject('userFrom') as Ref<string>;
const allMessagesByUsers = await inject('allMessagesByUsers') as Ref<any[]>;

const doLoadUser = async () => {
    console.log("doLoadUser")
    console.log(userFrom.value)
    userFrom.value = props.id;
    const allMessages: MessagesResponse[] = await pb.collection('messages').getFullList({
    filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
    expand : 'from && to',
    });
    allMessagesByUsers.value = allMessages;
}


</script>

<template>
    <section class="flex justify-between items-center mx-4 p-4 bg-white rounded-full" @click="msgMode = true, doLoadUser()">
        <div class="flex gap-1">
            <IconProfileSmall/>
            <span>
                <p class="self-start">{{ name }}</p>
                <!-- <p>{{ allMessagesByUsers[0] }}</p> -->
            </span>
        </div>

    </section>
</template>