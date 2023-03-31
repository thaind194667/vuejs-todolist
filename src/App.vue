<script setup>
import { ref, onMounted, computed, watch, onBeforeMount } from 'vue';
import axios from 'axios';

import AddnewForm from './components/addnewForm/index.vue';
import ShowList from './components/showList/index.vue';
import NotiBox from './components/notificationBox/index.vue';
import EditForm from './components/editForm/index.vue';

const todos = ref([]);
const name = ref('');

const notification = ref('');
const notiType = ref('wating');

const add = ref(false);
const edit = ref('');

const categories = ['business', 'personal']

const todoAsc = computed( () =>
	todos.value.sort((a, b) => {
		return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
	}),
);

const waitForRespone = () =>  notification.value = 'Processing ....'

const hasError = () => {
	notification.value = 'Error has occurred! ';
	notiType.value = 'error'
}

const getData = () => {
	axios.get('https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note')
		.then((respone) => {
			if (respone.status === 200) {
				todos.value = respone.data
				console.log(respone.data);
			}
		})
		.catch((error) => console.error(error));
}

const postData = (title, content, category) => {
	waitForRespone()
	axios.post('https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note', {
			title: title,
			content: content,
			category: category,
			done: false,
			createdAt: new Date(),
			finishedAt: '',
		})
		.then((respone) => {
			if (respone.status === 201) {
				notiType.value = 'add';
				notification.value = 'Add new successfully';
				add.value = false;
				getData();
			}
		})
		.catch((error) => console.error(error));
}

const putData = (todo) => {
	waitForRespone()
	axios.put(`https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note/${todo.id}`, todo)
		.then((respone) => {
			if (respone.status === 200) {
				edit.value = '';
				notiType.value = 'edit';
				notification.value = 'Change saved';
			}
		})
		.catch((error) => console.error(error));
}

const deleteData = (todo) => {
	waitForRespone()
	axios.delete(`https://641d13f31a68dc9e461685d0.mockapi.io/api/todos/note/${todo.id}`)
		.then((respone) => {
			if (respone.status === 200) {
				// alert('Delete successfully!');
				notiType.value = 'delete';
				notification.value = 'Delete successfully';
				getData();
			}
		})
		.catch((error) => console.error(error));
}

const checkDone = (todo) => {
	todo.finishedAt = todo.done ? new Date() : ''
	putData(todo);
}

const closeNoti = () => {
	notification.value = '';
	notiType.value = 'wating';
}

const setEdit = (todo) => {
	edit.value = todo;
}

watch(name, (newVal) => {
	localStorage.setItem('name', newVal);
});

watch(todos,  (newVal) => localStorage.setItem('todos', JSON.stringify(newVal)) , 
	{ deep: true }
);

onBeforeMount(() => {
	/// created
	console.log('creating..');
	getData();
});

onMounted(() => {
	/// mounted
	console.log('mouted');
	name.value = localStorage.getItem('name') || ''
});

</script>

<template>
	<main class="app">
		<section class="greeting">
			<h1 class="title">Hey, <input type="text" placeholder="(input your name here)" v-model="name" /></h1>
		</section>

		<section class="create-todo">
			<input v-if="!add" type="submit" value="Add todo" @click="add = true"/>
			<fieldset v-if="add" >
				<legend><h2 style="margin-bottom: 10px">Create todo</h2></legend>
				<AddnewForm :categories="categories" @addNew="postData" @cancle="add = false"> </AddnewForm>
			</fieldset>
		</section>

		<section class="todo-list">
			<fieldset v-if="todos.length !== 0">
				<legend>
					<h2>TODO list</h2>
				</legend>
				<ShowList :todos="todoAsc" @deleteTodo="deleteData" @doneOne="checkDone" @edit="setEdit"></ShowList>
			</fieldset>

			<div v-else style="text-align: center; font-size: 2rem;"> Nothing here, yet! <br /> </div>

			<fieldset v-if="edit" >
				<!-- <legend><h2 style="margin-bottom: 10px">Create todo</h2></legend> -->
				<EditForm :categories="categories" @edit="putData" @cancel="edit = ''" :todo="edit"> </EditForm>
			</fieldset>
		</section>

		<NotiBox :notiType="notiType" :notification="notification" @closeNoti="closeNoti"></NotiBox>

	</main>
</template>

