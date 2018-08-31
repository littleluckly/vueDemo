
import axios from 'axios';
export default {
    namespaced: true,
    state: {
        homepageList: {}
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
        toggleLikeVisible (state, payload) {
            const { type, id } = payload;
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
            axios({
                method: 'post',
                url: '/homepage/hot',
                data: {
                    pageNo: pageNo || 1,
                    pageSize: 10
                }
            }).then((res) => {
                commit('fetchHomepageList', res.data);
                let timer = setInterval(function () {
                    let osTop = document.documentElement.scrollTop || document.body.scrollTop;
                    let speed = Math.floor(-osTop / 6);
                    document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
                    if (osTop <= 0) {
                        clearInterval(timer);
                    }
                }, 30);
            });
        },
        changeHomepageList ({commit}, payload) {
            commit('changeHomepageList', payload);
        },
        toggleLikeVisible ({commit}, payload, a) {
            console.log(payload, a);
            commit('toggleLikeVisible', payload);
        }
    }
};
