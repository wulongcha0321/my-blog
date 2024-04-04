export default {
  userInfo: state => state.userInfo,
  userId: state => state.userInfo.userId,
  token: state => state.token || localStorage.getItem('token')
}