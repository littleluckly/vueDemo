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
        async fetchHomepageList ({commit,state}, pageNo) {
            const newPageNo = state.pagination.pageNo
            commit('paginationChange', {pageNo:newPageNo});
            const result = await request({
                method: 'post',
                url: '/homepage/hot',
                data: {
                    pageNo: newPageNo,
                    pageSize: 10
                }
            })
            commit('fetchHomepageList', result.data);
        },
        changeHomepageList ({commit}, payload) {
            commit('changeHomepageList', payload);
        },
        changeLaughPage({commit,dispatch},pageNo) {
            commit('changeLaughPage', pageNo);
            dispatch('fetchHomepageList',pageNo)
        },
        // 点赞点踩
        async toggleLikeVisible ({commit, dispatch}, payload) {
            const { type, id, pageNo,likeType } = payload;
            const result = await request({
                method: 'post',
                url: '/homepage/like',
                data: {
                    laughId: id,
                    type,
                    likeType
                }
            });
            dispatch('fetchHomepageList')
            commit('toggleLikeVisible', payload);

        },
        // 发表评论
        async publishComment ({commit, dispatch, state}, payload) {
            const { laughId } = payload;
            const result = await request({
                method: 'post',
                url: '/homepage/comment',
                data: {
                    ...payload
                }
            });
            dispatch('fetchCommentList', {laughId});
        },
        // 获取评论列表
        async fetchCommentList ({commit, dispatch, state}, payload) {
            const { laughId } = payload;
            const result = await request({
                method: 'post',
                url: '/homepage/getCommentList',
                data: {
                    laughId
                }
            });
            commit('fetchCommentList', {laughId, historyCommentList: result.data});
        }
    }
};
