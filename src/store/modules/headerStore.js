export default {
    namespaced: true,
    state: {

    },
    getters: {
        loginStatus: (state, getters, rootState) => {
            return rootState.loginStatus;
        },
        username: (state, getters, rootState) => {
            return rootState.username;
        }
    }
};
