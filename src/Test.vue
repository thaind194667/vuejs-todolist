<script lang="ts">

import AddnewForm from './components/addnewForm/index.vue'
import ShowList from './components/showList/index.vue'

export default {
    name: "Test",
    data() {
        return {
            todos: [],
            name: ''
        }
    },

    components: {
        AddnewForm,
        ShowList
    },

    created() {
        console.log("creating..");
    },

    mounted() {
        console.log(typeof this.todos);
        console.log("mouted");
        this.name = localStorage.getItem('name') || ''
        var arr = localStorage.getItem('todos');
        
        this.todos = arr ? JSON.parse(arr) : []
    },

    methods: {
        addTodo(inputContent: String, inputCategory: String) {
            // console.log("addTodo");
            this.todos.push({
                content: inputContent,
                category: inputCategory,
                done: false,
                createdAt: new Date(),
            })
            // console.log(this.todos)
        },
        removeTodo(todo: Object) {
            this.todos = this.todos.filter((t: Object) => t !== todo)
        }
    },

    watch: {
        name: (newVal) => {
            localStorage.setItem('name', newVal);
        },
        todos: {
            deep: true,
            handler(newVal) {
                localStorage.setItem('todos', JSON.stringify(newVal));
            }
        }
    },

    computed: {
        todoAsc: function() {
            var arr = this.todos.sort( (a: { createdAt: string | number | Date; }, b: { createdAt: string | number | Date; }) => {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            return arr;
        }
    }
}
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

        <!-- {{ todos }} -->
        
      </section>
  
      <section class="todo-list">
        <h2>TODO list</h2>
        <ShowList :todos="todoAsc" @deleteTodo="removeTodo"></ShowList>
      </section>
  
    </main>
  </template>