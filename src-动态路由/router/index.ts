import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import store from '@/store'
const Login= () => import('@/views/home/Login.vue')
const layout = () => import('@/layout/index.vue')
const Menu = () => import('@/views/menu/index.vue')
const Home = () => import('@/views/home/index.vue')
export const routes: Array<RouteRecordRaw> = [
  {
    path:'/',
    redirect:'/warter'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      title:'登录'
    }
  },
  {
    path: '/warter',
    name: 'warter',
    component: layout,
    redirect: '/warter/home',
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          icon: 'icon-home',
          title: '主控台'
        }
      },
    ]
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


next();

})
export default router;
