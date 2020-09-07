/*
 * @file: router
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年07月16 22:23:54
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

// 为了首屏加载快，所以首页不使用懒加载
import Layout from '../views/layout/index.vue';

// const originalPush = VueRouter.prototype.push;

// 处理路由跳转会报错的问题
// VueRouter.prototype.push = function push(...rest) {
//   return originalPush.apply(this, rest).catch(err => err);
// };

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    meta: {
      title: '首页',
    },
    children: [{
      path: 'home',
      component: () => import('@/views/home/Home.vue'),
      name: 'Home',
      meta: {
        title: '首页',
      },
    },
    {
      path: 'tab1',
      component: () => import('@/views/home/Tab1.vue'),
      name: 'Tab1',
      meta: {
        title: '标签页一',
      },
    },
    {
      path: 'tab2',
      component: () => import('@/views/home/Tab2.vue'),
      name: 'Tab2',
      meta: {
        title: '标签页二',
      },
    },
    {
      path: 'mine',
      component: () => import('@/views/home/Mine.vue'),
      name: 'Mine',
      meta: {
        title: '个人中心',
      },
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录',
    },
  },
  // 无权限页面
  {
    path: '/no-permission',
    name: 'NoPermission',
    component: () => import('@/views/error-page/no-permission/index.vue'),
    meta: {
      title: '访问无权限',
    },
  },
  // 404 页面路由
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404/index.vue'),
    meta: {
      title: '页面走丢了',
    },
  },
];

const router = new VueRouter({
  routes,
  // 页面滚动行为
  scrollBehavior(/* to, from, savedPosition */) {
    return {
      x: 0,
      y: 0,
    };
  },
});


export default router;
