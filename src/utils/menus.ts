const Home= () => import('@/views/home/Home.vue')
const layout= () => import('@/layout/index.vue')
const Roles =()=>import('@/views/roles/Roles.vue')
const Users =()=>import('@/views/users/Users.vue')
const Goods =()=>import('@/views/goods/Goods.vue')
export const Menus=[
    {
        path: '/home',
        name: 'Home',
        component: layout,
        redirect:'/home/list',
        children:[
          {
            path:'list',
            name:'home_list',
            component:Home,
            meta:{
              icon:'icon-home',
              title:'主控台'
            }
          }
        ]
      },
      {
        path: '/users',
        name: 'Users',
        component: layout,
        meta:{
          icon:'icon-user',
          title:'用户管理'
        },
        redirect:'/users/list',
        children:[
          {
            path:'list',
            name:'users_list',
            component:Users,
            meta:{
              icon:'icon-user',
              title:'用户管理'
            }
          },
        ]
      },
      {
        path: '/roles',
        name: 'Roles',
        component: layout,
        redirect:'/roles/list',
        children:[
          {
            path:'list',
            name:'roles_list',
            component:Roles,
            meta:{
              icon:'icon-jiaose',
              title:'角色管理'
            }
          }
        ]
      },
      {
        path: '/goods',
        name: 'Goods',
        component: layout,
        meta:{
          title:'资产管理',
          icon:'icon-zichan'
        },
        children:[
          {
            path:'list',
            name:'goods_list',
            component:Goods,
            meta:{
              icon:'icon-jiaose',
              title:'资产列表'
            }
          },
          {
            path:'list2',
            name:'goods_list2',
            component:Goods,
            meta:{
              icon:'icon-jiaose',
              title:'资产XX'
            }
          }
        ]
      },
]

export function initMenu(router:any,store:any){

  // console.log(router);

  Menus.forEach(item=>{
    router.addRoute(item);
    router.replace(router.currentRoute.value.fullPath)
  })
  
    console.log(router);
    store.commit('setMenus',Menus)
    return Menus
}