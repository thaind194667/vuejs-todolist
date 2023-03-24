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
                <input type="text" v-model="todo.title" />
                -- {{ todo.category ? todo.category : 'unknow' }} -- {{ todo.id }}
                -- {{ todo.createdAt ? new Date(todo.createdAt).toLocaleString() : '' }} <br/>
                 {{ !todo.finishedAt ? '' : 'Finished at : ' +  new Date(todo.finishedAt).toLocaleString() }}
            </div>

            <div class="actions">
                <button class="edit" @click=" $emit('edit', todo)">Detail</button>
                <button class="delete" @click="$emit('deleteTodo', todo)">Delete</button>
            </div>
        
        </div>
      </div>
</template>