import Vue from 'vue'
import Vuex from 'vuex'

import helloWorldStore from './helloWorldStore'
import aboutStore from './aboutStore'

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
