<template>
  <div class="bg-light d-flex flex-column">
    <div class="border-bottom pb-3 mb-3" data-cy="search-by-text">
      {{ $t(`caareavlib.vehicle.search.by_manual_search`) }}
    </div>
    <div>
      <FormRowInput
        v-model="value.manual"
        data-cy="search-input-manual"
        class="col-11"
        name="manual"
        type="text"
        :max-length="64"
        :label="$t('caareavlib.vehicle.search.brand_and_model')"
        :errors="errors"
        :class="widthClass"
        :help="$t('caareavlib.vehicle.search.help.velastic')"
        @keyboard-enter="onSubmitButton"
        @input="onInput"
      ></FormRowInput>
      <FormRowInput
        v-model="value.filters.model_year.value"
        data-cy="search-input-year"
        class="col-11"
        name="model_year"
        type="text"
        :max-length="4"
        :label="$t('caareavlib.vehicle.search.model_year')"
        :errors="'filters' in errors ? errors.filters : {}"
        :class="widthClass"
        @keyboard-enter="onSubmitButton"
        @input="onInput"
      ></FormRowInput>
    </div>
    <div class="p-2 text-center mt-auto">
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
        {{ $t("caareavlib.vehicle.search.button.search") }}
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
    value: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    isButtonDisable() {
      return this.value.manual === ""
    },
    widthClass() {
      return this.fullWidth ? "col-12" : "col-10"
    },
  },
  methods: {
    onInput() {
      this.$emit("input", this.value)
    },
    onSubmitButton() {
      this.$emit("manual-vehicle-search")
    },
  },
}
</script>
