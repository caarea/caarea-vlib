import i18n from "../i18n"
import axios from "axios"
const localStorageName = "cs-lang"

// STATES (snake_case)
const state = {
  current_lang: null,
}

// MUTATIONS (SNAKE_CASE)
const mutations = {
  SET_CURRENT_LANGUAGE: (state, lang) => {
    state.current_lang = lang
  },
}

// ACTIONS (camelCase)
const actions = {
  _setLang({ commit }, lang) {
    // console.log("setLang", lang)
    localStorage.setItem(localStorageName, lang)
    i18n.global.locale.value = lang
    axios.defaults.headers.common["Accept-Language"] = lang
    document.querySelector("html").setAttribute("lang", lang)
    commit("SET_CURRENT_LANGUAGE", lang)
  },
  initI18n({ dispatch }) {
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
  isLangAvailable: () => (lang) => i18n.global.availableLocales.includes(lang),
  availableLangs: () => i18n.global.availableLocales,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
