<script lang="ts">

export default {
	name: 'EditForm',
    props: {
        todo: {type: Object},
		categories: {type: Array<String>}
    },

};
</script>

<template>
	<form @submit.prevent class = 'edit-form'>

		<input style="text-align: center; font-size: 5rem; font-weight: bolder;" type="text" placeholder="Title?" v-model="todo!.title" required />
		
		<input style="text-align: center; font-size: 3rem; height: 30vh;" type="text" placeholder="Doing something?" v-model="todo!.content" required />
		
        <div class="options">
			<div v-for="Type of categories">
				<label>
					<input type="radio" name="category" :value="Type" v-model="todo!.category"/>
					<span :class="'bubble ' + Type"></span>
					<div>{{ Type ? Type.toUpperCase() : '' }}</div>
				</label>
			</div>
		</div>

        <div style="width: 100%; text-align: center; font-size: 1.2rem;"> 
            Begin: {{ todo!.createdAt ? new Date(todo!.createdAt).toLocaleString() : '--/--/--' }} <br/>
            Finish: {{ todo!.finishedAt ? new Date(todo!.finishedAt).toLocaleString() : '--/--/--' }} <br/>
        </div>
        <div style="text-align: center; display: inline-block;" >
            <button class="edit" @click="$emit('edit', todo)">Edit</button>
            <button class="delete" @click="$emit('cancel')">Cancel</button>
        </div>
	</form>
</template>

<style scoped>

input {
	color: var(--dark);
}

.edit-form {
	position: fixed;
	display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 3rem;

	width: 90vw;
	height: 90vh;
	top: 5vh;
	left: 5vw;

	z-index: 1;
	background-color: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(10px);
    
	border: solid 10px lime;
	border-radius: 10px;
}
.options {
	text-align: center;
	align-items: center;
	justify-content: center;
}

button {
	display: inline-block;
    min-width: 5vw;
	padding: 0.5rem;
	border-radius: 0.25rem;
	color: #FFF;
	cursor: pointer;
    font-size: 1.5rem;
	transition: 0.2s ease-in-out;
}

button:hover {
	opacity: 0.75;
}

.edit {
	margin-right: 0.5rem;
	background-color: var(--primary);
}

.delete {
	background-color: var(--danger);
}
</style>
