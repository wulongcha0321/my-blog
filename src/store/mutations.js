export const SET_USER_INFO = 'SET_USER_INFO'
export const SET_TOKEN = 'SET_TOKEN'
export const LOGOUT = 'LOGOUT'

export default {
  [SET_USER_INFO](state, userInfo) {
    state.userInfo = userInfo
  },
  [SET_TOKEN](state, token) {
    state.token = token
    localStorage.setItem('token', token)
  },
  [LOGOUT](state) {
    state.userInfo = {}
    state.token = ''
    localStorage.removeItem('token')
  }
}