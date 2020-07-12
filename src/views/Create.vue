<template>

    <div class="box">

        <h1>Abstimmung erstellen</h1>

        <form v-if="!id" @submit="createPoll">

            <input type="text" name="title" placeholder="Titel der Abstimmung" required minlength="5" maxlength="50" />
            <input type="text" name="author" placeholder="Autor" required minlength="4" maxlength="40" />

            <br/>

            <textarea rows="3" name="description" placeholder="Beschreibung (Optional)" minlength="30" maxlength="500"></textarea>

            <br/>

            <label>
                <input type="checkbox" name="isPublic" checked>
                <span class="checkmark checkbox"></span>
                Öffentlich gelistet
            </label>

            <label>
                <input type="checkbox" name="isMultiple">
                <span class="checkmark checkbox"></span>
                Mehrere Antworten möglich
            </label>

            <br/>

            <input v-for="i in possibleAnswers" name="options[]" type="text" :placeholder="'Antwortmöglichkeit ' + i" minlength="1" maxlength="30" />

            <br/>

            <div>
                <button v-if="possibleAnswers < 6" type="button" @click="possibleAnswers++">Antwortmöglichkeit Hinzufügen</button>
            </div>
            <br/>

            <div>
                <button>
                    <span v-if="!loading">Erstellen</span>
                    <span v-if="loading" class="loader"></span>
                </button>
            </div>


        </form>

        <p v-if="id">Deine Abstimmung wurde erstellt!</p>

        <button v-if="id" @click="$router.push({ name: 'Poll', params: { id } })">Zur Abstimmung</button>

        <br v-if="id"/>

        <button v-if="id" @click="share">Link teilen</button>

        <br v-if="id"/>

        <button v-if="id" class="red-button" @click="copyDeleteLink">Löschlink kopieren</button>

    </div>

</template>

<script>
    import axios from "axios";
    import copy from 'copy-to-clipboard';
    export default {
        name: "Create.vue",
        props: ["id", "token"],
        data(){
            return {
                possibleAnswers: 2,
                loading: false,
                error: null
            }
        },
        methods: {
            createPoll: async function(event){

                event.preventDefault();

                if(this.loading){
                    return;
                }

                this.loading = true;

                let data = {}

                // Form data to object
                for(let input of event.target){

                    if((input.type === "text" || input.type === "textarea") && input.value !== ""){

                        if(input.name.endsWith("[]")){

                            let actualName = input.name.substr(0, input.name.length - 2);

                            if(data[actualName]){
                                data[actualName].push(input.value);
                            }else{
                                data[actualName] = [ input.value ]
                            }

                        }else{
                            data[input.name] = input.value;
                        }


                    }else if(input.type === "checkbox"){


                        data[input.name] = input.checked;

                    }

                }

                try{

                    let res = await axios.post("polls", data);

                    if(res.status === 200){
                        this.$router.replace({ name: "CreateResult", params: { id: res.data.id, token: res.data.token } })
                    }

                }catch (e) {
                    console.log(e);
                }

                this.loading = false;

            },
            copyDeleteLink: function(event){

                let deleteLink = window.location.origin + '/delete/' + this.token;

                copy(deleteLink);

                event.target.innerText = "Löschlink kopiert!";
                setTimeout(() => {
                    event.target.innerText = "Löschlink kopieren";
                }, 1000);

            },
            share: function(event){

                let shareLink = window.location.origin + '/' + this.id;

                if (navigator.share && navigator.canShare()) {

                    navigator.share({
                        title: 'HamsterLab\'s Polls',
                        text: 'Hey du! Nehme an meiner Abstimmung teil.',
                        url: shareLink,
                    });

                }else{

                    copy(shareLink);

                    event.target.innerText = "Link kopiert!";
                    setTimeout(() => {
                        event.target.innerText = "Link teilen";
                    }, 1000);

                }

            }
        }
    }
</script>

<style scoped>

</style>