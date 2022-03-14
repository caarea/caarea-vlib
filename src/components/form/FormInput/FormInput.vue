<template>
  <div :class="hasClearButton ? 'input-group d-flex align-items-center' : ''">
    <input
      :id="getId"
      :ref="`input-${name}`"
      :name="name"
      :placeholder="placeholder"
      :class="[{ 'is-invalid': error }, inputClass]"
      class="padding-space"
      :type="type"
      :maxlength="maxLength"
      :value="value"
      :data-cy="`input-${name}`"
      :disabled="disabled"
      @input="onInput"
      @keyup.enter="$emit('keyboard-enter', $event.target.value)"
      style="height: 44px"
    />
    <div v-if="hasClearButton && value" class="input-group-append">
      <button class="btn btn-icon font-size-22 text-secondary">
        <i class="icon-cross" aria-hidden="true"></i>
      </button>
    </div>
    <small v-if="help && !hasError" :class="helperClass">
      {{ help }}
    </small>
    <div v-if="hasError" class="invalid-feedback text-left" :data-cy="name + '-error'">
      {{ error }}
    </div>
  </div>
</template>

<script>
import FormElementMixin from "@/components/mixins/FormElementMixin"
import _ from "lodash"

export default {
  name: "FormInput",
  mixins: [FormElementMixin],
  props: {
    value: { type: [Number, String] },
    type: { type: String, default: "text" },
    maxLength: { type: Number, default: null },
    placeholder: { type: String, default: "" },
    name: { type: String, required: true },
    debounceInput: { type: Boolean, default: false },
    debounceTimeout: { type: Number, default: 1000 },
    hasClearButton: { type: Boolean, default: false },
  },
  data() {
    return {
      debouncedChanges: null,
    }
  },
  mounted() {
    if (this.debounceInput) {
      this.debouncedChanges = _.debounce(this.emitUpdate, this.debounceTimeout)
    }
    this.setFocus()
  },
  methods: {
    emitUpdate(value) {
      this.$emit("input", value)
    },
    onInput(e) {
      if (this.debounceInput) {
        this.debouncedChanges(e.target.value)
      } else {
        this.emitUpdate(e.target.value)
      }
    },
  },
}
</script>
<style scoped lang="scss">
.is-invalid {
  border-color: #dc3545 !important;
}
</style>
