import { ObjectService } from "../../../../services"
import { describe, expect, it } from "vitest"
describe("ObjectService", () => {
  const ObjectTest = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
  }
  /**
   * getRange
   */
  describe("getRange", () => {
    it("should create an Object", () => {
      expect(ObjectService.getRange("1", "7", ObjectTest)).toBeEqualResultSet()
    })
    it("should create a Objectn lowest value is 2 and highest is 6", () => {
      expect(ObjectService.getRange("2", "6", ObjectTest)).toBeEqualResultSet()
    })
  })

  describe("getPrintableContent", () => {
    it("should return empty string if object is null", () => {
      const printableProperties = ObjectService.getPrintableContent(null)
      expect(printableProperties).toEqual("")
    })
    it("should return empty string if object has no properties", () => {
      const printableProperties = ObjectService.getPrintableContent({})
      expect(printableProperties).toEqual("")
    })
    it("should return string if object has one property", () => {
      const printableProperties = ObjectService.getPrintableContent({
        prop1: "value_prop1",
      })
      expect(printableProperties).toEqual("prop1: value_prop1")
    })
    it("should return string with default delimiter if object has several properties and no delimiter is specified", () => {
      const printableProperties = ObjectService.getPrintableContent({
        prop1: "value_prop1",
        prop2: 3,
        prop3: 6.75,
      })
      expect(printableProperties).toEqual("prop1: value_prop1, prop2: 3, prop3: 6.75")
    })
    it("should return string with delimiter if object has several properties and delimiter is specified", () => {
      const printableProperties = ObjectService.getPrintableContent(
        {
          prop1: "value_prop1",
          prop2: 3,
          prop3: 6.75,
        },
        "\n",
      )
      expect(printableProperties).toEqual("prop1: value_prop1\nprop2: 3\nprop3: 6.75")
    })
  })
})
