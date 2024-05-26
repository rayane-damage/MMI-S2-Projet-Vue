<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { pb } from '@/backend'


const currentUser = ref();
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const fullName = ref('');

const loginMode = ref(true);

onMounted(async () => {
    pb.authStore.onChange(()=>{
        currentUser.value = pb.authStore.model;
    }, true)

})

const doLogout = () => {
    pb.authStore.clear();
    // currentUser.value = null;
}

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
    <section class="flex flex-col gap-4 m-2">
        <div v-if="currentUser">
            <h1>Welcome {{ currentUser.name }}</h1>
            <button
            type="button"
            @click="doLogout"
            class="font-bold text-red-500 p-2 rounded-lg border-2 border-red-500 w-32"
            >
            Log Out
            </button>
        </div>
        <div v-else>
            <h1 class="font-bold text-xl"> {{ loginMode ? "Login": "Create Account" }}</h1>
            <form action="" class="flex flex-col gap-2">
                <label for="username">Email Adress</label>
                <input v-model="username" type="text" name="username" id="username" autocomplete="none" placeholder="Enter Email Adress">

                <label for="password">Password</label>
                <input v-model="password" type="password" name="password" id="password" autocomplete="none" placeholder="Enter Password">

                <div v-if="loginMode" class="flex gap-2">
                    <button
                    type="button"
                    @click="doLogin"
                    class="font-bold text-green-500 p-2 rounded-lg border-2 border-green-500 w-32"
                    >
                    Log In
                    </button>

                    <button
                    type="button"
                    @click="loginMode=false"
                    class="font-bold text-orange-500 p-2 rounded-lg border-2 border-orange-500 w-50"
                    >
                    Create Account
                    </button>
                </div>
                <div v-else class="flex flex-col gap-2">
                    <label for="passwordconfirm">PasswordConfirm</label>
                    <input v-model="passwordConfirm" type="password" name="passwordConfirm" id="passwordConfirm" autocomplete="none" placeholder="Confirm Password">

                    <label for="fullName">Full Name</label>
                    <input v-model="fullName" type="text" name="fullName" id="fullName" autocomplete="none" placeholder="Enter Full Name">

                    <div class="flex gap-2">
                        <button
                        type="button"
                        @click="doCreateAccount"
                        class="font-bold text-green-500 p-2 rounded-lg border-2 border-green-500 w-32"
                        >
                        Save new user
                        </button>

                        <button
                        type="button"
                        @click="loginMode=true"
                        class="font-bold text-red-500 p-2 rounded-lg border-2 border-red-500 w-50"
                        >
                        Cancel
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </section>
</template>
