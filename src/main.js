import Vue from 'vue';

// 用于控制浏览器前进后退 使用keep-alive
import Navigation from 'vue-navigation';

import FastClick from 'fastclick';

import App from './App.vue';
import store from './store';
import router from './router';

Vue.config.productionTip = false;

// 处理点击事件延迟300ms问题
FastClick.attach(document.body);

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
