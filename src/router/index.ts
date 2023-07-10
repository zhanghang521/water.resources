import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
const Login = () => import('@/views/home/Login.vue')
const Home = () => import('@/views/home/index.vue')
const layout = () => import('@/layout/index.vue')
const Menu = () => import('@/views/menu/index.vue')
const Roles = () => import('@/views/roles/index.vue')
const Meeting = () => import('@/views/meeting/index.vue')
const SonCom = () => import('@/views/sonCom/index.vue')
const Dept = () => import('@/views/dept/index.vue')
const Goods = () => import('@/views/goods/index.vue')
const Users = () => import('@/views/users/index.vue')
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
        path: 'home',
        name: 'Home',
        component: Home,
        meta: {
          icon: 'icon-home',
          title: '主控台'
        }
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        meta: {
          icon: 'icon-user',
          title: '员工管理'
        }
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles,
        meta: {
          icon: 'icon-jiaose',
          title: '角色管理'
        }
      },
      {
        path: 'menu',
        name: 'Menu',
        component: Menu,
        meta: {
          icon: 'icon-caidan',
          title: '菜单管理'
        }
      },
      {
        path: 'sonCom',
        name: 'SonCom',
        component: SonCom,
        meta: {
          icon: 'icon-gongsi',
          title: '公司管理'
        }
      },
      {
        path: 'meeting',
        name: 'Meeting',
        component: Meeting,
        meta: {
          icon: 'icon-huiyi',
          title: '会议管理'
        }
      },
      {
        path: 'dept',
        name: 'Dept',
        component: Dept,
        meta: {
          icon: 'icon-bumen',
          title: '部门管理'
        }
      },
      {
        path: 'goods',
        name: 'Goods',
        component: Goods,
        meta: {
          icon: 'icon-zichan',
          title: '资产管理'
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
