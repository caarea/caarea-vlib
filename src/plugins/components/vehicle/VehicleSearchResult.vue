<template>
  <div class="row mt-3">
    <div
      v-if="elements !== null || errors !== {}"
      class="col-3"
      data-cy="vehicle-search-filters"
    >
      <VerticalFormVehicleFilters
        v-model="formData"
        :errors="errors"
        class="bg-light"
        @filter-input="onFilterInput"
        @reset-filters="onEraseFilters"
      ></VerticalFormVehicleFilters>
    </div>
    <div class="col-9">
      <div class="bg-light p-3 d-flex justify-content-between">
        <div v-if="areElementClickable && elements.length > 0" class="font-weight-bold">
          {{ i18n("caareavlib.vehicle.search.pick_version") }}
        </div>
        <!--
        Temporary fix : Display number of results only if there are no results (CSO_504)
        -->
        <div v-if="elements.length === 0" class="text-secondary">
          {{ totalHitsNb }}
          {{ i18n("caareavlib.vehicle.search.results_for") }} "{{ searchText }}"
        </div>
      </div>
      <div class="bg-light mt-3" data-cy="used-vehicle-search-result-content">
        <VehicleSearchResultItem
          v-for="element in elements"
          :key="element.hasOwnProperty('vehicle_id') ? element.vehicle_id : element.id"
          :vehicle="element"
          :can-validate="areElementClickable"
          class="border-bottom clickable px-4"
          :data-cy="`vehicle-result-item-${
            element.hasOwnProperty('vehicle_id') ? element.vehicle_id : element.id
          }`"
          @validate-version="onValidateVersion"
        ></VehicleSearchResultItem>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleSearchResultItem from "./VehicleSearchResultItem.vue"
import VerticalFormVehicleFilters from "./form/VerticalFormVehicleFilters.vue"

export default {
  name: "VehicleSearchResult",
  inject: ["i18n"],
  components: {
    VehicleSearchResultItem,
    VerticalFormVehicleFilters,
  },
  props: {
    modelValue: { type: Object, required: true },
    searchText: {
      type: String,
      required: true,
    },
    elements: {
      type: Array,
      required: true,
    },
    areElementClickable: {
      type: Boolean,
      default: false,
    },
    totalHitsNb: { type: Number, required: true },
    errors: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  emits: ["update:modelValue", "filter-input", "reset-filters", "validate-version"],
  data: function () {
    return {
      isLoading: false,
    }
  },
  computed: {
    formData: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
  },
  methods: {
    onFilterInput(criteria, value) {
      this.$emit("filter-input", criteria, value)
    },
    onEraseFilters() {
      this.$emit("update:modelValue", this.modelValue)
      this.$emit("reset-filters")
    },
    onValidateVersion(selectedVehicle) {
      this.$emit("validate-version", selectedVehicle)
    },
  },
}
</script>
