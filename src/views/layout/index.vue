<!--
 * @file: layout
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年07月16 22:23:54
-->

<template>
  <div class="layout-container">
      <navigation>
        <!-- 主页面入口 -->
        <router-view></router-view>
      </navigation>
    <van-tabbar route>
      <van-tabbar-item icon="home-o"
                       to="/home">台账</van-tabbar-item>
      <van-tabbar-item icon="search"
                       to="/tab1">待办</van-tabbar-item>
      <van-tabbar-item icon="friends-o"
                       to="/tab2">已办</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 使用vant 组件
import { Tabbar, TabbarItem } from 'vant';

export default {
  name: 'Layout',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
  data() {
    return {
      transitionName: 'van-slide-right',
    };
  },
  created() {
    this.$navigation.on('forward', () => {
      this.transitionName = 'van-slide-right';
    });
    this.$navigation.on('back', () => {
      this.transitionName = 'van-slide-left';
    });
  },
};
</script>
<style lang="scss" scoped>
.home {
  /** 审查元素，这个样式会转换为 font-size: 4.267vw; */
  font-size: 16px;
}
p {
  margin-left: 10px;
  color: gray;
  font-size: 14px;
}
</style>
