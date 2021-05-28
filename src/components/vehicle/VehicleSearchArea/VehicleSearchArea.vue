<template>
  <div class="row">
    <div class="col-3">
      <FormUsedVehicleSearch
        v-model="value.plate"
        search-type="plate"
        class="h-100 p-3"
        :used-vehicles-search-errors="usedVehiclesSearchErrors"
        :is-search-loading="isSearchLoading"
        :is-immat-mocked="isImmatMocked"
        @submit="onPlateSearch"
        @input="onInput"
      ></FormUsedVehicleSearch>
    </div>
    <div class="col-3">
      <FormUsedVehicleSearch
        v-model="value.vin"
        search-type="vin"
        class="h-100 p-3"
        :used-vehicles-search-errors="usedVehiclesSearchErrors"
        :is-search-loading="isSearchLoading"
        :is-immat-mocked="isImmatMocked"
        @submit="onVinSearch"
        @input="onInput"
      ></FormUsedVehicleSearch>
    </div>
    <div class="col-6">
      <form-manual-search
        v-model="value"
        class="h-100 p-3"
        :full-width="true"
        :is-search-loading="isSearchLoading"
        :errors="manualSearchErrors"
        @manual-vehicle-search="onVehicleManualSearch"
        @input="onInput"
      ></form-manual-search>
    </div>
  </div>
</template>

<script>
import FormUsedVehicleSearch from "@/components/vehicle/form/FormUsedVehicleSearch"
import FormManualSearch from "@/components/vehicle/form/FormManualSearch"

export default {
  name: "VehicleSearchArea",
  components: {
    FormUsedVehicleSearch,
    FormManualSearch,
  },
  props: {
    usedVehiclesSearchErrors: Object,
    manualSearchErrors: Object,
    isSearchLoading: { type: Boolean, required: true },
    isImmatMocked: { type: Boolean, default: false },
    value: { type: Object, required: true },
  },
  methods: {
    onInput() {
      this.$emit("input", this.value)
    },
    onPlateSearch() {
      this.value.vin = ""
      this.value.manual = ""
      this.value.filters.model_year.value = null
      this.onVehicleSearch("plate")
    },
    onVinSearch() {
      this.value.plate = ""
      this.value.manual = ""
      this.value.filters.model_year.value = null
      this.onVehicleSearch("vin")
    },
    onVehicleSearch(searchType) {
      this.$emit("used-vehicle-search", searchType)
    },
    onVehicleManualSearch() {
      this.value.plate = ""
      this.value.vin = ""
      this.$emit("manual-vehicle-search", this.value)
    },
  },
}
</script>
