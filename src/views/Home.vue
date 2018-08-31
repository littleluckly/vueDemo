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
					<span class="likeIcon" :class="{active:item.hasLike=='like'}" @click="handleLike(item.hasLike,item.id,'like')">
						<i class="icon iconfont icon-like"></i>{{item.likeCount}}
						<transition name="like">
							<span class="like" style="display: inline-block;" v-if="item.likeVisible">+1</span>
						</transition>
					</span>
					<span class="dislikeIcon" :class="{active:item.hasLike=='dislike'}" @click="handleLike(item.hasLike,item.id,'dislike')">
						<i class="icon iconfont icon-like"></i>{{item.likeCount}}
						<transition name="like">
							<span class="like" style="display: inline-block;" v-if="item.dislikeVisible">+1</span>
						</transition>
					</span>
					<span class="commentIcon" @click="handleComment(item)"><i class="icon iconfont icon-pinglun"></i>{{item.commentCount}}</span>
					<span class="shareIcon"><i class="icon iconfont icon-fenxiang"></i></span>
				</div>
				<div class="commentsWrap" :class="{commentHidden:!item.commentVisible}" >
					<div class="commentInputWrap">
						<textarea class="commentInput" placeholder="说点什么吧，期待您的神回复！"></textarea>
						<div class="commentOper">
							<span class="inputTip">还可以输入<span>300</span>字</span><el-button type="danger">评论</el-button>
						</div>
					</div>
					<div class="commentsHistory"></div>
				</div>
			</div>
		</div>
		<el-pagination background layout="prev, pager, next" :total="homepageList.total" @current-change="handleChangePage">
		</el-pagination>
	</div>
</template>

<script>
	// @ is an alias to /src
	import HelloWorld from '@/components/HelloWorld.vue'
	import axios from 'axios'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		name: 'home',
		components: {
			HelloWorld
		},
		data() {
			return {
				visibleColl: {},
				likeShow: false
			}
		},
		computed: mapState({
			homepageList: (state) => {
				return state.homepageStore.homepageList
			},
			getVisible: function (){
				return this.homepageList?this.homepageList.data:[]
			},
			comVisibleColl: function(){
				return this.visibleColl
			}
		}),
		created() {
			this.fetchHomepageList()
		},
		methods: {
			handleChangePage(currPage) {
				this.fetchHomepageList(currPage)
			},
            ...mapActions('homepageStore', [
				'fetchHomepageList',
				'changeHomepageList',
				'toggleLikeVisible'
			]),
			handleComment(comment){
				this.changeHomepageList(comment.id)
			},
			handleLike( hasLike, id, type ){
				if(!hasLike){
					this.toggleLikeVisible({id,type})
					// this.likeShow = true;
					// setTimeout(()=>{
						// this.likeShow = false;
					// },200)
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.contentWrap {
		width: 645px;
		.contentBlock {
			margin-bottom: 20px;
			padding-top:15px;
			background: #fff;
			.blockTop {
				display: flex;
				padding: 0 15px;
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
			.blockContent{
				padding: 0 15px;
			}
			.blockBottom {
				height: 44px;
				background-color: #FBFBFB;
				border-top: 1px solid #eaeaea;
				padding: 5px 10px 5px 0px;
				position: relative;
				text-align: left;
				&>span{
					position: relative;
					display: inline-block;
					width: 100px;
					line-height: 40px;
					text-align: center;
					cursor: pointer;
					// font-size: 28px;
					&.active{
						color: #ff6666;
					}
					&:hover{
						color: #ff6666;
					}
					&>i{
						margin-right: 6px;
					}
				}
			}
			.commentsWrap{
				margin-bottom: 5px;
    			border-top: 1px solid #e0e0e0;
				padding: 15px;
				font-size: 0;
				.commentInputWrap{
					border: 1px solid #e0e0e0;
					.commentInput{
						color: #808080;
						font-size: 14px;
						height: 78px;
						line-height: 26px;
						resize: none;
						text-indent: 5px;
						width: 100%;
						border: none;
						margin: 0;
						padding: 0;
						box-shadow: 0 1px 1px 1px rgba(0,0,0,0.05) inset;
						font-size: 12px;
						&:focus{
							outline-offset: -2px;
						}
					}
					.commentOper{
						background-color: #f1f1f1;
						height: 40px;
						border-top: 1px solid #e0e0e0;
						position: relative;
						font-size: 12px;
						text-align: right;
						.inputTip{
							margin-right: 15px;
							&>span{
								color: #ff6666
							}
						}
					}
				}
				&.commentHidden{
					display: none;
				}
			}

		}
	}
	.like{
		position: absolute;
		left: 40px;
		font-weight: bold;
	}
	.like-enter-active {
		transition: all .3s ease;
	}
	.like-enter-to{
		transform: scale(3.5);
		opacity: 0;
	}
	.like-leave-active{
		transition: all 0;
	}
	.like-leave{
		opacity: 0;
	}
</style>


