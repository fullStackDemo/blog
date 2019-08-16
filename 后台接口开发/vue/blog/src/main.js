import Vue from 'vue'
import VueResource from 'vue-resource';

Vue.use(VueResource);

import App from './pages/App.vue'


new Vue({
  render: h => h(App),
}).$mount('#app')
