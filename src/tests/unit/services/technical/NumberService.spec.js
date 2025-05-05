import { NumberService } from "../../../../services"
import { describe, expect, it } from "vitest"
describe("NumberService", () => {
  /**
   * title
   */
  describe("isNumber", () => {
    it("should return true", () => {
      expect(NumberService.isNumber("123443")).toBeEqualResultSet()
    })
    it("should return false", () => {
      expect(NumberService.isNumber("123443f")).toBeEqualResultSet()
    })
  })
})
