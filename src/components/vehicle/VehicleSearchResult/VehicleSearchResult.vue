<template>
  <div class="row mt-3">
    <div v-if="elements.length > 0" class="col-3">
      <div class="border-bottom p-3 bg-light">
        {{ $t("vehicle_search.refine_the_search") }}
      </div>
    </div>
    <div class="col-9">
      <div class="bg-light p-3 d-flex justify-content-between">
        <div v-if="areElementClickable && elements.length > 0" class="font-weight-bold">
          {{ $t("vehicle_search.pick_version") }}
        </div>
        <div class="text-secondary">
          {{ elements.length }} {{ $t("vehicle_search.results_for") }}
          {{ searchText }}
        </div>
      </div>
      <div class="bg-light mt-3" data-cy="used-vehicle-search-result-content">
        <VehicleSearchResultItem
          v-for="element in elements"
          :key="element.hasOwnProperty('id') ? element.id : element"
          :vehicle="element"
          :can-validate="areElementClickable"
          class="border-bottom clickable px-4"
          :data-cy="`vehicle-result-item-${
            element.hasOwnProperty('id') ? element.id : element
          }`"
          @validate-version="onValidateVersion"
        ></VehicleSearchResultItem>
      </div>
    </div>
  </div>
</template>

<script>
import VehicleSearchResultItem from "@/components/vehicle/VehicleSearchResultItem/VehicleSearchResultItem"

export default {
  name: "VehicleSearchResult",
  components: {
    VehicleSearchResultItem,
  },
  props: {
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
  },
  data: function () {
    return {
      isLoading: false,
    }
  },
  methods: {
    onValidateVersion(selectedVehicle) {
      this.$emit("validate-version", selectedVehicle)
    },
  },
}
</script>
