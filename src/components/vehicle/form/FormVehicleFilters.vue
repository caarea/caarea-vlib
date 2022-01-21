<template>
  <div class="p-3 form-vehicle-container">
    <div class="form-vehicle-left">
      <div
        class="form-vehicle-input px-1"
        v-for="criteria in Object.keys(value.filters)"
        :key="criteria"
      >
        <div class="my-1 form-vehicle__label">
          {{ $t(`caareavlib.vehicle.search.${criteria}`) }}
        </div>
        <FormSelect
          v-if="value.filters[criteria].inputType === 'select'"
          :name="`filter-${criteria}`"
          :key="criteria"
          :select-options="value.filters[criteria].choices"
          :selected-option.sync="value.filters[criteria].value"
          label-select-attr="label"
          :allow-empty="true"
          :empty-label="$t(`caareavlib.vehicle.search.all_${criteria}`)"
          :multiple="true"
          :disabled="Object.keys(value.filters[criteria].choices).length === 0"
          @update:selected-option="
            $emit('filter-input', criteria, value.filters[criteria])
          "
        ></FormSelect>
        <FormInput
          v-else
          v-model="value.filters[criteria].value"
          :label="$t('caareavlib.vehicle.search.model_year')"
          :debounce-input="true"
          :name="`filter-${criteria}`"
          :label-class="['col-2']"
          :type="value.filters[criteria].inputType"
          :errors="filterErrors(criteria)"
          @input="$emit('filter-input', criteria, value.filters[criteria])"
        ></FormInput>
      </div>
    </div>
    <div class="d-flex align-self-end">
      <button
        class="btn btn-outline-secondary font-size-11 p-1 ml-4"
        data-cy="vehicle-reset-filters"
        @click.prevent="onEraseFilters"
      >
        {{ $t("caareavlib.vehicle.search.erase_filters") }}
      </button>
    </div>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput/FormInput"
import FormSelect from "@/components/form/FormSelect/FormSelect"

export default {
  name: "FormVehicleFilters",
  components: { FormSelect, FormInput },
  props: {
    value: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {}
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
      this.$emit("input", this.value)
      this.$emit("reset-filters")
    },
  },
}
</script>

<style scoped></style>
