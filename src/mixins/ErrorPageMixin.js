export default {
  computed: {
    getUrlName() {
      return this.isLoggedIn && this.isGuestUser ? "sharingZone" : "privateZone"
    },
  },
}
