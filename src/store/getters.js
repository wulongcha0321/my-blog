export default {
  userInfo: state => state.userInfo,
  token: state => state.token || localStorage.getItem('token')
}