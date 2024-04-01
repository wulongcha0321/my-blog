<template lang="pug">
.login-page(ref="loginVanta")
  .login-container 
    .login-title 博 客
    el-form(
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      class="login-form"
    )
      el-form-item(
        prop="account"
      )
        el-input(
          v-model="loginForm.account"
          placeholder="请输入您的账号"
          prop="account"
          class="login-input"
        )
      el-form-item(
        prop="password"
      )
        el-input(
          v-model="loginForm.password"
          placeholder="请输入您的密码"
          type="password"
          class="login-input"
        )
      el-form-item
        .login-button(@click="handleLogin") 登录

    .register-tip 
      span 没有账号？
      router-link(to="/register") 立即注册

</template>

<script>
import { userLogin } from '@/api/index.js';

import * as Three from 'three';
import Clouds from 'vanta/src/vanta.clouds';

export default {
  name:"Login",
  data() {
    return {
      vantaRef:null,
      loginForm:{
        account:"",
        password:""
      },
      rules:{
        account:[
          {required:true,message:"请输入账号",trigger:"blur"}
        ],
        password:[
          {required:true,message:"请输入密码",trigger:"blur"}
        ]
      }
    }
  },
  mounted(){
    this.initVanta();
  },
  methods:{
    initVanta(){
      this.vantaRef = Clouds({
        THREE: Three,
        el: this.$refs.loginVanta,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        speed: 0.50
      });
    },
    handleLogin(){
      this.$refs.loginForm.validate((valid) => {
        if(valid){
          userLogin(this.loginForm)
            .then(res => {
              if(res.code === 200){
                this.$message({
                  message:"登录成功",
                  type:"success"
                });
                
              }else{
                this.$message({
                  message:res.message,
                  type:"error"
                });
              }
            })
            .catch(err => {
              console.log('user login err',err);
            })
        }else{
          return false;
        }
      })
    }
  },
  beforeDestroy(){
    if(this.vantaRef){
      this.vantaRef.destroy();
    }
  }
}
</script>

<style lang="stylus">
  .login-input
    .el-input__inner
      border none
</style>
<style src="@/style/login.styl" scoped lang="stylus"></style>