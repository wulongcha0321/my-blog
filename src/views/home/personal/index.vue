<template lang="pug">
.personal-page
  //- 个人简介
  .personal-introduction
    UserInfo(
      :userAvatar="require('@/assets/avatar.png')"
      userName="小明"
      userDescription="这是一个很牛逼的人"
    )

  .main-content
    .nav-wrap
      el-menu(
        mode="vertical"
        :collapse="false"
        class="nav-list"
      )
        el-menu-item(
          index="1"
        ) 原创博文
        el-menu-item(
          index="2"
        ) 点赞过的博文
        el-menu-item(
          index="3"
        ) 转发过的博文
        el-menu-item(
          index="4"
        ) 评论过的博文
        
    .article-wrap
      .toolbar-wrap

      .article-list
        .article-item
          .article-title
          .article-content
</template>

<script>
import UserInfo from '@/components/UserInfo'

export default {
  name:"HomePersonal",
  components:{
    UserInfo
  },
  data() {
    return {
      
    }
  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped src="@/style/personal.styl"></style>