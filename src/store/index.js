import Vue from 'vue'
import Vuex from 'vuex'

import helloWorldStore from './modules/helloWorldStore'
import aboutStore from './modules/aboutStore'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        rootCount: 0
    },
    modules: {
        helloWorldStore,
        aboutStore
    }
})
