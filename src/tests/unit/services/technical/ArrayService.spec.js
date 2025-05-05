import { ArrayService } from "../../../../services"
import { describe, expect, it } from "vitest"
describe("ArrayService", () => {
  describe("isArray", () => {
    it("should return false is value is not an array", () => {
      ;[{ toto: 123 }, "tototruc", undefined].forEach((val) => {
        expect(ArrayService.isArray(val)).toBe(false)
      })
    })
    it("should return true if value is an array", () => {
      expect(ArrayService.isArray([1, 2, 3, "text"])).toBe(true)
    })
  })
  /**
   * range
   */
  describe("range", () => {
    it("should create a sequence of numbers", () => {
      expect(ArrayService.range(0, 15)).toBeEqualResultSet()
    })
    it("should create a sequence starting at 5 and ending at 14", () => {
      expect(ArrayService.range(5, 15)).toBeEqualResultSet()
    })
  })
  describe("areSame", () => {
    it("should be same", () => {
      const a = [1, 2, 3]
      const b = [1, 3, 2]
      expect(ArrayService.areSame(a, b)).toBe(true)
      expect(ArrayService.areSame(b, a)).toBe(true)
    })

    it("should be different", () => {
      const a = [1, 2, 3]
      const b = [1, 3, 2, 0]
      expect(ArrayService.areSame(a, b)).toBe(false)
      expect(ArrayService.areSame(b, a)).toBe(false)
    })
  })

  /**
   * pushIfNotExist
   */
  describe("pushIfNotExist", () => {
    it("should add an item to an array if it is not already in array", () => {
      const a = [1, 2, 3]
      const b = 4
      expect(ArrayService.pushIfNotExist(a, b)).toStrictEqual([1, 2, 3, 4])
    })
    it("should return the same array if value already in array", () => {
      const a = [1, 2, 3]
      const b = 3
      expect(ArrayService.pushIfNotExist(a, b)).toStrictEqual([1, 2, 3])
    })
  })

  describe("getObjectWithCommonEntriesOnly", () => {
    it("should return same object when array contains only one object", () => {
      const array = [
        {
          a: "value of a",
          b: "value of b",
          c: "value of c",
          d: "value of d",
        },
      ]
      const actual = ArrayService.getObjectWithCommonEntriesOnly(array)
      expect(actual).toEqual(array[0])
    })

    it("should return same object when array contains several objects but all with same entries", () => {
      const array = [
        {
          a: "value of a",
          b: "value of b",
          c: "value of c",
          d: "value of d",
        },
        {
          a: "value of a",
          b: "value of b",
          c: "value of c",
          d: "value of d",
        },
        {
          a: "value of a",
          b: "value of b",
          c: "value of c",
          d: "value of d",
        },
      ]
      const actual = ArrayService.getObjectWithCommonEntriesOnly(array)
      expect(actual).toEqual(array[0])
    })
    it("should return object with only common entries when array contains several objects with different entries", () => {
      const array = [
        {
          a: "value of a",
          b: "value of b",
          c: "value of c",
          d: "value of d",
        },
        {
          a: "value of a",
          d: "value of d",
        },
        {
          a: "value of a",
          b: "value of b",
          d: "value of d",
        },
      ]
      const actual = ArrayService.getObjectWithCommonEntriesOnly(array)
      expect(actual).toEqual(array[1])
    })
    it("should return empty object when array contains several objects with no common entries", () => {
      const array = [
        {
          a: "value of a",
          b: "value of b",
          c: "value of c",
          d: "value of d",
        },
        {
          e: "value of e",
          f: "value of f",
        },
        {
          g: "value of g",
          h: "value of h",
          i: "value of i",
        },
      ]
      const actual = ArrayService.getObjectWithCommonEntriesOnly(array)
      expect(actual).toEqual({})
    })
    it("should return empty object when array is empty", () => {
      const array = []
      const actual = ArrayService.getObjectWithCommonEntriesOnly(array)
      expect(actual).toEqual({})
    })
  })

  /**
   * getStringMaxLength
   */
  describe("getStringMaxLength", () => {
    it("should return 0 as array is empty", () => {
      const array = []
      expect(ArrayService.getStringMaxLength(array)).toStrictEqual(0)
    })
    it("should return the length of the longest string in array", () => {
      const array = ["toto", "toto100", "toto10", "toto1"]
      expect(ArrayService.getStringMaxLength(array)).toStrictEqual(7)
    })
  })

  /**
   * concatWithoutDuplicates
   */
  describe("concatWithoutDuplicates", () => {
    it("should return filled array when one array is empty", () => {
      const a = [1, 2, 3]
      const b = []
      expect(ArrayService.concatWithoutDuplicates(a, b)).toStrictEqual([1, 2, 3])
    })
    it("should return empty array when all arrays are empty", () => {
      const a = []
      const b = []
      expect(ArrayService.concatWithoutDuplicates(a, b)).toStrictEqual([])
    })
    it("should concat two arrays without duplicates (no duplicates before call)", () => {
      const a = [1, 2, 3]
      const b = [4, 5, 6, 7]
      expect(ArrayService.concatWithoutDuplicates(a, b)).toStrictEqual([
        1, 2, 3, 4, 5, 6, 7,
      ])
    })
    it("should concat two arrays without duplicates", () => {
      const a = [1, 2, 3]
      const b = [6, 7, 1, 8, 2, 9, 3]
      expect(ArrayService.concatWithoutDuplicates(a, b)).toStrictEqual([
        1, 2, 3, 6, 7, 8, 9,
      ])
    })
  })
  /**
   * sortIntegers
   */
  describe("sortIntegers", () => {
    it("should return an empty array when filled array is empty", () => {
      const arrayOfInt = []
      expect(ArrayService.sortIntegers(arrayOfInt)).toStrictEqual([])
    })
    it("should return sorted array", () => {
      const arrayOfInt = [1, 4, 3, 2]
      expect(ArrayService.sortIntegers(arrayOfInt)).toStrictEqual([1, 2, 3, 4])
    })
    it("should return filled array when the array is already sorted", () => {
      const arrayOfInt = [1, 2, 3, 4]
      expect(ArrayService.sortIntegers(arrayOfInt)).toStrictEqual([1, 2, 3, 4])
    })
    it("should raise an error when the array is not an array of Integer", () => {
      const arrayOfInt = ["O", "A", "B", 4]
      expect(() => ArrayService.sortIntegers(arrayOfInt)).toThrow(TypeError)
    })
  })
  /**
   * areValuesInArray
   */
  describe("areValuesInArray", () => {
    it("should return false if base array is empty ", () => {
      const baseArray = []
      expect(ArrayService.areValuesInArray(baseArray, [15, 2, 29])).toBe(false)
    })
    it("should return false if not all provided values are in base array", () => {
      const baseArray = [1, 2, 3, 4]
      expect(ArrayService.areValuesInArray(baseArray, [3, 1, 5])).toBe(false)
    })
    it("should return true if all provided values are in base array", () => {
      const baseArray = [1, 2, 3, 4, 5]
      expect(ArrayService.areValuesInArray(baseArray, [3, 1, 5])).toBe(true)
    })
    it("should return true if all provided values with simple different types are in base array", () => {
      const baseArray = ["toto", 2, 3, 4, 5.56]
      expect(ArrayService.areValuesInArray(baseArray, [3, "toto", 5.56])).toBe(true)
    })
  })
  /**
   * isObjectWithSameValuesInArray
   */
  describe("isObjectWithSameValuesInArray", () => {
    it("should return false if array is empty ", () => {
      const array = []
      const object = { name: "a name", type: "a type", value: 35 }
      expect(ArrayService.isObjectWithSameValuesInArray(array, object)).toBe(false)
    })
    it("should return false if array does not contain an object with all expected values only", () => {
      const array = [
        15,
        { name: "toto", type: "a type", value: 35 },
        { name: "a name", type: "tata", value: 35 },
        { name: "a name", type: "a type", value: 35, additionalProp: "another value" },
        { name: "a name", type: "a type", value: 25 },
      ]
      const object = { name: "a name", type: "a type", value: 35 }
      expect(ArrayService.isObjectWithSameValuesInArray(array, object)).toBe(false)
    })
    it("should return true if array contains an object with all expected values only", () => {
      const array = [
        15,
        { name: "toto", type: "a type", value: 35 },
        { name: "a name", type: "tata", value: 35 },
        { name: "a name", type: "a type", value: 35, additionalProp: "another value" },
        { name: "a name", type: "a type", value: 35 },
        { name: "a name", type: "a type", value: 25 },
      ]
      const object = { name: "a name", type: "a type", value: 35 }
      expect(ArrayService.isObjectWithSameValuesInArray(array, object)).toBe(true)
    })
    it("should return true if array contains an object with all expected values only (other properties)", () => {
      const array = [
        { name: "john", lastName: "doe", age: 33 },
        {
          firstName: "john",
          lastName: "doe",
          age: 33,
          additionalProp: "another value",
        },
        { firstName: "john", lastName: "do", age: 33 },
        { firstName: "john", lastName: "doe", age: 33 },
      ]
      const object = { firstName: "john", lastName: "doe", age: 33 }
      expect(ArrayService.isObjectWithSameValuesInArray(array, object)).toBe(true)
    })
  })
})
