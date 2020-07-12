<template>

    <div class="home">

        <div class="titlebox">
            <img src="@/assets/logo.png" />
            <h1>
                <span>HamsterLab's</span>
                Polls
            </h1>
        </div>

        <button @click="$router.push('/create')">Starte eine Abstimmung!</button>

        <br/>
        <br/>

        <h1>Neuste Abstimmungen</h1>

        <div v-if="!loading" class="card-wrapper">
            <PollCard v-for="poll of recent" :poll="poll"></PollCard>
        </div>

        <div>
            <div v-if="loading" class="loader"></div>
        </div>

        <h1>Populäre Abstimmungn</h1>

        <div v-if="!loading" class="card-wrapper">
            <PollCard v-for="poll of popular" :poll="poll"></PollCard>
        </div>

        <div>
            <div v-if="loading" class="loader"></div>
        </div>

    </div>

</template>

<script>
    import axios from "axios";
    import PollCard from "../components/PollCard";

    export default {
        name: 'Home',
        components: {
            PollCard
        },
        data(){
            return {
                recent: [],
                popular: [],
                loading: true
            }
        },
        async mounted() {

            this.loading = true;

            let res = await axios.get("polls");
            this.recent = res.data.recent;
            this.popular = res.data.popular;

            this.loading = false;

        }
    }
</script>

<style>
    .home h1 {
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
    }
    .home > div {
        display: flex;
        justify-content: center;
    }
</style>