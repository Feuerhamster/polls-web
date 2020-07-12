<template>

    <div class="box">

        <div class="loader big-loader" v-if="loading && !poll"></div>

        <h1 class="error" v-if="error">{{ error }}</h1>

        <h1 v-if="poll && !error">{{ poll.title }}</h1>

        <p v-if="poll && !error && poll.description">{{ poll.description }}</p>

        <form @submit="vote" v-if="poll && !error">

            <label v-for="(option, i) of poll.options">

                <input :type="poll.isMultiple ? 'checkbox' : 'radio'" :value="i" name="vote[]" :required="poll.isMultiple === 'radio'">
                <span :class="[ poll.isMultiple ? 'checkbox' : 'radio', 'checkmark' ]"></span>

                {{ option }}

            </label>

            <br/>

            <div>
                <button v-if="poll">
                    <span v-if="!loading">Abstimmen</span>
                    <span class="loader" v-if="loading"></span>
                </button>
            </div>


        </form>

        <p class="greyed" v-if="poll && !error">
            Von <b>{{ poll.author }}</b> / <b>{{ poll.views }}</b> Aufrufe / <b>{{ poll.totalVotes }}</b> Stimmen
        </p>

    </div>

</template>

<script>
    import axios from "axios";

    export default {
        name: "Poll.vue",
        props: ["id"],
        data(){
            return {
                poll: { title: null, description: null },
                error: false,
                loading: false
            }
        },
        async mounted() {

            this.loading = true;

            try{

                let res = await axios.get("polls/" + this.id);

                if(res.data.voted){
                    this.$router.replace({ name: "Results", params: { id: this.id } });
                }

                this.poll = res.data;

            }catch (e) {

                if(e.response && e.response.status === 404){
                    this.error = "Diese Abstimmung existiert nicht";
                }else if(e.isAxiosError){
                    this.error = "Netzwerkfehler";
                }else{
                    this.error = "Ein unbekannter Fehler ist aufgetreten";
                }

            }

            this.loading = false;

        },
        metaInfo () {
            return {
                title: this.poll.title,
                meta: [
                    { name: "og:title", content: this.poll.title },
                    { name: "og:image", content: window.location.origin + "/logo.png" },
                    { name: "og:description", content: this.poll.description },
                ]
            }
        },
        methods: {

            vote: async function(event){

                this.loading = true;

                event.preventDefault();

                let votes = [];

                for(let input of event.target.elements){

                    if(input.checked){
                        votes.push(parseInt(input.value));
                    }

                }

                try{

                    let res = await axios.patch("polls/" + this.id + "/votes", votes);

                    if(res.status === 200){
                        this.$router.push({ name: "Results", params: { id: this.id } });
                    }

                }catch (e) {

                    if(e.response && e.response.status === 403){
                        this.error = "Du hast bereits abgestimmt";

                    }else if(e.response && e.response.status === 422){
                        this.error = false;

                    }else if(e.isAxiosError){
                        this.error = "Netzwerkfehler";

                    }else{
                        this.error = "Ein unbekannter Fehler ist aufgetreten";
                    }

                }

                this.loading = false;

            }

        }
    }
</script>

<style scoped>

</style>