<template>
  <FormRow
    :label="label"
    :label-class="labelClass"
    :control-class="controlClass"
    :for-id="getId"
    :required="required"
    :inline="labelInline"
  >
    <FormInput
      :name="name"
      :max-length="maxLength"
      :errors="errors"
      :type="type"
      v-model="model"
      :debounce-input="debounceInput"
      :debounce-delay="debounceDelay"
      :placeholder="placeholder"
      :help="help"
      :focus="focus"
      :required="required"
      :disabled="disabled"
      @keyboard-enter="$emit('keyboard-enter', $event)"
    ></FormInput>
  </FormRow>
</template>

<script setup>
import FormInput from "./FormInput.vue"
import FormRow from "./FormRow.vue"
import { useFormCommon } from "./composables/formCommon.js"
import { commonProps } from "./_commonProps"
import { toRef } from "vue"

const props = defineProps({
  ...commonProps,
  modelValue: [Number, String],
  type: { type: String, default: "text" },
  maxLength: { type: Number, default: null },
  debounceInput: { type: Boolean, default: false },
  debounceDelay: { type: Number, default: 500 },
})
defineEmits(["update:modelValue"])
const model = defineModel()
const { getId } = useFormCommon(toRef(props, "name"), toRef(props, "errors"))
</script>
