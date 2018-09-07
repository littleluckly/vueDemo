
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        homepageList: {},
        pagination: { },
        historyCommentList: {}
    },
    mutations: {
        fetchHomepageList (state, payload) {
            state.homepageList = payload;
        },
        changeHomepageList (state, payload) {
            state.homepageList.data = state.homepageList.data.map(comment => {
                if (comment.id === payload) {
                    comment.commentVisible = !comment.commentVisible;
                }
                return comment;
            });
        },
        paginationChange (state, payload) {
            state.pagination.pageNo = payload;
        },
        // 点赞或点踩
        toggleLikeVisible (state, payload) {
            const { type, id, pageNo } = payload;
            state.homepageList.data = state.homepageList.data.map(comment => {
                if (comment.id === id) {
                    comment[type + 'Visible'] = true;
                    comment.hasLike = type;
                }
                return comment;
            });
            setTimeout(() => {
                state.homepageList.data = state.homepageList.data.map(comment => {
                    if (comment.id === id) {
                        comment[type + 'Visible'] = false;
                    }
                    return comment;
                });
            }, 300);
        },
        // 获取评论列表
        fetchCommentList (state, payload) {
            const { laughId, historyCommentList } = payload;
            state.homepageList.data = state.homepageList.data.map(comment => {
                if (comment.id === laughId) {
                    comment.commentList = historyCommentList;
                }
                return comment;
            });
        }
    },
    actions: {
        fetchHomepageList ({commit}, pageNo) {
            const newPageNo = pageNo || 1;
            commit('paginationChange', newPageNo);
            axios({
                method: 'post',
                url: '/homepage/hot',
                data: {
                    pageNo: newPageNo,
                    pageSize: 10
                }
            }).then((res) => {
                commit('fetchHomepageList', res.data);
                // pageNo&&(document.documentElement.scrollTop = 0)
                // let timer = setInterval(function () {
                //     let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                //     let speed = Math.floor(-osTop / 6);
                //     document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
                //     if (osTop <= 0) {
                //         clearInterval(timer);
                //     }
                // }, 30);
            });
        },
        changeHomepageList ({commit}, payload) {
            commit('changeHomepageList', payload);
        },
        // 点赞点踩
        toggleLikeVisible ({commit, dispatch}, payload) {
            const { type, id, pageNo } = payload;
            axios({
                method: 'post',
                url: '/homepage/like',
                data: {
                    laughId: id,
                    type
                }
            }).then((res) => {
                if (res && res.data.message === '') {
                    commit('toggleLikeVisible', payload);
                    dispatch('fetchHomepageList', pageNo);
                }
            });
        },
        // 发表评论
        publishComment ({commit, dispatch, state}, payload) {
            const { pageNo } = state.pagination;
            const { laughId } = payload;
            axios({
                method: 'post',
                url: '/homepage/comment',
                data: {
                    ...payload
                }
            }).then((res) => {
                dispatch('fetchCommentList', {laughId});
            });
        },
        // 获取评论列表
        fetchCommentList ({commit, dispatch, state}, payload) {
            const { laughId } = payload;
            axios({
                method: 'post',
                url: '/homepage/getCommentList',
                data: {
                    laughId
                }
            }).then((res) => {
                commit('fetchCommentList', {laughId, historyCommentList: res.data});
            });
        }
    }
};
