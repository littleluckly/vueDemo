export default {
    namespaced: true,
    state: {
        homepageList: {}
    },
    mutations: {
        fetchHomepageList (state, payload) {
            // console.log(payload, 'payload');
            state.homepageList = payload;
        }
    },
    actions: {
        fetchHomepageList ({commit}, payload) {
            commit('fetchHomepageList', payload);
        }
    }
};
