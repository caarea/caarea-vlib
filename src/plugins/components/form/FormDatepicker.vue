<script setup>
// FormDatepicker

import { commonProps } from "./_commonProps"
import { computed, inject, ref } from "vue"
import { enGB, es, fr, ko } from "date-fns/locale"
import { format } from "date-fns"
import datepicker from "vue3-datepicker"

const languages = { en: enGB, es, fr, ko }
const i18n = inject("i18n")
const props = defineProps({
  ...commonProps,
  modelValue: { type: [Number, String, Date] },
  lang: { type: String, default: "fr" },
  dateFormat: { type: String },
  disableDatesLower: { type: Date },
  disableDatesUpper: { type: Date },
})
const dateInput = ref(props.modelValue ? new Date(props.modelValue) : null)
const language = computed(() => languages[props.lang])
const inputDateFormat = computed(() => {
  if (props.dateFormat) {
    return props.dateFormat
  }
  return i18n("caareavlib.datepicker.date_format")
})
const isMondayFirst = computed(() => props.lang === "fr")
const lowerLimit = computed(() => {
  if (props.disableDatesLower) {
    return props.disableDatesLower
  }
  return null
})
const upperLimit = computed(() => {
  if (props.disableDatesUpper) {
    return props.disableDatesUpper
  }
  return null
})
const getDataCy = computed(() => {
  return props.name.replace(/_/g, "-")
})
const getInputId = computed(() => {
  return "input-" + getDataCy.value
})
const emit = defineEmits(["update:modelValue"])
const onUpdateModelValue = (newVal) => {
  dateInput.value = newVal
  if (newVal === null) {
    emit("update:modelValue", null)
  } else {
    emit("update:modelValue", format(newVal, "yyyy-MM-dd"))
  }
}
</script>

<template>
  <div :data-cy="getDataCy">
    <datepicker
      :id="getInputId"
      :model-value="dateInput"
      class="date-picker-input form-control"
      input-class="form-control"
      :locale="language"
      :week-starts-on="isMondayFirst ? 1 : 0"
      :input-format="inputDateFormat"
      :lower-limit="lowerLimit"
      :upper-limit="upperLimit"
      @update:modelValue="onUpdateModelValue"
    ></datepicker>
  </div>
</template>

<style scoped lang="scss"></style>
