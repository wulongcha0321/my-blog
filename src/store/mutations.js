export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_TOKEN = 'SET_TOKEN'

export default {
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [SET_TOKEN](state, token) {
    state.token = token
    localStorage.setItem('token', token)
  }
}