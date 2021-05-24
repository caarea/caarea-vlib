<template>
  <FormRow
    class="mb-3"
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
      :value="value"
      @input="$emit('input', $event)"
      @keyboard-enter="$emit('keyboard-enter', $event)"
    ></FormInput>
  </FormRow>
</template>

<script>
import FormElementMixin from "@/components/mixins/FormElementMixin"
import FormInput from "../FormInput/FormInput"
import FormRow from "../FormRow/FormRow"

export default {
  name: "FormRowInput",
  components: { FormRow, FormInput },
  mixins: [FormElementMixin],
  props: {
    value: [Number, String],
    type: { type: String, default: "text" },
    maxLength: { type: Number, default: null },
  },
}
</script>
