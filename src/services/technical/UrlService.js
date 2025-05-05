import AbstractService from "../AbstractService"

class Url extends AbstractService {
  constructor() {
    super()
    this._urls = null
  }

  clear() {
    this._urls = null
  }

  isInitialized() {
    return this._urls !== null
  }

  initialize(urls) {
    this._urls = urls
  }

  /**
   * retrieve query string
   *
   * @param {object} queryString - {<key>: <value>} to build as query string
   *
   * @return {string}
   */
  getQueryString(queryString) {
    return Object.keys(queryString)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryString[key]),
      )
      .join("&")
  }

  _checkUrlNameExists(urlName) {
    if (Object.prototype.hasOwnProperty.call(this._urls, urlName))
      return this._urls[urlName]
    throw Error(`url name '${urlName}' not found in urls`)
  }

  /**
   * Render api url
   *
   * ex:
   * urls = {user: "user/{id}/permissions/"}
   * const result = render("user", {id: 24});
   * result is equal to : user/24/permissions/
   *
   * NB: base url should be define with axios baseURL
   *
   * @param {String} urlName url name to use
   * @param {Object} params (optional) key to substitute with value in url
   * @param {Object} queryString (optional) query string to add to url
   *
   * @return {string}
   */
  render(urlName, params = {}, queryString = {}) {
    params = params || {}
    queryString = queryString || {}
    this.checkIsInitialized()
    let url = this._checkUrlNameExists(urlName)

    Object.keys(params).forEach(
      (name) => (url = url.replace("{" + name + "}", params[name])),
    )

    queryString = this.getQueryString(queryString)
    if (queryString) {
      url += "?" + queryString
    }
    return url
  }
}
let UrlService = new Url()
export default UrlService
