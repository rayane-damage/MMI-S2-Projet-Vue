<script setup lang="ts">
import HeaderPage from '@/components/HeaderPage.vue';
import { isActive } from '@/components/HeaderPage.vue'
import Button from '@/components/Button.vue';
import { pb } from '@/backend';
import { useRouter } from 'vue-router';

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
    <HeaderPage active="Legal" inactive="seetings2" :currentMood="moodList[0].mood"/>
    <section class="bg-mainBlue" v-if="isActive === false">
        <div>
            <Button text="Se déconnecter" @click="doLogout"/>
            <div>
                <p>Informations du compte</p>
                <IconInfo />
            </div>
            <RouterLink to="/Settings/ChangePassword">
                <p>Changer le mot de passe</p>
            </RouterLink>
            <RouterLink to="/Settings/Notifications">
                <p>Notifications</p>
            </RouterLink>
        </div>
        <div>
            <div>
                <p>Déconnection</p>
                <IconInfo />
            </div>
        </div>
    </section>
    <section v-if="isActive === true">
        ALED
    </section>
</template>