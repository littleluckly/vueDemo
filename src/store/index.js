import Vue from 'vue'
import Vuex from 'vuex'

import helloWorldStore from './modules/helloWorldStore'
import aboutStore from './modules/aboutStore'
import headerStore from './modules/headerStore'
import loginStore from './modules/loginStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rootCount: 0,
        loginStatus: false
    },
    mutations: {
        toggleLoginStatus (state, payload) {
            console.log(payload,'payload')
            state.loginStatus = payload.flag
        }
    },
    actions: {
        toggleLoginStatus (ctx, payload) {
            ctx.commit({
                type: 'toggleLoginStatus',
                flag: payload.flag
            })
        }
    },
    modules: {
        helloWorldStore,
        aboutStore,
        headerStore,
        loginStore
    }
})
