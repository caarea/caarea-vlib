import AbstractService from "../AbstractService"
import Keycloak from "keycloak-js"

class SsoUtils extends AbstractService {
  constructor() {
    super()
    this.clear()
  }
  clear() {
    this._keycloakAuth = null
  }
  _initSsoClient() {
    if (!this._keycloakAuth) {
      this._keycloakAuth = new Keycloak({
        url: import.meta.env.VITE_SSO_URL,
        realm: import.meta.env.VITE_SSO_REALM,
        clientId: import.meta.env.VITE_SSO_CLIENT_ID,
        // url: import.meta.env.VITE_SSO_URL,
        // realm: import.meta.env.VITE_SSO_REALM,
        // clientId: import.meta.env.VITE_SSO_CLIENT_ID,
      })
    }
  }
  isAuthenticated() {
    return this._keycloakAuth && this._keycloakAuth.authenticated
  }
  async init(context, callbackSuccess, callbackError) {
    this._initSsoClient()
    try {
      // console.log("init sso", window.Cypress)
      const authenticated = await this._keycloakAuth.init({
        onLoad: "login-required",
        checkLoginIframe: !window.Cypress,
      })
      // console.log("init success", authenticated)
      if (authenticated) {
        return await callbackSuccess(context)
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error("Sso failed", error)
      return await callbackError(context, error)
    }
  }
  async refreshToken() {
    if (!this._keycloakAuth || !this.isAuthenticated()) {
      // console.log("refreshToken no auth so no need to refresh")
      return null
    }
    // console.log("refreshToken")
    // Update the token when will last less than 70s
    try {
      const refreshed = await this._keycloakAuth.updateToken(70)
      if (!refreshed) {
        // console.log(
        //   "Token not refreshed, valid for " +
        //     Math.round(
        //       this._keycloakAuth.tokenParsed.exp +
        //         this._keycloakAuth.timeSkew -
        //         new Date().getTime() / 1000
        //     ) +
        //     " seconds"
        // )
      }
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      console.error("Failed to refresh token")
    }
    return this._keycloakAuth.token
  }
  async logout() {
    if (!this._keycloakAuth) {
      return null
    }
    await this._keycloakAuth.logout()
  }
}

let SsoService = new SsoUtils()
export default SsoService
