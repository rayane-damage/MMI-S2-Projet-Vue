<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import { isActive } from '@/components/HeaderPage.vue'
import { pb } from '@/backend';
import { useRouter } from 'vue-router';
import SettingsCard from '@/components/SettingsCard.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconInfo from '@/components/icons/IconInfo.vue';
import SettingsLegalCard from '@/components/SettingsLegalCard.vue';
import { ref } from 'vue';


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

<script lang=ts>
export const sectionOpen = ref(0)

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
                <SettingsCard title="Se déconnecter" @click="doLogout"/>
                <SettingsCard title="Désactiver le compte"/>
            </div>
        </div>
    </section>
    <section  v-if="isActive === false" class="bg-mainBlue h-screen flex flex-col gap-4 pt-4" v-scroll-lock="sectionOpen">
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 1 ? 0:1"
        title="Mentions légales"
        text="1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="1"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 2 ? 0:2"
        title="Politique de confidentialité"
        text="2lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="2"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 3 ? 0:3"
        title="Conditions générales de vente"
        text="3lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="3"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 4 ? 0:4"
        title="Conditions générales d’utilisation"
        text="4lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="4"/>
    </section>
</template>