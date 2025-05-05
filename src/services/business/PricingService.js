import AbstractService from "../AbstractService"
import i18n from "../../i18n"

class PricingService extends AbstractService {
  /**
   * Return the price formatted for display, according to the current locale and whether it's a cash or monthly price.
   * Cash price must be displayed without any decimals ; monthly price must be displayed with 2 decimals.
   *
   * @param {Number} price price to be formatted
   * @param {String} currency_code currency_code to be applied
   * @param {Boolean} isMonthly whether it's a monthly price or not
   *
   * @returns {String} formatted price
   */
  getFormattedPriceToDisplay(price, isMonthly = false, currency_code = "EUR") {
    const key = isMonthly ? "monthly_pricing" : "cash_pricing"
    return i18n.global.n(price, { key: key, currency: currency_code })
  }
}

export default new PricingService()
