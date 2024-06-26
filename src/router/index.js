import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/advertiser'
  },
  {
    path:'/login',
    name:'Login',
    component:Login,
    meta:{
      title:"登录"
    }
  },
  {
    path:'/register',
    name:'Register',
    component:()=>import('@/views/register'),
    meta:{
      title:"注册"
    }
  },
  {
    path:'/home',
    name:"Home",
    redirect:'/home/firstpage', // 重定向到个人中心
    component:() => import('@/views/home'),
    children:[
      {
        path:'personal',
        name:"HomePersonal",
        component:() => import('@/views/home/personal'),
        meta:{
          title:"个人中心"
        }
      },
      {
        path:"firstpage",
        name:"FirstPage",
        component:() => import('@/views/home/firstpage'),
        meta:{
          title:"首页"
        }
      },
      {
        path:"advertisement",
        name:"Advertisement",
        component:() => import('@/views/home/advertisement'),
        meta:{
          title:"推荐广告"
        }
      }
    ]
  },
  {
    path:'/admin',
    name:"Admin",
    component:() => import('@/views/admin'),
    meta:{
      title:"管理员"
    }
  },
  {
    path:'/advertiser',
    name:"Advertiser",
    component:() => import('@/views/advertiser'),
    meta:{
      title:"广告商"
    }
  }
]

const router = new VueRouter({
  routes
})

// router.beforeEach((to,from,next)=>{
//   // 如果不是登录页或者注册页
//   if(to.path !== '/login' && to.path !== '/register'){
//     // 验证是否登录
//     if(!localStorage.getItem('token')){
//       next('/login')
//     }else{
//       next()
//     }
//   }else{
//     next()
//   }
// })

router.afterEach((to,from)=>{
  const { title } = to.meta
  if(title){
    document.title = title
  }
})

export default router