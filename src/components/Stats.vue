<template>

    <div class="stats">

        <div v-for="(value, i) of data">

            <h2>
                {{ value }} - {{ labels[i] }}
            </h2>

            <div :style="{ width: ((value / totalDataValue) * 100).toString() + '%', backgroundColor: colors[i] }">

            </div>

        </div>

    </div>

</template>

<script>
    export default {
        name: "Stats.vue",
        props: ["labels", "data"],
        data(){
            return {
                stats: [],
                colors: ["#ef4a4a", "#ffce1b", "#7be741", "#4fccf3", "#fa60c1", "#ff752b"]
            }
        },
        computed: {
            totalDataValue: function(){
                return this.data.reduce((a, b) => a + b);
            }
        },
        mounted() {



        }
    }
</script>

<style scoped>

</style>