// 记录所有cdn的路径，生产环境使用，可根据生产环境不同切换不同的cdn数据源
module.exports = {
  // 是否启用CDN
  enable: true,
  JS: {
    vue: {
      url: 'https://cdn.bootcss.com/vue/2.6.11/vue.min.js',
      exportName: 'Vue',
    },
    vuex: {
      url: 'https://cdn.bootcss.com/vuex/3.5.1/vuex.min.js',
      exportName: 'Vuex',
    },
    'vue-router': {
      url: 'https://cdn.bootcss.com/vue-router/3.4.3/vue-router.min.js',
      exportName: 'VueRouter',
    },
    axios: 'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
  },
  CSS: {},
};
