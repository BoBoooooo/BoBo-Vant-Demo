<!--
 * @file: homePage
 * @copyright: NanJing Anshare Tech .Com
 * @author: BoBo
 * @Date: 2020年07月16 22:23:54
-->

<template>
  <div class="home">
    <van-notice-bar scrollable
                    text="Anshare App Demo" />
    <p @click="confirmCallBack">弹窗测试</p>
    <van-grid>
      <van-grid-item icon="photo-o"
                     text="文字" />
      <van-grid-item icon="photo-o"
                     text="文字" />
      <van-grid-item icon="photo-o"
                     text="文字" />
      <van-grid-item icon="photo-o"
                     text="文字" />
    </van-grid>
    <p @click="$_handleUseDecorator">测试</p>

    <van-grid :column-num="3">
      <van-grid-item v-for="value in 6"
                     :key="value"
                     icon="photo-o"
                     text="文字" />
    </van-grid>
    <p>测试</p>

    <van-grid :border="false"
              :column-num="3">
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-1.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
      </van-grid-item>
      <van-grid-item>
        <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
      </van-grid-item>
    </van-grid>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">标签1</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签2</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签3</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// 使用vant 组件
import {
  List,
  NoticeBar,
  Cell,
  Notify,
  Tabbar,
  TabbarItem,
  Grid,
  GridItem,
  Image,
} from 'vant';

// 使用装饰器
import { confirm } from '@/decorator';

// 使用日期工具类
import { format, DATE_FMT } from '@/utils/date';

export default {
  name: 'Home',
  components: {
    [List.name]: List,
    [Cell.name]: Cell,
    [NoticeBar.name]: NoticeBar,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem,
    [Image.name]: Image,
  },
  data() {
    return {
      currentDate: format(new Date(), DATE_FMT),
      active: 0,
    };
  },
  created() {},

  methods: {
    @confirm('是否确认提交', '提示')
    confirmCallBack() {
      console.log('我是回调函数');
    },
    // 加载数据
    async $_loadData() {
      try {
        Notify({
          message: '数据加载成功',
          type: 'success',
        });
      } catch (error) {
        console.error(error);
      }
    },
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
  font-size:14px;
}
</style>
