<script setup lang="ts">
import SettingsCard from '@/components/SettingsCard.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconInfo from '@/components/icons/IconInfo.vue';
import SettingsLegalCard from '@/components/SettingsLegalCard.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import IconArrowLeft from '@/components/icons/IconArrowLeft.vue';
import InputConnexion from '@/components/InputConnexion.vue';
import Button from '@/components/Button.vue';
import IconPen from '@/components/icons/IconPen.vue';

import { isActive } from '@/components/HeaderPage.vue'
import { pb } from '@/backend';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core';

// Gère les confirmations
const doLogoutConfirm = ref(false);
const doDeleteConfirm = ref(false);

//Gere l'etat de la page
const compteMode = ref('none');

const confirmCard = ref(null);
// Ferme les settings si on clique en dehors
onClickOutside(confirmCard, () => {
    doLogoutConfirm.value = false;
    doDeleteConfirm.value = false;
});

const route = useRouter();

// Fonction pour se déconnecter
const doLogout = () => {
    pb.authStore.clear();
    route.push('/connexion');
}

// Fonction pour supprimer le compte
const doDeletAcount = () => {
    pb.collection('users').delete(pb.authStore.model?.id);
    pb.authStore.clear();
    route.push('/connexion');
}



const moodList = await pb.collection('mood').getFullList({
        filter : `user = '${pb.authStore.model?.id}'`,
        sort: '-created'
    });

//Permet d'acceder a l'onglet de gauche a chaque fois que l'on revient sur la page
if (isActive.value == false) {
    isActive.value = true;
}

// ------------------- CHANGER LE MOT DE PASSE -------------------
const password = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const doChangePassword = async () => {
    if (newPassword.value === confirmPassword.value) {
        console.log("model id", pb.authStore.model?.id)
        console.log("newPassword", newPassword.value)
        console.log("confirmpassword", confirmPassword.value)
        try {
            await pb.collection('users').update(pb.authStore.model?.id, {
                password: newPassword.value,
                passwordConfirm: confirmPassword.value,
                oldPassword: password.value
            });
        } catch (error) {
            console.log("ERREUR", error)
        }
        compteMode.value = 'none';
    } else {
        alert('Les mots de passe ne correspondent pas');
    }
}

console.log("model", pb.authStore.model)
</script>

<script lang=ts>
//On exporte la variable sectionOpen pour l'utiliser dans le composant parent
export const sectionOpen = ref(0)

</script>

