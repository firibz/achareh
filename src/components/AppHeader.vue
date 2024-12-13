<template>
    <b-navbar variant="white" type="light">
        <b-navbar-brand href="#">
            <img src="@/assets/logo.svg" alt="Logo" class="system-header-logo" />
        </b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-nav-item class="nav-link" :class="{ active: isActive('/') }" href="/">ثبت آدرس</b-nav-item>
            <b-nav-item class="nav-link" :class="{ active: isActive('/addresses') }" href="/addresses">مشاهده آدرس‌ها</b-nav-item>
        </b-navbar-nav>
    </b-navbar>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
    name: 'AppHeader',
    setup() {
        const route = useRoute()
        const isActive = (path) => route.path === path

        return {
            isActive
        }
    }
}
</script>

<style scoped>
/* Adjust styles as needed */
.system-header-logo{
    width: 70px;
}
</style>
<style>
.nav-item:not(.active) .nav-link{
    font-size: 14px;
    font-weight: 700;
}
.nav-item:not(.active) .nav-link{
    color: var(--system-primary) !important;
}
.nav-item.active .nav-link{
    color: var(--system-text) !important;
}
</style>
