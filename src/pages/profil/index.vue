<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import ProfileIcon from '@/components/ProfileIcon.vue';
import ButtonAdd from '@/components/ButtonAdd.vue';
import IconPen from '@/components/icons/IconPen.vue';
import Button from '@/components/Button.vue';
import ImgPb from '@/components/ImgPb.vue';
import ProfileSection from '@/components/ProfileSection.vue';

import { pb } from '@/backend';
import type { UsersResponse } from '@/pocketbase-types';
import { ref } from 'vue';

//Varibale pour savoir si on est sur la page des moods ou des memories
import { isActive } from '@/components/HeaderPage.vue';

const profileMode = ref(false);

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

//permet d'acceder a l'onglet de gauche a chaque fois que l'on revient sur la page
if (isActive.value == false) {
    isActive.value = true;
}

// const currentUser = pb.authStore.model;
const currentUser: UsersResponse[] = await pb.collection('users').getFullList({
        filter: `id = '${pb.authStore.model?.id}'`,
        expand: 'friends'
    });
console.log("currentuser", currentUser);

const friendList: UsersResponse = (currentUser[0].expand as any);
console.log(friendList.friends)
</script>

<template>
    <HeaderPage active="Profil" inactive="Éditer" :currentMood="moodList[0].mood"/>
    <section v-if="isActive === true" class="h-screen" v-scroll-lock="true">
        <div class="flex flex-col justify-between gap-6 mx-8">
            <div class="mt-16 flex flex-col items-center">
                <div class="h-44">
                    <ProfileIcon :currentMood="moodList[0].mood"/>
                </div>
                <div class="*:text-center">
                    <p class="text-2xl font-regular"> {{ currentUser[0].name }}</p>
                    <p class="text-grayDark tracking-wider">{{ currentUser[0].username }}</p>
                </div>
            </div>

            <div class="text-grayDark min-h-20 italic w-full">
                <p v-if="currentUser[0].bio">
                    {{ currentUser[0].bio }}
                </p>
                <p v-else class="text-center">
                    Cet utilisateur n'a pas de description
                </p>
            </div>
            <div class="flex flex-col gap-2">
                <h4 class="text-2xl">Amis</h4>
                <div class="flex">
                    <div
                    @click="profileMode = true"
                    v-for="oneFriend  in friendList.friends"
                        :key="oneFriend.id"
                        v-bind="oneFriend">
                        <!-- liste contacts -->
                        <ImgPb :record="oneFriend" :filename="oneFriend.avatar" class="h-12 w-12 object-cover rounded-full" alt="photo de profil" />
                    </div>
                    <ButtonAdd/>
                </div>
            </div>
        </div>
        <div v-if="profileMode === true" class="bg-red-400 h-screen w-full absolute top-0">

        </div>
    </section>
    <section v-if="isActive === false" v-scroll-lock="true">
        <div class="flex flex-col justify-between mx-6 h-screen pb-36">
            <div class="flex flex-col gap-6">
                <div class="mt-16 flex flex-col items-center">
                    <div class="h-44 grid">
                        <div class="absolute flex justify-center items-center justify-self-end
                                bg-white rounded-full w-12 aspect-square">
                            <IconPen class="fill-mainOrange w-8 aspect-square" />
                        </div>
                        <ProfileIcon :currentMood="''"/>
                    </div>
                    <div class="flex gap-2">
                        <p class="text-2xl font-regular text-center">Name</p>
                        <IconPen class="fill-grayDark w-4 aspect-square"/>
                    </div>
                </div>
                <p class="text-grayDark bg-white rounded-lg px-4 py-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div class="my-2">
                <Button text="Sauvegarder" variant="default" />
                <Button text="Annuler" variant="transparent" />
            </div>
        </div>
    </section>
</template>