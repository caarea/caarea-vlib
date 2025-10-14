import AbstractService from "../AbstractService"

class ObjectUtils extends AbstractService {
  /**
   *
   * @param {String} from
   * @param {String} to
   * @param {Object} obj
   */
  getRange(from, to, obj) {
    const asArray = Object.entries(obj)
    const filtered = asArray.filter(([, value]) => value >= from && value <= to)
    return Object.fromEntries(filtered)
  }

  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  /**
   * Return a string that can be used to print the content of an object.
   * An optional delimiter can be set to separate the properties in the string. Default delimiter is ", ".
   * Warning (limitation) : for now, only use this service if all the values are printable.
   *
   * @param {Object} object object to be treated
   * @param {String} [delimiter=", "] delimiter to separate properties
   *
   * @returns {String}
   */
  getPrintableContent(object, delimiter = ", ") {
    if (object === null) {
      return ""
    }
    const printableContent = Object.keys(object).map((key) => `${key}: ${object[key]}`)
    return printableContent.join(delimiter)
  }
}

let ObjectService = new ObjectUtils()
export default ObjectService
