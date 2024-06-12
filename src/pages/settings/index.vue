<script setup lang="ts">
import SettingsCard from '@/components/SettingsCard.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconInfo from '@/components/icons/IconInfo.vue';
import SettingsLegalCard from '@/components/SettingsLegalCard.vue';
import HeaderPage from '@/components/HeaderPage.vue';

import { isActive } from '@/components/HeaderPage.vue'
import { pb } from '@/backend';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

const confirmCard = ref(null);

// Ferme les settings si on clique en dehors
onClickOutside(confirmCard, () => {
    doLogoutConfirm.value = false;
    doDeleteConfirm.value = false;
});

const route = useRouter();

// Fonction pour se déconnecter
const doLogout = () => {
    pb.authStore.clear();
    route.push('/connexion');
}

// Fonction pour supprimer le compte
const doDeletAcount = () => {
    pb.collection('users').delete(pb.authStore.model?.id);
    pb.authStore.clear();
    route.push('/connexion');
}

// Gère les confirmations
const doLogoutConfirm = ref(false);
const doDeleteConfirm = ref(false);

const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

//Permet d'acceder a l'onglet de gauche a chaque fois que l'on revient sur la page
if (isActive.value == false) {
    isActive.value = true;
}
</script>

<script lang=ts>
//On exporte la variable sectionOpen pour l'utiliser dans le composant parent
export const sectionOpen = ref(0)

</script>

<template>
    <HeaderPage active="Compte" inactive="Légal" :currentMood="moodList[0].mood"/>
    <section v-if="isActive === true" class="bg-mainBlue h-screen" v-scroll-lock="true">
        <div class="flex flex-col gap-2 text-white items-start pt-6 *:w-full ">
            <div class="flex justify-between items-center w-full border-b-2 border-mainOrange py-2 px-10">
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
                <div class="flex flex-col items-center w-full">
                    <SettingsCard ref="confirmCard" title="Se déconnecter" @click="doLogoutConfirm= true, doDeleteConfirm = false" class="self-start"/>
                    <div v-if="doLogoutConfirm" class="flex flex-col gap-4 justify-center items-center absolute bg-neutral-100 p-4 rounded-2xl text-black top-1/2">
                        <p class="font-sniglet text-xl text-center text-grayDark">Voulez-vous vraiment vous déconnecter ?</p>
                        <span class="flex justify-between w-full px-8">
                            <p class="text-3xl text-mainGreen p-2 rounded-xl text-center font-Hegante cursor-pointer" @click="doLogout">oui</p>
                            <p class="text-3xl text-mainRed p-2 rounded-xl text-center font-Hegante cursor-pointer" @click="doLogoutConfirm = false">non</p>
                        </span>
                    </div>
                </div>
                <div class="flex flex-col items-center w-full">
                    <SettingsCard ref="confirmCard" title="Désactiver le compte" @click="doDeleteConfirm = true, doLogoutConfirm= false" class="self-start"/>
                    <div v-if="doDeleteConfirm" class="flex flex-col gap-4 justify-center items-center absolute bg-neutral-100 p-4 rounded-2xl text-black w-[90%] top-1/2">
                        <p class="font-sniglet text-xl text-center text-grayDark">Voulez-vous vraiment vous désactiver votre compte ?</p>
                        <p class="font-sniglet text-xl text-center text-grayDark">(Cette action est irréversible)</p>
                        <span class="flex gap-6">
                            <p class="text-3xl text-mainGreen p-2 rounded-xl text-center font-Hegante cursor-pointer" @click="doDeletAcount">oui</p>
                            <p class="text-3xl text-mainRed p-2 rounded-xl text-center font-Hegante cursor-pointer" @click="doDeleteConfirm = false">non</p>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section
    v-if="isActive === false" class="bg-mainBlue flex h-screen flex-col pt-2" 
                            v-scroll-lock="!sectionOpen">
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 1 ? 0:1"
        title="Mentions légales"
        text="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="1"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 2 ? 0:2"
        title="Politique de confidentialité"
        text="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="2"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 3 ? 0:3"
        title="Conditions générales de vente"
        text="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="3"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 4 ? 0:4"
        title="Conditions générales d’utilisation"
        text="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        :number="4"/>
    </section>
</template>