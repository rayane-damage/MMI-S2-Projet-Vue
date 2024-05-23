<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconMoodBad from './components/icons/IconMoodBad.vue';
import IconMoodMid from './components/icons/IconMoodMid.vue';
import IconMoodGood from './components/icons/IconMoodGood.vue';

const props = defineProps<{
    date: string;
    mood: string;
}>();

</script>

<template>
    <section class="flex justify-between items-center mx-6 p-4 bg-white rounded-[35px]">
        <div class="flex gap-4 items-center">
            <div>
                <IconMoodGood v-if="props.mood === 'Bien'"/>
                <IconMoodMid v-if="props.mood === 'Moyen'" />
                <IconMoodBad v-if="props.mood === 'Mal'" />
            </div>
            <div>
                <p>{{ date }}</p>
                <p>{{ mood }}</p>
            </div>
        </div>
        <div>
            <IconSmallSettings />
        </div>
    </section>
</template>