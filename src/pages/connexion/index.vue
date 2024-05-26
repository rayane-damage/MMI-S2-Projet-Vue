<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';
import Button from '@/components/Button.vue';

import { onMounted, ref } from 'vue'
import { pb } from '@/backend'

const currentUser = ref();
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const fullName = ref('');

const loginMode = ref(true);
const start = ref(true);

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
    "username": `user_${self.crypto.randomUUID().split("-")[0]}`,
    "email": username.value,
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
    <section v-if="start" class="flex flex-col gap-4 mx-4 items-center">
        <IconLogo />
        <Button text="Créer un compte" />
        <Button text="Se connecter" variant="white"/>
    </section>
</template>