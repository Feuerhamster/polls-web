<template>

    <div class="navbar">

        <img src="@/assets/logo.png" />

        <h1>Polls</h1>

        <span class="spacer"></span>

        <nav class="desktop" v-show="showNav">
            <router-link to="/">Startseite</router-link>
            <router-link to="/create">Abstimmung starten</router-link>
            <a href="api.html" target="_blank">API</a>
            <router-link to="/privacy">Datenschutz</router-link>
        </nav>

        <nav class="mobile" v-show="showNav">
            <router-link to="/"><i data-feather="home"></i></router-link>
            <router-link to="/create"><i data-feather="plus"></i></router-link>
            <a href="api.html" target="_blank"><i data-feather="code"></i></a>
            <router-link to="/privacy"><i data-feather="file-text"></i></router-link>
        </nav>

    </div>

</template>

<script>
    export default {
        name: "Navbar.vue",
        data(){
            return {
                showNav: true
            }
        }
    }
</script>

<style scoped>

</style>