
<template>
	<div class="about">
		<h1>{{title}}</h1>
		<el-button>默认按钮</el-button>
		<el-button type="primary" @click.native="changeTitle({newTitle:'我是新的顶顶顶顶顶'})">改变标题</el-button>
		<el-button type="success">成功按钮</el-button>
		<el-button type="info">信息按钮</el-button>
		<el-button type="warning">警告按钮</el-button>
		<el-button type="danger">危险按钮</el-button>
	</div>
</template>

<script>
	import {
		createNamespacedHelpers
	} from 'vuex';
	const {
		mapState,
		mapActions
	} = createNamespacedHelpers('aboutStore');

	export default {
		computed: {
			...mapState(['title'])
		},
		methods: {
			...mapActions(['changeTitle'])
		}
	}
</script>