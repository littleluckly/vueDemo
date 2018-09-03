<template>
	<div id="app">
		<el-container>
			<el-header v-if="username">
				<Header/>
			</el-header>
			<el-main class="mainWrap"> 
				<router-view/>
			</el-main>
			<el-footer v-if="username">Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
	import jsCookie from 'js-cookie'
	import Header from './components/Header.vue'
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
		data(){
			return {
				username: ''
			}
		},
		created() { 
            this.username=jsCookie.get('username') ;
		},
		computed: { 
			// username2: function(){
			// 	return this.username+'test'
			// }
		},
		methods: { 
		}
	}
</script>

<style >
	@import "./assets/icon/iconfont.css";
	body{
		background: #f2f2f2;
	}
	#app {
		width: 1300px;
		margin: 0 auto;
		background-color: #f2f2f2;
	}
	.el-container{
		flex-direction: column;
	}
	.el-header,
	.el-footer {
		background-color: #fff;
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
		margin-top: 10px;
		padding-left: 0;
		/* background-color: #fff; */
		color: #333;
		text-align: center;
		min-height: calc(100vh - 50px);
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
