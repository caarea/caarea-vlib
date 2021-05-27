export default {
  props: {
    name: { type: String, required: true },
    label: { type: String, default: null },
    labelInline: { type: Boolean, default: true },
    labelClass: { type: Array, default: () => ["col-sm-4", "text-right"] },
    groupClass: { type: String, default: "row" },
    inputClass: { type: String, default: "form-control" },
    controlClass: { type: Array, default: () => ["col-sm-8"] },
    helperClass: { type: String, default: "form-text text-muted" },
    placeholder: { type: String, default: "" },
    help: String,
    errors: {
      type: Object,
      default: () => {
        /* intentional */
      },
    },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    focus: { type: Boolean, default: false },
  },
  computed: {
    inputVal: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit("input", val)
      },
    },
    getId() {
      return "id-" + this.name
    },
    hasError() {
      return this.errors && this.errors.hasOwnProperty(this.name)
    },
    error() {
      if (this.hasError) return this.errors[this.name]
      return null
    },
  },
  methods: {
    setFocus() {
      if (this.focus === true) {
        this.$nextTick(() => {
          this.$refs[`input-${this.name}`].focus()
        })
      }
    },
  },
}
