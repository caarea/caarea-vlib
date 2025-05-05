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
  // get(url, options = {}) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.get(url, options)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }

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
  // post(url, data, options = {}) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.post(url, data, options)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }

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
  // put(url, data) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.put(url, data)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }
  put(url, data, options = {}) {
    return axios
      .put(url, data, options)
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
  // delete(url, data) {
  //   return new Promise(async (successCallback, failureCallback) => {
  //     try {
  //       const response = await axios.delete(url, data)
  //       successCallback(response.data)
  //     } catch (e) {
  //       failureCallback(e.response ? new HttpError(e, e.response) : e)
  //     }
  //   })
  // }
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
