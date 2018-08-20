<template>
	<div class="home">
		<el-container>
			<el-header>
				<Header/>
			</el-header>
			<el-main>
				<div>我是首页</div>
				<HelloWorld msg="Welcome to Your Vue.js App" />
				<router-view></router-view>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
		<!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import Header from './Header.vue'
	export default {
		name: 'home',
		components: {
			HelloWorld,
			Header
		},
		// beforeRouteEnter(to, from, next) {
		// 	next({
		// 		path: '/login',
		// 		query: {
		// 			redirect: to.fullPath
		// 		} //把要跳转的地址作为参数传到下一步
		// 	})
		// },
	}
</script>

