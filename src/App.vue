<script setup>
import AppHeader from "./components/AppHeader.vue";
import { setLocale } from "@vee-validate/i18n";
setLocale("fa");
</script>

<template>
    <app-header/>
    <router-view></router-view>
</template>

<style scoped>
</style>
