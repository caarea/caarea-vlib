<template>
  <div class="custom-control custom-checkbox">
    <input
      type="checkbox"
      :class="['custom-control-input', { 'mouse-pointer': !disabled }]"
      :id="getId"
      :checked="value"
      :disabled="disabled"
      @input="$emit('input', $event.target.checked)"
      :data-cy="getId + '-checkbox'"
    />
    <label class="custom-control-label" :for="getId">{{ label }}</label>
  </div>
</template>

<script>
import FormElementMixin from "@/components/mixins/FormElementMixin"

export default {
  name: "FormCheckbox",
  mixins: [FormElementMixin],
  props: {
    value: { Type: Boolean, required: true },
    disabled: { Type: Boolean, default: false },
  },
}
</script>

<style lang="scss">
input[type="checkbox"]:disabled ~ label::before {
  border: none;
}
</style>
