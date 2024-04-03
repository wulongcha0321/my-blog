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
      .toolbar-wrap(v-show="currentType == 'original'")
        el-button(
          size="small"
          type="normal"
          icon="el-icon-s-promotion"
          @click="showPublish"
        ) 发布原创博文

      .article-list
        .article-item(v-for="(item,index) in originalList" :key="item.id")
          .feed-body
            .feed-header
              .author-name {{ item.author }}
              el-button(
                size="small"
                type="danger"
                @click="removeArticle"
              ) 删除
            .feed-content
              .detail-text {{ item.content }}
          .feed-footer 
            .footer-box
              .footer-box-item 
                .footer_toolbar_wrap
                  .icon-wrap
                    svg-icon(:icon-class="item.like === 1? 'like-fill':'like'")
                  span {{ item.like_count }}
              .footer-box-item 
                .footer_toolbar_wrap
                  .icon-wrap
                    svg-icon(icon-class="repost" style="font-size:14px")
                  span 转发
              .footer-box-item 
                .footer_toolbar_wrap
                  .icon-wrap
                    svg-icon(icon-class="comment" style="font-size:14px")
                  span 评论
                

  el-dialog(
    :visible.sync="publishDialogVisible"
    title="发布原创博文"
    width="40%"
  )
    el-input(
      type="textarea"
      placeholder="请输入您想发布的内容"
      v-model="publishContent"
      :autosize="{ minRows:4 }"
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
      currentType:"original",
      originalList:[],
      likeList:[],
      repostList:[],
      commentList:[],
      publishDialogVisible:false,
      publishContent:""
    }
  },
  mounted(){
    this.fetchOriginalBlog()
  },
  methods:{
    // 菜单点击
    handleSelectMenu(key){
      switch(key){
        case "1":
          this.fetchOriginalBlog()
          this.currentType = 'original'
          break
        case "2":
          this.fetchLikeBlog()
          this.currentType = 'like'
          break
        case "3":
          this.fetchRepostBlog()
          this.currentType = 'repost'
          break
        case "4":
          this.fetchCommentBlog()
          this.currentType = 'comment'
          break
      }
    },
    // 原创博文
    fetchOriginalBlog(){
      getOriginalBlog()
        .then(res => {
          if(res.code === 200){
            this.originalList = res.data
          }
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
    },
    // 删除博文
    removeArticle(){
      
    }
  }
}
</script>

<style lang="stylus" scoped src="@/style/personal.styl"></style>