<template>
  <div>
    <multiselect
      :value="multiselectSelectedOption"
      :show-labels="false"
      :options="multiSelectOptions"
      :placeholder="placeholder"
      :label="labelSelectAttr"
      :class="{ 'is-invalid': hasError }"
      :track-by="labelSelectAttr"
      :data-cy="name + '-select'"
      :disabled="disabled"
      :allow-empty="allowEmpty"
      :loading="isLoading"
      :multiple="multiple"
      :taggable="multiple"
      @change="updateValue"
      @input="updateValue"
    />
    <small v-if="help && !error" :class="helperClass">
      {{ help }}
    </small>
    <div class="invalid-feedback" :data-cy="name + '-error'">
      {{ error }}
    </div>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect"
import FormElementMixin from "@/components/mixins/FormElementMixin"

export default {
  name: "FormSelect",
  components: { Multiselect },
  mixins: [FormElementMixin],
  props: {
    selectedOption: [String, Array],
    // selection options
    selectOptions: [Object, Array],
    // select options attribute to use for select label
    labelSelectAttr: { type: String, default: "label" },
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
  computed: {
    multiSelectOptions() {
      let options = []
      if (Array.isArray(this.selectOptions)) {
        options = this.selectOptions
        options.forEach((option) => {
          const arrayOption = Object.keys(option).reduce((acc, o) => {
            acc.push({ key: o, label: option[o] })
            return acc
          }, [])
          option.key = arrayOption[0].key
          option.label = arrayOption[0].label
        })
      } else {
        options = Object.keys(this.selectOptions).reduce((acc, o) => {
          acc.push({ key: o, label: this.selectOptions[o] })
          return acc
        }, [])
        if (this.labelOptionsOrder) {
          options.sort((a, b) => {
            return a.label.localeCompare(b.label, undefined, {
              numeric: true,
              sensitivity: "base",
            })
          })
        }
      }

      if (this.allowEmpty && this.emptyLabel) {
        options = [...[{ key: this.emptyValue, label: this.emptyLabel }], ...options]
      }

      return options
    },
    multiselectSelectedOption() {
      if (this.multiple) {
        return this.multiSelectOptions.filter((o) =>
          this.selectedOption.includes(o.key)
        )
      }
      return this.multiSelectOptions.find((o) => o.key === this.selectedOption)
    },
  },
  methods: {
    updateValue(e) {
      // onChange emits null if new value is same as previous one -> code below would fail
      if (e === null) return this.$emit("update:selected-option", e)
      if (this.multiple === false) {
        return this.$emit("update:selected-option", e.key)
      }
      const values = e.reduce((acc, v) => {
        acc.push(v.key)
        return acc
      }, [])
      return this.$emit("update:selected-option", values)
    },
  },
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
