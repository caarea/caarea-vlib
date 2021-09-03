<template>
  <div class="row mt-3">
    <div
      v-if="elements !== null || errors !== {}"
      class="col-3"
      data-cy="vehicle-search-filters"
    >
      <FormVehicleFilters
        v-model="value"
        :errors="errors"
        @filter-input="onFilterInput"
        @reset-filters="onEraseFilters"
        class="bg-light"
      ></FormVehicleFilters>
    </div>
    <div class="col-9">
      <div class="bg-light p-3 d-flex justify-content-between">
        <div v-if="areElementClickable && elements.length > 0" class="font-weight-bold">
          {{ $t("caareavlib.vehicle.search.pick_version") }}
        </div>
        <!--
        Temporary fix : Display number of results only if there are no results (CSO_504)
        -->
        <div v-if="elements.length === 0" class="text-secondary">
          {{ totalHitsNb }} {{ $t("caareavlib.vehicle.search.results_for") }} "{{
            searchText
          }}"
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
import VehicleSearchResultItem from "@/components/vehicle/VehicleSearchResultItem/VehicleSearchResultItem"
import FormVehicleFilters from "@/components/vehicle/form/FormVehicleFilters"

export default {
  name: "VehicleSearchResult",
  components: {
    VehicleSearchResultItem,
    FormVehicleFilters,
  },
  props: {
    value: { type: Object, required: true },
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
  data: function () {
    return {
      isLoading: false,
    }
  },
  methods: {
    onFilterInput(criteria, value) {
      this.$emit("filter-input", criteria, value)
    },
    onEraseFilters() {
      this.$emit("input", this.value)
      this.$emit("reset-filters")
    },
    onValidateVersion(selectedVehicle) {
      this.$emit("validate-version", selectedVehicle)
    },
  },
}
</script>
