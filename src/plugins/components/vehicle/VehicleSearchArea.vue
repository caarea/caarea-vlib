<template>
  <div class="row">
    <div class="col-3">
      <FormUsedVehicleSearch
        v-model="formData.plate"
        search-type="plate"
        class="h-100 p-3"
        :used-vehicles-search-errors="usedVehiclesSearchErrors"
        :is-search-loading="isSearchLoading"
        :is-immat-mocked="isImmatMocked"
        @submit="onPlateSearch"
      ></FormUsedVehicleSearch>
    </div>
    <div class="col-3">
      <FormUsedVehicleSearch
        v-model="formData.vin"
        search-type="vin"
        class="h-100 p-3"
        :used-vehicles-search-errors="usedVehiclesSearchErrors"
        :is-search-loading="isSearchLoading"
        :is-immat-mocked="isImmatMocked"
        @submit="onVinSearch"
      ></FormUsedVehicleSearch>
    </div>
    <div class="col-6">
      <form-manual-search
        v-model="formData"
        class="h-100 p-3"
        :full-width="true"
        :is-search-loading="isSearchLoading"
        :errors="manualSearchErrors"
        @manual-vehicle-search="onVehicleManualSearch"
      ></form-manual-search>
    </div>
  </div>
</template>

<script>
import FormUsedVehicleSearch from "./form/FormUsedVehicleSearch.vue"
import FormManualSearch from "./form/FormManualSearch.vue"

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
    modelValue: { type: Object, required: true },
  },
  emits: ["update:modelValue", "used-vehicle-search", "manual-vehicle-search"],
  data: function () {
    return {
      formData: this.value,
    }
  },
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
    onPlateSearch() {
      this.formData.vin = ""
      this.formData.manual = ""
      this.formData.filters.model_year.value = null
      this.onVehicleSearch("plate")
    },
    onVinSearch() {
      this.formData.plate = ""
      this.formData.manual = ""
      this.formData.filters.model_year.value = null
      this.onVehicleSearch("vin")
    },
    onVehicleSearch(searchType) {
      this.$emit("used-vehicle-search", searchType)
    },
    onVehicleManualSearch() {
      this.formData.plate = ""
      this.formData.vin = ""
      this.$emit("manual-vehicle-search", this.value)
    },
  },
}
</script>
