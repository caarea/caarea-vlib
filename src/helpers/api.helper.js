import { default as HttpService } from "../services/technical/HttpService"
import { AlreadyExistsError, ValidationError } from "src/exceptions.js"

const apiCall = async (method, url, params = null) => {
  console.log("apiCall", method, url, params)
  params = params || {}
  try {
    const response =
      method !== "get"
        ? await HttpService[method](url, params)
        : await HttpService[method](url, { params })
    console.log("apiCall response", response)
    return response
  } catch (e) {
    if (e.response.status === 422) {
      const errors = e.response.data
      console.warn("validations error", errors)
      throw new ValidationError("Validation error", errors)
    }

    if (e.response.status === 409) {
      throw new AlreadyExistsError(e.response.data)
    }

    console.error("failed: ", e)
    throw e
  }
}

const apiGet = async (url) => {
  return await apiCall("get", url)
}

const apiPost = async (url, params) => {
  return await apiCall("post", url, params)
}

const apiPut = async (url, params) => {
  return await apiCall("put", url, params)
}

const apiPatch = async (url, params) => {
  return await apiCall("patch", url, params)
}

export { apiGet, apiPost, apiPut, apiPatch }
