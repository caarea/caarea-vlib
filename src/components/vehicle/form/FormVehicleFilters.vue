<template>
  <div class="p-3 form-vehicle-container">
    <div class="form-vehicle-left">
      <div
        class="form-vehicle-input px-1"
        v-for="criteria in Object.keys(value.filters)"
        :key="criteria"
      >
        <FormRowSelect
          v-if="value.filters[criteria].inputType === 'select'"
          :name="`filter-${criteria}`"
          :label="$t(`caareavlib.vehicle.search.${criteria}`)"
          :label-inline="false"
          :key="criteria"
          :select-options="value.filters[criteria].choices"
          :selected-option.sync="value.filters[criteria].value"
          label-select-attr="label"
          :allow-empty="true"
          :empty-label="$t(`caareavlib.vehicle.search.all_${criteria}`)"
          :placeholder="
            value.filters[criteria].value.length === 0 ? getEmptyLabel(criteria) : ''
          "
          :multiple="true"
          :disabled="Object.keys(value.filters[criteria].choices).length === 0"
          @update:selected-option="
            $emit('filter-input', criteria, value.filters[criteria])
          "
        ></FormRowSelect>
        <FormRowInput
          v-else
          v-model="value.filters[criteria].value"
          :label="$t(`caareavlib.vehicle.search.${criteria}`)"
          :label-inline="false"
          :debounce-input="true"
          :name="`filter-${criteria}`"
          :label-class="['col-2']"
          :type="value.filters[criteria].inputType"
          :errors="filterErrors(criteria)"
          @input="$emit('filter-input', criteria, value.filters[criteria])"
        ></FormRowInput>
      </div>
      <button
        class="btn btn-outline-secondary font-size-11 p-1 ml-1"
        style="max-height: 2.8rem; margin-top: 1.7rem"
        data-cy="vehicle-reset-filters"
        @click.prevent="onEraseFilters"
      >
        {{ $t("caareavlib.vehicle.search.erase_filters") }}
      </button>
    </div>
  </div>
</template>
<script>
import FormRowSelect from "../../form/FormRowSelect/FormRowSelect"
import FormRowInput from "../../form/FormRowInput/FormRowInput"

export default {
  name: "FormVehicleFilters",
  components: { FormRowInput, FormRowSelect },
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
    getEmptyLabel(criteria) {
      return this.$t(`caareavlib.vehicle.search.all_${criteria}`)
    },
    filterErrors(criteria) {
      let err = {}
      if ("filters" in this.errors && criteria in this.errors.filters) {
        err[`filter-${criteria}`] = this.errors.filters[criteria]
      }
      return err
    },
    onEraseFilters() {
      for (const filter in this.value.filters) {
        // noinspection JSUnfilteredForInLoop
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
