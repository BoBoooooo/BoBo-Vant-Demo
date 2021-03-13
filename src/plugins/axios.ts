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
      config.headers.Authorization = store.getters.token;
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
    // 正常响应继续传递
    return res;
  },
  (error) => {
    const { code, message } = error.response.data;
    // 401表示token异常需要重新登录
    if (code === 401) {
      Dialog.alert({
        message: '账号已过期，重新登录。',
      }).then(() => {
        store.commit('SET_TOKEN', null);
        // 跳转登录页
        window.location.reload();
      });
    } else {
      // 开发阶段参数异常
      Dialog.alert({
        message,
      });
    }
    return Promise.reject(error);
  },
);

export default service;
