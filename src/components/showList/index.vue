<script lang="ts">
    export default {
        name: "ShowList",
        props: {todos: {type: Object}},
    }
</script>

<template>
      <div class="list">
        <div v-for="todo in todos" :class="`todo-item ${todo.done  && 'done'}`"> 
            <label>
                <input type="checkbox" 
                    @click="
                        todo.done = !todo.done; 
                        this.$emit('doneOne', todo)" 
                    v-model="todo.done"/>
                <span :class="`bubble ${todo.category}`"></span>
            </label>

            <div class="todo-content">
                <input type="text" v-model="todo.content" /> 
                | {{ todo.category }} 
                | {{ new Date(todo.createdAt).toUTCString() }} 
                | Finished: {{ !todo.finishedAt ? '' : new Date(todo.finishedAt).toUTCString() }}
            </div>

            <div class="actions">
                <button class="edit">Detail</button>
                <button class="delete" @click="$emit('deleteTodo', todo)">Delete</button>
            </div>
        
        </div>
      </div>
</template>