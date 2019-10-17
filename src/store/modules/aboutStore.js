export default {
    namespaced: true,
    state: {
        title: '我是about'
    },
    getters: {
        loginStatus: (state, getters, rootState) => {
            return rootState.loginStatus
        }
    },
    mutations: {
        changeTitle (state, payload) {
            state.title = payload.newTitle
        }
    },
    actions: {
        changeTitle (ctx, payload) {
            console.log(ctx)
            ctx.commit('changeTitle', payload)
        }
    }
}
