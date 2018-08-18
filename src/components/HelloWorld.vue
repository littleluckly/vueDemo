<template>
	<div class="hello">
		<!-- <h1>{{ msg }}</h1> -->
		<div>count: {{count}}</div>
		<!-- <div>{{anotherCount}}</div> -->
		<div>aliasCount: {{aliasCount}}</div>
		<el-button type="primary" @click="increment">立即增加2</el-button>
		<!-- <el-button type="primary" @click="asyncIncrement1">1s后增加</el-button> -->
		<!-- <el-button type="primary" @click="add">2s后加2</el-button> -->
		<!-- <el-button type="primary" @click="increment4">增加4</el-button> -->
	</div>
</template>

<script>
	import Vue from "vue"
	import {
		Button
	} from "element-ui";
	Vue.use(Button);
	import { createNamespacedHelpers } from 'vuex';
	const { mapState,mapActions } = createNamespacedHelpers('helloWorldStore');
	// import { mapState,mapActions } from 'vuex';
	export default {
		name: "HelloWorld",
		data(){
			return {
				testData:'testData'
			}
		},
		props: {
			msg: String
		},
		// computed: mapState(["count"]),
		// computed: mapState({
		// 	aliasCount: ({helloWorldStore})=>helloWorldStore.count,
		// 	count: ({helloWorldStore})=>helloWorldStore.count,
		// 	// anotherCount: state => state.count+2
		// }),
		computed:{
			// ...mapState({
			// 	aliasCount: ({helloWorldStore})=>helloWorldStore.count,
			// 	count: ({helloWorldStore})=>helloWorldStore.count,
			// })
			// ...mapState('helloWorldStore',{
			// 	aliasCount: (state)=>state.count,
			// 	count: (state)=>state.count+2,
			// })
			...mapState({
				aliasCount: (state)=>state.count,
				count: 'count',
			})
		},
		methods: {
			...mapActions([
				'asyncIncrement1',
				"increment"
			]),
			// ...mapActions([
			// 	'asyncIncrement1'
			// ]),
			...mapActions({
				add: 'asyncIncrement2'
			}),
			// increment4() {
			// 	this.$store.dispatch({
			// 		type: 'asyncIncrement1',
			// 		amount: 4
			// 	})
			// }
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
