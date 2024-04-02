import service from '@/utils/request'

export * from './normal'

export const userLogin = (data) => 
  service({
    url: '/user/login',
    method: 'post',
    data
  })