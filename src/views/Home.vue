<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
		<!-- <div>我是首页</div> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<div class="contentWrap">
			<div class="contentBlock" v-for="item in homepageList.data" :key="item.id">
				<div class="blockTop">
					<div class="authorSrc"><img :src="item.authorImgSrc" /></div>
					<div class="blockTitle">
						<div>{{item.authorName}}</div>
						<div>{{item.laughTitle}}</div>
					</div>
				</div>
				<div class="blockContent">
					<p v-if="item.type==='text'">{{item.laughText}}</p>
					<img v-else :src="item.laughImgSrc" />
				</div>
				<div class="blockBottom">
				</div>
			</div>
		</div>
		<el-pagination background layout="prev, pager, next" :total="homepageList.total" @current-change="currentChange">
		</el-pagination>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import axios from 'axios'
	import {
		mapState
	} from 'vuex'
	export default {
		name: 'home',
		components: {
			HelloWorld
		},
		data() {
			return {
				items: {}
			}
		},
		computed: mapState({
			homepageList: (state) => {
				return state.homepageStore.homepageList
			}
		}),
		created() {
			this.fetchHomepageList()
		},
		methods: {
			currentChange(currPage) {
				this.fetchHomepageList(currPage)
			},
			fetchHomepageList(pageNo) {
				axios({
					method: 'post',
					url: '/homepage/hot',
					data: {
						pageNo: pageNo || 1,
						pageSize: 10
					}
				}).then((res) => {
					const {
						dispatch,
						commit
					} = this.$store;
					dispatch('homepageStore/fetchHomepageList', res.data)
					//设置一个定时器
					var timer = setInterval(function(){
						//获取滚动条的滚动高度
						var osTop = document.documentElement.scrollTop || document.body.scrollTop;
						//用于设置速度差，产生缓动的效果
						var speed = Math.floor(-osTop / 6);
						document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
						// isTop =true;  //用于阻止滚动事件清除定时器
						if(osTop <= 0){
							clearInterval(timer);
						}
					},30); 
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.contentWrap {
		width: 645px;
		.contentBlock {
			margin-bottom: 20px;
			padding: 15px;
			background: #fff;
			.blockTop {
				display: flex;
				.authorSrc {
					width: 45px;
					height: 45px;
					img {
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.blockTitle {
					flex: 1;
					padding-left: 10px;
					text-align: left;
				}
			}
			.blockBottom {
				height: 44px;
				background-color: #FBFBFB;
				border-top: 1px solid #eaeaea;
				padding: 5px 10px 5px 0px;
				position: relative;
			}
		}
	}
</style>


