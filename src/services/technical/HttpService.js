import AbstractService from "../AbstractService"
import axios from "axios"

class HttpError extends Error {
  constructor(message, response) {
    super(message)
    this.status = response.status
    this.data = response.data ? response.data : response.statusText
    this.response = response
  }
}

class Http extends AbstractService {
  /**
   * get data from url
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  get(url, options = {}) {
    return axios
      .get(url, options)
      .then((response) => response.data)
      .catch((e) => {
        throw e.response ? new HttpError(e, e.response) : e
      })
  }

  /**
   * post data to url
   * @param url
   * @param data
   * @param options
   * @returns {Promise<unknown>}
   */
  post(url, data, options = {}) {
    return axios
      .post(url, data, options)
      .then((response) => response.data)
      .catch((e) => {
        throw e.response ? new HttpError(e, e.response) : e
      })
  }

  /**
   * put data to url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  put(url, data, options = {}) {
    return axios
      .put(url, data, options)
      .then((response) => response.data)
      .catch((e) => {
        throw e.response ? new HttpError(e, e.response) : e
      })
  }

  /**
   * patch data to url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  patch(url, data, options = {}) {
    return axios
      .patch(url, data, options)
      .then((response) => response.data)
      .catch((e) => {
        throw e.response ? new HttpError(e, e.response) : e
      })
  }

  /**
   * delete data from url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  delete(url, data, options = {}) {
    return axios
      .delete(url, data, options)
      .then((response) => response.data)
      .catch((e) => {
        throw e.response ? new HttpError(e, e.response) : e
      })
  }
}

let HttpService = new Http()
export { HttpService as default, HttpError }
