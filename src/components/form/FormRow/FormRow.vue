<template>
  <div v-if="inline" class="row">
    <div v-if="label" :class="['mx-auto', ...labelClass]" class="pt-2">
      <label :for="forId" class="mb-0">
        {{ label }}
        <sup v-if="required">*</sup>
      </label>
    </div>
    <div :class="[...controlClass]">
      <slot ref="control" />
    </div>
  </div>
  <div v-else>
    <label v-if="label" :for="forId" class="mb-1">
      {{ label }}
      <sup v-if="required">*</sup>
    </label>
    <slot ref="control" />
  </div>
</template>

<script>
export default {
  name: "FormRow",
  props: {
    label: String,
    labelClass: { type: Array, default: () => ["col-sm-4", "text-right"] },
    controlClass: { type: Array, default: () => ["col-sm-8"] },
    forId: String,
    required: { type: Boolean, default: false },
    inline: { type: Boolean, default: true },
  },
}
</script>
