import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        // const { data } = {"code":20000,"data":{"token":"admin-token"}}
         // return {"code":20000,"data":{"token":"admin-token"}}
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 根据state.token返回 role 信息
        // if(state.token==='admin-token')
        // {console.log(111);
        // response = {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}}
        // else if(state.token==='editor-token')
        // response = {"code":20000,"data":{"roles":["editor"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
        // else if(state.token==='super-token')
        // response = {"code":20000,"data":{"roles":["super"],"introduction":"I am an super","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal super"}}
        // else if(state.token==='editor-token')
        // response = {"code":20000,"data":{"roles":["editor"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
        const { data } = response
  // return {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
// console.log(response);
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    // const { roles } = await dispatch('getInfo')
    // 根据state.token返回 role 信息
    let response = ''
 if(state.token==='admin-token')
 {console.log(111);
 response = {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}}
 else if(state.token==='editor-token')
 response = {"code":20000,"data":{"roles":["editor"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
 else if(state.token==='super-token')
 response = {"code":20000,"data":{"roles":["super"],"introduction":"I am an super","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal super"}}
 else if(state.token==='first-token')
 response = {"code":20000,"data":{"roles":["first"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
 else if(state.token==='second-token')
 response = {"code":20000,"data":{"roles":["second"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
 else if(state.token==='third-token')
 response = {"code":20000,"data":{"roles":["third"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
 else if(state.token==='shelf-token')
 response = {"code":20000,"data":{"roles":["shelf"],"introduction":"I am an editor","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Normal Editor"}}
 const { data } = response
// return {"code":20000,"data":{"roles":["admin"],"introduction":"I am a super administrator","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"Super Admin"}}
// console.log(response);
 if (!data) {
   reject('Verification failed, please Login again.')
 }

 const { roles, name, avatar, introduction } = data

 // roles must be a non-empty array
 if (!roles || roles.length <= 0) {
   reject('getInfo: roles must be a non-null array!')
 }

 commit('SET_ROLES', roles)
 commit('SET_NAME', name)
 commit('SET_AVATAR', avatar)
 commit('SET_INTRODUCTION', introduction)
    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
