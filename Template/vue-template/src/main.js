import "babel-polyfill";
import Vue from "vue";
import App from "@pages/App.vue";

import ElementUI from "element-ui";
import VueResource from "vue-resource";

import store from './store/index.js'

import 'vue-jcrop/dist/vue-jcrop.css'
import { Jcrop } from 'vue-jcrop/dist/vue-jcrop.common'

Vue.component('Jcrop', Jcrop)

import VueRx from 'vue-rx'
// install vue-rx
Vue.use(VueRx)

// $http
Vue.use(VueResource);

Vue.use(ElementUI);
// // 引用所有的
import "element-ui/lib/theme-chalk/index.css";

// 雪碧图
import '@less/sprite.less';

import "@less/index.less";


import router from "@/router";


import dataService from "@/dataService";

Vue.prototype.dataService = dataService;

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});





