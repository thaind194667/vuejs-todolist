<script lang="ts">
    export default {
        name: 'RadioChoice',
        props: {
            value: {type: String}
        },

        data() {
            return {
                myValue: this.value
            }
        },
        methods: {
            process() {
                this.$emit('newVal', this.value);
            }
        }
        
    }
</script>

<template>
    <label @click="process">
        <input type="radio" name="category" :value="value"/>
        <span :class="'bubble ' + value"></span>
        <div>{{ value? value.toUpperCase() : '' }}</div>
    </label>
</template>

