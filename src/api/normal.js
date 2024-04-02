import service from "@/utils/request";

// 查看所有原创博文
export const getOriginalBlog = (data) => {
  return service({
    url:"/user/listAllOriginalWeibo",
    method:"post",
    data
  })
}