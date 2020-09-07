/**
 * @file vuex.vuejs.org/zh
 * @author BoBo
 * @copyright NanJing Anshare Tech .Com
 * @createDate 2018年11月13日18:09:59
 */
import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import user from './modules/user';
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  // 注意：新增的modules如果需要持久化还需要在plugins配置一下
  modules: {
    app,
    user,
  },
  getters,
});
