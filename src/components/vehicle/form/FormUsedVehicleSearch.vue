<template>
  <div class="bg-light d-flex flex-column align-items-start">
    <div class="border-bottom py-3" :data-cy="`search-by-${searchType}`">
      {{ $t(`vehicle_search.by_${searchType}`) }}
    </div>
    <div class="mt-5">
      <FormInput
        v-model="form.searchText"
        :placeholder="$t(`vehicle_search.placeholder.${searchType}`)"
        :max-length="17"
        :errors="usedVehiclesSearchErrors"
        :name="searchType"
        :data-cy="`search-input-${searchType}`"
        :help="searchHelp"
        @keyboard-enter="onSubmitButton"
      ></FormInput>
    </div>
    <div class="p-2 mt-auto mx-auto">
      <button
        type="button"
        class="btn btn-primary mt-4"
        :disabled="isButtonDisable || isSearchLoading"
        :data-cy="`search-button-${searchType}`"
        @click.prevent="onSubmitButton"
      >
        <span
          v-if="isSearchLoading"
          class="spinner-border spinner-border-sm"
          role="status"
          aria-hidden="true"
        ></span>
        {{ $t("vehicle_search.button.search") }}
      </button>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput/FormInput"
export default {
  name: "FormUsedVehicleSearch",
  components: { FormInput },
  props: {
    searchType: String,
    usedVehiclesSearchErrors: Object,
    isSearchLoading: { type: Boolean, required: true },
  },
  data() {
    return {
      form: {
        searchText: "",
      },
    }
  },
  computed: {
    searchHelp() {
      if (process.env.NODE_ENV === "development") {
        return this.isVinSelected
          ? "'vinvalid' pour simuler un n° de série valide"
          : "'aa000aa' pour simuler une plaque valide"
      }
      return ""
    },
    isVinSelected() {
      return this.searchType === "vin"
    },
    isButtonDisable() {
      return this.form.searchText === ""
    },
  },
  methods: {
    async onSubmitButton() {
      this.$emit("submit", this.searchType, this.form.searchText)
    },
  },
}
</script>
<style lang="scss" scoped></style>
