/**
 * @file 封装原生axios
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2020年09月07日13:55:12
 */
import axios from 'axios';
import { Dialog } from "vant"; // eslint-disable-line

import store from '../store';

// axios详细配置参考：
// https://github.com/axios/axios#request-config

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_URL, // 后端接口根路径
  timeout: 60 * 1000, // 请求超时时间
});

// 拦截请求
service.interceptors.request.use(
  (config) => {
    if (store.getters.token && store.getters.token !== 'null') {
      // 让每个请求携带自定义token
      config.headers.auth = store.getters.token;
    }

    return config;
  },
  (error) => {
    Dialog.confirm({
      message: error.message,
      title: 'error',
    });
    Promise.reject(error);
  },
);

// 拦截响应
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // let { data } = res;
    const { message, code } = res;
    const { data } = res;

    document.getElementsByTagName('body')[0].style.cursor = 'auto';

    // 600表示token异常需要重新登录
    if (code === 600) {
      Dialog.alert({
        message: '账号已过期，重新登录。',
      }).then(() => {
        store.commit('SET_TOKEN', null);
        // 跳转登录页
        window.location.reload(); // 为了重新实例化vue-router对象，避免bug
      });
    } else if (code === 602) {
      // 开发阶段参数异常
      Dialog.alert({
        message: `状态码：602，原因：${message}`,
      });
    } else if (code === 500) {
      Dialog.alert({
        message: `状态码：500<br>接口：${response.request.responseURL}<br>原因：${message}`,
      });
    } else if (code === 400) {
      Dialog.alert({
        message: `原因：${message}`,
      });
    }
    // 正常响应继续传递
    return res;
  },
  (error) => {
    document.getElementsByTagName('body')[0].style.cursor = 'auto';
    // http状态码200以外的情况
    if (process.env.NODE_ENV !== 'test') {
      // 请检查网络链接或联系管理员
      const msg = '系统更新中，请稍后再试。';
      Dialog.alert({
        message: `${error.message}，${msg}`,
      }).then(() => {
        // 清空token
        store.commit('SET_TOKEN', null);
        window.location.reload(); // 为了重新实例化vue-router对象，避免bug
      });
    }
    return Promise.reject(error);
  },
);

export default service;
