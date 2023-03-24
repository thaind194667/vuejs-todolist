

<script setup>

import {ref, onMounted, computed, watch, onBeforeMount} from 'vue'

import AddnewForm from './components/addnewForm/index.vue'
import ShowList from './components/showList/index.vue'

const todos = ref([]);
const name = ref('')

const todoAsc = computed(() => todos.value.sort((a,b) => {
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}))

const addTodo = (inputContent, inputCategory) => {

  console.log("addTodo");

  todos.value.push({
    content: inputContent,
    category: inputCategory,
    done: false,
    createdAt: new Date(),
    finishedAt: ''
  })
}

const removeTodo = (todo) => {
  todos.value = todos.value.filter(t => t !== todo)
}

const checkDone = (todo) => {
  if(!todo.done) {
    // console.log("not done");
    todo.finishedAt = ''
  }
  else todo.finishedAt = new Date() 
}

watch(name, (newVal) => {
  localStorage.setItem('name', newVal);
})

watch(todos, newVal => {
  localStorage.setItem('todos', JSON.stringify(newVal));

}, {deep: true})

onBeforeMount(() => { /// created
  console.log("creating..");
}) 

onMounted(() => {     /// mounted
  console.log("mouted");
  name.value = localStorage.getItem('name') || ''
  todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

</script>

<template>
  <main class="app">
    <section class="greeting">
      <h1 class="title">
        Hey, <input type="text" placeholder="Name" v-model="name" />
      </h1>
    </section>

    <section class="create-todo">
      <h2>Create todo</h2>

      <AddnewForm @addNew="addTodo"> </AddnewForm>
      
    </section>

    <section class="todo-list">
      <h2>TODO list</h2>
      <ShowList :todos="todoAsc" @deleteTodo="removeTodo" @doneOne="checkDone"></ShowList>
    </section>

  </main>
</template>

