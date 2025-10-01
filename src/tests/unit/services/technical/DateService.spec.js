import { DateService } from "../../../../services"
import dayjs from "dayjs"
import { beforeAll, describe, expect, it } from "vitest"
import TestHelper from "../../../test.helper.js"

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

  describe("getFirstDayOfMonth", () => {
    it("should return the first day of the month at 00:00:00.000", () => {
      const d = DateService.getFirstDayOfMonth("2021-03-15T12:34:56Z")
      expect(d.toISOString()).toBe("2021-03-01T00:00:00.000Z")
    })

    it("should accept Date, string, number, and dayjs inputs", async () => {
      const base = new Date("2020-02-20T10:00:00Z")
      expect(DateService.getFirstDayOfMonth(base).toISOString()).toBe(
        "2020-02-01T00:00:00.000Z",
      )
      expect(
        DateService.getFirstDayOfMonth("2020-02-20").format("YYYY-MM-DD HH:mm:ss.SSS"),
      ).toBe("2020-02-01 00:00:00.000")
      const ts = Date.parse("2020-02-20T10:00:00Z")
      expect(DateService.getFirstDayOfMonth(ts).toISOString()).toBe(
        "2020-02-01T00:00:00.000Z",
      )
      const djs = dayjs("2020-02-20")
      expect(DateService.getFirstDayOfMonth(djs).format("YYYY-MM-DD")).toBe(
        "2020-02-01",
      )
    })
  })

  describe("getLastDayOfMonth", () => {
    it("should return the last day of the month at 23:59:59.999", () => {
      const d = DateService.getLastDayOfMonth("2021-03-15T12:34:56Z")
      expect(d.toISOString()).toBe("2021-03-31T23:59:59.999Z")
    })

    it("should handle leap year February correctly", () => {
      const leap = DateService.getLastDayOfMonth("2020-02-10")
      expect(leap.format("YYYY-MM-DD HH:mm:ss.SSS")).toBe("2020-02-29 23:59:59.999")
      const nonLeap = DateService.getLastDayOfMonth("2021-02-10")
      expect(nonLeap.format("YYYY-MM-DD HH:mm:ss.SSS")).toBe("2021-02-28 23:59:59.999")
    })
  })

  describe("shift", () => {
    it("should shift date by days from provided base date", () => {
      const d = DateService.shift("2021-01-20", { days: 5 })
      expect(d.format("YYYY-MM-DD")).toBe("2021-01-25")
    })

    it("should shift date by multiple units including weeks conversion", () => {
      const d = DateService.shift("2021-01-20T10:20:30Z", {
        years: 1,
        months: 2,
        weeks: 1,
        days: 3,
        hours: 4,
        minutes: 5,
        seconds: 6,
        milliseconds: 7,
      })
      expect(d.toISOString()).toBe("2022-03-30T13:25:36.007Z")
    })

    it("should support negative shifts (backwards)", () => {
      const d = DateService.shift("2021-03-10", { months: -1, days: -10 })
      expect(d.format("YYYY-MM-DD")).toBe("2021-01-31")
    })

    it("should treat weeks as 7 days", () => {
      const d = DateService.shift("2021-01-01", { weeks: 2 })
      expect(d.format("YYYY-MM-DD")).toBe("2021-01-15")
    })

    it("should return same instant when deltas are empty or zero", () => {
      const base = "2021-01-20T10:20:30Z"
      const baseIso = new Date(base).toISOString()
      expect(DateService.shift(base, {}).toISOString()).toBe(baseIso)
      expect(DateService.shift(base, { days: 0 }).toISOString()).toBe(baseIso)
    })

    it("should throw on invalid date input", () => {
      expect(() => DateService.shift("invalid-date", { days: 1 })).toThrow()
    })

    it("should coerce numeric-like strings using Number()", () => {
      const d = DateService.shift("2021-01-01", { days: "2", weeks: "1" })
      expect(d.format("YYYY-MM-DD")).toBe("2021-01-10")
    })

    it("should handle month boundary like Jan 31 + 1 month using dayjs behavior", () => {
      const d = DateService.shift("2021-01-31", { months: 1 })
      // dayjs moves to end of Feb (Feb 28 in 2021)
      expect(d.format("YYYY-MM-DD")).toBe("2021-02-28")
    })
  })
})
