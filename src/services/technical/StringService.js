import AbstractService from "../AbstractService"

class StringUtils extends AbstractService {
  /**
   * Returns a string where the first character in every word is upper case.
   * @param str
   * @returns {string}
   */
  title(str) {
    return str
      .trim()
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word[0].toUpperCase() + word.substr(1)
      })
      .join(" ")
  }

  upperFirst(value) {
    if (!value) return ""
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}

let StringService = new StringUtils()
export default StringService
