import Vue from 'vue';
import axios from '@/plugins/axios';

// 用于控制浏览器前进后退 使用keep-alive
import Navigation from 'vue-navigation';
import './permission';
import FastClick from 'fastclick';

import Vant from 'vant';
import App from './App.vue';
import store from './store/index';
import router from './router';

import 'vant/lib/index.css';

Vue.use(Vant);
Vue.prototype.axios = axios;

Vue.config.productionTip = false;

// 解决移动端点击延迟200ms的问题
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}

// 用于控制浏览器前进后退缓存
Vue.use(Navigation, {
  router,
  store,
});

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  const VConsole = require('vconsole');
  /* eslint-disable no-new */
  new VConsole();
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
