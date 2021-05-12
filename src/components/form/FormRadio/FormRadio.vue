<template>
  <div class="custom-control custom-radio">
    <input
      type="radio"
      v-model="inputVal"
      :class="['custom-control-input', { 'mouse-pointer': !disabled }]"
      :id="getId"
      :disabled="disabled"
      :data-cy="this.name + '-' + this.option + '-radio'"
      :value="option"
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
