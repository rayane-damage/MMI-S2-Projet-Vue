<script setup lang="ts">
import IconSmallSettings from './icons/IconSmallSettings.vue';
import IconMoodBad from './icons/IconMoodBad.vue';
import IconMoodMid from './icons/IconMoodMid.vue';
import IconMoodGood from './icons/IconMoodGood.vue';

const props = defineProps<{
    date: string;
    mood: string;
}>();
const moodClass = {
    Bien: 'text-green-500',
    Moyen: 'text-yellow-500',
    Mal: 'text-red-500',
}

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
                <p
                class="font-Hegante"
                :class="moodClass[props.mood]"
                >{{ mood }}</p>
            </div>
        </div>
        <div>
            <IconSmallSettings />
        </div>
    </section>
</template>