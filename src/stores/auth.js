// STATES (snake_case)
import { GroupService, HttpService, SsoService, UrlService } from "../services"
import { AxiosHelper } from "../helpers"

const state = {
  current_user: null,
  current_user_group: null,
  sharing_token: null,
}

// MUTATIONS (SNAKE_CASE)
const mutations = {
  SET_CURRENT_USER(state, user) {
    state.current_user = user
  },
  SET_CURRENT_USER_GROUP(state, group) {
    state.current_user_group = group
  },
  SET_SHARING_TOKEN(state, token) {
    state.sharing_token = token
    AxiosHelper.setAuthorizationSharedTokenHeader(token)
  },
  RESET_AUTH(state) {
    AxiosHelper.resetAuthorizationHeader()
    state.current_user = null
    state.current_user_group = null
    state.sharing_token = null
  },
}

// ACTIONS (camelCase)
const actions = {
  async fetchLoggedUser({ commit }) {
    // console.log("fetchLoggedUser")
    try {
      let user = await HttpService.get(UrlService.render("fetchLoggedUser"))
      commit("SET_CURRENT_USER", user)
      commit("SET_CURRENT_USER_GROUP", user.group)
      // console.log("fetchLoggedUser done")
    } catch (e) {
      console.error("failed: ", e)
    }
  },
  async setSharingToken({ commit, dispatch }, token) {
    await dispatch("logout")
    // console.log("logout done")
    commit("SET_SHARING_TOKEN", token)
  },
  async logout({ commit }) {
    commit("RESET_AUTH")
    await SsoService.logout()
  },
  async updateLang({ dispatch }, payload) {
    await HttpService.put(UrlService.render("userLang", { id: payload.userId }), {
      lang: payload.lang,
    })
    await dispatch("fetchLoggedUser")
  },
}

// GETTERS (camelCase)
const getters = {
  isLoggedIn: (state, getters) =>
    (state.sharing_token && getters.isGuestUser) || SsoService.isAuthenticated(),
  isLoggedInSharingMode: (state, getters) =>
    state.sharing_token && getters.isGuestUser && getters.isSharingProgramsEnabled,
  isGuestUser: (state) =>
    state.current_user && state.current_user.group.id === GroupService.GUEST,
  isSharingTokenExists: (state) => (token) =>
    state.sharing_token && state.sharing_token === token,
  getCurrentUser: (state) => state.current_user,
  getCurrentUserGroupId: (state) => state.current_user?.group?.id,
  getRouteName: (state) => (routeName) =>
    state.sharing_token ? `shared_${routeName}` : routeName,
  hasSharingToken: (state) => state.sharing_token !== null,
  getSharingToken: (state) => state.sharing_token,
  getUserLang: (state) => state.current_user.profile.lang,
  isSharingProgramsEnabled: (state) => state.current_user?.sharing_programs_enabled,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
