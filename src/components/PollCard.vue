<template>

    <router-link class="card" :to="'/' + poll.id">

        <h1>{{ poll.title }}</h1>

        <p style="flex-grow: 1; margin-bottom: 0;">
            <b>{{ poll.totalVotes }}</b> Stimme{{ poll.totalVotes > 1 ? 'n' : '' }}<br/>
            <b>{{ poll.views }}</b> Aufruf{{ poll.views > 1 ? 'e' : '' }}<br/>
            von <b>{{ poll.author }}</b><br/>
        </p>

        <p class="greyed">
            <b>{{ datetime }}</b>
        </p>

    </router-link>

</template>

<script>
    import * as Timeago from "timeago.js";
    import DE from "timeago.js/lib/lang/de";

    Timeago.register("de", DE);

    export default {
        name: "PollCard.vue",
        props: ["poll"],
        computed: {
            datetime: function () {
                return Timeago.format(new Date(this.poll.creationDate), "de");
            }
        }
    }
</script>

<style scoped>

</style>