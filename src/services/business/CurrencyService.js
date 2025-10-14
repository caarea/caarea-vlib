import AbstractService from "../AbstractService"

class CurrencyService extends AbstractService {
  currencyCode = {
    kow: "₩",
    eur: "€",
  }

  getCurrencySymbol() {
    const currencySymbol = import.meta.env.VITE_CURRENCY_CODE || "eur"
    return this.currencyCode[currencySymbol]
  }

  getProductMemoCurrencySymbol(currentLang) {
    return currentLang !== "ko" ? this.currencyCode["eur"] : this.currencyCode["kow"]
  }

  getCurrencyEurToKrwRate() {
    return import.meta.env.VITE_EUR_TO_KRW_CHANGE_RATE || 1400
  }
}

export default new CurrencyService()
