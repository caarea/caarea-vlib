<template>
  <div>
    <multiselect
      :value="selectedOption"
      :options="selectOptions"
      :placeholder="placeholder"
      :label="labelSelectAttr"
      :class="{ 'is-invalid': hasError }"
      :track-by="labelSelectAttr"
      :data-cy="name + '-select'"
      @change="updateValue"
      @input="updateValue"
      :loading="isLoading"
      :disabled="disabled"
      :show-labels="false"
      :allow-empty="false"
      :searchable="isSearchable"
      :internal-search="false"
      :clear-on-select="false"
      :show-no-results="true"
      :hide-selected="false"
      :custom-label="customLabel"
      :preserve-search="true"
      @search-change="onSearchChange"
      :ref="name"
    >
      <small slot="noOptions">{{ noOptionsText }}</small>
      <span slot="noResult">{{ noResultText }}</span>
    </multiselect>
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
import FormElementMixin from "../../mixins/FormElementMixin"

export default {
  name: "FormAsyncSelect",
  mixins: [FormElementMixin],
  components: { Multiselect },
  props: {
    selectedOption: Object,
    // selection options
    selectOptions: Array,
    // select options attribute to use for select label
    labelSelectAttr: { type: String, required: true },
    // Show/hide the loading spinner
    isLoading: { type: Boolean, default: false },
    // async method to call
    onSearchChange: { type: Function, required: true },
    // Shows when no elements in options empty.
    noOptionsText: { type: String, required: true },
    // Shows when search results is empty.
    noResultText: { type: String, required: true },
    // Whether any search input can be done or not
    isSearchable: { type: Boolean, default: true },
    // Initial search texte
    searchValue: { type: String, default: "" },
  },
  methods: {
    customLabel(o) {
      return o.hasOwnProperty(this.labelSelectAttr)
        ? o[this.labelSelectAttr]
        : this.placeholder
    },
    updateValue(e) {
      this.$refs[this.name].search = e[this.labelSelectAttr]
      this.$emit("update:selected-option", e)
    },
  },
  mounted() {
    if (this.isSearchable && this.searchValue) {
      this.$refs[this.name].search = this.searchValue
    }
  },
}
</script>

<style scoped>
.invalid-feedback {
  display: block;
}
</style>
