<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="getId"
      type="checkbox"
      :class="['custom-control-input', { 'mouse-pointer': !disabled }]"
      :checked="modelValue"
      :disabled="disabled"
      :data-cy="getId + '-checkbox'"
    />
    <label class="custom-control-label" :for="getId">{{ label }}</label>
  </div>
</template>

<script>
import FormElementMixin from "../mixins/FormElementMixin"

export default {
  name: "FormCheckbox",
  mixins: [FormElementMixin],
  props: {
    modelValue: { Type: Boolean, required: true },
    disabled: { Type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value) {
        this.$emit("update:modelValue", value)
      },
    },
  },
}
</script>

<style lang="scss">
input[type="checkbox"]:disabled ~ label::before {
  border: none;
}
</style>
