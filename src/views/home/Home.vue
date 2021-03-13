<template>
  <div class="container">
    <van-search
      v-model="searchContent"
      shape="round"
      placeholder="请输入搜索内容"
      show-action
      @search="reload()"
      @cancel="reload()"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card
        v-for="item in list"
        :key="item.id"
        :desc="item.jobno"
        :title="item.personname || '暂无标题'"
      >
        <template #tags>
          <van-tag
            plain
            style="margin-left:4px"
            type="primary"
            >{{ item.education }}</van-tag
          >
        </template>
        <template #footer>
          <van-button size="mini" style="margin-top:10px">查看详情</van-button>
        </template>
        <template #thumb>
          <van-image
            width="4rem"
            height="4rem"
            src="https://pic.downk.cc/item/5f5603b6160a154a67581321.png"
          />
        </template>
        <template #num>
          {{ item.deptname }} / {{ item.post }} /
          {{ item.level }}
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Home',
})
export default class extends Vue {
  list = [];

  loading = false;

  finished = false;

  pageSize = 10;

  pageIndex = 1;

  total = 0;

  searchContent = '';

  created() {
    this.fetchData();
  }

  fetchData(
    pageIndex = this.pageIndex,
    pageSize = this.pageSize,
    reload = false,
  ) {
    this.axios({
      url: '/person/list',
      method: 'post',
      data: {
        searchCondition: [],
        pageIndex,
        pageSize,
        orderCondition: '',
      },
    }).then((res) => {
      if (reload) {
        this.list = res.data.list;
      } else {
        this.list = this.list.concat(res.data.list);
      }
      this.total = res.data.total;
      if (this.list.length === this.total) {
        this.finished = false;
      }
      this.loading = false;
      this.finished = false;
    });
  }

  reload() {
    this.pageindex = 1;
    this.pageSize = 10;
    this.fetchData(this.pageIndex, this.pageSize, true);
  }

  onLoad() {
    if (this.list.length < this.total) {
      this.pageIndex += 1;
      this.fetchData(this.pageIndex, this.pageSize);
      if (this.list.length === this.total) {
        this.finished = false;
      }
    } else {
      this.loading = false;
      this.finished = false;
    }
  }
}
</script>

<style lang="scss" scoped></style>
