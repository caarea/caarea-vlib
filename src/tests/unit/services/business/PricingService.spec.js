import { PricingService } from "../../../../services"
import i18n from "../../../../i18n"
import { describe, it, expect, beforeEach } from "vitest"
describe("PricingService", () => {
  describe("getFormattedPriceToDisplay", () => {
    describe("fr locale", () => {
      beforeEach(() => {
        i18n.globallocale = "fr"
      })
      // Note : i18n uses a NBSP character (Non-Breaking Space) instead of a space character,
      // so we need to use it when comparing strings
      it("should return price with no decimals when payment frequency is not specified", () => {
        expect(PricingService.getFormattedPriceToDisplay(856)).toStrictEqual("856 €")
        expect(PricingService.getFormattedPriceToDisplay(856.12)).toStrictEqual("856 €")
      })
      it("should return price with 2 decimals when payment frequency is monthly", () => {
        expect(PricingService.getFormattedPriceToDisplay(856, true)).toStrictEqual(
          "856,00 €",
        )
        expect(PricingService.getFormattedPriceToDisplay(856.1, true)).toStrictEqual(
          "856,10 €",
        )
        expect(PricingService.getFormattedPriceToDisplay(856.12, true)).toStrictEqual(
          "856,12 €",
        )
        expect(PricingService.getFormattedPriceToDisplay(856.123, true)).toStrictEqual(
          "856,12 €",
        )
      })
      it("should return price with no decimals when payment frequency is not monthly", () => {
        expect(PricingService.getFormattedPriceToDisplay(856)).toStrictEqual("856 €")
        expect(PricingService.getFormattedPriceToDisplay(856.12)).toStrictEqual("856 €")
      })
    })
    describe("en locale", () => {
      beforeEach(() => {
        i18n.global.locale.value = "en"
      })
      it("should return price with no decimals when payment frequency is not specified", () => {
        expect(PricingService.getFormattedPriceToDisplay(856)).toStrictEqual("€856")
        expect(PricingService.getFormattedPriceToDisplay(856.12)).toStrictEqual("€856")
      })
      it("should return price with 2 decimals when payment frequency is monthly", () => {
        expect(PricingService.getFormattedPriceToDisplay(856, true)).toStrictEqual(
          "€856.00",
        )
        expect(PricingService.getFormattedPriceToDisplay(856.1, true)).toStrictEqual(
          "€856.10",
        )
        expect(PricingService.getFormattedPriceToDisplay(856.12, true)).toStrictEqual(
          "€856.12",
        )
        expect(PricingService.getFormattedPriceToDisplay(856.123, true)).toStrictEqual(
          "€856.12",
        )
      })
      it("should return price with no decimals when payment frequency is not monthly", () => {
        expect(PricingService.getFormattedPriceToDisplay(856)).toStrictEqual("€856")
        expect(PricingService.getFormattedPriceToDisplay(856.12)).toStrictEqual("€856")
      })
      it("should return price with the right currency symbol", () => {
        expect(
          PricingService.getFormattedPriceToDisplay(856, false, "KRW"),
        ).toStrictEqual("₩856")
      })
    })
  })
})
