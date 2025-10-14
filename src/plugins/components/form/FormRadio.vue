<template>
  <div class="custom-control custom-radio">
    <input
      :id="getId"
      v-model="inputVal"
      :class="['custom-control-input', { 'mouse-pointer': !disabled }]"
      :disabled="disabled"
      :data-cy="name + '-' + option + '-radio'"
      :value="option"
      type="radio"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <label class="custom-control-label" :for="getId">{{ label }}</label>
  </div>
</template>

<script>
import FormElementMixin from "../mixins/FormElementMixin"

export default {
  name: "FormRadio",
  mixins: [FormElementMixin],
  props: {
    // value set in v-model on change
    option: { Type: String, required: true },
    modelValue: { Type: Boolean, required: true },
    disabled: { Type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  computed: {
    getId() {
      return "id-" + this.name + "-" + this.option
    },
  },
}
</script>

<style lang="scss">
input[type="radio"]:disabled ~ label::before {
  border: none;
}
</style>
