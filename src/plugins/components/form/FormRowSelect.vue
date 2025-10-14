<template>
  <FormRow
    :label="label"
    :label-class="labelClass"
    :control-class="controlClass"
    :for-id="getId"
    :required="required"
    :inline="labelInline"
  >
    <FormSelect
      v-model="model"
      :name="name"
      :label="label"
      label-select-attr="label"
      :label-options-order="labelOptionsOrder"
      :select-options="selectOptions"
      :errors="errors"
      :placeholder="placeholder"
      :disabled="disabled"
      :is-loading="isLoading"
      :allow-empty="allowEmpty"
      :empty-label="emptyLabel"
      :empty-value="emptyValue"
      :multiple="multiple"
    ></FormSelect>
  </FormRow>
</template>

<script setup>
defineOptions({ name: "FormRowSelect" })
import { toRef } from "vue"
import { FormRow, FormSelect } from "./index.js"
import { useFormCommon } from "./composables/formCommon.js"
import { commonProps } from "./_commonProps"

const props = defineProps({
  ...commonProps,
  modelValue: [String, Array],
  selectOptions: Object,
  labelSelectAttr: { type: String, required: true },
  labelOptionsOrder: { type: Boolean, default: true },
  isLoading: { type: Boolean, default: false },
  allowEmpty: { type: Boolean, default: false },
  emptyValue: { type: [String, Number], default: null },
  emptyLabel: { type: String, default: null },
  multiple: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})
defineEmits(["update:modelValue"])
const { getId } = useFormCommon(toRef(props, "name"), toRef(props, "errors"))
const model = defineModel()
</script>
