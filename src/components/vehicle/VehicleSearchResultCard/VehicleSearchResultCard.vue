<template>
  <div class="justify-content-center card mt-4 rounded-0">
    <div
      class="card-header d-flex justify-content-start align-items-center w-100 p-3 border-bottom-0"
    >
      <span
        class="justify-content-center result-image d-flex align-items-center bg-white"
      >
        <img v-if="image" :src="image" alt="image" />
        <i v-else class="m-3 icon-caarea-car font-size-40" aria-hidden="true"></i>
      </span>
      <div class="d-flex flex-column ml-3">
        <div class="font-weight-bold font-size-22">
          {{ vehicle.name }}
        </div>
        <div>
          <span class="font-size-14">
            {{ vehicle.version }}
          </span>
          <span v-if="vehicleExtra" class="ml-2 vehicle-extra font-size-12">
            {{ vehicleExtra }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VehicleSearchResultCard",
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
    productCode: { type: String },
  },
  computed: {
    vehicleExtra() {
      let text = ""
      if (this.vehicle.hasOwnProperty("energy") && this.vehicle.energy)
        text +=
          " " +
          this.$options.filters.capitalize(
            this.$t(`caareavlib.vehicle.search.${this.vehicle.energy}`)
          )
      if (this.vehicle.hasOwnProperty("fiscal_hp") && this.vehicle.fiscal_hp)
        text += ` ${this.vehicle.fiscal_hp} ${this.$t(
          "caareavlib.vehicle.search.horsepower"
        )}`
      if (this.vehicle.hasOwnProperty("transmission") && this.vehicle.transmission)
        text +=
          " " +
          this.$options.filters.capitalize(
            this.$t(`caareavlib.vehicle.search.${this.vehicle.transmission}`)
          )
      if (this.vehicle.hasOwnProperty("year") && this.vehicle.year)
        text += ` ${this.vehicle.year}`
      return text
    },
  },
}
</script>
<style lang="scss"></style>
