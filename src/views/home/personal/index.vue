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

      .article-list(v-show="currentType == 'original'" style="max-height:calc(100% - 50px)")
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

      .article-list(v-show="currentType == 'like'")
        .article-item(v-for="(item,index) in likeList" :key="item.id")
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

      .article-list(v-show="currentType == 'repost'")
        .article-item(v-for="(item,index) in repostList" :key="item.id")
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

      .article-list(v-show="currentType == 'comment'")
        .article-item(v-for="(item,index) in commentList" :key="item.id")
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
    top="25vh"
  )
    el-input(
      type="textarea"
      placeholder="请输入您想发布的内容"
      v-model="publishContent"
      :autosize="{ minRows:4 }"
    )
    .dialog-footer(slot="footer")
      el-button(
        type="primary"
        @click="handlePublish"
      ) 发布
      el-button(
        @click="publishDialogVisible = false"
      ) 取消
</template>

<script>
import { getOriginalBlog, publishOriginalBlog, deleteOriginalBlog, getLikedBlog, getCommentBlog, getRepostBlog } from '@/api'
import { mapGetters } from 'vuex'

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
  computed:{
    ...mapGetters(['userId'])
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
      getLikedBlog()
        .then(res => {
          if(res.code === 200){
            this.likeList = res.data
          }else{
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          console.log('get liked blog error',err)
        })
    },
    // 转发过的博文
    fetchRepostBlog(){
      getRepostBlog()
        .then(res => {
          if(res.code === 200){
            this.repostList = res.data
          }else{
            this.$message.error(res.message)
          }
        })
        .catch(() => {})
    },
    // 评论过的博文
    fetchCommentBlog(){
      getCommentBlog()
        .then(res => {
          if(res.code === 200){
            this.commentList = res.data
          }else{
            this.$message.error(res.message)
          }
        })
        .catch(() => {})
    },
    showPublish(){
      this.publishDialogVisible = true
    },
    handlePublish(){
      if(this.publishContent.trim() === ""){
        this.$message.error('请输入内容')
        return
      }
      publishOriginalBlog({
        idCommon:this.userId,
        content:this.publishContent
      })
        .then(res => {
          if(res.code === 200){
            this.$message.success('发布成功')
            this.publishDialogVisible = false
            this.fetchOriginalBlog()
          }
        })
        .catch(err => {
          console.log('publish original blog error',err)
        })
    },
    // 删除博文
    removeArticle(){
      this.$confirm(`此操作将永久删除该博文, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOriginalBlog()
          .then((res) => {
            if(res.code === 200){
              this.$message.success('删除成功')
              this.fetchOriginalBlog()
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err) => {
            console.log('delete original blog error',err)
          })
      }).catch(() => {})
    }
  }
}
</script>

<style lang="stylus" scoped src="@/style/personal.styl"></style>