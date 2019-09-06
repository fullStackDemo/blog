// 低版本 polyfill
import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import { VueLocalSync } from 'vuex-local-sync';

const VuxPlugin = new VueLocalSync({
    key: 'intranet',
    storage: window.localStorage
});

const store = new Vuex.Store({
    state: {
        // lastModule: '',
        user: {},
        ding_userInfo: {}
    },
    mutations: {
        // saveModule(state, m) {
        //     state.lastModule = m;
        // },
        // 设置 tab index
        setTab(state, payload) {
            state.tab = payload;
        },
        // 用户数据
        setUser(state, payload) {
            state.user = payload;
        },
        // 钉钉用户信息
        setDingUserInfo(state, payload) {
            state.ding_userInfo = payload;
        }
    },
    plugins: [VuxPlugin.plugin]
});

export default store;
