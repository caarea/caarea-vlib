const { mapGetters } = import("vuex")

export default {
  computed: {
    ...mapGetters("auth", ["isGuestUser", "isLoggedIn"]),
    getUrlName() {
      console.log(
        "getUrlName",
        this.isLoggedIn && this.isGuestUser ? "sharingZone" : "privateZone",
      )
      return this.isLoggedIn && this.isGuestUser ? "sharingZone" : "privateZone"
    },
  },
}
