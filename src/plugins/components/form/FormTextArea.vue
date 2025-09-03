<template>
  <div>
    <textarea
      :id="getId"
      :ref="`input-${name}`"
      :name="name"
      :placeholder="placeholder"
      :class="inputClass"
      :maxlength="maxLength"
      v-model="internalModel"
      :rows="rows"
      :cols="columns"
      :data-cy="`textarea-${name}`"
    />
  </div>
</template>

<script setup>
import { ref, toRef, watch } from "vue"
import { useFormCommon } from "./composables/formCommon.js"
import { commonProps } from "./_commonProps"
import _debounce from "lodash.debounce"

const props = defineProps({
  ...commonProps,
  modelValue: { type: [Number, String] },
  maxLength: { type: Number, default: null },
  placeholder: { type: String, default: "" },
  name: { type: String, required: true },
  rows: { type: Number, default: 5 },
  columns: { type: Number, default: 20 },
  debounceInput: { type: Boolean, default: false },
  debounceDelay: { type: Number, default: 1000 },
})

const internalModel = ref(props.modelValue)
// const model = defineModel()

const emit = defineEmits(["update:modelValue", "debounce:update"])

const { getId } = useFormCommon(toRef(props, "name"), toRef(props, "errors"))

watch(internalModel, (newVal) => {
  props.debounceInput ? updateDebounceModel(newVal) : updateModel(newVal)
})
watch(
  () => props.modelValue,
  (newVal) => {
    internalModel.value = newVal
  },
)

const updateModel = (newVal) => {
  emit("update:modelValue", newVal)
}

const updateDebounceModel = _debounce((newVal) => {
  updateModel(newVal)
  emit("debounce:update", newVal)
}, props.debounceDelay)
</script>

<style scoped lang="scss">
textarea {
  resize: none;
}
</style>
