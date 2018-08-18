export default {
    namespaced: true,
    state: {
        title: '我是about'
    },
    mutations: {
        changeTitle (state, payload) {
            state.title = payload.newTitle
        }
    },
    actions: {
        changeTitle ({state, commit}, payload) {
            console.log(payload)
            commit('changeTitle', payload)
        }
    }
}
