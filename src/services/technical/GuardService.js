import AbstractService from "../AbstractService"
import { SsoService } from "../index.js"

class Guard extends AbstractService {
  constructor() {
    super()
    this._store = null
  }

  clear() {
    this._store = null
  }

  isInitialized() {
    return this._store !== null
  }

  initialize(store) {
    this._store = store
  }

  checkGroupId(to) {
    if (Object.prototype.hasOwnProperty.call(to.meta, "maxGroupId")) {
      // console.log("check group", to.meta.maxGroupId)
      if (this._store.getters["auth/getCurrentUserGroupId"] <= to.meta.maxGroupId) {
        // console.log("group ok go", to)
        return true
      }
      return { name: "403" }
    }
    // console.log("no check go", to)
    return true
  }

  async logout() {
    // console.log("logout")
    try {
      // Clear local storage before logout
      // (do it before because once logout is done, nothing can be done anymore !)
      // console.log("clear localStorage", localStorage)
      localStorage.clear()
      // TODO reset stores (CSO_854)
      await this._store.dispatch("auth/logout")
    } catch (e) {
      console.error("logout failed: ", e)
    }
  }

  async onSsoLoginSuccess(context) {
    try {
      // console.log("fetchLoggedUser", context)
      await this._store.dispatch("auth/fetchLoggedUser")
      // console.log("fetchLoggedUser success")
    } catch (e) {
      // console.error("guards fetchLoggedUser failed: ", e)
      if (e && e.status && e.status > 403) {
        // axios interceptor should have already push a route => stop guard here
        throw e
      }
      await this._store.dispatch("auth/logout")
    }
    return this.checkGroupId(context.to)
  }

  onSsoLoginFailed(context, reject) {
    console.error("login failed", context, reject)
    return { name: "500" }
  }

  async requireAuth(to) {
    if (SsoService.isAuthenticated()) {
      // console.log("Already authenticated")
      return true
    }
    // console.warn("Need authentication")
    // console.log("requireAuth", result)
    return await SsoService.init(
      { to: to },
      this.onSsoLoginSuccess,
      this.onSsoLoginFailed,
    )
  }

  async requireSharedTokenAuth(to) {
    if (
      !this._store.getters["auth/isSharingTokenExists"](to.params.sharedToken) ||
      !this._store.getters["auth/isLoggedIn"]
    ) {
      await this._store.dispatch("auth/setSharingToken", to.params.sharedToken)
      await this._store.dispatch("auth/fetchLoggedUser")
      return true
    }

    this.checkGroupId(to)
  }

  async requireAcceptedCookies() {
    if (this._store.getters["auth/areCookiesAccepted"]) {
      // console.log("cookiesAccepted")
      return true
    }
    // console.log("requireAcceptedCookies")
    return { name: "home" }
  }
}
let GuardService = new Guard()
export default GuardService
