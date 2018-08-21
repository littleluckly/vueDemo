export default {
    namespaced: true,
    state: {
        count: 0
    },
    mutations: {
        increment (state, payload) {
            if (payload && payload.amount) {
                state.count += payload.amount
            } else {
                state.count += 2
            }
        }
    },
    actions: {
        increment ({ state, commit, rootState }, payload) {
            console.log('rootState', rootState)
            commit('increment', {
                amount: payload.amount
            })
        },
        asyncIncrement1 ({ commit }, payload) {
            setTimeout(() => {
                commit('increment', {
                    amount: payload.amount
                })
            }, 1000)
        },
        asyncIncrement2 ({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 2000)
        }
    }
}
