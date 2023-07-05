import { createStore } from 'vuex';
import { login } from '@/request/users'
interface IUserState {
  token: string,
  uName: string,
  uTel: string,
  uInfo:object,
  menus:string[]
}

export default createStore({
  state: <IUserState>{
    token: localStorage.getItem('token') || '',
    uName: '',
    uTel: '',
    uInfo:{},
    menus:[]
  },
  getters: {
    getToken(state) {
      return state.token
    },
    getUName(state) {
      return state.uName
    },
    getUTel(state) {
      return state.uTel
    },
    getUInfo(state) {
      return state.uInfo
    },
    getMenus(state) {
      return state.menus
    }
  },
  mutations: {
    setToken(state, token) {
      localStorage.setItem('token',token)
      state.token = token
    },
    setUName(state, uName) {
      state.uName = uName
    },
    setUTel(state, uTel) {
      state.uTel = uTel
    },
    setUInfo(state, uInfo) {
      state.uInfo = uInfo
    },
    setMenus(state, menus) {
      state.menus = menus
    }
  },
  actions: {
    async login({commit,state},data) {
      try {
        const res:any = await login(data)
        if (typeof res == 'object') {
         commit('setToken',res.token)
         commit('setUName',res.uName)
         commit('setUTel',res.uTel)
         commit('setUInfo',res)
        }
        return Promise.resolve(res)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  modules: {},
});
