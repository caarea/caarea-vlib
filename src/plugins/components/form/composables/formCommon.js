import { computed } from "vue"
export function useFormCommon(eltName, formErrors) {
  const getId = computed(() => "id-" + eltName.value)
  const inputRefName = computed(() => `input-${eltName.value}`)
  const hasError = computed(() => formErrors.value && eltName.value in formErrors.value)
  const error = computed(() =>
    hasError.value ? formErrors.value[eltName.value] : null,
  )
  return { hasError, error, getId, inputRefName }
}