<template>
    <HeaderPage active="Compte" inactive="Légal" :currentMood="moodList[0].mood"/>
    <section v-if="isActive === true" class="bg-mainBlue h-screen flex flex-col gap-6">
        <div v-show="compteMode === 'none'" class="flex flex-col gap-4">
            <div class="flex flex-col gap-2 text-white items-start pt-6 *:w-full ">
                <div class="flex justify-between items-center w-full border-b border-lightOrange h-10 px-10">
                    <h4 class="font-sniglet text-base tracking-wide">Informations du compte</h4>
                    <IconInfo class="h-4"/>
                </div>
                <div class="*:px-10 flex flex-col gap-2 items-start">
                    <SettingsCard @click="compteMode = 'passwordChange'" title="Changer de mot de passe"/>
                    <SettingsCard @click="compteMode = 'contact'" title="Nous contacter"/>
                </div>
            </div>
            <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 5 ? 0:5"
                                title="À propos de to-Gather"
                                text="lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et  dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est     laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et    dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea    commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla     pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est   laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et  dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est     laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et    dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea    commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla     pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est   laborum1lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et  dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla   pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est     laborum"
                                :number="5"/>
            <div class="flex flex-col gap-2 text-white items-start 
                        *:w-full">
                <div class="flex justify-between items-center w-full border-b border-lightOrange h-10 px-10">
                    <h4 class="font-sniglet text-base tracking-wide">Déconnection</h4>
                    <IconLogout class="h-4"/>
                </div>
                <div class="*:px-10 flex flex-col gap-2 items-start">
                    <div class="flex flex-col items-center w-full">
                        <SettingsCard ref="confirmCard" 
                                    title="Se déconnecter" 
                                    @click="doLogoutConfirm= true, doDeleteConfirm = false" 
                                    class="self-start"/>
                        <div v-if="doLogoutConfirm" class="flex flex-col gap-4 justify-center items-center absolute bg-neutral-100 p-4  rounded-2xl text-black top-1/2">
                            <p class="font-sniglet text-xl text-center text-grayDark">Voulez-vous vraiment vous déconnecter ?</p>
                            <span class="flex justify-between w-full px-8">
                                <p class="text-3xl text-mainGreen p-2 rounded-xl text-center font-Hegante cursor-pointer"  
                                    @click="doLogout">oui</p>
                                <p class="text-3xl text-mainRed p-2 rounded-xl text-center font-Hegante cursor-pointer" 
                                    @click="doLogoutConfirm     = false">non</p>
                            </span>
                        </div>
                    </div>
                    <div class="flex flex-col items-center w-full">
                        <SettingsCard ref="confirmCard" 
                                        title="Désactiver le compte" 
                                        @click="doDeleteConfirm = true, doLogoutConfirm= false"    
                                        class="self-start"/>
                        <div v-if="doDeleteConfirm" class="flex flex-col gap-4 justify-center items-center absolute bg-neutral-100 p-4  rounded-2xl text-black w-[90%] top-1/2">
                            <p class="font-sniglet text-xl text-center text-grayDark">Voulez-vous vraiment vous désactiver votre compte ?</p>
                            <p class="font-sniglet text-base text-center text-grayDark">(Cette action est irréversible)</p>
                            <span class="flex gap-6">
                                <p class="text-3xl text-mainGreen p-2 rounded-xl text-center font-Hegante cursor-pointer"                  
                                    @click="doDeletAcount">oui</p>
                                <p class="text-3xl text-mainRed p-2 rounded-xl text-center font-Hegante cursor-pointer" 
                                    @click="doDeleteConfirm     = false">non</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- CHANGER LE MOT DE PASSE -->
        <div v-show="compteMode === 'passwordChange'" class="mt-6 flex flex-col gap-2">
            <IconArrowLeft @click="compteMode = 'none'"/>
            <div class="flex justify-between items-center w-full border-b border-lightOrange h-10 px-10">
                    <h4 class="font-sniglet text-base tracking-wide text-white">Changer le mot de passe</h4>
                    <IconPen class="w-4 h-4 fill-white"/>
            </div>
            <form action="form" class="flex flex-col gap-4 mx-8">
                <InputConnexion
                    v-model="password"
                    text="Mot de passe actuel"
                    labelfor="oldpassword"
                    type="password"
                    name="oldpassword"
                    id="oldpassword"
                    placeholder=""
                    class="text-white"/>

                <InputConnexion
                    v-model="newPassword"
                    text="Nouveau mot de passe"
                    labelfor="newpassword"
                    type="password"
                    name="newpassword"
                    id="newpassword"
                    placeholder=""
                    class="text-white"/>

                <InputConnexion
                    v-model="confirmPassword"
                    text="Confirmer le nouveau mot de passe"
                    labelfor="confirmnewpassword"
                    type="password"
                    name="confirmnewpassword"
                    id="confirmnewpassword"
                    placeholder=""
                    class="text-white"/>
                <Button @click="doChangePassword" text="Confirmer"/>
            </form>

        </div>

        <!-- CONTACT -->
        <div v-show="compteMode === 'contact'" class="mt-6 flex flex-col gap-2">
            <IconArrowLeft @click="compteMode = 'none'" class="mx-4"/>
            <div class="flex justify-between items-center w-full border-b border-lightOrange h-10 px-10">
                    <h4 class="font-sniglet text-base tracking-wide text-white">Nous contacter</h4>
            </div>
            <form action="form" class="flex flex-col gap-4 mx-8">
                <InputConnexion
                    text="Objet"
                    labelfor="objet"
                    type="text"
                    name="objet"
                    id="objet"
                    placeholder=""
                    class="*:text-white"/>

                <InputConnexion
                    text="Message"
                    labelfor="message"
                    type="text"
                    name="message"
                    id="message"
                    placeholder=""
                    class="*:min-h-[150px] *:rounded-3xl text-white"/>
                <Button text="Envoyer"/>
            </form>
        </div>
    </section>
    <section
    v-if="isActive === false" class="bg-mainBlue flex h-screen flex-col pt-6 gap-6">
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 1 ? 0:1"
                            title="Mentions légales"
                            text="To-Gather, entreprise créée et dirigée par Rayane Damage, Mathis Liegeon et Jérémy Roy à l’adresse suivante : 12 rue des cerisiers

                            L’entreprise est immatriculée au RCS sous le numéro *********

                            Vous pouvez joindre To-gather à l’adresse mail to-gather.contact@gmail.com mais aussi au numéro +33.03.54.*******

                            Numéro d’identification à la TVA : 
                            FR 0567***********

                            L’hébergeur du Site est Infomaniak Network SA, Rue Eugène Marziano 25, 1227 Les Acacias (GE), Suisse, +33 09 71 03 02 64"
                            :number="1"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 2 ? 0:2"
                            title="Politique de confidentialité"
                            text="To-Gather se réserve le droit de modifier les présentes mentions à tout moment. L’utilisateur s’engage à la consulter régulièrement.

                            Le site Internet de To-Gather est une œuvre de l'esprit protégée par la législation française en vigueur sur le droit d'auteur et la propriété intellectuelle, littéraire et artistique et les autres droits similaires. L'ensemble des éléments le composant tels que notamment, mais non exclusivement, les marques, modèles, logos, images, textes, sons et autres documents, sont protégés par les droits de propriété intellectuelle et sont la propriété exclusive de To-Gather.

                            To-Gather s’engage à une obligation de moyen et non de résultat envers ses utilisateurs.

                            Il vous est interdit d’afficher ou de transmettre sur ou à partir du Site tout contenu :
                            a) qui soit menaçant, diffamatoire, obscène, indécent, séditieux, offensant, pornographique, abusif, susceptible d’inciter à la haine raciale, discriminatoire, provocateur, blasphématoire, en violation de la confiance, en violation de la vie privée ou qui peut causer désagrément; ou
                            b) pour lesquels vous n’avez pas obtenu toutes les licences et/ou approbations nécessaires; ou
                            c) qui constitue ou encourage un comportement qui serait considéré comme une infraction pénale, qui entraînerait une responsabilité civile ou qui serait contraire au droit de toute tierce partie ou qui porterait atteinte à ses droits dans tout pays du monde; ou
                            d) qui est techniquement dommageable (y compris, sans s’y limiter, les virus informatiques, les bombes logiques, les chevaux de Troie, les vers, les composants nocifs, les données corrompues ou autres logiciels malveillants ou données nuisibles).
                            Vous ne pouvez pas utiliser à mauvais escient le Site (y compris, sans limitation, par piratage).
                            To-Gather coopérera pleinement avec les autorités chargées de l’application de la loi ou les tribunaux ordonnant à To-Gather de divulguer l’identité ou de localiser toute personne qui afficherait des documents en violation du présent code."
                            :number="2"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 3 ? 0:3"
                            title="Conditions générales de vente"
                            text="Pour le moment, To-gather ne propose pas de service d’abonnement payant mais son arrivée peut être envisagée.
                            En utilisant cette application, vous acceptez le fait que nous affichons de la publicité afin de générer des revenus et maintenir en bon état l’application web et son fonctionnement.

                            En cas de maintenance, de modification ou de la suppression d’une fonctionnalité, les clients seront notifiés de ce changement, qu’il soit temporaire ou définitif.

                            To-gather met à disposition de ses clients un service après vente disponible via la page contact par deux services que nous mettons à disposition : l’adresse mail que nous mettons à votre disposition via laquelle vous pouvez nous écrire gratuitement et le numéro de téléphone de l’entreprise, lui aussi gratuit.

                            Tout problème juridique pouvant avoir lieu entre To-Gather et un client se résoudra devant le tribunal de commerce.
                            Ce Site web a été créé et est exploité conformément aux lois de la France et les présentes conditions seront régies et interprétées conformément à ces lois. Pour trancher tout litige relatif à ce Site et aux présentes conditions, les lois de la France s’appliqueront et les tribunaux de la France auront compétence exclusive."
                            :number="3"/>
        <SettingsLegalCard @pointerdown="sectionOpen =  sectionOpen === 4 ? 0:4"
                            title="Conditions générales d’utilisation"
                            text="Notre site Internet met en œuvre des technologies dites « Cookies ». Les cookies sont des fichiers textes enregistrés sur votre disque dur pour être interrogés par la suite. Ces fichiers sont utilisés pour nous permettre de simplifier et personnaliser votre connexion à notre site.

                            To-Gather se soucie de votre vie privée. Nous collectons et traitons différents types de données personnelles via ce site. Il s’agit notamment des informations que vous nous fournissez lors de l’utilisation de nos services, comme par exemple notre formulaire de contact ou la création d’un compte, telles que le nom, le prénom, l’adresse électronique et votre mot de passe, des informations dont nous avons besoin lorsque vous signalez un problème avec notre Site, ou des renseignements recueillis au moyen de cookies. 
                            En aucun cas vos données ne seront diffusées, elles ne servent qu’au bon fonctionnement de notre site et seront conservées pendant la durée de votre abonnement et jusqu'à 30 jours après la suppression de votre compte au cas où vous changeriez d’avis.
                            En utilisant notre application web, nous considérons que vous vous êtes donc renseigné et que vous êtes d'accord avec le fait que vous partagiez vos photos, et qu’elles sont stockées dans nos bases de données dans l’unique but du bon fonctionnement de l’application.

                            Nous ne sommes en rien responsable des contenus publiés par nos utilisateurs, cependant, si des utilisateurs nous remontent des contenus inappropriés, nous nous donnons le droit de supprimer ces données, voire de supprimer le compte de l’utilisateur en question.

                            La personne chargée de surveiller les dites données est Jérémy Roy, notre community manager, et se charge de prévenir les utilisateurs et la Cnil en cas de fuite de données ou tous problèmes liés à celles-ci.

                            Les liens hypertextes mis en œuvre par To-Gather en direction d’autres sites ne sauraient engager la responsabilité de l’entreprise, qui garantit n'exercer aucun contrôle sur le contenu de ces sites. To-Gather ne pourrait être responsable du fait des contenus de ces sites. 

                            La mesure d’audience implique la collecte de données personnelles. Votre adresse IP est considérée comme une donnée privée, dans la mesure où elle peut nous permettre de vous identifier. Applicable depuis le 25 mai 2018, le RGPD est venu fixer un cadre légal en matière de données privées. Dès lors, les sites web sont tenus d’obtenir le consentement explicite du visiteur avant de déposer un cookie dans son navigateur.
                            https://www.cnil.fr/fr/comprendre-le-rgpd

                            Toutes données récupérées doivent avoir été prises avec le consentement de l’utilisateur et l’utilisateur doit en avoir été informé. 
                            Conformément à la loi informatiques et libertés du 6 janvier 1978 telle que modifiée par la loi du 6 août 2004 ainsi que selon les règles du Règlement européen 2016/679 du 27 avril 2016 dit 'RGPD', vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données vous concernant si celles-ci sont inexactes, incomplètes, équivoques ou périmées. Vous disposez également du droit de vous opposer, pour des motifs légitimes, à ce que des données personnelles vous concernant fassent l'objet d'un traitement. 

                            Bien qu’une grande attention ait été apportée à la collecte et à la présentation de l’information contenue sur ce site, To-Gather n’offre aucune garantie, expresse ou implicite, quant à son exactitude, son exhaustivité, son utilité ou son aptitude à l’emploi de quelque nature que ce soit par les utilisateurs et nie expressément la responsabilité de toute erreur ou omission."
                            :number="4"/>
    </section>
</template>