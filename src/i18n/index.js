import { createI18n } from "vue-i18n"
import en from "./en"
import fr from "./fr"
import es from "./es"
import ko from "./ko"
import numberFormats from "./numberFormats"

export const messages = {
  en: en,
  fr: fr,
  es: es,
  ko: ko,
}

const i18n = createI18n({
  legacy: false, // Vous devez définir cette option sur false pour Vue 3
  fallbackLocale: "fr",
  locale: "fr",
  messages,
  numberFormats,
})

export default i18n
