<script lang="ts">
    import RadioChoice from '../radioChoice/index.vue';

    export default {
        name: 'AddnewForm',

        components: {
            RadioChoice
        },

        data() {
            return {
                inputContent: '',
                inputCategory: null,
            }
        },
        
        methods: {
            getChoice(value: String) {
                this.inputCategory = value;
                console.log(value);
            },

            sent() {
                if(this.inputContent.trim() === '' || this.inputCategory === null) {
                    return;
                }
                this.$emit('addNew', this.inputContent, this.inputCategory);
                this.inputContent = ''
                this.inputCategory = null
            }
        }

    }
</script>

<template>
    <form @submit.prevent="sent">
        <h4>Making new one</h4>
        <input type="text" placeholder="make something" v-model="inputContent" />

        <h4>Category?</h4>
        <div class="options">

            <RadioChoice @newVal="getChoice" value="business"></RadioChoice>
            <RadioChoice @newVal="getChoice" value="personal"></RadioChoice>
            <RadioChoice @newVal="getChoice" value="study"></RadioChoice>

            <input type="submit" value="Add todo" />

            <p>{{ inputCategory? inputCategory : '' }}</p>

        </div>
    </form>
</template>