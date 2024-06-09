<script setup lang="ts">
import type { MessagesResponse } from '@/pocketbase-types';

const props = defineProps<MessagesResponse>();

</script>

<template>
    <div>
        <h1> {{ message }}</h1>
    </div>
</template>