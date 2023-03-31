<script lang="ts">

export default {
	name: 'AddnewForm',

	props: {
		categories: {type: Array<String>}
	},

	data() {
		return {
			title: '',
			content: '',
			category: null,
		};
	},

	methods: {
		sent() {
			if (this.category === null|| this.title === '' || this.content === '') return;
			this.$emit('addNew', this.title, this.content, this.category);
			this.content = '';
			this.category = null;
			this.title = '';
		},
		
	},
};
</script>

<!-- <script setup>
import {ref} from 'vue'

const category = ref(null);
const title = ref('');
const content = ref('');

const emit = defineEmits(['addNew'])

const getChoice = (value) => {
	category.value = value;
	console.log(value);
}

const sent = () => {
	if (category.value === null|| title.value === '' || content.value === '') return;
	emit('addNew', title.value, content.value, category.value);
	content.value = '';
	category.value = null;
	title.value = '';
}

</script> -->

<template>
	<form @submit.prevent class="edit-form">
		<h3 style="text-align: center; font-size: 2rem"><b>Making new note</b></h3>
		<input type="text" placeholder="Title?" v-model="title" />
		<input type="text" placeholder="Doing something?" v-model="content" />

		<h3 style="font-size: 1.3rem"><b>Category?</b></h3>
		<div class="options">
			<div  v-for="Type of categories">
				<label>
					<input type="radio" name="category" :value="Type" v-model="category"/>
					<span :class="'bubble ' + Type"></span>
					<div>{{ Type ? Type.toUpperCase() : '' }}</div>
				</label>
			</div>
			<!-- <p>{{ category || '' }}</p> -->
			<div style="position: relative; display: inline-block; left: 50%">
				<input name = "add" type="submit" value = "Add todo" @click="sent"/>
				<input name = "add" type="submit" value = "Cancle" @click="$emit('cancle')"/>
			</div>
            
		</div>
	</form>
</template>

<style scoped>
.options {
	text-align: center;
	align-items: center;
	justify-content: center;
}

input[type="submit"] {
    display: inline-block;
    margin-bottom: 5px;
}
</style>
