import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import {initMenu} from "@/utils/menus";
import store from '@/store'
const Login= () => import('@/views/home/Login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'登录'
    }
  },  
 
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//全局前置路由守卫
router.beforeEach((to,from,next)=>{
  document.title = (to?.meta?.title as string) || document.title
  if (to.name != 'Login') {
    if (!localStorage.getItem('token')) {
        next({
            path: '/login',
            query: {
                redirect: to.fullPath
            }
        })
    }
}

if(to.path == '/login'){
  next();
}else{
  if(store.state.menus.length==0){
    //刷新重新加载动态路由
    initMenu(router, store);
    //恢复到当前路由
    next({path:to.fullPath,replace: true});
  }else{

    next();
  }
}


})
export default router;
