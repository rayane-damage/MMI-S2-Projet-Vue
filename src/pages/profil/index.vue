<script setup lang="ts">
    import HeaderPage from '@/components/HeaderPage.vue';
    import IconMoodBad from '@/components/icons/IconMoodBad.vue';
    import IconMoodMid from '@/components/icons/IconMoodMid.vue';
    import IconMoodGood from '@/components/icons/IconMoodGood.vue';
    import { pb } from '@/backend';
    //Varibale pour savoir si on est sur la page des moods ou des memories
    import { isActive } from '@/components/HeaderPage.vue';


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
    <HeaderPage active="Profil" inactive="Éditer" :currentMood="moodList[0].mood"/> 
    <section v-if="isActive === true" class="h-screen" v-scroll-lock="true">
        <div class="flex flex-col justify-between gap-4 mx-8">
            <div>
                <div>
                    <img src="/img/pfp default.png" alt="Profile picture" class="w-full aspect-square" />
                </div>
                <div class="*:text-center">
                    <p>name</p>
                    <p class="text-gray-600">full_name</p>
                </div>
            </div>

            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua.</p>
            <div class="flex flex-col gap-2">
                <h4>Amis</h4>
                <div class="flex justify-between">
                    <div>
                    <!-- liste contacts -->
                    </div>
                    <!-- bouton + -->
                </div>
            </div>
        </div>
    </section>
    <section v-if="isActive === false" v-scroll-lock="true">
        <p>blabla</p>
    </section>
</template>