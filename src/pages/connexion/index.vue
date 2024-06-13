<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import IconMoodBad from '@/components/icons/IconMoodBad.vue';
import IconMoodMid from '@/components/icons/IconMoodMid.vue';
import IconMoodGood from '@/components/icons/IconMoodGood.vue';
import Button from '@/components/Button.vue';
import InputConnexion from '@/components/InputConnexion.vue';
import IconGoogle from '@/components/icons/IconGoogle.vue';

import { onMounted, ref } from 'vue'
import { pb } from '@/backend'
import { useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';

import { getUserMood } from '@/backend';

const route = useRouter();

const currentUser = ref();
const username = ref('');
const mail = ref('');
const password = ref('');
const passwordConfirm = ref('');

const loginMode = ref("start");

const loginError = ref('');

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
    if (await getUserMood(pb.authStore.model?.id) === false) {
        loginMode.value='moodChoice'
    } else {
        route.push('/');
    }
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
        let formData = new FormData();

        const response = await fetch('https://to-gather.mathisliegeon.fr/api/files/_pb_users_auth_/f2ydhe2w504k5r1/user_template_default_avatar_c4txh1dMeL.jpg?token=');
        const blob = await response.blob();
        formData.append('avatar', blob, 'image.jpg');
        formData.append('username', `user_${uuidv4().split("-")[0]}`);
        formData.append('email', mail.value);
        formData.append('emailVisibility', 'true');
        formData.append('password', password.value);
        formData.append('passwordConfirm', passwordConfirm.value);
        formData.append('name', username.value);

        const record = await pb.collection('users').create(formData);

        pb.authStore.clear();
        loginError.value = "";
        loginMode.value = 'connexion';
    } else {
        loginError.value = "Les mots de passes ne correspondent pas";
    }
}

async function addMood(mood:string) {
    await pb.collection('mood').create({ mood: mood, user: pb.authStore.model?.id});
    route.push('/');
}

const isUser = ref(false);

// if (loginMode.value === 'moodChoice') {
//     isUser.value = await pb.collection('users').getOne(pb.authStore.model?.id);
//     console.log(isUser.value);
// }
console.log("pb.authStore.model?.id")
console.log(getUserMood(pb.authStore.model?.id) )

const doLoginOAuth = async () => {
    const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
    currentUser.value = pb.authStore.model;
    if (await getUserMood(pb.authStore.model?.id) === false) {
        loginMode.value='moodChoice'
    } else {
        route.push('/');
    }
};
</script>

<template>
    <div class="flex justify-center items-center
                bg-mainBlue w-screen h-16">
        <IconLogo />
    </div>

    <div v-scroll-lock="true" class="flex flex-col h-screen justify-center pb-16">
        <section v-if="loginMode==='start'" class="flex flex-col gap-4 mx-4 items-center">
            <h1 class="text-4xl font-Hegante text-center mx-4">Bienvenue sur to-Gather </h1>
            <Button @click="loginMode='pseudo'" text="Créer un compte"/>
            <Button @click="loginMode='connexion'" text="Se connecter" variant="white"/>
            <button @click="doLoginOAuth" class="text-grayDark bg-white rounded-full p-2 w-full font-sniglet tracking-wider flex flex-row items-center justify-center gap-4" >
                <IconGoogle class="w-10"/>
                <p>Continuer avec Google</p>
            </button>
        </section>


        <section v-if="loginMode!=='start'" class="flex flex-col gap-4 mx-4 items-center">
            <header>
                <h2 v-if="loginMode === 'info'" class="font-sniglet tracking-wide text-xl">Informations du compte</h2>
                <h2 v-if="loginMode === 'connexion'" class="font-sniglet tracking-wide text-xl">Connectez-vous</h2>
            </header>
            <div v-if="loginMode === 'pseudo'" class="flex flex-col gap-4 w-full indent-4">
                <IconArrowLeft @click="loginMode='start', loginError = ''" 
                                class="absolute top-4"/>
                <InputConnexion v-model="username" 
                                :text="'Choisissez un Pseudo'" 
                                :labelfor="'username'" 
                                :type="'text'" 
                                :name="'username'" 
                                :id="'username'" 
                                :placeholder="''"/>
                <Button @click="loginMode='info'" 
                        text="Continuer" 
                        :disabled="!username"/>
            </div>
                <div class="flex flex-col gap-4 w-full mx-4">
                    <div v-if="loginMode==='info' || loginMode==='connexion'">
                        <IconArrowLeft  @click="loginMode = (loginMode ==='info' ? 'pseudo' : 'start'), loginError = ''" class="absolute top-4"/>
                        <p class="text-mainRed" v-if="loginError">{{ loginError }}</p>
                        <InputConnexion v-model="mail" 
                                        :text="'Adresse e-mail'"         
                                        :labelfor="'mail'" 
                                        :type="'email'" 
                                        :name="'mail'" 
                                        :id="'mail'"      
                                        :placeholder="''"/>
                        <InputConnexion v-model="password" 
                                        :text="'Mot de passe'"       
                                        :labelfor="'password'" 
                                        :type="'password'" 
                                        :name="'password'"    
                                        :id="'password'" 
                                        :placeholder="''"/>
                        <InputConnexion v-if="loginMode==='info'" v-model="passwordConfirm" 
                                        :text="'Confirmer le  mot de  passe'" 
                                        :labelfor="'passwordConfirm'"     
                                        :type="'password'"  
                                        :name="'passwordConfirm'"     
                                        :id="'passwordConfirm'" 
                                        :placeholder="''"/>
                    </div>
                    <Button v-if="loginMode==='info'" 
                                        @click="doCreateAccount"   
                                        text="créer" 
                                        :disabled="!mail || !password" 
                                        class="mt-4"/>
                    <Button v-if="loginMode==='connexion'" 
                                        @click="doLogin" 
                                        text="Se connecter" 
                                        :disabled="!mail || !password" 
                                        class="mt-4"/>
                    <p v-if="loginMode === 'connexion' || loginMode === 'info'" class="self-center text-center text-xs text-grayDark">En continuant, vous aceptez les Conditions d’utilisation de To-Gather et reconnaissez avoir lu notre Politique de confidentialité.</p>
                </div>
        </section>


        <section v-if="loginMode==='moodChoice'" class="w-full h-full flex flex-col justify-center items-center gap-6">
            <h1 class="font-bold text-2xl font-red-600">Comment allez vous ?</h1>
            <ul class="flex gap-6 justify-items-center h-full items-center">
                <li>
                    <IconMoodGood @click="addMood('Bien')"/>
                </li>
                <li>
                    <IconMoodMid @click="addMood('Moyen')" />
                </li>
                <li>
                    <IconMoodBad @click="addMood('Mal')"/>
                </li>
            </ul>
        </section>
        <p class="absolute bottom-0 text-xs text-grayDark w-full text-center my-4">© 2024 - To-Gather. Tous droits reservés.</p>
    </div>
</template>
