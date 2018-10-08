import Vue from 'vue';
import Vuex from 'vuex';

import rootState from './state';
import rootGetters from './getters';
import rootActions from './actions';
import rootMutations from './mutations';

import helloWorldStore from './modules/helloWorldStore';
import aboutStore from './modules/aboutStore';
import headerStore from './modules/headerStore';
import homepageStore from './modules/homepageStore';
import militaryStore from './modules/militaryStore';
import perCentStore from './modules/perCentStore';

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: rootState,
    getters: rootGetters,
    mutations: rootMutations,
    actions: rootActions,
    modules: {
        helloWorldStore,
        aboutStore,
        headerStore,
        homepageStore,
        militaryStore,
        perCentStore,
    }
});
