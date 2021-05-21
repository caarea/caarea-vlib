<template>
  <div
    class="vehicle-list-item-border row no-gutters justify-content-between align-items-center w-100 py-3"
    @click="onButtonClick"
  >
    <div v-if="image" class="col-2">
      <img :src="image" alt="image" />
    </div>
    <div class="col-5 result-name" data-cy="search-result-name">
      {{ vehicle.label }}
    </div>
    <div class="col-2 result-details text-center" data-cy="search-result-details">
      {{ $t(`vehicle_search.${vehicle.energy}`) || "--" | capitalize }}
    </div>
    <div class="col-2 result-details text-center" data-cy="search-result-details">
      {{ `${vehicle.fiscal_hp} Cv` || "--" }}
    </div>
    <div class="col-2 result-details text-center" data-cy="search-result-details">
      {{ $t(`vehicle_search.${vehicle.transmission}`) || "--" | capitalize }}
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

<style lang="scss" scoped>
.result {
  $resultsize: 80px;

  &-name {
    font-size: 1.3rem;
  }

  &-image,
  img {
    height: $resultsize;
    width: $resultsize;
    background-color: white;
  }
}
</style>
