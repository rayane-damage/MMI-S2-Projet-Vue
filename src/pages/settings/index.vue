<script setup lang="ts">
import { isActive } from '@/components/HeaderPage.vue'
import Button from '@/components/Button.vue';
import { pb } from '@/backend';
import { computed, ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import HeaderPage from '@/components/HeaderPage.vue';

const route = useRouter();

const doLogout = () => {
    pb.authStore.clear();
    route.push('/connexion');
}
// const routebis = useRoute()
// const validRoutes = ['/settings']
// const show = computed(() => validRoutes.some(path => routebis.path.startsWith(path)));
</script>

<template>
    <HeaderPage active="Legal" inactive="Trucs" />
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