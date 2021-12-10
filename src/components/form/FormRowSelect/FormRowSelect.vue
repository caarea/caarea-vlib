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
      :name="name"
      :label="label"
      :selected-option="selectedOption"
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
      @update:selected-option="updateValue"
    ></FormSelect>
  </FormRow>
</template>

<script>
import FormElementMixin from "@/components/mixins/FormElementMixin"
import FormSelect from "../FormSelect"
import FormRow from "../FormRow/FormRow"

export default {
  name: "FormRowSelect",
  components: { FormRow, FormSelect },
  mixins: [FormElementMixin],
  props: {
    selectedOption: [String, Array],
    // selection options
    selectOptions: Object,
    // select options attribute to use for select label
    labelSelectAttr: { type: String, required: true },
    // order option label
    labelOptionsOrder: { type: Boolean, default: true },
    // Show/hide the loading spinner
    isLoading: { type: Boolean, default: false },
    // allowEmpty
    allowEmpty: { type: Boolean, default: false },
    // emtpy value
    emptyValue: { type: [String, Number], default: null },
    // emtpy label
    emptyLabel: { type: String, default: null },
    // multiple select
    multiple: { type: Boolean, default: false },
  },
  methods: {
    updateValue(e) {
      this.$emit("update:selected-option", e)
    },
  },
}
</script>
