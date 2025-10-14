import AbstractService from "../AbstractService"
import numeral from "numeral"

class NumberUtils extends AbstractService {
  /**
   * Returns true if str param is a number.
   * @param str
   * @returns {boolean}
   */
  isNumber(str) {
    return !isNaN(str)
  }

  /**
   * format a number
   * @param value
   * @param format
   * @returns {*}
   */
  // todofsc: faire les tests si utilisé products
  numberFormat(value, format = "0,0") {
    return numeral(value).format(format)
  }

  numeralFormat(value, format = "0,0[.]00 $") {
    return this.numberFormat(value, format)
  }
}

let NumberService = new NumberUtils()
export default NumberService
