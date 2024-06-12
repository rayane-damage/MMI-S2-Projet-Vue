<script setup lang="ts">
import { pb } from '@/backend';
import { ref, inject } from 'vue';
import type { Ref } from 'vue';
import IconSend from '@/components/icons/IconSend.vue';

const text = ref<string>('');
const allMessagesByUsers = inject('allMessagesByUsers') as Ref<any[]>;
const userFrom = inject('userFrom') as Ref<string>;

// Envoie un message
const doSendMessage = async (message:string) => {
    if (message) {
        console.log('Sending message', text);
        await pb.collection('messages').create({
            message: message,
            from: pb.authStore.model?.id,
            to: userFrom.value,
        });
        text.value = '';
        allMessagesByUsers.value = await pb.collection('messages').getFullList({
            filter: `from = '${pb.authStore.model?.id}' && to = '${userFrom.value}' || to = '${pb.authStore.model?.id}' && from = '${userFrom.value}' `,
            expand : 'from && to'
        });

    } else {
        console.log('No message to send');
        alert('No message to send');
    }
}

</script>

<template>
    <section class="w-full flex justify-center items-center p-2 gap-1">
        <div class="w-full h-11">
            <input v-model="text" type="text" class="rounded-full px-2 w-full h-full" placeholder="Message" />
        </div>
        <div class="bg-white h-11 w-11 rounded-full">
            <button @click="doSendMessage(text)">
                <IconSend />
            </button>
        </div>
    </section>
</template>