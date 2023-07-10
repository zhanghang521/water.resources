import { createStore } from 'vuex';
import { login } from '@/request/users'
import { mapMenu } from '@/utils/menus'
import { getAllNav } from '@/request/menu'
import router from '@/router';
//数据持久化
import createPersistedstate  from 'vuex-persistedstate'
interface IUserState {
  token: string,
  uInfo:object,
  menus:object[]
}

export default createStore({
  state: <IUserState>{
    token: localStorage.getItem('token') || '',
    uInfo: JSON.parse(localStorage.getItem('uInfo') as string)|| {},
    menus:[]
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token',token)
      state.token = token
    },
    setUInfo(state, uInfo) {
      localStorage.setItem('uInfo',uInfo)
      state.uInfo = uInfo
    },
    setMenu(state, menuList) {
      //动态添加路由
      state.menus = mapMenu(menuList)
      mapMenu(menuList).forEach((route) => {
        router.addRoute('warter',route)
      })
      console.log(router);
    }
  },
  actions: {
    async login({dispatch,commit,state},data) {
      try {
        const res:any = await login(data)
        if (typeof res == 'object') {
         commit('setToken',res.token)
         commit('setUInfo',res)
         dispatch('requestMenu')
        }
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async requestMenu({ commit }) {
      const menuList = await getAllNav()
      commit('setMenu', menuList)
      localStorage.setItem('menu', JSON.stringify(menuList))
    },

    // 初始化数据
    initializationData({ dispatch, commit }) {	//vuex初始化函数
      const menuList = JSON.parse(localStorage.getItem('menu') as string)
      if (menuList) {
        // console.log(menuList);
        commit('setMenu', menuList)
      }else{
        router.push({path:'/'})
      }
      
      //要用同步的
      const uInfo = localStorage.getItem('uInfo')
      if (uInfo) {
        commit('setUInfo', uInfo)
      }else{
        router.push({path:'/'})
      }
      
    }
  },
  modules: {},
 /*  plugins:[
    createPersistedstate({
      key:'user',// 存数据的key名   自定义的  要有语义化
      // paths: ['loginModule'] // 要把那些模块加入缓存
    }) 
  ] */
});
