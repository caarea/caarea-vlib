<template>
  <div>
    <input
      :id="getId"
      :name="name"
      :placeholder="placeholder"
      :class="[{ 'is-invalid': error }, inputClass]"
      :type="type"
      :maxlength="maxLength"
      :value="value"
      @input="onInput"
      @keyup.enter="$emit('keyboard-enter', $event.target.value)"
      :data-cy="`input-${name}`"
      :ref="`input-${name}`"
      :disabled="disabled"
    />
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
  },
  data() {
    return {
      debouncedChanges: null,
    }
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
  mounted() {
    if (this.debounceInput) {
      this.debouncedChanges = _.debounce(this.emitUpdate, this.debounceTimeout)
    }
  },
}
</script>
<style scoped lang="scss">
.is-invalid {
  border-color: #dc3545 !important;
}
</style>
