import { ref, computed } from "vue"
import axios from "axios"

const localStorageName = "cs-lang"

// export const useConfigStore = defineStore("config", () => {
export const configStorePinia = () => {
  // STATE
  const currentLang = ref(null)
  const i18nInstance = ref(null)

  // ACTIONS
  const _setLang = (lang) => {
    localStorage.setItem(localStorageName, lang)
    i18nInstance.value.global.locale = lang
    axios.defaults.headers.common["Accept-Language"] = lang
    document.querySelector("html").setAttribute("lang", lang)
    currentLang.value = lang
  }

  const initI18n = (i18n) => {
    i18nInstance.value = i18n
    const lang =
      localStorage.getItem(localStorageName) ||
      navigator.language.slice(0, 2) ||
      i18n.global.locale.value
    _setLang(lang)
  }

  const setCurrentLang = (lang) => {
    if (currentLang.value === null) {
      throw Error("You should initialize language with 'initI18n()' first")
    }
    _setLang(lang)
  }

  const setUserLang = (userLang) => {
    if (userLang !== currentLang.value) {
      _setLang(userLang)
    }
  }

  // GETTERS
  const getCurrentLang = computed(() => currentLang.value)

  const isLangAvailable = (lang) =>
    i18nInstance.value.global.availableLocales.includes(lang)

  const availableLangs = computed(() => i18nInstance.value.global.availableLocales)

  return {
    currentLang,
    _setLang,
    initI18n,
    setCurrentLang,
    setUserLang,
    getCurrentLang,
    isLangAvailable,
    availableLangs,
  }
}
// })
