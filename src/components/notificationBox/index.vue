<template>
	<div class="notification" :id="props.notiType" v-if="props.notification" @click="close">
		{{ props.notification }} <br/> <br/>
        <small v-if="props.notiType !== 'waiting'">Click anywhere to close</small>
		<div class="btn-field" v-if="props.notiType === 'deleteConfirm'">
			<button class="confirm-delete-btn" @click="confirmDelete">	Delete	</button>
			<button class="cancel-delete-btn" @click="cancelDelete">	Cancel	</button>
		</div> 
	</div>
</template>

<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closeNoti', 'confirmDelete']);

const props = defineProps({
	notiType: { type: String},
	notification: { type: String },
})

const close = () => {
	if(props.notiType !== 'waiting')
		emit('closeNoti')
}

const confirmDelete = () => {
	emit('confirmDelete');
}

const cancelDelete = () => {
	emit('closeNoti');
}

</script>

<style lang="scss" scoped>

@use '../../base';

@mixin border($color: lime, $thick: 10px) {
	border: solid $thick $color;
	border-radius: $thick;
}

.notification {
	@include base.fullpage;
	@include base.flexbox;
	@include border;

	font-size: 4rem;
}

#waiting {
	@include border($color:#54B4D3);
}

#error {
	@include border($color: red);
}

small {
	font-size: 0.85rem; 
	margin-top: 20px;
}

button {
	display: inline-block;
	min-width: 7vw;
	padding: 0.5rem;
	border-radius: 0.25rem;
	font-size: 1.6rem;
	color: rgb(255, 255, 255);
	transition: 0.2s ease-in-out;
	margin: 0.5rem;
	border-radius: 0.5rem;
	// background-color: red;

	&:hover {
		opacity: 0.7;
		cursor: pointer;
		color: gray;
	}
	
}
.confirm-delete-btn {
	background-color: rgb(255, 0, 51);
}

.cancel-delete-btn {
		background-color: rgb(255, 221, 0);
	}


</style>
