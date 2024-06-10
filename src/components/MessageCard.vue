<script setup lang="ts">
import type { MessagesResponse } from '@/pocketbase-types';
import { pb } from '@/backend';

const props = defineProps<MessagesResponse>();

</script>

<template>
    <div
    :class="[props.from == pb.authStore.model?.id ? 'bg-blue-400 self-end' : 'bg-blue-200']"
    class="px-6 py-2 rounded-full w-3/4">
        <p> {{ message }}</p>
    </div>
</template>