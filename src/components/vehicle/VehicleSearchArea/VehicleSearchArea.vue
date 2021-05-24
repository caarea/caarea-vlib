<template>
  <div>
    <div class="row">
      <div class="col-3">
        <FormUsedVehicleSearch
          search-type="plate"
          class="h-100 pl-3"
          :used-vehicles-search-errors="usedVehiclesSearchErrors"
          :is-search-loading="isSearchLoading"
          :is-immat-mocked="isImmatMocked"
          @submit="onVehicleSearch"
        ></FormUsedVehicleSearch>
      </div>
      <div class="col-3">
        <FormUsedVehicleSearch
          search-type="vin"
          class="h-100 pl-3"
          :used-vehicles-search-errors="usedVehiclesSearchErrors"
          :is-search-loading="isSearchLoading"
          :is-immat-mocked="isImmatMocked"
          @submit="onVehicleSearch"
        ></FormUsedVehicleSearch>
      </div>
      <div class="col-6">
        <form-manual-search
          class="h-100 pl-3"
          :full-width="true"
          :is-search-loading="isSearchLoading"
          @manual-vehicle-search="onVehicleManualSearch"
        ></form-manual-search>
      </div>
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
    isSearchLoading: { type: Boolean, required: true },
    isImmatMocked: { type: Boolean, default: false },
  },
  methods: {
    async onVehicleSearch(searchType, searchText) {
      this.$emit("used-vehicle-search", searchType, searchText)
    },
    async onVehicleManualSearch(textSearch) {
      this.$emit("manual-vehicle-search", textSearch)
    },
  },
}
</script>
