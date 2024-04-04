import service from "@/utils/request";
import { USE_MOCK, getMockJson } from "./mock";

// 查看所有原创博文
export const getOriginalBlog = (data) => {
  if(!USE_MOCK) {
    return service({
      url:"/user/listAllOriginalWeibo",
      method:"post",
      data
    })
  }
  return getMockJson("original");
}

// 查看点赞博文
export const getLikedBlog = (data) => {
  if(!USE_MOCK){
    return service({
      url:"user/listLiked",
      method:"post",
      data
    })
  }
  return getMockJson('like')
}

// 获取转发博文
export const getRepostBlog = (data) => {
  if(!USE_MOCK){
    return service({
      url:"user/listTransmitted",
      method:"post",
      data
    })
  }
  return getMockJson('repost')
}

// 获取评论博文
export const getCommentBlog = (data) => {
  if(!USE_MOCK){
    return service({
      url:"user/listCommented",
      method:"post",
      data
    })
  }
  return getMockJson('comment')
}

// 发布原创博文
export const publishOriginalBlog = (data) => {
  return service({
    url:"/user/addOriginalWeibo",
    method:"post",
    data
  })
}

// 点赞博文
export const clickLike = (data) => {
  return service({
    url:"/user/like",
    method:"post",
    data
  })
}

// 取消点赞
export const cancelLike = (data) => {
  return service({
    url:"user/cancelLike",
    method:"post",
    data
  })
}

// 转发博文
export const clickRepost = (data) => {
  return service({
    url:"user/transmit",
    method:"post",
    data
  })
}

// 取消转发
export const cancelRepost = (data) => {
  return service({
    url:"user/cancelTransmit",
    method:"post",
    data
  })
}

// 删除原创博文
export const deleteOriginalBlog = (data) => {
  return service({
    url:"/user/deleteOriginalWeibo",
    method:"post",
    data
  })
}