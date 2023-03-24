<script lang="ts">
export default {
	name: 'NotiBox',
	props: {
		notiType: { type: String },
		notification: { type: String },
	},
};
</script>

<template>
	<div class="notification" :id="notiType" v-if="notification" @click="this.$emit('closeNoti')">
		{{ notification }} <br/> <br/>
        <small style="font-size: 1rem; margin-top: 20px;">Click anywhere to close</small>
	</div>
</template>

<style scoped>
.notification {
	position: fixed;
	width: 70vw;
	height: 70vh;
	top: 15vh;
	left: 15vw;
	display: flex;
    flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 3rem;
	border-radius: 10px;

	z-index: 1;
	background-color: rgba(255, 255, 255, 0.7);
	backdrop-filter: blur(10px);
	border: solid 10px lime;
}

#wating {
	border: solid 10px #54B4D3;
}

#error {
	border: solid 10px red;
}
</style>
