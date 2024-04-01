import axios from "axios";
import store from "@/store";

const service = axios.create({
  baseURL:"",
  timeout:5000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const token = store.getters.token

    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response)=>{
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  (error)=>{
    return Promise.reject(error)
  }
)

export default service