<template>
  <div class="bg-light d-flex flex-column" style="min-width: 490px">
    <div data-cy="search-by-text">
      <p class="mb-1">{{ i18n(`caareavlib.vehicle.search.by_manual_search`) }}</p>
      <div
        style="width: 4rem; height: 1px; background-color: #1c2b4e; margin-bottom: 2rem"
      ></div>
    </div>
    <div>
      <FormRowInput
        v-model="form_data.manual"
        data-cy="search-input-manual"
        class="col-11"
        name="manual"
        type="text"
        :max-length="64"
        :label="i18n('caareavlib.vehicle.search.brand_and_model')"
        :errors="errors"
        :class="widthClass"
        :help="i18n('caareavlib.vehicle.search.help.velastic')"
        @keyboard-enter="onSubmitButton"
        @input="onInput"
      ></FormRowInput>
      <FormRowInput
        v-model="form_data.filters.model_year.value"
        data-cy="search-input-year"
        class="col-11"
        name="model_year"
        type="text"
        :max-length="4"
        :label="i18n('caareavlib.vehicle.search.model_year')"
        :errors="'filters' in errors ? errors.filters : {}"
        :class="widthClass"
        @keyboard-enter="onSubmitButton"
        @input="onInput"
      ></FormRowInput>
    </div>
    <div class="p-2 text-center mt-auto align-self-end" style="margin-right: 2.4rem">
      <button
        type="button"
        class="btn btn-primary rounded mt-4"
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
        {{ i18n("caareavlib.vehicle.search.button.validate") }}
      </button>
    </div>
  </div>
</template>

<script>
import { FormRowInput } from "../../"

export default {
  name: "FormManualSearch",
  inject: ["i18n"],
  components: { FormRowInput },
  props: {
    fullWidth: { type: Boolean, default: false },
    isSearchLoading: { type: Boolean, required: true },
    modelValue: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ["update:formData", "manual-vehicle-search"],
  computed: {
    isButtonDisable() {
      return this.formData.manual === ""
    },
    widthClass() {
      return this.fullWidth ? "col-12" : "col-10"
    },
  },
  methods: {
    onInput() {
      this.$emit("update:formData", this.formData)
    },
    onSubmitButton() {
      this.$emit("manual-vehicle-search")
    },
  },
}
</script>
