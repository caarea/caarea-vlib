<template>
  <div class="bg-light d-flex flex-column" style="min-width: 268px">
    <div :data-cy="`search-by-${searchType}`">
      <p class="mb-1">{{ i18n(`caareavlib.vehicle.search.by_${searchType}`) }}</p>
      <div
        style="width: 4rem; height: 1px; background-color: #1c2b4e; margin-bottom: 2rem"
      ></div>
    </div>
    <div>
      <FormInput
        :value="value"
        :placeholder="i18n(`caareavlib.vehicle.search.placeholder.${searchType}`)"
        :max-length="17"
        :errors="usedVehiclesSearchErrors"
        :name="searchType"
        :data-cy="`search-input-${searchType}`"
        :help="searchHelp"
        @input="onInput"
        @keyboard-enter="onSubmitButton"
      ></FormInput>
    </div>
    <div class="p-2 text-center mt-auto">
      <button
        type="button"
        class="btn btn-primary rounded mt-4"
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
        {{ i18n("caareavlib.vehicle.search.button.validate") }}
      </button>
    </div>
  </div>
</template>

<script>
import { FormInput } from "../../"

export default {
  name: "FormUsedVehicleSearch",
  inject: ["i18n"],
  components: { FormInput },
  props: {
    searchType: String,
    modelValue: String,
    usedVehiclesSearchErrors: Object,
    isSearchLoading: { type: Boolean, required: true },
    isImmatMocked: { type: Boolean, default: false },
  },
  emits: ["update:modelValue", "submit"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
    searchHelp() {
      if (this.isImmatMocked) {
        return this.isVinSelected
          ? "'validvin' pour simuler un n° de série valide"
          : "'aa000aa' pour simuler une plaque valide"
      }
      return ""
    },
    isVinSelected() {
      return this.searchType === "vin"
    },
    isButtonDisable() {
      return this.value === ""
    },
  },
  methods: {
    onSubmitButton() {
      this.$emit("submit", this.searchType, this.value)
    },
  },
}
</script>
