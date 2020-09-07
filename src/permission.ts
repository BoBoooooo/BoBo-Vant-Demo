/**
 * @file 全局请求权限控制，本文件在main.js中引用
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2020年09月07日14:36:57
 */

import router from './router/index';
import store from './store/index';

// 白名单：不需要鉴权的地址
const whiteList = ['/login'];

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (store.getters.token != null && store.getters.token !== 'null') {
    store.dispatch('getUserInfoByToken').then((res) => {
      if (to.path === '/login') {
        next({
          path: '/',
        });
      } else {
        next();
      }
    });
  } else if (whiteList.includes(to.path)) {
    // 如果不存在Token & 当前地址在白名单内
    next();
  } else {
    // 如果不存在Token & 当前地址不在白名单内
    next('/login');
  }
});
