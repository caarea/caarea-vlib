<script setup>
import { toRef } from "vue"
import { commonProps } from "src/plugins/components/form/_commonProps.js"
import { useFormCommon } from "src/plugins/components/form/composables/formCommon.js"

// Refs

// Props
const props = defineProps({
  ...commonProps,
  modelValue: { type: Boolean, required: true },
  inline: { type: Boolean, default: false },
  switch: { type: Boolean, default: false },
})

// Emits
defineEmits(["update:modelValue"])

const { getId, inputRefName } = useFormCommon(
  toRef(props, "name"),
  toRef(props, "errors"),
)
</script>

<template>
  <div
    class="custom-control custom-checkbox"
    :class="{
      'custom-control-inline': props.inline,
      'custom-switch': props.switch,
      'custom-checkbox': !props.switch,
    }"
  >
    <input
      :ref="inputRefName"
      :id="getId"
      type="checkbox"
      :class="['custom-control-input', { 'mouse-pointer': !disabled }]"
      class="form-control-lg"
      :checked="modelValue"
      :disabled="disabled"
      :data-cy="name + '-checkbox'"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label class="custom-control-label" :for="getId">{{ label }}</label>
  </div>
</template>

<style lang="scss">
input[type="checkbox"]:disabled ~ label::before {
  border: none;
}
</style>
