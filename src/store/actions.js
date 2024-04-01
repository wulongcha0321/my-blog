import {
  SET_USER_INFO,
  SET_TOKEN
} from './mutations'

export default {
  setUserInfo({ commit }, userInfo) {
    commit(SET_USER_INFO, userInfo)
  },
  setToken({ commit }, token) {
    commit(SET_TOKEN, token)
  }
}