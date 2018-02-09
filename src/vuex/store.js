import Vue from "vue";
import Vuex from "vuex";
import {
  getCurrentMenu,
  getSessionKey
} from '../utils/util'

Vue.use(Vuex)

const state = {
  loading: false,
  menuList: [{
    "id": 1,
    "parentId": null,
    "sort": 0,
    "name": "首页",
    "href": "/",
    "icon": "fa fa-home",
    "children": [],
    "isShow": "1"
  }, {
    "id": 31,
    "parentId": null,
    "sort": 1,
    "name": "用户管理",
    "href": "/sys/person",
    "icon": "fa fa-user",
    "children": [],
    "isShow": "1"
  }, {
    "id": 102,
    "parentId": null,
    "sort": 3,
    "name": "角色管理",
    "href": "/sys/role",
    "icon": "fa fa-download",
    "children": [],
    "isShow": "1"
  }, {
    "id": 102,
    "parentId": null,
    "sort": 3,
    "name": "菜单管理",
    "href": "/sys/menu",
    "icon": "fa fa-tree",
    "children": [],
    "isShow": "1"
  }, {
    "id": 6,
    "parentId": null,
    "sort": 6,
    "name": "系统管理",
    "href": "/sys",
    "icon": "fa fa-cog",
    "children": [{
      "id": 108,
      "parentId": 6,
      "sort": 0,
      "name": " 资源管理",
      "href": "/sys/resource",
      "icon": "fa fa-database",
      "children": [],
      "isShow": "1"
    }, {
      "id": 7,
      "parentId": 6,
      "sort": 1,
      "name": "菜单管理",
      "href": "/sys/menuList",
      "icon": "fa fa-navicon",
      "children": [],
      "isShow": "1"
    }, {
      "id": 8,
      "parentId": 6,
      "sort": 2,
      "name": "角色管理",
      "href": "/sys/roleList",
      "icon": "fa fa-universal-access",
      "children": [],
      "isShow": "1"
    }, {
      "id": 9,
      "parentId": 6,
      "sort": 3,
      "name": "用户管理",
      "href": "/sys/userList",
      "icon": "fa fa-user-plus",
      "children": [],
      "isShow": "1"
    }],
    "isShow": "1"
  }],
  sidebar: {
    collapsed: getSessionKey('state.sidebar.collapsed', 'false') === 'true',
    show: getSessionKey('state.sidebar.show', 'true') === 'true',
  },
  device: {
    isMobile: false
  },
  userInfo: {
    name: '佚名',
    avatar: '../../static/img/user.png'
  },
  currentMenus: [ {
      path: '/',
      name: '首页'
  } ],
}

const mutations = {
  //只能同步的函数
  ['TOGGLE_DEVICE'](state, isMobile) {
    state.device.isMobile = isMobile
  },
  ['TOGGLE_LOADING'](state) {
    state.loading = !state.loading
  },
  ['LOAD_MENU'](state, menu) {
    state.menuList = menu;
  },
  ['LOAD_CURRENT_MENU'](state, menu) {
    state.currentMenus = menu;
  },
  ['SET_USER_INFO'](state, info) {
    state.userInfo = info;
  },
  ['TOGGLE_SIDEBAR'](state, collapsed) {
    if (collapsed == null) collapsed = !state.sidebar.collapsed;
    state.sidebar.collapsed = collapsed;
    window.sessionStorage.setItem("state.sidebar.collapsed", collapsed)
  },
  ['TOGGLE_SIDEBAR_SHOW'](state, show) {
    if (show == null) state.sidebar.show = !state.sidebar.show;
    else {
      state.sidebar.show = show;
    }
    window.sessionStorage.setItem("state.sidebar.show", state.sidebar.show)
  }
}

const actions = {
  toggleLoading: ({
    commit
  }) => commit('TOGGLE_LOADING'),

  changeCurrentMenu: ({
    state,
    commit
  }, {
    path,
    matched,
    fullPath
  }) => {
    const a = getCurrentMenu(fullPath, state.menuList);
    commit('LOAD_CURRENT_MENU', a.reverse());
  }
}

const getters = {
  loading: state => state.loading,
  menuList: state => state.menuList,
  sidebar: state => state.sidebar,
  userInfo: state => state.userInfo,
  device: state => state.device,
  currentMenus: state => state.currentMenus,
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
