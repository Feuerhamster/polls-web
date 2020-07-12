<template>

    <div class="box">

        <div class="loader big-loader" v-if="loading && !poll"></div>

        <h1 class="error" v-if="error">{{ error }}</h1>

        <h1 v-if="poll">{{ poll.title }}</h1>

        <p v-if="poll && poll.description">{{ poll.description }}</p>

        <Stats v-if="poll" :labels="poll.options" :data="poll.votes"></Stats>

        <button @click="revert" v-if="poll">
            <span v-if="!loading">Umentscheiden</span>
            <span class="loader" v-if="loading"></span>
        </button>

        <p class="greyed" v-if="poll">
            Von <b>{{ poll.author }}</b> / <b>{{ poll.views }}</b> Aufrufe / <b>{{ poll.totalVotes }}</b> Stimmen
        </p>

    </div>

</template>

<script>
    import axios from "axios";
    import Stats from "../components/Stats.vue";

    export default {
        name: "Results.vue",
        components: {Stats},
        props: ["id"],
        data(){
            return {
                poll: null,
                error: false,
                chart: null,
                loading: false
            }
        },
        async mounted() {

            this.loading = true;

            try{

                let res = await axios.get("polls/" + this.id);

                this.poll = res.data;

            }catch (e) {

                if(e.response.status === 404){
                    this.error = "Diese Abstimmung existiert nicht";
                }else{
                    this.error = "Ein unbekannter Fehler ist aufgetreten";
                }

                return;

            }

            this.loading = false;

        },
        methods: {
            revert: async function(){

                this.loading = true;

                try{

                    let result = await axios.delete("polls/" + this.id +"/votes");
                    if(result.status === 200){
                        this.$router.replace({ name: "Poll", params: { id: this.id } });
                    }

                }catch (e) {

                }

                this.loading = false;

            }
        }
    }
</script>

<style scoped>

</style>