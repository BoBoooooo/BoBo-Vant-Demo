<!--
@file 为保证登录页浏览器兼容性，布局技术必须支持IE，避免使用flex等科技。
      系统图标支持三种来源，分别是：elementUI自带、icons文件夹自动引入、vue-awesome插件。
@author BoBo
@copyright NanJing Anshare Tech .Com
@createDate 2018年12月12日16:57:15
-->
<template>
  <div class="login-container">
    <van-image class="image" round
               width="5rem"
               height="5rem"
               src="https://pic.downk.cc/item/5f55fda8160a154a67566f2d.png" />
    <van-form class="login-form">
      <h4 class="title">移动端demo</h4>
      <van-field v-model="loginForm.username"
                 name="用户名"
                 label="用户名"
                 placeholder="用户名"
                 :rules="[{ required: true, message: '请填写用户名' }]" />
      <van-field v-model="loginForm.password"
                 type="password"
                 name="密码"
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码' }]" />
      <div style="margin: 16px;">
        <van-button :loading="btnLoginIsLoading"
                    round
                    block
                    type="info"
                    @click="login">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>


<script>
import { Component, Vue } from 'vue-property-decorator';
import { mapGetters } from 'vuex';

@Component({

})
export default class Login {
  loginForm = {
    username: '',
    password: '',
  };

  // 背景图
  bg = null;

  btnLoginIsLoading = false;

  login() {
    this.$store
      .dispatch('setTokenByLogin', this.loginForm)
      .then((res) => {
        this.btnLoginIsLoading = false;
        // 进入内部页面
        this.$router
          .push({
            path: '/home',
          })
          .catch((error) => {
          });
      })
      .catch((error) => {
        this.$dialog.alert({
          message: error.message,
          confirmButtonText: '重新输入',
        });
        this.btnLoginIsLoading = false;
      });
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg: #2d3a4b;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  padding-top: 15vh;
  .image{
    display: block;
    margin:0 auto;
  }
  // background-color: $bg;
  .login-form {
    margin: 0 auto;
    width: 300px;
    // max-width: 100%;
    // margin-top:50px;
    padding: 20px 35px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 40%;
    .title {
      font-size: 24px;
      color: #34495e;
      margin-bottom: 16px;
      text-align: center;
      font-weight: 500;
    }
  }
}
</style>
