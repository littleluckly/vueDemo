export default {
    namespaced: true,
    getters: {
        loginStatus: (state, getters, rootState) => {
            return rootState.loginStatus
        }
    },
    actions: {
        toggleLoginStatus ({ dispatch, commit, getters, rootGetters }, flag) {
            dispatch({
                type: 'toggleLoginStatus',
                flag
            })
        }
    }
}
