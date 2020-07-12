import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import VueMeta from 'vue-meta';

Vue.use(VueMeta);

Vue.config.productionTip = false

axios.defaults.baseURL = "http://localhost:2000/api/";
axios.defaults.headers['content-type'] = 'application/json';


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
