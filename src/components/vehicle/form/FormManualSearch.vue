<template>
  <div class="bg-light d-flex flex-column align-items-start">
    <div class="border-bottom py-3" data-cy="search-by-text">
      {{ $t(`vehicle_search.by_manual_search`) }}
    </div>
    <div class="mt-5 w-100">
      <FormRowInput
        v-model="form.searchText"
        data-cy="search-input-manual"
        class="col-11"
        name="velastic"
        type="text"
        :max-length="64"
        :label="$t('vehicle_search.brand_and_model')"
        :errors="{}"
        :class="widthClass"
        :help="$t('vehicle_search.help.velastic')"
      ></FormRowInput>
    </div>
    <div class="p-2 mt-auto mx-auto">
      <button
        type="button"
        class="btn btn-primary mt-4"
        :disabled="isButtonDisable || isSearchLoading"
        data-cy="search-button-manual"
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
import FormRowInput from "@/components/form/FormRowInput/FormRowInput"

export default {
  name: "FormManualSearch",
  components: { FormRowInput },
  props: {
    fullWidth: { type: Boolean, default: false },
    isSearchLoading: { type: Boolean, required: true },
  },
  data() {
    return {
      form: {
        searchText: "",
        yearSearchText: "",
      },
      isLoading: false,
    }
  },
  computed: {
    isButtonDisable() {
      return this.form.searchText === ""
    },
    widthClass() {
      return this.fullWidth ? "col-12" : "col-10"
    },
  },
  methods: {
    onSubmitButton() {
      this.$store.dispatch("vehicle/resetVelasticSearch")
      this.$emit(
        "manual-vehicle-search",
        this.form.searchText,
        this.form.yearSearchText
      )
    },
  },
}
</script>
