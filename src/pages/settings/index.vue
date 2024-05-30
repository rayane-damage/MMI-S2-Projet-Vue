<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import { isActive } from '@/components/HeaderPage.vue'
import Button from '@/components/Button.vue';
import { pb } from '@/backend';
import { useRouter } from 'vue-router';
import SettingsCard from '@/components/SettingsCard.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconInfo from '@/components/icons/IconInfo.vue';

const route = useRouter();

const doLogout = () => {
    pb.authStore.clear();
    route.push('/connexion');
}

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

//permet d'acceder a l'onglet de gauche a chaque fois que l'on revient sur la page
if (isActive.value == false) {
    isActive.value = true;
}
</script>

<template>
    <HeaderPage active="Compte" inactive="Legal" :currentMood="moodList[0].mood"/>
    <section v-if="isActive === true" class="bg-mainBlue h-screen" v-scroll-lock="true">
        <div class="flex flex-col gap-2 text-white items-start pt-6 *:w-full ">
            <div class="flex justify-between items-center w-full border-b-2 border-orange-400 py-2 px-10">
                <h4>Informations du compte</h4>
                <IconInfo class="h-4"/>
            </div>
            <div class="*:px-10 flex flex-col gap-2 items-start">
                <SettingsCard title="Changer de mot de passe"/>
                <SettingsCard title="Notifications"/>
            </div>
        </div>
        <div class="flex flex-col gap-2 text-white items-start *:w-full pt-6">
            <div class="flex justify-between items-center w-full border-b-2 border-orange-400 py-2 px-10">
                <h4>Déconnection</h4>
                <IconLogout class="h-4"/>
            </div>
            <div class="*:px-10 flex flex-col gap-2 items-start">
                <SettingsCard title="Changer de mot de passe"/>
                <SettingsCard title="Notifications"/>
            </div>
        </div>
    </section>
    <section  v-if="isActive === false" class="bg-mainBlue h-screen" v-scroll-lock="true">

    </section>
</template>