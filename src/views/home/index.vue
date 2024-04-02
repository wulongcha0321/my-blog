<template lang="pug">
.home-page
  //- 顶部导航栏
  .tab-bar
    .tab-item(
      @click="changeActiveTab('home')"
      :class="activeTab === 'home' ? 'active' : '' "
    ) 首页
    .tab-item(
      @click="changeActiveTab('ad')"
      :class="activeTab === 'ad' ? 'active' : '' "
    ) 推荐广告
    .tab-item(
      @click="changeActiveTab('personal')"
      :class="activeTab === 'personal' ? 'active' : '' "
    ) 个人主页

  .page-content 
    router-view
  
</template>

<script>
export default {
  name:"Home",
  data() {
    return {
      activeTab:'home'
    }
  },
  methods:{
    changeActiveTab(tab){
      this.activeTab = tab
    }
  }
}
</script>
<style lang="stylus" scoped src="@/style/home.styl"></style>