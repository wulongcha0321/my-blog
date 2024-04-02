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
        active-text-color="#ff8200"
        text-color="#333"
        @select="handleSelectMenu"
        default-active="1"
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
        el-button(
          size="small"
          type="normal"
          icon="el-icon-s-promotion"
          @click="showPublish"
        ) 发布原创博文

      .article-list
        .article-item
          .article-title
          .article-content

  el-dialog(
    :visible.sync="publishDialogVisible"
    title="发布原创博文"
    width="50%"
  )
    .dialog-footer(slot="footer")
      el-button(
        @click="publishDialogVisible = false"
      ) 取消
</template>

<script>
import { getOriginalBlog } from '@/api'

import UserInfo from '@/components/UserInfo'

export default {
  name:"HomePersonal",
  components:{
    UserInfo
  },
  data() {
    return {
      currentType:"orignal",
      orignalList:[],
      likeList:[],
      repostList:[],
      commentList:[],
      publishDialogVisible:false,
    }
  },
  mounted(){
    this.fetchOriginalBlog()
  },
  methods:{
    // 菜单点击
    handleSelectMenu(key){
      console.log(key)
      switch(key){
        case 1:
          this.fetchOriginalBlog()
          break
        case 2:
          this.fetchLikeBlog()
          break
        case 3:
          this.fetchRepostBlog()
          break
        case 4:
          this.fetchCommentBlog()
          break
      }
    },
    // 原创博文
    fetchOriginalBlog(){
      getOriginalBlog()
        .then(res => {

        })
        .catch(err => {
          console.log('get original blog error',err)
        })
    },
    // 点赞过的博文
    fetchLikeBlog(){

    },
    // 转发过的博文
    fetchRepostBlog(){

    },
    // 评论过的博文
    fetchCommentBlog(){

    },
    showPublish(){
      this.publishDialogVisible = true
    }
  }
}
</script>

<style lang="stylus" scoped src="@/style/personal.styl"></style>