<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import type { UsersResponse } from '@/pocketbase-types'
import { ref } from 'vue'
import { pb } from '@/backend';

import MemoriesCard from '@/components/MemoriesCard.vue';
import ProfileSection from '@/components/ProfileSection.vue';

const friend = ref<UsersResponse | null >(null);

const route = useRoute('/profil/[id]');
// fiend.value = await pb.collection('Oeuvres').getOne(route.params.id);


const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
    filter: `id = '${route.params.id}'`,
    expand: 'friends'
});
console.log("ID currentuser", currentUser);

console.log('id :', route.params.id)

const lastMemories = await pb.collection('memories').getList(1, 10, {
    filter: `user = '${route.params.id}' && status = 'public'`,
    expand: 'user',
    sort: '-created'
});
console.log("lastMemories",currentUser[0].id, lastMemories);
</script>


<template>
    <div class="w-full flex flex-col items-center" v-scroll-lock="false">
        <ProfileSection v-bind="currentUser[0]"/>
        <h1 class="font-bold text-xl">Ses dernieres memories</h1>
        <RouterLink to="/">
            <MemoriesCard v-for="oneMemorie in lastMemories.items" :key="oneMemorie.id" v-bind="oneMemorie"/>
        </RouterLink>
        <h1 v-if="!(lastMemories.items.length > 0)" class="italic">Cet utilisateur n'a pas de memories</h1>
    </div>
</template>