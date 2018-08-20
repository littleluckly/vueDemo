import Vue from 'vue'
import Vuex from 'vuex'

import helloWorldStore from './modules/helloWorldStore'
import aboutStore from './modules/aboutStore'
import headerStore from './modules/headerStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rootCount: 0,
        loginStatus: false
    },
    mutations: {
        toggleLoginStatus (state, payload) {
            state.loginStatus = payload
        }
    },
    actions: {
        toggleLoginStatus (ctx, flag) {
            ctx.commit({
                type: 'toggleLoginStatus',
                flag
            })
        }
    },
    modules: {
        helloWorldStore,
        aboutStore,
        headerStore
    }
})
