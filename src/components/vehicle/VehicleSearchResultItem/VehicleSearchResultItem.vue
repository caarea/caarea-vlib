<template>
  <div
    class="vehicle-list-item-border row no-gutters justify-content-between align-items-center w-100 py-3"
    z
    @click="onButtonClick"
  >
    <div v-if="image" class="col-2">
      <img :src="image" alt="image" />
    </div>
    <div class="col-5 result-name" data-cy="search-result-name">
      {{ vehicle.make }} {{ vehicle.model }} {{ vehicle.version }}
    </div>
    <div class="col-2 result-details text-center" data-cy="search-result-details">
      {{
        vehicle.energy
          ? $t(`caareavlib.vehicle.search.${vehicle.energy}`)
          : "--" | capitalize
      }}
    </div>
    <div class="col-2 result-details text-center" data-cy="search-result-details">
      {{
        vehicle.fiscal_hp
          ? `${vehicle.fiscal_hp} ${$t("caareavlib.vehicle.search.horsepower")}`
          : "--"
      }}
    </div>
    <div class="col-2 result-details text-center" data-cy="search-result-details">
      {{
        vehicle.transmission
          ? $t(`caareavlib.vehicle.search.${vehicle.transmission}`)
          : "--" | capitalize
      }}
    </div>
    <div v-if="canValidate" class="col-1 ml-auto text-right icon-fade">
      <i class="icon-chevron-right font-size-40" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleSearchResultItem",
  filters: {
    capitalize: function (value) {
      if (!value) return ""
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
  },
  props: {
    vehicle: { type: Object, required: true },
    image: { type: String, default: null },
    canValidate: { type: Boolean, default: true },
  },
  methods: {
    onButtonClick() {
      this.$emit("validate-version", this.vehicle)
    },
  },
}
</script>
