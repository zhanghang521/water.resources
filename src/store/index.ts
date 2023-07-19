import { createStore } from 'vuex';
import { getOneUsers, login } from '@/request/users'
import { mapMenu } from '@/utils/menus'
import { getAllNav, getOneNav, getPowerNav } from '@/request/menu'
import { getOneRoles } from '@/request/roles';
import router from '@/router';
//数据持久化
import createPersistedState from "vuex-persistedstate";


interface IUserState {
  token: string,
  uInfo: any,
  menus: object[]
}

export default createStore({
  state: <IUserState>{
    token: localStorage.getItem('token') || '',
    uInfo: {},
    menus: []
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token', token)
      state.token = token
    },
    setUInfo(state, uInfo) {
      state.uInfo = uInfo
    },
    setMenu(state, menuList) {
      state.menus = mapMenu(menuList)
    },
    addRouter(state, menu) {
      const menuList = menu || JSON.parse(localStorage.getItem('menuList') || '')
    /*   mapMenu(menuList).forEach(item => {
        router.removeRoute(item.name)
      }) */
      mapMenu(menuList).forEach(item => {
        router.addRoute('water', item)
      })
    }

  },
  actions: {
     init({ dispatch, commit, state }, payload) {
          commit('setToken', payload.token)
          commit('setUInfo', payload)
          dispatch('getMenuList', payload.uId)
    },

    async getMenuList({ dispatch, commit, state }, uId) {
      try {
        //根据uId获取uPower和rId
        const user: any = await getOneUsers(uId)
        const uPower = user.uPower.split(',')
        //根据rId获取 rPower
        const roles: any = await getOneRoles(user.rId)
        const rPower = roles.rPower.split(',')
        //uPower和rPower合并去重
        const newPowerArr = rPower.concat(uPower)  //合并
        const newPower = (Array.from(new Set(newPowerArr))).toString()
        //根据Power字符串获取菜单列表
        const menuList = await getPowerNav(newPower)
        // console.log(menuList);
      
        localStorage.setItem('menuList', JSON.stringify(menuList))
        //获取需要的路由格式
        commit('setMenu', menuList)
        commit('addRouter', menuList)

        // const res = await getPowerNav()
      } catch (error) {
        return Promise.reject(error)
      }
    },
    addRouter({ dispatch, commit, state }) {
      dispatch('getMenuList', state.uInfo.uId)
    }
  },
  modules: {},
  plugins: [
    //路由固话
    createPersistedState({
      reducer(state) {
        return {
          menus: state.menus,
          uInfo: state.uInfo
        }
      }
    })
  ]

});
