<!--
 * @file: App
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年07月16 22:23:54
-->

<template>
  <div id="app">
      <router-view class="router" />
  </div>
</template>
<script>
export default {
};
</script>

<style lang="scss">
#app {
  height: 100vh;
  font-family: PingFangSC-Regular;
  background-color: #f1f3f5;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/** 解决路由切换动画上下闪动问题 */
.router {
  position: absolute;
  top: safe-area-inset-top;
  top: env(safe-area-inset-top);
  width: 100%;
  transition: all 0.377s ease;
  backface-visibility: hidden;
}
</style>
