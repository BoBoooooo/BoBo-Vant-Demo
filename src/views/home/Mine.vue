<template>
  <div class='container'>
    <p class="label">个人信息</p>
    <van-row class="info-container">
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
    <van-divider />

    <van-button type="danger"
                round
                class="button"
                @click="back"
                size="small"
                icon="replay">退出登录</van-button>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import {
  Image, Button, Row, Col, Divider,
} from 'vant';

@Component({
  name: 'Mine',
  computed: {
    ...mapGetters(['photo', 'realname', 'deptname', 'companyname', 'rolename']),
  },
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Row.name]: Row,
    [Col.name]: Col,
    [Divider.name]: Divider,
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
  padding: 20px;
  .info-container {
    background: white;
    padding: 20px;
    border-radius: 12px;
    border: 1px dashed lightblue;
    box-shadow: 0 0 5px #ebedf0;
  }
  .label {
    padding-left: 5px;
  }
  .button {
    display: block;
    width: 300px;
    margin: 0 auto;
  }
}
</style>
