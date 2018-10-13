import request from '@/utils/request'
export default {
    namespaced: true,
    state: {
        homepageList: {},
        pagination: {
            pageNo: 1,
            pageSize: 10,
        },
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
        changeLaughPage(state, pageNo){
            state.pagination.pageNo=pageNo;
        },
        paginationChange (state, {pageNo}) {
            state.pagination.pageNo = pageNo;
        },
        // 点赞或点踩
        toggleLikeVisible (state, payload) {
            const { type, id, pageNo } = payload;
            state.homepageList.data = state.homepageList.data.map(comment => {
                if (comment.id === id) {
                    comment[type + 'Visible'] = true;
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
        fetchHomepageList ({commit,state}, pageNo) {
            console.log(state.pagination)
            const newPageNo = state.pagination.pageNo
            commit('paginationChange', {pageNo:newPageNo});
            request({
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
        changeLaughPage({commit,dispatch},pageNo) {
            commit('changeLaughPage', pageNo);
            dispatch('fetchHomepageList',pageNo)
        },
        // 点赞点踩
        toggleLikeVisible ({commit, dispatch}, payload) {
            const { type, id, pageNo,likeType } = payload;
            request({
                method: 'post',
                url: '/homepage/like',
                data: {
                    laughId: id,
                    type,
                    likeType
                }
            }).then((res) => {
                // if (res && res.data.message === '') {
                    commit('toggleLikeVisible', payload);
                    dispatch('fetchHomepageList')
                    // dispatch('fetchHomepageList', pageNo);
                // }
            });
        },
        // 发表评论
        publishComment ({commit, dispatch, state}, payload) {
            // const { pageNo } = state.pagination;
            const { laughId } = payload;
            request({
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
            request({
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
