<template lang="pug">
.adv-page
  .article-list
    .article-item(v-for="(item,index) in advList" :key="item.id")
      .feed-body
        .feed-header
          .author-name {{ item.author }}
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

</template>

<script>
import {
  getAdvertisementList,
  clickLike,
  cancelLike,
  clickRepost,
  cancelRepost,
  clickComment,
  cancelComment,
} from "@/api";

import { mapGetters } from "vuex";

export default {
  name: "Advertisement",
  data() {
    return {
      advList: [],
    };
  },
  computed:{
    ...mapGetters(["userId"]),
  },
  mounted() {
    this.fetchAdvList();
  },
  methods: {
    fetchAdvList() {
      getAdvertisementList()
        .then((res) => {
          if (res.code === 200) {
            this.advList = res.data.map((item) => {
              item.commentVisible = false;
              item.newComment = "";
              return item;
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log("fetchAdvList error", err);
        });
    },
    handleLike(item) {
      if (item.like === 1) {
        // 取消点赞
        cancelLike({
          idCommon: this.userId,
          idWeiboAd: item.id,
        })
          .then((res) => {
            if (res.code === 200) {
              this.advList.map((v, index) => {
                if (v.id === item.id) {
                  this.advList[index].like = 0;
                  this.advList[index].like_count--;
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
              this.advList.map((v, index) => {
                if (v.id === item.id) {
                  this.advList[index].like = 1;
                  this.advList[index].like_count++;
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
      this.advList.map((v, index) => {
        if (v.id === item.id) {
          this.advList[index].commentVisible =
            !this.advList[index].commentVisible;
          this.advList[index].newComment = "";
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
  },
};
</script>

<style lang="stylus" scoped src="@/style/common.styl"></style>
