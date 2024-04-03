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

