<template>
  <div class="p-3 d-flex flex-column">
    <div class="border-bottom mb-4 pb-3">
      {{ i18n("caareavlib.vehicle.search.refine_the_search") }}
    </div>
    <div v-for="criteria in Object.keys(value.filters)" :key="criteria">
      <div class="my-1">{{ i18n(`caareavlib.vehicle.search.${criteria}`) }}</div>
      <FormSelect
        v-if="value.filters[criteria].inputType === 'select'"
        :key="criteria"
        v-model="value.filters[criteria].value"
        :name="`filter-${criteria}`"
        :select-options="value.filters[criteria].choices"
        label-select-attr="label"
        :allow-empty="true"
        :empty-label="i18n(`caareavlib.vehicle.search.all_${criteria}`)"
        :multiple="true"
        :disabled="Object.keys(value.filters[criteria].choices).length === 0"
        @update:model-value="$emit('filter-input', criteria, value.filters[criteria])"
      ></FormSelect>
      <FormInput
        v-else
        v-model="value.filters[criteria].value"
        :label="i18n('caareavlib.vehicle.search.model_year')"
        :debounce-input="true"
        :name="`filter-${criteria}`"
        :label-class="['col-2']"
        :type="value.filters[criteria].inputType"
        :errors="filterErrors(criteria)"
        @update:model-value="$emit('filter-input', criteria, value.filters[criteria])"
      ></FormInput>
    </div>
    <div
      class="btn btn-outline-secondary mx-auto mt-3 font-size-12"
      data-cy="vehicle-reset-filters"
      @click.prevent="onEraseFilters"
    >
      {{ i18n("caareavlib.vehicle.search.erase_filters") }}
    </div>
  </div>
</template>

<script>
import { FormInput, FormSelect } from "../../"

export default {
  name: "VerticalFormVehicleFilters",
  inject: ["i18n"],
  components: { FormSelect, FormInput },
  props: {
    modelValue: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ["update:modelValue", "filter-input", "reset-filters"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
  },
  methods: {
    filterErrors(criteria) {
      let err = {}
      if ("filters" in this.errors && criteria in this.errors.filters) {
        err[`filter-${criteria}`] = this.errors.filters[criteria]
      }
      return err
    },
    onEraseFilters() {
      for (const filter in this.value.filters) {
        if (Array.isArray(this.value.filters[filter].value)) {
          // noinspection JSUnfilteredForInLoop
          this.value.filters[filter].value = []
        } else {
          // noinspection JSUnfilteredForInLoop
          this.value.filters[filter].value = ""
        }
      }
      this.$emit("reset-filters")
    },
  },
}
</script>

<style scoped></style>
