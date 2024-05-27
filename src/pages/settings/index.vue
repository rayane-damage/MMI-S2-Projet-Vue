<script setup lang="ts">
import { isActive } from '@/components/HeaderPage.vue'
// import IconInfo from './icons/IconInfo.vue'
</script>

<template>
    <section class="bg-mainBlue">
        <div>
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