<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import Button from '@/components/Button.vue';
import InputConnexion from '@/components/InputConnexion.vue';

import { onMounted, ref } from 'vue'
import { pb } from '@/backend'
import  { useRouter } from 'vue-router'

const currentUser = ref();
const username = ref('');
const mail = ref('');
const password = ref('');
const passwordConfirm = ref('');

const loginMode = ref("start");

const loginError = ref('');
const route = useRouter();

onMounted(async () => {
    pb.authStore.onChange(()=>{
        currentUser.value = pb.authStore.model;
    }, true)

})

const isValidEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(mail.value);
};

const doLogin = async () => {
    try {
    const authData = await pb.collection('users')
        .authWithPassword(mail.value, password.value);
    console.log(pb.authStore.isValid);
    console.log(pb.authStore.token);
    console.log(pb.authStore.model);
    currentUser.value = pb.authStore.model;
    loginError.value = "";
    console.log(loginError.value);
    route.push('/');
    } catch (error) {
        loginError.value = "Email ou mot de passe invalide"
    }
}


const doCreateAccount = async () => {
    if (!isValidEmail()) {
        loginError.value = "Email invalide";
        return;
    }
    if ( password.value === passwordConfirm.value) {
    const data = {
        "username":  `user_${self.crypto.randomUUID().split("-")[0]}`,
        "email": mail.value,
        "emailVisibility": true,
        "password": password.value,
        "passwordConfirm": passwordConfirm.value,
        "name": username.value,
    };
    const record = await pb.collection('users').create(data);
    pb.authStore.clear();
    loginError.value = "";
    // mail.value = "";
    // password.value = "";
    loginMode.value = 'connexion';
    // console.log(loginError.value);
    // console.log(password.value);
    // console.log(mail.value);
    // console.log(pb.authStore.model);
    } else {
        loginError.value = "Les mots de passes ne correspondent pas";
    }
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
            <!-- <h2 v-if="loginMode === 'passwordRecup'">Récupérez votre mot de passe</h2> -->
        </header>
        <div v-if="loginMode === 'pseudo'">
            <IconArrowLeft @click="loginMode='start', loginError = ''"/>
            <InputConnexion v-model="username" :text="'Pseudonyme'" :labelfor="'username'" :type="'text'" :name="'username'" :id="'username'" :placeholder="''"/>
            <Button @click="loginMode='info'" text="Continuer" :disabled="!username"/>
        </div>
        <div>
                <div v-if="loginMode==='info' || loginMode==='connexion'">
                    <IconArrowLeft  @click="loginMode = (loginMode ==='info' ? 'pseudo' : 'start'), loginError = ''"/>
                    <!-- <InputConnexion v-if="loginMode==='connexion'" v-model="username" :text="'Pseudonyme'" :labelfor="'pseudo'" :type="'text'" :name="'pseudo'" :id="'pseudo'" :placeholder="''"/> -->
                    <p class="text-red-500" v-if="loginError">{{ loginError }}</p>
                    <InputConnexion v-model="mail" :text="'Adresse e-mail'"         :labelfor="'mail'" :type="'email'" :name="'mail'" :id="'mail'"      :placeholder="''"/>
                    <InputConnexion v-model="password" :text="'Mot de passe'"       :labelfor="'password'" :type="'password'" :name="'password'"    :id="'password'" :placeholder="''"/>
                    <InputConnexion v-if="loginMode==='info'" v-model="passwordConfirm" :text="'Confirmer le  mot de  passe'" :labelfor="'passwordConfirm'"     :type="'password'"  :name="'passwordConfirm'"     :id="'passwordConfirm'" :placeholder="''" />
                </div>
                <Button v-if="loginMode==='info'" @click="doCreateAccount" text="créer" :disabled="!mail || !password"/>
                <Button v-if="loginMode==='connexion'" @click="doLogin" text="Se connecter" :disabled="!mail || !password"/>
        </div>
    </section>
</template>