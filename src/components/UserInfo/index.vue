<template lang="pug">
.user-info-container
  .user-avatar
    el-avatar( :size="120" :src="userAvatar")
  //- 用户简介
  .user-info
    .user-name {{ userName }}
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