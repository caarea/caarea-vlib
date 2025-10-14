/* eslint-disable no-undef */
import { PricingService } from "../../../../services"
import { caareaVlibI18nNumberFormats } from "../../../../i18n"
import { describe, expect, it } from "vitest"
import { createI18n } from "vue-i18n"

describe("PricingService", () => {
  describe("getFormattedPriceToDisplay", () => {
    describe("fr locale", () => {
      beforeAll(() => {
        const i18n = createI18n({
          locale: "fr",
          numberFormats: caareaVlibI18nNumberFormats,
        })
        PricingService.setI18n(i18n.global)
      })
      // Note : i18n uses a NBSP character (Non-Breaking Space) instead of a space character,
      // so we need to use it when comparing strings
      it("should return price with no decimals when payment frequency is not specified", () => {
        expect(PricingService.getFormattedPriceToDisplay(856)).toStrictEqual("856 €")
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
      beforeAll(() => {
        const i18n = createI18n({
          locale: "en",
          numberFormats: caareaVlibI18nNumberFormats,
        })
        PricingService.setI18n(i18n.global)
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
