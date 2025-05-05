import AbstractService from "../AbstractService"

class ArrayUtils extends AbstractService {
  isArray(value) {
    return Array.isArray(value)
  }

  /**
   * Creates a sequence of numbers, starting from 0 by default, increments by 1
   * and stops before a specified number
   *
   * same as Python range()
   *
   * @param start
   * @param end
   * @returns {unknown[]}
   */
  range(start, end) {
    return [...Array(end - start).keys()].map((v) => start + v)
  }

  areSame(first, second) {
    return (
      first.every((e) => second.includes(e)) && second.every((e) => first.includes(e))
    )
  }

  /**
   * Adds an element to the array if it does not already exist
   *
   * @param baseArray
   * @param value
   */
  pushIfNotExist(baseArray, value) {
    if (!baseArray.includes(value)) {
      baseArray.push(value)
    }
    return baseArray
  }

  /**
   * Return an object containing only the entries common to all objects.
   * Limitation: dict should contain only simple types
   *
   * @param {Array} array
   */
  getObjectWithCommonEntriesOnly(array) {
    if (array.length === 0) {
      return {}
    }
    // Copy array because sort() applies in place !
    const arrayCopy = [...array]
    // Sort array of objects by number of keys
    // => in order to have the object with the lowest number of keys at index 0
    const arraySortedByNbOfEntries = arrayCopy.sort((a, b) => {
      return Object.keys(a).length > Object.keys(b).length ? 1 : -1
    })
    // Filter first object to keep only the keys that are included in all other objects
    return Object.fromEntries(
      Object.entries(arraySortedByNbOfEntries[0]).filter(([key]) => {
        return arrayCopy.every((item) => Object.keys(item).includes(key))
      }),
    )
  }

  /**
   * Returns the length of the longest string in the provided array.
   *
   * @param array
   * @returns {Number}
   */
  getStringMaxLength(array) {
    return array.reduce((acc, item) => {
      return item.length > acc ? item.length : acc
    }, 0)
  }

  /**
   * Check if array contains provided values.
   * Values must be simple elements like string, integers, ...
   *
   * @param baseArray
   * @param values
   * @returns boolean
   */
  areValuesInArray(baseArray, values) {
    return values.every((value) => baseArray.includes(value))
  }

  /**
   * Returns an array that contains the items of both input arrays, without duplicated items.
   *
   * @param array1
   * @param array2
   * @returns {Array}
   */
  concatWithoutDuplicates(array1, array2) {
    let resultArray = array1
    array2.forEach(
      (item) => (resultArray = ArrayService.pushIfNotExist(resultArray, item)),
    )
    return resultArray
  }

  /**
   * Returns an array that contains the items in ascending order.
   *
   * @param array
   * @returns {Array}
   */
  sortIntegers(array) {
    if (array.some((item) => !Number.isInteger(item))) {
      throw new TypeError()
    }
    return array.sort((a, b) => a - b)
  }

  /**
   * Returns an indicator whether an object with the provided values exists in an array.
   * It only checks property - value couples not whether it's the same object.
   *
   * @param array
   * @param object
   * @returns {boolean}
   */
  isObjectWithSameValuesInArray(array, object) {
    return array.some((item) => JSON.stringify(item) === JSON.stringify(object))
  }
}

let ArrayService = new ArrayUtils()
export default ArrayService
