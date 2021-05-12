<template>
  <div class="custom-control custom-checkbox">
    <input
      :id="getId"
      type="checkbox"
      :class="['custom-control-input', { 'mouse-pointer': !disabled }]"
      :checked="value"
      :disabled="disabled"
      :data-cy="getId + '-checkbox'"
      @input="$emit('input', $event.target.checked)"
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
