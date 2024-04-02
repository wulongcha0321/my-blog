<template lang="pug">
.user-info-container
  //- 用户信息  头像  名字
  .user-info
    .user-avatar
      el-avatar(shape="circle" :size="60" :src="userAvatar")
    .user-name {{userName}}
  //- 用户简介
  .user-description {{ userDescription }}
</template>

<script>
export default {
  name:"UserInfo",
  props:{
    userAvatar:{
      type:String,
    },
    userName:{
      type:String,
    },
    userDescription:{
      type:String,
    }
  }
}
</script>

<style lang="stylus" scoped src="@/style/user-info.styl"></style>