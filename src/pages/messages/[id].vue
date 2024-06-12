<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import type { UsersResponse } from '@/pocketbase-types'
import { ref } from 'vue'
import { pb } from '@/backend';


const props = defineProps<UsersResponse>();

const route = useRoute('/messages/[id]');

</script>


<template>
    <div class="w-full flex flex-col items-center" v-scroll-lock="false">
        <h1>Ajouter cet ami</h1>
        {{ props.name }}
    </div>
</template>