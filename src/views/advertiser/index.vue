<template lang="pug">
.advertiser-page
  .nav-bar
    el-button(
      type="danger"
      size="small"
      @click="logout"
    ) 登出

  .personal-introduction
    UserInfo(
      :userAvatar="require('@/assets/avatar.png')"
      userName="广告商"
      userDescription="广告商描述"
    )

  .main-container
    .toolbar-wrap 
      el-button(
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="showAdd"
      ) 发布广告

    .advertisement-list
      .advertisement-item(v-for="(item,index) in advertisementList" :key="item.id")
        .feed-body
          .feed-header
            .author-name {{ item.author }}
            .btn-wrap 
              el-button(
                size="mini"
                @click="showEdit(item)"
              ) 修改
              el-button(
                size="mini"
                type="danger"
                @click="handleDeleteAd(item)"
              ) 删除
          .feed-content
            .detail-text {{ item.content }}
        .feed-footer 
          .footer-box
            .footer-box-item 
              .footer_toolbar_wrap(@click="handleLike(item)")
                .icon-wrap
                  svg-icon(:icon-class="item.like === 1? 'like-fill':'like'")
                span {{ item.like_count }}
            .footer-box-item 
              .footer_toolbar_wrap(@click="handleRepost(item)")
                .icon-wrap
                  svg-icon(icon-class="repost" style="font-size:14px")
                span 转发
            .footer-box-item 
              .footer_toolbar_wrap(@click="handleComment(item)")
                .icon-wrap
                  svg-icon(icon-class="comment" style="font-size:14px")
                span 评论
        .comment-body(v-show="item.commentVisible")
          .comment-form
            el-input(
              placeholder="请输入您的评论"
              v-model="item.newComment"
            )
              el-button(slot="append" @click="submitComment(item)") 评论
          el-divider
          .comment-title 评论区
          .comment-list(v-show="item.is_comment !== 0")
            .comment-item 
              el-input(
                type="textarea"
                readonly 
                v-model="item.comment_content"
              )
              el-button(
                type="text"
                @click="removeComment(item)"
                style="margin-left:10px"
              ) 删除评论

  el-dialog(
    title="新增广告"
    :visible.sync="addDialogVisible"
    width="45%"
    top="25vh"
  )
    el-form
      el-input(
        type="textarea"
        placeholder="请输入广告内容"
        v-model="addForm.content"
        :autosize="{ minRows:4 }"
      )
    .dialog-footer(slot="footer")
      el-button(
        type="primary"
        @click="submitAdd"
        size="small"
      ) 确定
      el-button(
        @click="addDialogVisible = false"
        size="small"
      ) 取消

  el-dialog(
    title="编辑广告"
    :visible.sync="editDialogVisible"
    width="45%"
    top="25vh"
  )
    el-form
      el-input(
        type="textarea"
        placeholder="请输入广告内容"
        v-model="editForm.content"
        :autosize="{ minRows:4 }"
      )
    .dialog-footer(slot="footer")
      el-button(
        type="primary"
        @click="submitEdit"
        size="small"
      ) 确定
      el-button(
        @click="editDialogVisible = false"
        size="small"
      ) 取消
      

</template>

<script>
import {
  getAdvertisementList,
  cancelLike,
  clickLike,
  cancelRepost,
  clickRepost,
  clickComment,
  cancelComment,
  addAdvertisement,
  deleteAdvertisement,
  editAdvertisement
} from "@/api";
import { mapGetters } from "vuex";
import UserInfo from '@/components/UserInfo'

