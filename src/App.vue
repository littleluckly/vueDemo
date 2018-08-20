<template>
	<div id="app">
		<el-container>
			<el-header v-if="loginStatus">
				<Header/>
			</el-header>
			<el-main>
				<router-view/>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
	import jsCookie from 'js-cookie'
	import Header from './views/Header.vue'
	import {
		createNamespacedHelpers
	} from 'vuex'
	const {
		mapActions
	} = createNamespacedHelpers('loginStore')
	export default {
		components: {
			Header
		},
		// data(){
		// 	return {
		// 		loginStatus: jsCookie.get('auth')
		// 	}
		// }
		beforeCreate() {
			const {
				dispatch
			} = this.$store;
			dispatch({
				type: 'toggleLoginStatus',
				flag: jsCookie.get('auth')
			})
		},
		computed: {
			loginStatus(ctx) {
				return this.$store.getters['loginStore/loginStatus']
			}
		},
		methods: {
			...mapActions(['toggleLoginStatus'])
		}
	}
</script>

<style scoped>
	#app {
		width: 1300px;
		margin: 0 auto;
	}
	.el-header,
	.el-footer {
		/* background-color: #B3C0D1; */
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		/* line-height: 160px; */
	}
	body>.el-container {
		margin-bottom: 40px;
	}
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
