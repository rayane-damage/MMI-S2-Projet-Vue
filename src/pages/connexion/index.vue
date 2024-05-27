<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import Button from '@/components/Button.vue';
import InputConnexion from '@/components/InputConnexion.vue';

import { onMounted, ref } from 'vue'
import { pb } from '@/backend'

const currentUser = ref();
const username = ref('');
const mail = ref('');
const password = ref('');
const passwordConfirm = ref('');
const fullName = ref('');

const loginMode = ref("start");

onMounted(async () => {
    pb.authStore.onChange(()=>{
        currentUser.value = pb.authStore.model;
    }, true)

})

const doLogin = async () => {
    console.log(password.value, passwordConfirm.value);
    if ( password.value === passwordConfirm.value) {
        const authData = await pb.collection('users')
            .authWithPassword(username.value, password.value);

        console.log(pb.authStore.isValid);
        console.log(pb.authStore.token);
        console.log(pb.authStore.model);
        currentUser.value = pb.authStore.model;
    }
    else {
        console.log("Passwords do not match");
    }
}

const doCreateAccount = async () => {
    const data = {
    "username": username.value,
    "email": mail.value,
    "emailVisibility": true,
    "password": password.value,
    "passwordConfirm": passwordConfirm.value,
    "name": fullName.value,
    };

    const record = await pb.collection('users').create(data);

    await doLogin();
}
</script>

<template>
    <section v-if="loginMode==='start'" class="flex flex-col gap-4 mx-4 items-center">
        <IconLogo />
        <Button @click="loginMode='pseudo'" text="Créer un compte" />
        <Button @click="loginMode='connexion'" text="Se connecter" variant="white"/>
    </section>

    <section v-if="loginMode!=='start'" class="flex flex-col gap-4 mx-4 items-center">
        <header>
            <h2 v-if="loginMode == 'pseudo'">Choisissez un pseudo</h2>
            <h2 v-if="loginMode === 'info'">Informations de compte</h2>
            <h2 v-if="loginMode === 'connexion'">Connectez vous</h2>
            <h2 v-if="loginMode === 'passwordRecup'">Récupérez votre mot de passe</h2>
        </header>
        <div v-if="loginMode === 'pseudo'">
            <IconArrowLeft @click="loginMode='start'"/>
            <InputConnexion v-model="username" :text="'Pseudonyme'" :labelfor="'username'" :type="'text'" :name="'username'" :id="'username'" :placeholder="''"/>
            <Button @click="loginMode='info'" text="Continuer" :disabled="!username"/>
        </div>
        <div>
                <div v-if="loginMode==='info' || loginMode==='connexion'">
                    <IconArrowLeft  @click="loginMode = (loginMode ==='info' ? 'pseudo' : 'start')"/>
                    <InputConnexion v-model="mail" :text="'Adresse e-mail'"         :labelfor="'mail'" :type="'email'" :name="'mail'" :id="'mail'"      :placeholder="''"/>
                    <InputConnexion v-model="password" :text="'Mot de passe'"       :labelfor="'password'" :type="'password'" :name="'password'"    :id="'password'" :placeholder="''"/>
                    <InputConnexion v-model="passwordConfirm" :text="'Confirmer le  mot de  passe'" :labelfor="'passwordConfirm'"     :type="'passwordConfirm'"  :name="'passwordConfirm'"     :id="'passwordConfirm'" :placeholder="''" />
                </div>
                <Button v-if="loginMode==='info'" @click="loginMode='connexion', doCreateAccount" text="créer" />

            <Button v-if="loginMode==='connexion'" @click="loginMode='', doLogin" text="Se connecter"/>
        </div>
    </section>
</template>