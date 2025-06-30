import AbstractService from "../AbstractService"
import Keycloak from "keycloak-js"

class SsoUtils extends AbstractService {
  constructor() {
    super()
    this.clear()
  }
  initialize(url, realm, clientId) {
    this._url = url
    this._realm = realm
    this._clientId = clientId
  }
  isInitialized() {
    return this._url !== undefined
  }
  clear() {
    this._keycloakAuth = null
  }
  _initSsoClient() {
    if (!this._keycloakAuth) {
      this._keycloakAuth = new Keycloak({
        url: this._url,
        realm: this._realm,
        clientId: this._clientId,
      })
    }
  }
  isAuthenticated() {
    return this._keycloakAuth && this._keycloakAuth.authenticated
  }
  async init(context, callbackSuccess, callbackError) {
    this.checkIsInitialized()
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
    } catch (error) {
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

class FakeSsoUtils extends AbstractService {
  constructor() {
    super()
    this.fake_token = "fake-token"
    this.is_authenticated = false
  }

  initialize(url, realm, clientId) {
    this._url = url
  }

  isAuthenticated() {
    return this.is_authenticated
  }

  async init(context, callbackSuccess, callbackError) {
    try {
      this.is_authenticated = true
      if (this.is_authenticated) {
        return await callbackSuccess(context)
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error("Fake Sso failed", error)
      return await callbackError(context, error)
    }
  }

  async refreshToken() {
    if (!this._keycloakAuth || !this.isAuthenticated()) {
      // console.log("refreshToken no auth so no need to refresh")
      return null
    }
    return this.fake_token
  }

  async logout() {
    console.log("Fake logout")
    this.is_authenticated = false
  }
}

const SsoService = !window.Cypress ? new SsoUtils() : new FakeSsoUtils()
export default SsoService
