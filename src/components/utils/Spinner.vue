<template>
  <div class="text-center">
    <h4 v-if="message" class="mb-4">{{ message }}</h4>
    <vue-spinner color="#1d2b4e"></vue-spinner>
  </div>
</template>

<script>
import VueSpinner from "vue-spinner/src/ScaleLoader"

export default {
  name: "Spinner",
  components: { VueSpinner },
  props: { message: { type: String, default: null } },
}
</script>
