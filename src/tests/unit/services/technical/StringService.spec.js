import { StringService } from "../../../../services"
import { describe, expect, it } from "vitest"

describe("StringService", () => {
  /**
   * title
   */
  describe("title", () => {
    it("should upper case first letter of each word", () => {
      expect(StringService.title("THIS is OnLy a TesT")).toBeEqualResultSet()
    })
    it("should upper case first letter of each word even if begins with space", () => {
      expect(StringService.title("   THIS is OnLy a TesT")).toBeEqualResultSet()
    })
  })

  describe("upperFirst", () => {
    it("should uppercase first letter", () => {
      expect(StringService.upperFirst("this is a test")).toEqual("This is a test")
    })
    it("should return empty string if value is empty string", () => {
      expect(StringService.upperFirst("")).toEqual("")
    })
  })
})
