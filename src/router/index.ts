import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import store from '../store';
const Login = () => import('@/views/home/Login.vue')
const Home = () => import('@/views/home/index.vue')
const ScProduct = () => import('@/views/scProduct/index.vue')
const layout = () => import('@/layout/index.vue')
export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/water'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/water',
    name: 'water',
    component: layout,
    redirect: '/water/home',
    children: [
      {
        path: 'scproduct/:id',
        name: 'ScProduct',
        component: ScProduct,
        meta: {
          title: '产品管理'
        }
      },
      {
        path: 'home',
        name: 'Home',
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
router.beforeEach((to, from, next) => {
  document.title = (to?.meta?.title as string) || document.title
  if (to.name != 'Login' && to.name != 'Register') {
    if (!localStorage.getItem('token')) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
  console.log(to.name);
  if(!router.hasRoute(to.name!)){
    store.commit('addRouter')
    next({
      ...to,
      replace: true
    })
  }else{
    next();
  }
})
export default router;
