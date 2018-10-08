<template>
	<div class="home">
		<!-- <img alt="Vue logo" src="@/assets/logo.png"> -->
		<!-- <div>我是首页</div> -->
		<!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
		<div class="contentWrap">
			<div class="contentBlock" v-for="(item,idx) in homepageList.data" :key="item.id">
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
					<!-- 点赞 -->
					<span class="likeIcon" :class="{active:item.hasLike=='like'}" @click="handleLike(item.hasLike,item.id,'like')">
							<i class="icon iconfont icon-like"></i>{{item.likeCount}}
							<transition name="like">
								<span class="like" style="display: inline-block;" v-if="item.likeVisible">+1</span>
					</transition>
					</span>
					<!-- 点踩 -->
					<span class="dislikeIcon" :class="{active:item.hasLike=='dislike'}" @click="handleLike(item.hasLike,item.id,'dislike')">
							<i class="icon iconfont icon-dislike"></i>{{item.dislikeCount}}
							<transition name="like">
								<span class="like" style="display: inline-block;" v-if="item.dislikeVisible">+1</span>
					</transition>
					</span>
					<span class="commentIcon" @click="showCommentList(item, item.commentVisible,idx)"><i class="icon iconfont icon-pinglun"></i>{{item.commentCount}}</span>
					<span class="shareIcon"><i class="icon iconfont icon-fenxiang"></i></span>
				</div>
				<!-- 评论 -->
				<div class="commentsWrap" :class="{commentHidden:!item.commentVisible}">
					<div class="commentInputWrap">
						<textarea v-model="curCommenContent['content_'+idx]" class="commentInput" placeholder="说点什么吧，期待您的神回复！"></textarea>
						<div class="commentOper">
							<span class="inputTip">还可以输入<span>300</span>字</span>
							<el-button @click="handleCommentLaugh(item.id,idx)" type="danger">评论</el-button>
						</div>
					</div>
					<div class="commentsHistory">
						<ul>
							<li class="historyCommentItem" v-for="(item) in item.commentList" :key="item.id">
								<div class="comItemImg"><img src="https://avatar.pengfu.com/small/848/6178848.jpg" /></div>
								<div class="comItemContent">
									<div class="comItemAuthor">{{item.username}}</div>
									<div>{{item.content}}</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<el-pagination background layout="prev, pager, next" :total="homepageList.total" @current-change="handleChangePage">
		</el-pagination>
	</div>
</template>


<script>
	// @ is an alias to /src
	import HelloWorld from "@/components/HelloWorld.vue";
	import {
		mapState,
		mapActions
	} from "vuex";
	export default {
		name: "home",
		components: {
			HelloWorld
		},
		data() {
			return {
				curCommenContent: {}
			};
		},
		computed: {
			...mapState({
				homepageList: state => {
					return state.homepageStore.homepageList;
				}
			})
		},
		created() {
			this.fetchHomepageList();
		},
		methods: {
			...mapActions("homepageStore", [
				"fetchHomepageList",
				"changeHomepageList",
				"toggleLikeVisible",
				"publishComment",
				"fetchCommentList"
			]),
			handleChangePage(currPage) {
				this.fetchHomepageList(currPage);
			},
			showCommentList: async function(comment, commentVisible) {
				this.changeHomepageList(comment.id);
				if (!commentVisible) {
					await this.fetchCommentList({
						laughId: comment.id
					});
				}
			},
			handleCommentLaugh: async function(laughId, idx) {
				await this.publishComment({
					laughId,
					content: this.curCommenContent["content_" + idx]
				});
				this.curCommenContent["content_" + idx] = "";
			},
			handleLike: function(hasLike, id, type) {
				if (!hasLike) {
					this.toggleLikeVisible({
						id,
						type
					});
				}
			}
		},
		beforeEnter: (to, from, next) => {
			console.log(11111111, to, from, next);
		}
	};
</script>
<style scoped lang="less">
	.contentWrap {
		width: 645px;
		.contentBlock {
			margin-bottom: 20px;
			padding-top: 15px;
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
			.blockContent {
				padding: 0 15px;
			}
			.blockBottom {
				height: 44px;
				background-color: #fbfbfb;
				border-top: 1px solid #eaeaea;
				padding: 5px 10px 5px 0px;
				position: relative;
				text-align: left;
				&>span {
					position: relative;
					display: inline-block;
					width: 100px;
					line-height: 40px;
					text-align: center;
					cursor: pointer; // font-size: 28px;
					&.active {
						color: #ff6666;
					}
					&:hover {
						color: #ff6666;
					}
					&>i {
						margin-right: 6px;
					}
				}
			}
			.commentsWrap {
				margin-bottom: 5px;
				border-top: 1px solid #e0e0e0;
				padding: 15px;
				font-size: 0;
				.commentInputWrap {
					border: 1px solid #e0e0e0;
					.commentInput {
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
						box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.05) inset;
						font-size: 12px;
						&:focus {
							outline-offset: -2px;
						}
					}
					.commentOper {
						background-color: #f1f1f1;
						height: 40px;
						border-top: 1px solid #e0e0e0;
						position: relative;
						font-size: 12px;
						text-align: right;
						.inputTip {
							margin-right: 15px;
							&>span {
								color: #ff6666;
							}
						}
					}
				}
				&.commentHidden {
					display: none;
				} // 评论
				.commentsHistory {
					padding-top: 15px;
					&>ul {
						padding-left: 0;
						max-height: 450px;
						overflow: auto;
					}
					.historyCommentItem {
						display: flex;
						font-size: 14px;
						padding: 6px 10px 10px 10px;
						border-bottom: 1px solid #ddd;
						margin-bottom: 10px;
						.comItemImg {
							width: 40px;
							&>img {
								border-radius: 100%;
								width: 100%;
							}
						}
						.comItemContent {
							padding-left: 10px;
							text-align: left;
							flex: 1;
							.comItemAuthor {
								color: #2fae85;
							}
						}
					}
				}
			}
		}
	}
	.like {
		position: absolute;
		left: 40px;
		font-weight: bold;
	}
	.like-enter-active {
		transition: all 0.3s ease;
	}
	.like-enter-to {
		transform: scale(3.5);
		opacity: 0;
	}
	.like-leave-active {
		transition: all 0;
	}
	.like-leave {
		opacity: 0;
	}
</style>


