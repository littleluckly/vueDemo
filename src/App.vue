<template>
	<div id="app">
		<el-container>
			<el-header>
				<Header/>
			</el-header>
			<el-main>
				<router-link to="/">Home</router-link> |
				<router-link to="/about">About</router-link>
				<router-view/>
			</el-main>
			<el-footer>Footer</el-footer>
		</el-container>
	</div>
</template>

<script>
	import Header from './views/Header.vue'
	export default{
		components:{
			Header
		},
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
