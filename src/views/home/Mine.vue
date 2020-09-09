<template>
  <div class='container'>
    <div class="info-container">
      <van-row>
        <van-col span="8">
          <van-image round
                     width="5rem"
                     height="5rem"
                     :src="photo" />
        </van-col>
        <van-col span="16">
          <p>{{companyname}}</p>
          <p>{{deptname}}</p>
          <p>{{realname}}</p>

        </van-col>
      </van-row>
    </div>
    <van-divider />
    <van-grid :column-num="3">
      <van-grid-item v-for="value in 6"
                     :key="value"
                     icon="photo-o"
                     text="文字" />
    </van-grid>
    <van-divider />

    <van-button type="danger"
                class="button"
                @click="back"
                size="small"
                icon="replay">退出登录</van-button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({
  name: 'Mine',
  computed: {
    ...mapGetters(['photo', 'realname', 'deptname', 'companyname', 'rolename']),
  },
})
export default class extends Vue {
  back() {
    this.$store.dispatch('clearToken');
  }
}
</script>

<style lang='scss' scoped>
.container {
  .info-container {
    background: #3bba63;
    padding: 20px 20px 5px;
    p {
      color: #323233;
      font-size: 14px;
    }
  }
  .label {
    padding-left: 5px;
  }
  .button {
    display: block;
    width: 100%;
  }
}
</style>
