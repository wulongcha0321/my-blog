export default {
  userInfo: state => state.userInfo,
  userId: state => state.userId,
  token: state => state.token || localStorage.getItem('token')
}