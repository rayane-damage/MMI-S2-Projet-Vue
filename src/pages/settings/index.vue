<script setup lang="ts">
import { isActive } from '@/components/HeaderPage.vue'
import Button from '@/components/Button.vue';
import { pb } from '@/backend';
import { useRouter } from 'vue-router';

const route = useRouter();

const doLogout = () => {
    pb.authStore.clear();
    route.push('/connexion');
}
// import IconInfo from './icons/IconInfo.vue'
</script>

<template>
    <section class="bg-mainBlue">
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
</template>