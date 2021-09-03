<template>
  <div class="text-center">
    <h4 v-if="message" class="mb-4">{{ message }}</h4>
    <scale-loader color="#1d2b4e"></scale-loader>
  </div>
</template>

<script>
import ScaleLoader from "vue-spinner/src/ScaleLoader"

export default {
  name: "Spinner",
  components: { ScaleLoader },
  props: { message: { type: String, default: null } },
}
</script>
