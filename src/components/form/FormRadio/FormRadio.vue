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
    />
    <label class="custom-control-label" :for="getId">{{ label }}</label>
  </div>
</template>

<script>
import FormElementMixin from "@/components/mixins/FormElementMixin"

export default {
  name: "FormRadio",
  mixins: [FormElementMixin],
  props: {
    // value set in v-model on change
    option: { Type: String, required: true },
    value: { Type: Boolean, required: true },
    disabled: { Type: Boolean, default: false },
  },
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
