import request from '@/utils/request'

export const userLogin = (data) => 
  request({
    url: '/user/login',
    method: 'post',
    data
  })