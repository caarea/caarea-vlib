<template>
  <div class="p-3 d-flex flex-column">
    <div class="border-bottom mb-4 pb-3">
      {{ $t("caareavlib.vehicle.search.refine_the_search") }}
    </div>
    <div v-for="criteria in Object.keys(value.filters)" :key="criteria">
      <div class="my-1">{{ $t(`caareavlib.vehicle.search.${criteria}`) }}</div>
      <FormSelect
        v-if="value.filters[criteria].inputType === 'select'"
        :name="`filter-${criteria}`"
        :key="criteria"
        :select-options="value.filters[criteria].choices"
        :selected-option.sync="value.filters[criteria].value"
        label-select-attr="label"
        :allow-empty="true"
        :empty-label="$t(`caareavlib.vehicle.search.all_${criteria}`)"
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
    <div
      class="btn btn-outline-secondary mx-auto mt-3 font-size-12"
      data-cy="vehicle-reset-filters"
      @click.prevent="onEraseFilters"
    >
      {{ $t("caareavlib.vehicle.search.erase_filters") }}
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
      for (let filter in this.value.filters) {
        // noinspection JSUnfilteredForInLoop
        this.value.filters[filter].value = null
      }
      this.$emit("input", this.value)
      this.$emit("reset-filters")
    },
  },
}
</script>

<style scoped></style>
