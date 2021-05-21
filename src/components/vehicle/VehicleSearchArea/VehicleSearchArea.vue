<template>
  <div>
    <div class="row justify-content-between">
      <FormUsedVehicleSearch
        class="col mr-2"
        search-type="plate"
        :used-vehicles-search-errors="usedVehiclesSearchErrors"
        :is-search-loading="isSearchLoading"
        @submit="onVehicleSearch"
      ></FormUsedVehicleSearch>
      <FormUsedVehicleSearch
        class="col mr-2"
        search-type="vin"
        :used-vehicles-search-errors="usedVehiclesSearchErrors"
        :is-search-loading="isSearchLoading"
        @submit="onVehicleSearch"
      ></FormUsedVehicleSearch>
      <form-manual-search
        class="col-5"
        :full-width="true"
        :is-search-loading="isSearchLoading"
        @manual-vehicle-search="onVehicleManualSearch"
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
    isSearchLoading: { type: Boolean, required: true },
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

<style lang="scss" scoped></style>
