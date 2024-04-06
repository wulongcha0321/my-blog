import service from "@/utils/request";
import { USE_MOCK, getMockJson } from "./mock";

export const getAdvertisementList = data => {
  if(!USE_MOCK) {
    return service({
      url: "/user/listAllAdWeibo",
      method: "post",
      data
    });
  }
  return getMockJson("adv");
}

// 添加广告
export const addAdvertisement = data => {
  return service({
    url: "/user/addAdWeibo",
    method: "post",
    data
  });
}

// 编辑广告
export const editAdvertisement = data => {
  return service({
    url: "/user/updateAdWeibo",
    method: "post",
    data
  });
}

// 删除广告
export const deleteAdvertisement = data => {
  return service({
    url: "/user/deleteAdWeibo",
    method: "post",
    data
  });
}