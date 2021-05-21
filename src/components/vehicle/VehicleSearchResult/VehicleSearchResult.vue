<template>
  <div class="w-75 row mt-3 justify-content-around">
    <div v-if="elements.length > 0" class="col-3 p-3 bg-light">
      <div class="border-bottom pb-3">{{ $t("vehicle_search.refine_the_search") }}</div>
    </div>
    <div class="col-8">
      <div class="bg-light text-secondary row p-3">
        <span class="col">
          {{ elements.length }} {{ $t("vehicle_search.results_for") }}
          {{ searchText }}
        </span>
      </div>
      <div
        class="row bg-light mt-3 clickable"
        data-cy="used-vehicle-search-result-content"
      >
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
import { mapGetters } from "vuex"

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
