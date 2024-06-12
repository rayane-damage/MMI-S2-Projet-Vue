<script setup lang="ts">
import ProfileIcon from '@/components/ProfileIcon.vue';
import IconArrowLeft from './icons/IconArrowLeft.vue';
import MemoriesCard from './MemoriesCard.vue';

import { pb } from '@/backend';
import type { UsersResponse } from '@/pocketbase-types';
import { inject } from 'vue';
import type { Ref } from 'vue';
import { useRouter } from 'vue-router';

const route = useRouter();

const props = defineProps<UsersResponse>();

const moodList = await pb.collection('mood').getFullList({
    filter : `user = '${pb.authStore.model?.id}'`,
    sort: '-created'
});

console.log("profilesection", props);


</script>

<template>
    <div class="w-full flex flex-col items-center justify-center pt-6 gap-6">
        <IconArrowLeft
        @click="route.go(-1)"
        class="self-start ml-4 stroke-grayDark"/>
        <div class="w-min">
            <ProfileIcon :record="props" />
        </div>
        <div class="*:text-center">
            <p class="text-2xl font-regular"> {{ name }}</p>
            <p class="text-grayDark tracking-wider">{{ username }}</p>
        </div>
        <div class="text-grayDark min-h-20 italic w-full">
                <p v-if="bio">
                    {{ bio }}
                </p>
                <p v-else class="text-center">
                    Cet utilisateur n'a pas de description
                </p>
        </div>
    </div>
</template>