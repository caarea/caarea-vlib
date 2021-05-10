<template>
  <div>
    <textarea
      :id="getId"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      :maxlength="maxLength"
      :value="value"
      :rows="rows"
      :cols="columns"
      @input="onInput"
      :data-cy="`textarea-${name}`"
      :ref="`input-${name}`"
    />
  </div>
</template>

<script>
import FormElementMixin from "@/components/mixins/FormElementMixin"

export default {
  name: "FormTextArea",
  mixins: [FormElementMixin],
  props: {
    value: { type: [Number, String], required: true },
    maxLength: { type: Number, default: null },
    placeholder: { type: String, default: "" },
    name: { type: String, required: true },
    rows: { type: Number, default: 5 },
    columns: { type: Number, default: 20 },
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
textarea {
  resize: none;
}
</style>
