
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        homepageList: {},
        pagination: {

        }
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
        // 评论
        commentLaugh ( {commit,dispatch,state}, payload) {
            const { pageNo } = state.pagination
            axios({
                method:'post',
                url: '/homepage/comment',
                data: {
                    ...payload
                }
            }).then((res)=>{
                dispatch('fetchHomepageList', pageNo);
            })
            // console.log(result,'result')
        }
    }
};
