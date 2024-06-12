<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import type { UsersResponse } from '@/pocketbase-types'
import { ref } from 'vue'
import { pb } from '@/backend';

const route = useRoute('/messages/[id]');

const user = await pb.collection('users').getOne(route.params.id);

</script>


<template>
    <div class="w-full flex flex-col items-center" v-scroll-lock="false">
        <h1 class="font-bold text-xl p-4 bg-red-200">Ajouter cet ami : {{ user.name }}</h1>
    </div>
</template>