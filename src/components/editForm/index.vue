<template>
	<Form class='edit-form' v-slot="{meta, errors}">

		<Field as="textarea" name="title" rules="required" class="title" placeholder="Title?" v-model="editValue.title" />
		<!-- <ErrorMessage name="title" /> -->
		<div class="main-content">
			<Field as="textarea" name="content" class="content" rules="required" placeholder="Doing something?" v-model="editValue.content" />
			<!-- <ErrorMessage name="content" /> -->
			<div class="options category">
				<div v-for="(value, index) in categories" :key="index">
					<label>
						<Field type="radio" name="category" rules="required" :value="value" v-model="editValue.category"/>
						<span :class="'bubble ' + value"></span>
						<div>{{ value ? value.toUpperCase() : '' }}</div>
					</label>
				</div>
			</div>

			<div class="date"> 
				Begin: {{ editValue.createdAt ? new Date(editValue.createdAt).toLocaleString() : '--/--/--' }}   |
				Finish: {{ editValue.finishedAt ? new Date(editValue.finishedAt).toLocaleString() : '--/--/--' }} <br/>
			</div>
		</div>

        <div class="action" >
            <button class="edit" @click="send(editValue)" :disabled="!meta.valid">Edit</button>
            <button class="delete" @click="reset(); ">Cancel</button>
        </div>
		<div class="errorNoti" v-if="Object.values(errors).length">
			<p>{{ errors.content?.toUpperCase() }}</p>
			<p>{{ errors.title?.toUpperCase() }}</p>
		</div>
	</form>
</template>

<script lang="ts" setup>

import {ref, defineProps, onBeforeMount, onMounted, h} from 'vue'
import {Form, Field, defineRule} from 'vee-validate'

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

const emit = defineEmits(['edit', 'cancel'])

const props = defineProps({
	todo: {type: Object, required: true},
	categories: Array<String>
})

const editValue = ref({...props.todo})

onBeforeMount(() => {
	console.log("creating");
	
	console.log(editValue);
})

onMounted(() => {
	console.log("mounting");
	
	console.log(editValue.value);
	
})

const send = (todo: Object) => {
	emit('edit', todo)
}

const reset = () => {
	emit('cancel')
}

</script>

<style scoped lang="scss">

@use '../../base';

.edit-form {
	@include base.flexbox;
	@include base.fullpage();
	font-size: 3rem;
	border: solid 0.8rem lime;
	border-radius: 1rem;
	overflow: visible;
	word-break:keep-all;

	textarea {
		resize: vertical;
		padding: 0;
	}

	.title {
		text-align: center; 
		font-size: 5rem; 
		font-weight: bolder;
		width: 100%;
		background-color: rgba(216, 212, 177, 0.8);
	}

	.main-content {
		width: 100%;
		background-color: rgba(176, 236, 234, 0.8);
		.content {
			text-align: center; 
			font-size: 2.5rem; 
			vertical-align: center;
			min-height: 50vh;
			width: 100%;
		}
		.date {
			width: 100%; 
			text-align: center; 
			font-size: 1.3rem;
			margin-bottom: 1rem;
		}
	}

	button {
		display: inline-block;
		min-width: 7vw;
		padding: 0.5rem;
		border-radius: 0.25rem;
		color: #FFF;
		font-size: 1.6rem;
		transition: 0.2s ease-in-out;
		margin: 0.5rem;

		&:hover {
			opacity: 0.7;
			cursor: pointer;
		}

		
	}

	.action {
		text-align: center; 
		display: inline-block;
		background-color: rgba(216, 212, 177, 0.8);
		width: 100%;
		.edit {
			margin-right: 0.5rem;
			background-color:#ea40a9;

			&:disabled {
				background-color: gray;
				opacity: 1;
				cursor: default;
			}
		}
		.delete {
			background-color: var(--danger);
		}
	}

	.errorNoti {
		background-color: rgba(rgb(254, 82, 82), 0.9);
		font-size: 1.5rem;
		position: absolute;
		left:0;
		bottom: 0;
		height: 8.5vh;
		width: 50%;
		z-index: 2;
		text-align: center;
		@include base.flexbox;
	}

}

</style>
