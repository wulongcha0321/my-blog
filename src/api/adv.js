import service from "@/utils/request";
import { USE_MOCK, getMockJson } from "./mock";

export const getAdvertisementList = data => {
  if(!USE_MOCK) {
    return service({
      url: "/adv/list",
      method: "post",
      data
    });
  }
  return getMockJson("adv");
}