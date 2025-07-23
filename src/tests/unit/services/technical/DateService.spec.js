import { DateService } from "../../../../services"
import { beforeAll, describe, expect, it } from "vitest"
import TestHelper from "src/helpers/test.helper.js"

describe("DateService", () => {
  beforeAll(() => {
    TestHelper.mockDateNow("2021-01-20T10:20:30Z")
  })

  describe("diffDaysBetweenDates", () => {
    it("should return the days difference between a date and date now", () => {
      let actual = DateService.diffDaysBetweenDates("2021-01-30")
      expect(actual).toBe(9)
    })

    it("should return the days difference between two dates", () => {
      let actual = DateService.diffDaysBetweenDates("2021/01/30", "2021/01/28")
      expect(actual).toBe(2)
    })

    it("should return the days difference between two dates with differents serparators", () => {
      let actual = DateService.diffDaysBetweenDates("2021/01/30", "2021-01-28")
      expect(actual).toBe(2)
    })

    it("should return negative number of days when first date is superior to the second", () => {
      let actual = DateService.diffDaysBetweenDates("2021-01-25", "2021-01-30")
      expect(actual).toBe(-5)
    })
  })

  describe("format", () => {
    it("should return date with month in letters - fr format", () => {
      expect(DateService.format("2021-01-20", "DD MMMM YYYY")).toBe("20 janvier 2021")
    })

    it("should return date with month in letters - en format", () => {
      expect(DateService.format("2021-01-20", "DD MMMM YYYY", "en")).toBe(
        "20 January 2021",
      )
    })

    it("should return date with month in letters - es format", () => {
      expect(DateService.format("2021-01-20", "DD MMMM YYYY", "es")).toBe(
        "20 enero 2021",
      )
    })

    it("should return date with month in letters - ko format", () => {
      expect(DateService.format("2021-01-20", "DD MMMM YYYY", "ko")).toBe("20 1월 2021")
    })
  })

  describe("getFormattedDateDaysAgoFromNow", () => {
    it("should return a date in the past according to the provided number of days", () => {
      expect(DateService.getFormattedDateDaysAgoFromNow(5)).toBe("2021-01-15")
    })
  })

  describe("getFormattedDateMonthsAgoFromNow", () => {
    it("should return a date in the past according to the provided number of months", () => {
      expect(DateService.getFormattedDateMonthsAgoFromNow(10)).toBe("2020-03-20")
    })
  })

  describe("getFormattedDateYearsAgoFromNow", () => {
    it("should return a date in the past according to the provided number of years", () => {
      expect(DateService.getFormattedDateYearsAgoFromNow(3)).toBe("2018-01-20")
    })
  })
})
