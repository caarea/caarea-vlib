import axios from "axios"
const localStorageName = "cs-lang"

// STATES (snake_case)
const state = {
  current_lang: null,
  i18n: null,
}

// MUTATIONS (SNAKE_CASE)
const mutations = {
  SET_CURRENT_LANGUAGE: (state, lang) => {
    state.current_lang = lang
    if (!state.i18n) {
      throw Error(
        "You should initialize i18n with 'dispatch(\"config/initI18n\")' first",
      )
    }
    state.i18n.global.locale = lang
  },
  SET_I18N: (state, i18n) => {
    state.i18n = i18n
  },
}

// ACTIONS (camelCase)
const actions = {
  _setLang({ commit }, lang) {
    // console.log("setLang", lang)
    localStorage.setItem(localStorageName, lang)
    axios.defaults.headers.common["Accept-Language"] = lang
    document.querySelector("html").setAttribute("lang", lang)
    commit("SET_CURRENT_LANGUAGE", lang)
  },
  initI18n({ dispatch, commit }, i18n) {
    commit("SET_I18N", i18n)
    const lang =
      localStorage.getItem(localStorageName) ||
      navigator.language.slice(0, 2) ||
      i18n.global.locale.value
    dispatch("_setLang", lang)
  },
  setCurrentLang({ state, dispatch }, lang) {
    if (state.current_lang === null) {
      throw Error(
        "You should initialize language with 'dispatch(\"config/initLang\")' first",
      )
    }
    dispatch("_setLang", lang)
  },
  setUserLang({ state, dispatch, rootGetters }) {
    const userLang = rootGetters["auth/getUserLang"]
    if (userLang !== state.current_lang) {
      dispatch("_setLang", userLang)
    }
  },
}

// GETTERS (camelCase)
const getters = {
  getCurrentLang: (state) => state.current_lang,
  // isLangAvailable: (state) => (lang) => i18n.global.availableLocales.includes(lang),
  isLangAvailable: () => (lang) => state.i18n.global.availableLocales.includes(lang),
  availableLangs: () => state.i18n.global.availableLocales,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
