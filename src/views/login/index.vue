<template lang="pug">
.login-page(ref="loginVanta")
</template>

<script>
import * as Three from 'three';
import Clouds from 'vanta/src/vanta.clouds';

export default {
  name:"Login",
  data() {
    return {
      vantaRef:null
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
    }
  },
  beforeDestroy(){
    if(this.vantaRef){
      this.vantaRef.destroy();
    }
  }
}
</script>

<style src="@/style/login.styl" scoped lang="stylus"></style>