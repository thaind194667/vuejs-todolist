
<template>
    <div class="list">
        <div v-for="todo in props.todos" :key="todo.id" :class="`todo-item ${todo.done  && 'done'}`"> 

            <label>
                <input type="checkbox" @click="setDone(todo)" :checked="todo.done"/>
                <span :class="`bubble ${todo.category}`"></span>
            </label>

            <div class="todo-content">
                <h3 :class="todo.done ? 'finished': ''"> {{ todo.title }} </h3>
                <h4> ||| {{ todo.content }}</h4>
                <p>{{ todo.createdAt  ? "&emsp;&nbsp;Begin at : " + new Date(todo.createdAt).toLocaleString()  : '' }}  </p>
                <p>{{ todo.finishedAt ? 'Finished at : '          + new Date(todo.finishedAt).toLocaleString() : '' }}  </p>
            </div>

            <div class="actions">
                <button class="edit" @click=" edit(todo)">Detail</button>
                <button class="delete" @click="deleteTodo(todo)">Delete</button>
            </div>
      
        </div>
    </div>
</template>

<script lang="ts" setup>

import { defineEmits, defineProps } from 'vue';

const emit = defineEmits(['edit', 'deleteTodo', 'setDone'])

const props = defineProps({
    todos: Object
})

const edit = (todo: Object) => {
    emit('edit', todo)
}

const deleteTodo = (todo: Object) => {
    emit('deleteTodo', todo)
}

const setDone = (todo: any) => {
    emit('setDone', todo)
}

</script>

<style lang="scss" scoped>

h3 {
    font-weight: bold;
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
}

h4 {
    font-size: 1.2rem;
}

.finished {
    text-decoration: line-through;
}

.todo-content {
    // width: 100vh;
    width: 100%;
    word-break:break-all;
}

</style>
