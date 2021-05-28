<template>
  <div class="row mt-3">
    <div
      v-if="elements !== null || errors !== {}"
      class="col-3"
      data-cy="vehicle-search-filters"
    >
      <div class="bg-light p-3 d-flex flex-column">
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
          class="btn btn-outline-secondary mx-4 mt-3 font-size-12"
          data-cy="vehicle-reset-filters"
          @click.prevent="onEraseFilters"
        >
          {{ $t("caareavlib.vehicle.search.erase_filters") }}
        </div>
      </div>
    </div>
    <div class="col-9">
      <div class="bg-light p-3 d-flex justify-content-between">
        <div v-if="areElementClickable && elements.length > 0" class="font-weight-bold">
          {{ $t("caareavlib.vehicle.search.pick_version") }}
        </div>
        <div class="text-secondary">
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
import FormInput from "@/components/form/FormInput/FormInput"
import FormSelect from "@/components/form/FormSelect/FormSelect"

export default {
  name: "VehicleSearchResult",
  components: {
    FormSelect,
    FormInput,
    VehicleSearchResultItem,
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
    onValidateVersion(selectedVehicle) {
      this.$emit("validate-version", selectedVehicle)
    },
  },
}
</script>
