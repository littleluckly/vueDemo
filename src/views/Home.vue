<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
		<div>我是首页</div>
		<HelloWorld msg="Welcome to Your Vue.js App" />
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	export default {
		name: 'home',
		components: {
			HelloWorld
		},
		// beforeRouteEnter (to, from, next) {
		// 	next({
		// 		path: '/login',
		// 		query: { redirect: to.fullPath }//把要跳转的地址作为参数传到下一步
		// 	})
		// },
	}
</script>

