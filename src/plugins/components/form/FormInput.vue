<script setup>
import { ref, toRef, watch } from "vue"
import { useFormCommon } from "./composables/formCommon.js"
import { commonProps } from "./_commonProps"
import _debounce from "lodash.debounce"

const props = defineProps({
  ...commonProps,
  modelValue: { type: [Number, String] },
  type: { type: String, default: "text" },
  min: { type: Number, default: null },
  max: { type: Number, default: null },
  maxLength: { type: Number, default: null },
  placeholder: { type: String, default: "" },
  name: { type: String, required: true },
  debounceInput: { type: Boolean, default: false },
  debounceDelay: { type: Number, default: 1000 },
  hasClearButton: { type: Boolean, default: false },
})

const internalModel = ref(props.modelValue)
// const model = defineModel()

const emit = defineEmits(["keyboard-enter", "update:modelValue"])

const { getId, hasError, inputRefName, error } = useFormCommon(
  toRef(props, "name"),
  toRef(props, "errors"),
)

watch(internalModel, (newVal) => {
  props.debounceInput ? updateDebounceModel(newVal) : updateModel(newVal)
})

const updateModel = (newVal) => {
  emit("update:modelValue", newVal)
}

const updateDebounceModel = _debounce((newVal) => {
  emit("update:modelValue", newVal)
}, props.debounceDelay)

const vFocus = {
  mounted: (el) => {
    props.focus ? el.focus() : null
  },
}
</script>

<template>
  <div :class="hasClearButton ? 'input-group d-flex align-items-center' : ''">
    <input
      :id="getId"
      :ref="inputRefName"
      v-model="internalModel"
      :name="name"
      :placeholder="placeholder"
      :class="[{ 'is-invalid': error }, inputClass]"
      class="padding-space"
      :type="type"
      :maxlength="maxLength"
      :data-cy="`input-${name}`"
      :disabled="disabled"
      :min="min"
      :max="max"
      style="height: 44px"
      @keyup.enter="$emit('keyboard-enter', $event.target.value)"
      v-focus
    />
    <div v-if="hasClearButton && model.value" class="input-group-append">
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

<style scoped lang="scss">
.is-invalid {
  border-color: #dc3545 !important;
}
</style>
