import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { GroupService, HttpService, SsoService, UrlService } from "../../services"
import { AxiosHelper } from "../../helpers"

export const useAuthStore = defineStore("auth", () => {
  // STATES
  const currentUser = ref(null)
  const currentUserGroup = ref(null)
  const sharingToken = ref(null)

  // ACTIONS
  const setCurrentUser = (user) => {
    currentUser.value = user
  }

  const setCurrentUserGroup = (group) => {
    currentUserGroup.value = group
  }

  const setSharingToken = (token) => {
    sharingToken.value = token
    AxiosHelper.setAuthorizationSharedTokenHeader(token)
  }

  const resetAuth = () => {
    AxiosHelper.resetAuthorizationHeader()
    currentUser.value = null
    currentUserGroup.value = null
    sharingToken.value = null
  }

  const fetchLoggedUser = async () => {
    try {
      const user = await HttpService.get(UrlService.render("fetchLoggedUser"))
      setCurrentUser(user)
      setCurrentUserGroup(user.group)
    } catch (e) {
      console.error("failed: ", e)
    }
  }

  const acceptCookies = async (userId) => {
    const payload = { accepted_cookies: true }
    try {
      const user = await HttpService.put(
        UrlService.render("userAcceptCookies", { id: userId }),
        payload,
      )
      setCurrentUser(user)
    } catch (e) {
      console.error("acceptCookies failed: ", e)
      throw e
    }
  }

  const logout = async () => {
    resetAuth()
    await SsoService.logout()
  }

  const updateLang = async (payload) => {
    await HttpService.put(UrlService.render("userLang", { id: payload.userId }), {
      lang: payload.lang,
    })
    await fetchLoggedUser()
  }

  // GETTERS
  const isLoggedIn = computed(
    () => (sharingToken.value && isGuestUser.value) || SsoService.isAuthenticated(),
  )

  const isLoggedInSharingMode = computed(() => sharingToken.value && isGuestUser.value)

  const isGuestUser = computed(
    () => currentUser.value && currentUser.value.group.id === GroupService.GUEST,
  )

  const isSharingTokenExists = (token) =>
    computed(() => sharingToken.value && sharingToken.value === token)

  const getCurrentUser = computed(() => currentUser.value)

  const getCurrentUserGroupId = computed(() => currentUser.value.group.id)

  const areCookiesAccepted = computed(() => currentUser.value.profile.accepted_cookies)

  const getRouteName = (routeName) =>
    computed(() => (sharingToken.value ? `shared_${routeName}` : routeName))

  const hasSharingToken = computed(() => sharingToken.value !== null)

  const getSharingToken = computed(() => sharingToken.value)

  const getUserLang = computed(() => currentUser.value.profile.lang)

  return {
    currentUser,
    currentUserGroup,
    sharingToken,
    setCurrentUser,
    setCurrentUserGroup,
    setSharingToken,
    resetAuth,
    fetchLoggedUser,
    acceptCookies,
    logout,
    updateLang,
    isLoggedIn,
    isLoggedInSharingMode,
    isGuestUser,
    isSharingTokenExists,
    getCurrentUser,
    getCurrentUserGroupId,
    areCookiesAccepted,
    getRouteName,
    hasSharingToken,
    getSharingToken,
    getUserLang,
  }
})
