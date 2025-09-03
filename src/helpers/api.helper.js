import { default as HttpService } from "../services/technical/HttpService"
import { AlreadyExistsError, BadRequestError, ValidationError } from "src/exceptions.js"

const apiCall = async (method, url, data = null, options = {}) => {
  console.log("apiCall", method, url, data, options)
  data = data || {}
  try {
    const response =
      method !== "get"
        ? await HttpService[method](url, data, options)
        : await HttpService[method](url, options)
    console.log("apiCall response", response)
    return response
  } catch (e) {
    if (e.response?.status === 422) {
      const errors = e.response.data
      console.warn("validations error", errors)
      throw new ValidationError("Validation error", errors)
    }

    if (e.response?.status === 409) {
      throw new AlreadyExistsError(e.response.data)
    }
    if (e.response?.status === 400) {
      throw new BadRequestError(e.response.data)
    }

    console.error("failed: ", e)
    throw e
  }
}

const apiGet = async (url, options = {}) => {
  return await apiCall("get", url, null, options)
}

const apiPost = async (url, params, options = {}) => {
  return await apiCall("post", url, params, options)
}

const apiPut = async (url, params, options = {}) => {
  return await apiCall("put", url, params, options)
}

const apiPatch = async (url, params, options = {}) => {
  return await apiCall("patch", url, params, options)
}

const apiDelete = async (url, params, options = {}) => {
  return await apiCall("delete", url, params, options)
}

const apiGetDownload = async (url, params) => {
  return await apiCall("download", url, params, "get")
}

const apiPostDownload = async (url, params) => {
  return await apiCall("download", url, params, "post")
}

export { apiGet, apiPost, apiPut, apiPatch, apiDelete, apiGetDownload, apiPostDownload }
