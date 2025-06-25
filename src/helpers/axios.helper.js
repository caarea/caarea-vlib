import axios from "axios"
import { SsoService } from "../services"

export default {
  initialize(endpoint, vueRouter, ssoClientId = null) {
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = endpoint
    axios.defaults.headers.common["Sso-Client-Id"] = ssoClientId
    axios.interceptors.request.use(
      async (config) => {
        const token = await SsoService.refreshToken()
        // If a token exists, add it to the Authorization header
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        // Handle errors during the request setup
        return Promise.reject(error)
      },
    )

    axios.interceptors.response.use(
      undefined,
      async (error) => await this.errorHandler(error, vueRouter),
    )
  },
  setAuthorizationSharedTokenHeader(accessToken) {
    axios.defaults.headers.common["Authorization"] = "Shared-Token " + accessToken
  },
  resetAuthorizationHeader() {
    delete axios.defaults.headers.common["Authorization"]
  },
  async errorHandler(error, vueRouter) {
    console.error("errorHandler", error, error.response)
    if (error.response) {
      // Authentication failure
      if (error.response.status === 401) {
        // console.log("auth failure 401")
        SsoService.logout()
        vueRouter.replace({ name: "403" })
        return Promise.reject(error.response)
      }

      if (error.response.status === 403) {
        // console.log("auth failure 403")
        vueRouter.replace({ name: "403" })
        return Promise.reject(error.response)
      }

      // Forward error < 500 and not 401
      if (error.response.status < 500) {
        console.warn("Axios interception error < 500", error)
        return Promise.reject(error)
      }
    }
    // Unknown Error => redirect to 500
    console.error("Axios unknown error", error.response)
    vueRouter.replace({ name: "500" })
    return Promise.reject(error.response)
  },
}
