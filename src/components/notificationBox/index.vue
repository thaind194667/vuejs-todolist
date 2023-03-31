<template>
	<div class="notification" :id="props.notiType" v-if="props.notification" @click="close">
		{{ props.notification }} <br/> <br/>
        <small v-if="props.notiType !== 'waiting'">Click anywhere to close</small>
	</div>
</template>

<!-- <script lang="ts">
export default {
	name: 'NotiBox',
	props: {
		notiType: { type: String },
		notification: { type: String },
	},
};
</script> -->

<script lang="ts" setup>

import { defineProps, defineEmits } from 'vue';

const emit = defineEmits(['closeNoti']);

const props = defineProps({
	notiType: { type: String},
	notification: { type: String },
})

const close = () => {
	if(props.notiType !== 'waiting')
		emit('closeNoti')
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


</style>
