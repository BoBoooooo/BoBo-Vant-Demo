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
                       to="/home">员工</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Layout',
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
