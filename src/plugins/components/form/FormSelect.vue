<template>
  <div>
    <multiselect
      :model-value="multiselectSelectedOption"
      :show-labels="false"
      :options="multiSelectOptions"
      :placeholder="placeholder"
      :label="labelSelectAttr"
      :class="{ 'is-invalid': hasError }"
      :track-by="labelSelectAttr"
      :data-cy="name + '-select'"
      :disabled="disabled"
      :allow-empty="allowEmpty"
      :loading="isLoading"
      :multiple="multiple"
      :taggable="multiple"
      @update:modelValue="updateValue"
    >
      <span slot="noOptions">
        {{ i18n("caareavlib.form.rowSelect.emptySelect") }}
      </span>
    </multiselect>
    <small v-if="help && !error" :class="helperClass">
      {{ help }}
    </small>
    <div v-if="error" class="invalid-feedback" :data-cy="name + '-error'">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { computed, inject, toRef } from "vue"
import Multiselect from "vue-multiselect"
import { useFormCommon } from "./composables/formCommon.js"
import { commonProps } from "./_commonProps"

const props = defineProps({
  ...commonProps,
  selectOptions: Object,
  modelValue: [String, Array],
  labelSelectAttr: { type: String, default: "label" },
  labelOptionsOrder: { type: Boolean, default: true },
  isLoading: { type: Boolean, default: false },
  allowEmpty: { type: Boolean, default: false },
  emptyValue: { type: [String, Number], default: null },
  emptyLabel: { type: String, default: null },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const i18n = inject("i18n")
const { hasError, error } = useFormCommon(toRef(props, "name"), toRef(props, "errors"))
const emit = defineEmits(["update:modelValue"])
const multiSelectOptions = computed(() => {
  let options = Object.keys(props.selectOptions).reduce((acc, o) => {
    acc.push({ key: o, label: props.selectOptions[o] })
    return acc
  }, [])
  if (props.labelOptionsOrder) {
    options.sort((a, b) => {
      return a.label.localeCompare(b.label, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    })
  }

  if (props.allowEmpty && props.emptyLabel) {
    options = [...[{ key: props.emptyValue, label: props.emptyLabel }], ...options]
  }
  return options
})
const multiselectSelectedOption = computed(() => {
  if (props.multiple) {
    return multiSelectOptions.value.filter((o) => props.modelValue.includes(o.key))
  }
  return multiSelectOptions.value.find((o) => o.key === props.modelValue)
})

function updateValue(e) {
  // onChange emits null if new value is same as previous one -> code below would fail
  if (e === null) return emit("update:modelValue", e)
  if (props.multiple === false) {
    return emit("update:modelValue", e.key)
  }
  const values = e.reduce((acc, v) => {
    acc.push(v.key)
    return acc
  }, [])
  return emit("update:modelValue", values)
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
