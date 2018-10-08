<template>
	<div id="app">
		<el-container>
			<el-header v-if="headerVisible">
				<Header/>
			</el-header>
			<el-main class="mainWrap" :class="{active:headerVisible}">
				<router-view/>
			</el-main>
		</el-container>
	</div>
</template>

<script>
	import jsCookie from 'js-cookie'
	import Header from './components/Header.vue'
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		components: {
			Header
		},
		data() {
			return {
				mainStyle:{}
			}
		},
		created() {
			// 页面刷新时从cookie获取登陆信息保存在vuex中
			this.toggleUsername({
				username: jsCookie.get('username')
			});
			this.$store.commit('saveToken', jsCookie.get('token'))
			if (this.$route.name !== 'perCenter' && this.$route.name !== 'Login') {
				this.toggleHeaderVisible(true)
			} else {
				this.toggleHeaderVisible(false)
			};
		},
		computed: {
			...mapState({
				headerVisible: state => {
					return state.headerVisible;
				}
			})
		},
		methods: {
			...mapActions([
				'toggleHeaderVisible',
				'toggleUsername'
			])
		},
		watch: {
			'$route' (to, from) {
				// 登陆页、个人中心页不需要显示Header组件
				if (to.name !== 'perCenter' && to.name !== 'Login') {
					this.toggleHeaderVisible(true)
				} else {
					this.toggleHeaderVisible(false)
				}
			}
		}
	}
</script>

<style lang="less">
	@import "./assets/icon/iconfont.css";
	html,
	body,
	#app {
		height: 100%;
	}
	body {
		background: #f2f2f2;
		margin: 0;
	}
	#app {
		width: 1300px;
		margin: 0 auto;
		background-color: #f2f2f2;
	}
	.el-container {
		flex-direction: column;
	}
	.el-header {
		position: fixed;
		padding: 0;
		height: 60px;
		width: 1300px;
		background-color: #fff;
		color: #333;
		text-align: center;
		line-height: 60px;
		z-index: 10000;
		box-shadow: 0 2px 1px 1px #ddd;
	}
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		text-align: center;
		line-height: 200px;
	}
	.el-main {
		padding: 0;
		color: #333;
		text-align: center;
		min-height: calc(100vh - 50px);
	}
	.mainWrap.active{
		margin-top: 70px;
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
