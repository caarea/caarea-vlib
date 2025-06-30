<template>
  <div class="p-3 form-vehicle-container">
    <div class="form-vehicle-left">
      <div
        v-for="criteria in Object.keys(model.filters)"
        :key="criteria"
        class="form-vehicle-input px-1"
      >
        <FormRowSelect
          v-if="model.filters[criteria].inputType === 'select'"
          :key="criteria"
          v-model="model.filters[criteria].value"
          :name="`filter-${criteria}`"
          :label="$t(`caareavlib.vehicle.search.${criteria}`)"
          :label-inline="false"
          :select-options="model.filters[criteria].choices"
          label-select-attr="label"
          :allow-empty="true"
          :placeholder="
            model.filters[criteria].value.length === 0 ? getEmptyLabel(criteria) : ''
          "
          :multiple="true"
          :disabled="Object.keys(model.filters[criteria].choices).length === 0"
          @update:model-value="$emit('filter-input', criteria, model.filters[criteria])"
        ></FormRowSelect>
        <FormRowInput
          v-else
          v-model="model.filters[criteria].value"
          :label="$t(`caareavlib.vehicle.search.${criteria}`)"
          :label-inline="false"
          :debounce-input="true"
          :name="`filter-${criteria}`"
          :label-class="['col-2']"
          :type="model.filters[criteria].inputType"
          :errors="filterErrors(criteria)"
          @update:model-value="onInputUpdate(criteria)"
        ></FormRowInput>
      </div>
      <button
        class="btn btn-outline-secondary font-size-11 p-1 ml-1"
        style="max-height: 2.8rem; margin-top: 1.7rem"
        data-cy="vehicle-reset-filters"
        @click.prevent="onEraseFilters"
      >
        {{ i18n("caareavlib.vehicle.search.erase_filters") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { inject } from "vue"

const props = defineProps({
  modelValue: { type: Object, required: true },
  errors: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
const i18n = inject("i18n")
const model = defineModel()
const emit = defineEmits(["update:modelValue", "filter-input", "reset-filters"])
function getEmptyLabel(criteria) {
  return i18n(`caareavlib.vehicle.search.all_${criteria}`)
}
function onInputUpdate(criteria) {
  console.log("onInputUpdate", criteria, model.value.filters[criteria])
  emit("filter-input", criteria, model.value.filters[criteria])
}
function filterErrors(criteria) {
  let err = {}
  if (!props.errors) {
    return err
  }
  if ("filters" in props.errors && criteria in props.errors.filters) {
    err[`filter-${criteria}`] = props.errors.filters[criteria]
  }
  return err
}
function onEraseFilters() {
  for (const filter in model.value.filters) {
    // noinspection JSUnfilteredForInLoop
    if (Array.isArray(model.value.filters[filter].value)) {
      // noinspection JSUnfilteredForInLoop
      model.value.filters[filter].value = []
    } else {
      // noinspection JSUnfilteredForInLoop
      model.value.filters[filter].value = ""
    }
  }
  emit("reset-filters")
}
</script>

<style scoped></style>
