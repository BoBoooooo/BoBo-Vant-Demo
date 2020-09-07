<template>
  <div class='container'>
    <van-row>
      <van-col span="8">
        <van-image round
                   width="5rem"
                   height="5rem"
                   :src="photo" />
      </van-col>
      <van-col span="16">
        {{realname}} {{deptname}} {{companyname}}
        <van-button type="danger"
                    round
                    @click="back"
                    size="small"
                    icon="replay">退出登录</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';
import {
  Image, Button, Row, Col,
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
}
</style>