export default {
  name: 'Advertiser',
  components: {
    UserInfo
  },
  data() {
    return {
      advertisementList:[],
      addDialogVisible: false,
      addForm: {
        content: ''
      },
      editDialogVisible: false,
      editForm: {
        id:"",
        content: ''
      }
    }
  },
  computed: {
    ...mapGetters(["userId"])
  },
  mounted() {
    this.fetchAdvertisementList()
  },
  methods: {
    logout(){
      this.$confirm('确定登出吗？','提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('logout')
        this.$router.push('/login')
      }).catch(() => {})
    },
    fetchAdvertisementList(){
      getAdvertisementList()
        .then(res => {
          if(res.code === 200){
            this.advertisementList = res.data.map(item => {
              item.commentVisible = false
              item.newComment = ''
              return item
            })
          }else{
            this.$message.error(res.message)
          }
        })
        .catch((err) => {
          console.log("fetchAdvertisementList error", err);
        });
    },
    showAdd(){
      this.addDialogVisible = true
      this.addForm = {}
    },
    submitAdd(){
      console.log('submit add')
      addAdvertisement({
        idCommon: this.userId,
        content: this.addForm.content
      })
        .then(res => {
          if(res.code === 200){
            this.$message.success('发布广告成功')
            this.addDialogVisible = false
            this.fetchAdvertisementList()
          }else{
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          console.log('add advertisement error',err)
        })
    },
    showEdit(item){
      console.log('show edit',item)
      this.editDialogVisible = true
      this.editForm = {
        id: item.id,
        content: item.content
      }
    },
    submitEdit(){
      console.log('submit edit')
      editAdvertisement({
        idCommon: this.userId,
        idWeiboAd: this.editForm.id,
        content: this.editForm.content
      })
        .then(res => {
          if(res.code === 200){
            this.$message.success('编辑广告成功')
            this.editDialogVisible = false
            this.fetchAdvertisementList()
          }else{
            this.$message.error(res.message)
          }
        })
        .catch(err => {
          console.log('edit advertisement error',err)
        })
    },
    // 点赞
    handleLike(item) {
      if (item.like === 1) {
        // 取消点赞
        cancelLike({
          idCommon: this.userId,
          idWeiboAd: item.id,
        })
          .then((res) => {
            if (res.code === 200) {
              this.advertisementList.map((v, index) => {
                if (v.id === item.id) {
                  this.advertisementList[index].like = 0;
                  this.advertisementList[index].like_count--;
                }
              });
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log("cancel like error", err);
          });
      } else {
        // 点赞
        clickLike({
          idCommon: this.userId,
          idWeiboAd: item.id,
        })
          .then((res) => {
            if (res.code === 200) {
              this.advertisementList.map((v, index) => {
                if (v.id === item.id) {
                  this.advertisementList[index].like = 1;
                  this.advertisementList[index].like_count++;
                }
              });
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log("click like error", err);
          });
      }
    },
    // 取消转发
    handleCancelRepost(item) {
      cancelRepost({
        idCommon: this.userId,
        idWeiboAd: item.id,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("取消转发成功");
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log("cancel repost error", err);
        });
    },
    // 转发
    handleRepost(item) {
      clickRepost({
        idCommon: this.userId,
        idWeiboAd: item.id,
      })
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("转发成功");
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log("click repost error", err);
        });
    },
    handleComment(item) {
      this.advertisementList.map((v, index) => {
        if (v.id === item.id) {
          this.advertisementList[index].commentVisible =
            !this.advertisementList[index].commentVisible;
          this.advertisementList[index].newComment = "";
        }
      });
    },
    // 提交评论
    submitComment(item) {
      if (item.newComment.trim() === "") {
        this.$message.error("请输入评论内容");
        return;
      }

      clickComment()
        .then((res) => {
          if (res.code === 200) {
            this.$message.success("评论成功");
            this.handleComment(item);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log("submit comment error", err);
        });
    },
    removeComment(item) {
      this.$confirm(`此操作将删除该评论，是否继续？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          cancelComment()
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("删除评论成功");
                this.handleComment(item);
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((err) => {
              console.log("remove comment error", err);
            });
        })
        .catch(() => {});
    },
    handleDeleteAd(item) {
      this.$confirm(`此操作将删除该广告，是否继续？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除广告
          deleteAdvertisement({
            idCommon: this.userId,
            idWeiboAd: item.id,
          })
            .then((res) => {
              if (res.code === 200) {
                this.$message.success("删除广告成功");
                this.fetchAdvertisementList();
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((err) => {
              console.log("delete advertisement error", err);
            });
        })
        .catch(() => {});
    }
  }
}
</script>
<style scoped lang="stylus" src="@/style/advertiser.styl"></style>