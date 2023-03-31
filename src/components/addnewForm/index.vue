<template>
	<Form class="edit-form" v-slot="{meta}">
		<h3 class="form-header"><b>Making new note</b></h3>

		Title: 
		<Field as="textarea" name="title" class="input-field" rules="required|hasNumber" placeholder="Title?" v-model="title"/>
		<ErrorMessage name="title" /> <br/>

		Content: 
		<Field as="textarea" name="content" class="input-field" rules="required" type="text" placeholder="Doing something?" v-model="content" />
		<ErrorMessage name="content" />

		<h3>
			<b>Category?</b>
		</h3>
		<div class="options">
			<div  v-for="(value, index) in props.categories" :key="index">
				<label>
					<!-- <input type="radio" name="category" :value="value" v-model="category"/> -->
					<Field type="radio" name="category" :value="value" rules="required" v-model="category" /> 
					<span :class="'bubble ' + value"></span>
					<div>{{ value ? value.toUpperCase() : '' }}</div>
				</label>
			</div>
			<ErrorMessage name="category" />
		</div>

		<div class="btn-field">
			
			<input 
				type="submit" 
				class="add" 
				:id="!meta.valid ? 'disabled' : 'enabled'" 
				:disabled="!meta.valid" 
				value = "Add todo" 
				@click="sent"/>

			<input type="submit" class="cancel" value = "Cancle" @click="cancel"/>
		</div>

	</Form>
</template>

<!-- <script lang="ts">

import {Form, Field} from 'vee-validate'

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
</script> -->

<script lang="ts" setup>

import { ref, defineProps,} from 'vue';
import {Form, Field, ErrorMessage, defineRule} from 'vee-validate'

import { required, } from '@vee-validate/rules';

defineRule("required", required)
// defineRule("required", (value: String) => {
// 	if(value && value.trim()) return true;
// 	return 'This field is required!'
// });
defineRule("hasNumber", (value: any) => {
  if(/\d/.test(value))  {
		return "Title cannot have numbers!"
	}
  return true;
});

const props = defineProps({
	categories: Array<String>
})

const category = ref(null);
const title = ref('');
const content = ref('');

const emit = defineEmits(['addNew', 'cancelAdd'])

const sent = () => {
	emit('addNew', title.value, content.value, category.value);
	content.value = '';
	category.value = null;
	title.value = '';
}

const cancel = () => emit('cancelAdd');

</script>

<style scoped lang="scss">

h3 {
	font-size: 1.3rem;
}

textarea {

	resize: none;
}

.form-header {
	text-align: center; 
	font-size: 2rem;
}

.input-field {
	display: block;
	width: 100%;
	line-height: 3rem;
	font-size: 1.5rem;
	padding: 1rem 1.5rem;
	color: var(--dark);
	background-color: #FFF;
	border-radius: 0.5rem;
	box-shadow: var(--shadow);
	margin-bottom: 1.5rem;
}
.options {
	text-align: center;
	align-items: center;
	justify-content: center;
	
	// input[type="submit"] {
	// 	display: inline-block;
	// 	margin-bottom: 5px;
	// }
}

.btn-field {
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;

	input[type="submit"] {
		font-weight: bolder;
		font-size: 1.5rem;
		// width: 30vw;
		// height: 10vh;
		margin: 1rem;
		display: inline-block;
		width: 100%;
		font-size: 1.125rem;
		padding: 1rem 1.5rem;
		color: #FFF;
		border-radius: 0.5rem;
		box-shadow: var(--personal-glow);
		// cursor: pointer;
		transition: 0.2s ease-in-out;

		
		&:hover {
			cursor: pointer;
		}

	}

	.add {
		background-color: rgb(1, 187, 1);
	}

	.cancel {
		background-color: red;
	}

	#disabled {
		background-color: gray;
		color: rgb(91, 91, 91);
		opacity: 1;
		cursor: default;
	}

	#enabled {
		background-color: rgb(1, 187, 1);
		// color: white
	}
}

</style>
