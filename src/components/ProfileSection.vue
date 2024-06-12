<script setup lang="ts">
import type UsersResponse from '@/pocketbase-types';

const props = defineProps<UsersResponse>();

</script>

<template>

    <h1>{{ name }}</h1>
</template>