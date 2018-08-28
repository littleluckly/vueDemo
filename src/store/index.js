import Vue from 'vue';
import Vuex from 'vuex';

import helloWorldStore from './modules/helloWorldStore';
import aboutStore from './modules/aboutStore';
import headerStore from './modules/headerStore';
import loginStore from './modules/loginStore';
import homepageStore from './modules/homepageStore';
import militaryStore from './modules/militaryStore'

Vue.use(Vuex);

export default new Vuex.Store({
    namespaced: true,
    state: {
        rootCount: 0,
        loginStatus: false,
        username: ''
    },
    mutations: {
        toggleLoginStatus (state, payload) {
            state.loginStatus = payload.flag;
            state.username = payload.username;
        },
        toggleUsername (state, payload) {
            state.username = payload.username;
        }
    },
    actions: {
        toggleLoginStatus (ctx, payload) {
            ctx.commit({
                type: 'toggleLoginStatus',
                flag: payload.flag,
                username: payload.username
            });
        },
        toggleUsername (ctx, payload) {
            ctx.commit({
                type: 'toggleUsername',
                username: payload.username
            });
        }
    },
    modules: {
        helloWorldStore,
        aboutStore,
        headerStore,
        loginStore,
        homepageStore,
        militaryStore
    }
});
