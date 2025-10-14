var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { createElementBlock, openBlock, withKeys, normalizeClass, withModifiers, renderSlot, createElementVNode, createVNode, createCommentVNode, withDirectives, Fragment, renderList, toDisplayString, vShow, Transition, withCtx, normalizeStyle, createTextVNode, resolveComponent, computed, toRef, unref, defineComponent, ref, watch, nextTick, watchEffect, createBlock, mergeProps, vModelText, resolveDynamicComponent, pushScopeId, popScopeId, inject, vModelDynamic, vModelRadio, mergeModels, useModel, hasInjectionContext, getCurrentInstance, reactive, markRaw, effectScope, isRef, isReactive, toRaw, getCurrentScope, onScopeDispose, toRefs } from "vue";
function isEmpty(opt) {
  if (opt === 0) return false;
  if (Array.isArray(opt) && opt.length === 0) return true;
  return !opt;
}
function not(fun) {
  return (...params) => !fun(...params);
}
function includes(str, query) {
  if (str === void 0) str = "undefined";
  if (str === null) str = "null";
  if (str === false) str = "false";
  const text = str.toString().toLowerCase();
  return text.indexOf(query.trim()) !== -1;
}
function stripGroups(options) {
  return options.filter((option) => !option.$isLabel);
}
function flattenOptions(values, label) {
  return (options) => options.reduce((prev, curr) => {
    if (curr[values] && curr[values].length) {
      prev.push({
        $groupLabel: curr[label],
        $isLabel: true
      });
      return prev.concat(curr[values]);
    }
    return prev;
  }, []);
}
const flow = (...fns) => (x2) => fns.reduce((v, f) => f(v), x2);
var multiselectMixin = {
  data() {
    return {
      search: "",
      isOpen: false,
      preferredOpenDirection: "below",
      optimizedHeight: this.maxHeight
    };
  },
  props: {
    /**
     * Decide whether to filter the results based on search query.
     * Useful for async filtering, where we search through more complex data.
     * @type {Boolean}
     */
    internalSearch: {
      type: Boolean,
      default: true
    },
    /**
     * Array of available options: Objects, Strings or Integers.
     * If array of objects, visible label will default to option.label.
     * If `labal` prop is passed, label will equal option['label']
     * @type {Array}
     */
    options: {
      type: Array,
      required: true
    },
    /**
     * Equivalent to the `multiple` attribute on a `<select>` input.
     * @default false
     * @type {Boolean}
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * Key to compare objects
     * @default 'id'
     * @type {String}
     */
    trackBy: {
      type: String
    },
    /**
     * Label to look for in option Object
     * @default 'label'
     * @type {String}
     */
    label: {
      type: String
    },
    /**
     * Enable/disable search in options
     * @default true
     * @type {Boolean}
     */
    searchable: {
      type: Boolean,
      default: true
    },
    /**
     * Clear the search input after `)
     * @default true
     * @type {Boolean}
     */
    clearOnSelect: {
      type: Boolean,
      default: true
    },
    /**
     * Hide already selected options
     * @default false
     * @type {Boolean}
     */
    hideSelected: {
      type: Boolean,
      default: false
    },
    /**
     * Equivalent to the `placeholder` attribute on a `<select>` input.
     * @default 'Select option'
     * @type {String}
     */
    placeholder: {
      type: String,
      default: "Select option"
    },
    /**
     * Allow to remove all selected values
     * @default true
     * @type {Boolean}
     */
    allowEmpty: {
      type: Boolean,
      default: true
    },
    /**
     * Reset this.internalValue, this.search after this.internalValue changes.
     * Useful if want to create a stateless dropdown.
     * @default false
     * @type {Boolean}
     */
    resetAfter: {
      type: Boolean,
      default: false
    },
    /**
     * Enable/disable closing after selecting an option
     * @default true
     * @type {Boolean}
     */
    closeOnSelect: {
      type: Boolean,
      default: true
    },
    /**
     * Function to interpolate the custom label
     * @default false
     * @type {Function}
     */
    customLabel: {
      type: Function,
      default(option, label) {
        if (isEmpty(option)) return "";
        return label ? option[label] : option;
      }
    },
    /**
     * Disable / Enable tagging
     * @default false
     * @type {Boolean}
     */
    taggable: {
      type: Boolean,
      default: false
    },
    /**
     * String to show when highlighting a potential tag
     * @default 'Press enter to create a tag'
     * @type {String}
    */
    tagPlaceholder: {
      type: String,
      default: "Press enter to create a tag"
    },
    /**
     * By default new tags will appear above the search results.
     * Changing to 'bottom' will revert this behaviour
     * and will proritize the search results
     * @default 'top'
     * @type {String}
    */
    tagPosition: {
      type: String,
      default: "top"
    },
    /**
     * Number of allowed selected options. No limit if 0.
     * @default 0
     * @type {Number}
    */
    max: {
      type: [Number, Boolean],
      default: false
    },
    /**
     * Will be passed with all events as second param.
     * Useful for identifying events origin.
     * @default null
     * @type {String|Integer}
    */
    id: {
      default: null
    },
    /**
     * Limits the options displayed in the dropdown
     * to the first X options.
     * @default 1000
     * @type {Integer}
    */
    optionsLimit: {
      type: Number,
      default: 1e3
    },
    /**
     * Name of the property containing
     * the group values
     * @default 1000
     * @type {String}
    */
    groupValues: {
      type: String
    },
    /**
     * Name of the property containing
     * the group label
     * @default 1000
     * @type {String}
    */
    groupLabel: {
      type: String
    },
    /**
     * Allow to select all group values
     * by selecting the group label
     * @default false
     * @type {Boolean}
     */
    groupSelect: {
      type: Boolean,
      default: false
    },
    /**
     * Array of keyboard keys to block
     * when selecting
     * @default 1000
     * @type {String}
    */
    blockKeys: {
      type: Array,
      default() {
        return [];
      }
    },
    /**
     * Prevent from wiping up the search value
     * @default false
     * @type {Boolean}
    */
    preserveSearch: {
      type: Boolean,
      default: false
    },
    /**
     * Select 1st options if value is empty
     * @default false
     * @type {Boolean}
    */
    preselectFirst: {
      type: Boolean,
      default: false
    },
    /**
     * Prevent autofocus
     * @default false
     * @type {Boolean}
     */
    preventAutofocus: {
      type: Boolean,
      default: false
    },
    /**
     * Allows a custom function for sorting search/filtered results.
     * @default null
     * @type {Function}
     */
    filteringSortFunc: {
      type: Function,
      default: null
    }
  },
  mounted() {
    if (!this.multiple && this.max) {
      console.warn("[Vue-Multiselect warn]: Max prop should not be used when prop Multiple equals false.");
    }
    if (this.preselectFirst && !this.internalValue.length && this.options.length) {
      this.select(this.filteredOptions[0]);
    }
  },
  computed: {
    internalValue() {
      return this.modelValue || this.modelValue === 0 ? Array.isArray(this.modelValue) ? this.modelValue : [this.modelValue] : [];
    },
    filteredOptions() {
      const search2 = this.search || "";
      const normalizedSearch = search2.toLowerCase().trim();
      let options = this.options.concat();
      if (this.internalSearch) {
        options = this.groupValues ? this.filterAndFlat(options, normalizedSearch, this.label) : this.filterOptions(options, normalizedSearch, this.label, this.customLabel);
      } else {
        options = this.groupValues ? flattenOptions(this.groupValues, this.groupLabel)(options) : options;
      }
      options = this.hideSelected ? options.filter(not(this.isSelected)) : options;
      if (this.taggable && normalizedSearch.length && !this.isExistingOption(normalizedSearch)) {
        if (this.tagPosition === "bottom") {
          options.push({ isTag: true, label: search2 });
        } else {
          options.unshift({ isTag: true, label: search2 });
        }
      }
      return options.slice(0, this.optionsLimit);
    },
    valueKeys() {
      if (this.trackBy) {
        return this.internalValue.map((element) => element[this.trackBy]);
      } else {
        return this.internalValue;
      }
    },
    optionKeys() {
      const options = this.groupValues ? this.flatAndStrip(this.options) : this.options;
      return options.map((element) => this.customLabel(element, this.label).toString().toLowerCase());
    },
    currentOptionLabel() {
      return this.multiple ? this.searchable ? "" : this.placeholder : this.internalValue.length ? this.getOptionLabel(this.internalValue[0]) : this.searchable ? "" : this.placeholder;
    }
  },
  watch: {
    internalValue: {
      handler() {
        if (this.resetAfter && this.internalValue.length) {
          this.search = "";
          this.$emit("update:modelValue", this.multiple ? [] : null);
        }
      },
      deep: true
    },
    search() {
      this.$emit("search-change", this.search);
    }
  },
  emits: ["open", "search-change", "close", "select", "update:modelValue", "remove", "tag"],
  methods: {
    /**
     * Returns the internalValue in a way it can be emited to the parent
     * @returns {Object||Array||String||Integer}
     */
    getValue() {
      return this.multiple ? this.internalValue : this.internalValue.length === 0 ? null : this.internalValue[0];
    },
    /**
     * Filters and then flattens the options list
     * @param  {Array}
     * @return {Array} returns a filtered and flat options list
     */
    filterAndFlat(options, search2, label) {
      return flow(
        this.filterGroups(search2, label, this.groupValues, this.groupLabel, this.customLabel),
        flattenOptions(this.groupValues, this.groupLabel)
      )(options);
    },
    /**
     * Flattens and then strips the group labels from the options list
     * @param  {Array}
     * @return {Array} returns a flat options list without group labels
     */
    flatAndStrip(options) {
      return flow(
        flattenOptions(this.groupValues, this.groupLabel),
        stripGroups
      )(options);
    },
    /**
     * Updates the search value
     * @param  {String}
     */
    updateSearch(query) {
      this.search = query;
    },
    /**
     * Finds out if the given query is already present
     * in the available options
     * @param  {String}
     * @return {Boolean} returns true if element is available
     */
    isExistingOption(query) {
      return !this.options ? false : this.optionKeys.indexOf(query) > -1;
    },
    /**
     * Finds out if the given element is already present
     * in the result value
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is selected
     */
    isSelected(option) {
      const opt = this.trackBy ? option[this.trackBy] : option;
      return this.valueKeys.indexOf(opt) > -1;
    },
    /**
     * Finds out if the given option is disabled
     * @param  {Object||String||Integer} option passed element to check
     * @returns {Boolean} returns true if element is disabled
     */
    isOptionDisabled(option) {
      return !!option.$isDisabled;
    },
    /**
     * Returns empty string when options is null/undefined
     * Returns tag query if option is tag.
     * Returns the customLabel() results and casts it to string.
     *
     * @param  {Object||String||Integer} Passed option
     * @returns {Object||String}
     */
    getOptionLabel(option) {
      if (isEmpty(option)) return "";
      if (option.isTag) return option.label;
      if (option.$isLabel) return option.$groupLabel;
      const label = this.customLabel(option, this.label);
      if (isEmpty(label)) return "";
      return label;
    },
    /**
     * Add the given option to the list of selected options
     * or sets the option as the selected option.
     * If option is already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} option to select/deselect
     * @param  {Boolean} block removing
     */
    select(option, key) {
      if (option.$isLabel && this.groupSelect) {
        this.selectGroup(option);
        return;
      }
      if (this.blockKeys.indexOf(key) !== -1 || this.disabled || option.$isDisabled || option.$isLabel) return;
      if (this.max && this.multiple && this.internalValue.length === this.max) return;
      if (key === "Tab" && !this.pointerDirty) return;
      if (option.isTag) {
        this.$emit("tag", option.label, this.id);
        this.search = "";
        if (this.closeOnSelect && !this.multiple) this.deactivate();
      } else {
        const isSelected = this.isSelected(option);
        if (isSelected) {
          if (key !== "Tab") this.removeElement(option);
          return;
        }
        if (this.multiple) {
          this.$emit("update:modelValue", this.internalValue.concat([option]));
        } else {
          this.$emit("update:modelValue", option);
        }
        this.$emit("select", option, this.id);
        if (this.clearOnSelect) this.search = "";
      }
      if (this.closeOnSelect) this.deactivate();
    },
    /**
     * Add the given group options to the list of selected options
     * If all group optiona are already selected -> remove it from the results.
     *
     * @param  {Object||String||Integer} group to select/deselect
     */
    selectGroup(selectedGroup) {
      const group = this.options.find((option) => {
        return option[this.groupLabel] === selectedGroup.$groupLabel;
      });
      if (!group) return;
      if (this.wholeGroupSelected(group)) {
        this.$emit("remove", group[this.groupValues], this.id);
        const groupValues = this.trackBy ? group[this.groupValues].map((val) => val[this.trackBy]) : group[this.groupValues];
        const newValue = this.internalValue.filter(
          (option) => groupValues.indexOf(this.trackBy ? option[this.trackBy] : option) === -1
        );
        this.$emit("update:modelValue", newValue);
      } else {
        const optionsToAdd = group[this.groupValues].filter(
          (option) => !(this.isOptionDisabled(option) || this.isSelected(option))
        );
        if (this.max) {
          optionsToAdd.splice(this.max - this.internalValue.length);
        }
        this.$emit("select", optionsToAdd, this.id);
        this.$emit(
          "update:modelValue",
          this.internalValue.concat(optionsToAdd)
        );
      }
      if (this.closeOnSelect) this.deactivate();
    },
    /**
     * Helper to identify if all values in a group are selected
     *
     * @param {Object} group to validated selected values against
     */
    wholeGroupSelected(group) {
      return group[this.groupValues].every(
        (option) => this.isSelected(option) || this.isOptionDisabled(option)
      );
    },
    /**
     * Helper to identify if all values in a group are disabled
     *
     * @param {Object} group to check for disabled values
     */
    wholeGroupDisabled(group) {
      return group[this.groupValues].every(this.isOptionDisabled);
    },
    /**
     * Removes the given option from the selected options.
     * Additionally checks this.allowEmpty prop if option can be removed when
     * it is the last selected option.
     *
     * @param  {type} option description
     * @return {type}        description
     */
    removeElement(option, shouldClose = true) {
      if (this.disabled) return;
      if (option.$isDisabled) return;
      if (!this.allowEmpty && this.internalValue.length <= 1) {
        this.deactivate();
        return;
      }
      const index2 = typeof option === "object" ? this.valueKeys.indexOf(option[this.trackBy]) : this.valueKeys.indexOf(option);
      if (this.multiple) {
        const newValue = this.internalValue.slice(0, index2).concat(this.internalValue.slice(index2 + 1));
        this.$emit("update:modelValue", newValue);
      } else {
        this.$emit("update:modelValue", null);
      }
      this.$emit("remove", option, this.id);
      if (this.closeOnSelect && shouldClose) this.deactivate();
    },
    /**
     * Calls this.removeElement() with the last element
     * from this.internalValue (selected element Array)
     *
     * @fires this#removeElement
     */
    removeLastElement() {
      if (this.blockKeys.indexOf("Delete") !== -1) return;
      if (this.search.length === 0 && Array.isArray(this.internalValue) && this.internalValue.length) {
        this.removeElement(this.internalValue[this.internalValue.length - 1], false);
      }
    },
    /**
     * Opens the multiselect’s dropdown.
     * Sets this.isOpen to TRUE
     */
    activate() {
      if (this.isOpen || this.disabled) return;
      this.adjustPosition();
      if (this.groupValues && this.pointer === 0 && this.filteredOptions.length) {
        this.pointer = 1;
      }
      this.isOpen = true;
      if (this.searchable) {
        if (!this.preserveSearch) this.search = "";
        if (!this.preventAutofocus) this.$nextTick(() => this.$refs.search && this.$refs.search.focus());
      } else if (!this.preventAutofocus) {
        if (typeof this.$el !== "undefined") this.$el.focus();
      }
      this.$emit("open", this.id);
    },
    /**
     * Closes the multiselect’s dropdown.
     * Sets this.isOpen to FALSE
     */
    deactivate() {
      if (!this.isOpen) return;
      this.isOpen = false;
      if (this.searchable) {
        if (this.$refs.search !== null && typeof this.$refs.search !== "undefined") this.$refs.search.blur();
      } else {
        if (typeof this.$el !== "undefined") this.$el.blur();
      }
      if (!this.preserveSearch) this.search = "";
      this.$emit("close", this.getValue(), this.id);
    },
    /**
     * Call this.activate() or this.deactivate()
     * depending on this.isOpen value.
     *
     * @fires this#activate || this#deactivate
     * @property {Boolean} isOpen indicates if dropdown is open
     */
    toggle() {
      this.isOpen ? this.deactivate() : this.activate();
    },
    /**
     * Updates the hasEnoughSpace variable used for
     * detecting where to expand the dropdown
     */
    adjustPosition() {
      if (typeof window === "undefined") return;
      const spaceAbove = this.$el.getBoundingClientRect().top;
      const spaceBelow = window.innerHeight - this.$el.getBoundingClientRect().bottom;
      const hasEnoughSpaceBelow = spaceBelow > this.maxHeight;
      if (hasEnoughSpaceBelow || spaceBelow > spaceAbove || this.openDirection === "below" || this.openDirection === "bottom") {
        this.preferredOpenDirection = "below";
        this.optimizedHeight = Math.min(spaceBelow - 40, this.maxHeight);
      } else {
        this.preferredOpenDirection = "above";
        this.optimizedHeight = Math.min(spaceAbove - 40, this.maxHeight);
      }
    },
    /**
     * Filters and sorts the options ready for selection
     * @param {Array} options
     * @param {String} search
     * @param {String} label
     * @param {Function} customLabel
     * @returns {Array}
     */
    filterOptions(options, search2, label, customLabel) {
      return search2 ? options.filter((option) => includes(customLabel(option, label), search2)).sort((a3, b2) => {
        if (typeof this.filteringSortFunc === "function") {
          return this.filteringSortFunc(a3, b2);
        }
        return customLabel(a3, label).length - customLabel(b2, label).length;
      }) : options;
    },
    /**
     *
     * @param {String} search
     * @param {String} label
     * @param {String} values
     * @param {String} groupLabel
     * @param {function} customLabel
     * @returns {function(*): *}
     */
    filterGroups(search2, label, values, groupLabel, customLabel) {
      return (groups) => groups.map((group) => {
        if (!group[values]) {
          console.warn("Options passed to vue-multiselect do not contain groups, despite the config.");
          return [];
        }
        const groupOptions = this.filterOptions(group[values], search2, label, customLabel);
        return groupOptions.length ? {
          [groupLabel]: group[groupLabel],
          [values]: groupOptions
        } : [];
      });
    }
  }
};
var pointerMixin = {
  data() {
    return {
      pointer: 0,
      pointerDirty: false
    };
  },
  props: {
    /**
     * Enable/disable highlighting of the pointed value.
     * @type {Boolean}
     * @default true
     */
    showPointer: {
      type: Boolean,
      default: true
    },
    optionHeight: {
      type: Number,
      default: 40
    }
  },
  computed: {
    pointerPosition() {
      return this.pointer * this.optionHeight;
    },
    visibleElements() {
      return this.optimizedHeight / this.optionHeight;
    }
  },
  watch: {
    filteredOptions() {
      this.pointerAdjust();
    },
    isOpen() {
      this.pointerDirty = false;
    },
    pointer() {
      this.$refs.search && this.$refs.search.setAttribute("aria-activedescendant", this.id + "-" + this.pointer.toString());
    }
  },
  methods: {
    optionHighlight(index2, option) {
      return {
        "multiselect__option--highlight": index2 === this.pointer && this.showPointer,
        "multiselect__option--selected": this.isSelected(option)
      };
    },
    groupHighlight(index2, selectedGroup) {
      if (!this.groupSelect) {
        return [
          "multiselect__option--disabled",
          { "multiselect__option--group": selectedGroup.$isLabel }
        ];
      }
      const group = this.options.find((option) => {
        return option[this.groupLabel] === selectedGroup.$groupLabel;
      });
      return group && !this.wholeGroupDisabled(group) ? [
        "multiselect__option--group",
        { "multiselect__option--highlight": index2 === this.pointer && this.showPointer },
        { "multiselect__option--group-selected": this.wholeGroupSelected(group) }
      ] : "multiselect__option--disabled";
    },
    addPointerElement({ key } = "Enter") {
      if (this.filteredOptions.length > 0) {
        this.select(this.filteredOptions[this.pointer], key);
      }
      this.pointerReset();
    },
    pointerForward() {
      if (this.pointer < this.filteredOptions.length - 1) {
        this.pointer++;
        if (this.$refs.list.scrollTop <= this.pointerPosition - (this.visibleElements - 1) * this.optionHeight) {
          this.$refs.list.scrollTop = this.pointerPosition - (this.visibleElements - 1) * this.optionHeight;
        }
        if (this.filteredOptions[this.pointer] && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect) this.pointerForward();
      }
      this.pointerDirty = true;
    },
    pointerBackward() {
      if (this.pointer > 0) {
        this.pointer--;
        if (this.$refs.list.scrollTop >= this.pointerPosition) {
          this.$refs.list.scrollTop = this.pointerPosition;
        }
        if (this.filteredOptions[this.pointer] && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect) this.pointerBackward();
      } else {
        if (this.filteredOptions[this.pointer] && this.filteredOptions[0].$isLabel && !this.groupSelect) this.pointerForward();
      }
      this.pointerDirty = true;
    },
    pointerReset() {
      if (!this.closeOnSelect) return;
      this.pointer = 0;
      if (this.$refs.list) {
        this.$refs.list.scrollTop = 0;
      }
    },
    pointerAdjust() {
      if (this.pointer >= this.filteredOptions.length - 1) {
        this.pointer = this.filteredOptions.length ? this.filteredOptions.length - 1 : 0;
      }
      if (this.filteredOptions.length > 0 && this.filteredOptions[this.pointer].$isLabel && !this.groupSelect) {
        this.pointerForward();
      }
    },
    pointerSet(index2) {
      this.pointer = index2;
      this.pointerDirty = true;
    }
  }
};
var script = {
  name: "vue-multiselect",
  mixins: [multiselectMixin, pointerMixin],
  compatConfig: {
    MODE: 3,
    ATTR_ENUMERATED_COERCION: false
  },
  props: {
    /**
       * name attribute to match optional label element
       * @default ''
       * @type {String}
       */
    name: {
      type: String,
      default: ""
    },
    /**
       * Presets the selected options value.
       * @type {Object||Array||String||Integer}
       */
    modelValue: {
      type: null,
      default() {
        return [];
      }
    },
    /**
       * String to show when pointing to an option
       * @default 'Press enter to select'
       * @type {String}
       */
    selectLabel: {
      type: String,
      default: "Press enter to select"
    },
    /**
       * String to show when pointing to an option
       * @default 'Press enter to select'
       * @type {String}
       */
    selectGroupLabel: {
      type: String,
      default: "Press enter to select group"
    },
    /**
       * String to show next to selected option
       * @default 'Selected'
       * @type {String}
       */
    selectedLabel: {
      type: String,
      default: "Selected"
    },
    /**
       * String to show when pointing to an already selected option
       * @default 'Press enter to remove'
       * @type {String}
       */
    deselectLabel: {
      type: String,
      default: "Press enter to remove"
    },
    /**
       * String to show when pointing to an already selected option
       * @default 'Press enter to remove'
       * @type {String}
       */
    deselectGroupLabel: {
      type: String,
      default: "Press enter to deselect group"
    },
    /**
       * Decide whether to show pointer labels
       * @default true
       * @type {Boolean}
       */
    showLabels: {
      type: Boolean,
      default: true
    },
    /**
       * Limit the display of selected options. The rest will be hidden within the limitText string.
       * @default 99999
       * @type {Integer}
       */
    limit: {
      type: Number,
      default: 99999
    },
    /**
       * Sets maxHeight style value of the dropdown
       * @default 300
       * @type {Integer}
       */
    maxHeight: {
      type: Number,
      default: 300
    },
    /**
       * Function that process the message shown when selected
       * elements pass the defined limit.
       * @default 'and * more'
       * @param {Int} count Number of elements more than limit
       * @type {Function}
       */
    limitText: {
      type: Function,
      default: (count) => `and ${count} more`
    },
    /**
       * Set true to trigger the loading spinner.
       * @default False
       * @type {Boolean}
       */
    loading: {
      type: Boolean,
      default: false
    },
    /**
       * Disables the multiselect if true.
       * @default false
       * @type {Boolean}
       */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Enables search input's spellcheck if true.
     * @default false
     * @type {Boolean}
     */
    spellcheck: {
      type: Boolean,
      default: false
    },
    /**
       * Fixed opening direction
       * @default ''
       * @type {String}
       */
    openDirection: {
      type: String,
      default: ""
    },
    /**
       * Shows slot with message about empty options
       * @default true
       * @type {Boolean}
       */
    showNoOptions: {
      type: Boolean,
      default: true
    },
    showNoResults: {
      type: Boolean,
      default: true
    },
    tabindex: {
      type: Number,
      default: 0
    },
    /**
     * Adds Required attribute to the input element when there is no value selected
     * @default false
     * @type {Boolean}
     */
    required: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    hasOptionGroup() {
      return this.groupValues && this.groupLabel && this.groupSelect;
    },
    isSingleLabelVisible() {
      return (this.singleValue || this.singleValue === 0) && (!this.isOpen || !this.searchable) && !this.visibleValues.length;
    },
    isPlaceholderVisible() {
      return !this.internalValue.length && (!this.searchable || !this.isOpen);
    },
    visibleValues() {
      return this.multiple ? this.internalValue.slice(0, this.limit) : [];
    },
    singleValue() {
      return this.internalValue[0];
    },
    deselectLabelText() {
      return this.showLabels ? this.deselectLabel : "";
    },
    deselectGroupLabelText() {
      return this.showLabels ? this.deselectGroupLabel : "";
    },
    selectLabelText() {
      return this.showLabels ? this.selectLabel : "";
    },
    selectGroupLabelText() {
      return this.showLabels ? this.selectGroupLabel : "";
    },
    selectedLabelText() {
      return this.showLabels ? this.selectedLabel : "";
    },
    inputStyle() {
      if (this.searchable || this.multiple && this.modelValue && this.modelValue.length) {
        return this.isOpen ? { width: "100%" } : { width: "0", position: "absolute", padding: "0" };
      }
      return "";
    },
    contentStyle() {
      return this.options.length ? { display: "inline-block" } : { display: "block" };
    },
    isAbove() {
      if (this.openDirection === "above" || this.openDirection === "top") {
        return true;
      } else if (this.openDirection === "below" || this.openDirection === "bottom") {
        return false;
      } else {
        return this.preferredOpenDirection === "above";
      }
    },
    showSearchInput() {
      return this.searchable && (this.hasSingleSelectedSlot && (this.visibleSingleValue || this.visibleSingleValue === 0) ? this.isOpen : true);
    },
    isRequired() {
      if (this.required === false) {
        return false;
      }
      return this.internalValue.length <= 0;
    }
  }
};
const _hoisted_1$g = ["tabindex", "aria-expanded", "aria-owns", "aria-activedescendant"];
const _hoisted_2$f = {
  ref: "tags",
  class: "multiselect__tags"
};
const _hoisted_3$b = { class: "multiselect__tags-wrap" };
const _hoisted_4$7 = ["textContent"];
const _hoisted_5$6 = ["onKeypress", "onMousedown"];
const _hoisted_6$6 = ["textContent"];
const _hoisted_7$3 = { class: "multiselect__spinner" };
const _hoisted_8$2 = ["name", "id", "spellcheck", "placeholder", "required", "value", "disabled", "tabindex", "aria-label", "aria-controls"];
const _hoisted_9$2 = ["id", "aria-multiselectable"];
const _hoisted_10 = { key: 0 };
const _hoisted_11 = { class: "multiselect__option" };
const _hoisted_12 = ["aria-selected", "id", "role"];
const _hoisted_13 = ["onClick", "onMouseenter", "data-select", "data-selected", "data-deselect"];
const _hoisted_14 = ["data-select", "data-deselect", "onMouseenter", "onMousedown"];
const _hoisted_15 = { class: "multiselect__option" };
const _hoisted_16 = { class: "multiselect__option" };
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    tabindex: _ctx.searchable ? -1 : $props.tabindex,
    class: normalizeClass([{ "multiselect--active": _ctx.isOpen, "multiselect--disabled": $props.disabled, "multiselect--above": $options.isAbove, "multiselect--has-options-group": $options.hasOptionGroup }, "multiselect"]),
    onFocus: _cache[14] || (_cache[14] = ($event) => _ctx.activate()),
    onBlur: _cache[15] || (_cache[15] = ($event) => _ctx.searchable ? false : _ctx.deactivate()),
    onKeydown: [
      _cache[16] || (_cache[16] = withKeys(withModifiers(($event) => _ctx.pointerForward(), ["self", "prevent"]), ["down"])),
      _cache[17] || (_cache[17] = withKeys(withModifiers(($event) => _ctx.pointerBackward(), ["self", "prevent"]), ["up"]))
    ],
    onKeypress: _cache[18] || (_cache[18] = withKeys(withModifiers(($event) => _ctx.addPointerElement($event), ["stop", "self"]), ["enter", "tab"])),
    onKeyup: _cache[19] || (_cache[19] = withKeys(($event) => _ctx.deactivate(), ["esc"])),
    role: "combobox",
    "aria-expanded": _ctx.isOpen,
    "aria-owns": "listbox-" + _ctx.id,
    "aria-activedescendant": _ctx.isOpen && _ctx.pointer !== null ? _ctx.id + "-" + _ctx.pointer : null
  }, [
    renderSlot(_ctx.$slots, "caret", { toggle: _ctx.toggle }, () => [
      createElementVNode(
        "div",
        {
          onMousedown: _cache[0] || (_cache[0] = withModifiers(($event) => _ctx.toggle(), ["prevent", "stop"])),
          class: "multiselect__select"
        },
        null,
        32
        /* NEED_HYDRATION */
      )
    ]),
    renderSlot(_ctx.$slots, "clear", { search: _ctx.search }),
    createElementVNode(
      "div",
      _hoisted_2$f,
      [
        renderSlot(_ctx.$slots, "selection", {
          search: _ctx.search,
          remove: _ctx.removeElement,
          values: $options.visibleValues,
          isOpen: _ctx.isOpen
        }, () => [
          withDirectives(createElementVNode(
            "div",
            _hoisted_3$b,
            [
              (openBlock(true), createElementBlock(
                Fragment,
                null,
                renderList($options.visibleValues, (option, index2) => {
                  return renderSlot(_ctx.$slots, "tag", {
                    option,
                    search: _ctx.search,
                    remove: _ctx.removeElement
                  }, () => [
                    (openBlock(), createElementBlock(
                      "span",
                      {
                        class: "multiselect__tag",
                        key: index2,
                        onMousedown: _cache[1] || (_cache[1] = withModifiers(() => {
                        }, ["prevent"]))
                      },
                      [
                        createElementVNode("span", {
                          textContent: toDisplayString(_ctx.getOptionLabel(option))
                        }, null, 8, _hoisted_4$7),
                        createElementVNode("i", {
                          tabindex: "1",
                          onKeypress: withKeys(withModifiers(($event) => _ctx.removeElement(option), ["prevent"]), ["enter"]),
                          onMousedown: withModifiers(($event) => _ctx.removeElement(option), ["prevent"]),
                          class: "multiselect__tag-icon"
                        }, null, 40, _hoisted_5$6)
                      ],
                      32
                      /* NEED_HYDRATION */
                    ))
                  ]);
                }),
                256
                /* UNKEYED_FRAGMENT */
              ))
            ],
            512
            /* NEED_PATCH */
          ), [
            [vShow, $options.visibleValues.length > 0]
          ]),
          _ctx.internalValue && _ctx.internalValue.length > $props.limit ? renderSlot(_ctx.$slots, "limit", { key: 0 }, () => [
            createElementVNode("strong", {
              class: "multiselect__strong",
              textContent: toDisplayString($props.limitText(_ctx.internalValue.length - $props.limit))
            }, null, 8, _hoisted_6$6)
          ]) : createCommentVNode("v-if", true)
        ]),
        createVNode(Transition, { name: "multiselect__loading" }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "loading", {}, () => [
              withDirectives(createElementVNode(
                "div",
                _hoisted_7$3,
                null,
                512
                /* NEED_PATCH */
              ), [
                [vShow, $props.loading]
              ])
            ])
          ]),
          _: 3
          /* FORWARDED */
        }),
        _ctx.searchable ? (openBlock(), createElementBlock("input", {
          key: 0,
          ref: "search",
          name: $props.name,
          id: _ctx.id,
          type: "text",
          autocomplete: "off",
          spellcheck: $props.spellcheck,
          placeholder: _ctx.placeholder,
          required: $options.isRequired,
          style: normalizeStyle($options.inputStyle),
          value: _ctx.search,
          disabled: $props.disabled,
          tabindex: $props.tabindex,
          "aria-label": $props.name + "-searchbox",
          onInput: _cache[2] || (_cache[2] = ($event) => _ctx.updateSearch($event.target.value)),
          onFocus: _cache[3] || (_cache[3] = withModifiers(($event) => _ctx.activate(), ["prevent"])),
          onBlur: _cache[4] || (_cache[4] = withModifiers(($event) => _ctx.deactivate(), ["prevent"])),
          onKeyup: _cache[5] || (_cache[5] = withKeys(($event) => _ctx.deactivate(), ["esc"])),
          onKeydown: [
            _cache[6] || (_cache[6] = withKeys(withModifiers(($event) => _ctx.pointerForward(), ["prevent"]), ["down"])),
            _cache[7] || (_cache[7] = withKeys(withModifiers(($event) => _ctx.pointerBackward(), ["prevent"]), ["up"])),
            _cache[9] || (_cache[9] = withKeys(withModifiers(($event) => _ctx.removeLastElement(), ["stop"]), ["delete"]))
          ],
          onKeypress: _cache[8] || (_cache[8] = withKeys(withModifiers(($event) => _ctx.addPointerElement($event), ["prevent", "stop", "self"]), ["enter"])),
          class: "multiselect__input",
          "aria-controls": "listbox-" + _ctx.id
        }, null, 44, _hoisted_8$2)) : createCommentVNode("v-if", true),
        $options.isSingleLabelVisible ? (openBlock(), createElementBlock(
          "span",
          {
            key: 1,
            class: "multiselect__single",
            onMousedown: _cache[10] || (_cache[10] = withModifiers((...args) => _ctx.toggle && _ctx.toggle(...args), ["prevent"]))
          },
          [
            renderSlot(_ctx.$slots, "singleLabel", { option: $options.singleValue }, () => [
              createTextVNode(
                toDisplayString(_ctx.currentOptionLabel),
                1
                /* TEXT */
              )
            ])
          ],
          32
          /* NEED_HYDRATION */
        )) : createCommentVNode("v-if", true),
        $options.isPlaceholderVisible ? (openBlock(), createElementBlock(
          "span",
          {
            key: 2,
            class: "multiselect__placeholder",
            onMousedown: _cache[11] || (_cache[11] = withModifiers((...args) => _ctx.toggle && _ctx.toggle(...args), ["prevent"]))
          },
          [
            renderSlot(_ctx.$slots, "placeholder", {}, () => [
              createTextVNode(
                toDisplayString(_ctx.placeholder),
                1
                /* TEXT */
              )
            ])
          ],
          32
          /* NEED_HYDRATION */
        )) : createCommentVNode("v-if", true)
      ],
      512
      /* NEED_PATCH */
    ),
    createVNode(Transition, {
      name: "multiselect",
      persisted: ""
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode(
          "div",
          {
            class: "multiselect__content-wrapper",
            onFocus: _cache[12] || (_cache[12] = (...args) => _ctx.activate && _ctx.activate(...args)),
            tabindex: "-1",
            onMousedown: _cache[13] || (_cache[13] = withModifiers(() => {
            }, ["prevent"])),
            style: normalizeStyle({ maxHeight: _ctx.optimizedHeight + "px" }),
            ref: "list"
          },
          [
            createElementVNode("ul", {
              class: "multiselect__content",
              style: normalizeStyle($options.contentStyle),
              role: "listbox",
              id: "listbox-" + _ctx.id,
              "aria-multiselectable": _ctx.multiple
            }, [
              renderSlot(_ctx.$slots, "beforeList"),
              _ctx.multiple && _ctx.max === _ctx.internalValue.length ? (openBlock(), createElementBlock("li", _hoisted_10, [
                createElementVNode("span", _hoisted_11, [
                  renderSlot(_ctx.$slots, "maxElements", {}, () => [
                    createTextVNode(
                      "Maximum of " + toDisplayString(_ctx.max) + " options selected. First remove a selected option to select another.",
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])) : createCommentVNode("v-if", true),
              !_ctx.max || _ctx.internalValue.length < _ctx.max ? (openBlock(true), createElementBlock(
                Fragment,
                { key: 1 },
                renderList(_ctx.filteredOptions, (option, index2) => {
                  return openBlock(), createElementBlock("li", {
                    class: "multiselect__element",
                    key: index2,
                    "aria-selected": _ctx.isSelected(option),
                    id: _ctx.id + "-" + index2,
                    role: !(option && (option.$isLabel || option.$isDisabled)) ? "option" : null
                  }, [
                    !(option && (option.$isLabel || option.$isDisabled)) ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      class: normalizeClass([_ctx.optionHighlight(index2, option), "multiselect__option"]),
                      onClick: withModifiers(($event) => _ctx.select(option), ["stop"]),
                      onMouseenter: withModifiers(($event) => _ctx.pointerSet(index2), ["self"]),
                      "data-select": option && option.isTag ? _ctx.tagPlaceholder : $options.selectLabelText,
                      "data-selected": $options.selectedLabelText,
                      "data-deselect": $options.deselectLabelText
                    }, [
                      renderSlot(_ctx.$slots, "option", {
                        option,
                        search: _ctx.search,
                        index: index2
                      }, () => [
                        createElementVNode(
                          "span",
                          null,
                          toDisplayString(_ctx.getOptionLabel(option)),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 42, _hoisted_13)) : createCommentVNode("v-if", true),
                    option && (option.$isLabel || option.$isDisabled) ? (openBlock(), createElementBlock("span", {
                      key: 1,
                      "data-select": _ctx.groupSelect && $options.selectGroupLabelText,
                      "data-deselect": _ctx.groupSelect && $options.deselectGroupLabelText,
                      class: normalizeClass([_ctx.groupHighlight(index2, option), "multiselect__option"]),
                      onMouseenter: withModifiers(($event) => _ctx.groupSelect && _ctx.pointerSet(index2), ["self"]),
                      onMousedown: withModifiers(($event) => _ctx.selectGroup(option), ["prevent"])
                    }, [
                      renderSlot(_ctx.$slots, "option", {
                        option,
                        search: _ctx.search,
                        index: index2
                      }, () => [
                        createElementVNode(
                          "span",
                          null,
                          toDisplayString(_ctx.getOptionLabel(option)),
                          1
                          /* TEXT */
                        )
                      ])
                    ], 42, _hoisted_14)) : createCommentVNode("v-if", true)
                  ], 8, _hoisted_12);
                }),
                128
                /* KEYED_FRAGMENT */
              )) : createCommentVNode("v-if", true),
              withDirectives(createElementVNode(
                "li",
                null,
                [
                  createElementVNode("span", _hoisted_15, [
                    renderSlot(_ctx.$slots, "noResult", { search: _ctx.search }, () => [
                      _cache[20] || (_cache[20] = createTextVNode("No elements found. Consider changing the search query."))
                    ])
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vShow, $props.showNoResults && (_ctx.filteredOptions.length === 0 && _ctx.search && !$props.loading)]
              ]),
              withDirectives(createElementVNode(
                "li",
                null,
                [
                  createElementVNode("span", _hoisted_16, [
                    renderSlot(_ctx.$slots, "noOptions", {}, () => [
                      _cache[21] || (_cache[21] = createTextVNode("List is empty."))
                    ])
                  ])
                ],
                512
                /* NEED_PATCH */
              ), [
                [vShow, $props.showNoOptions && ((_ctx.options.length === 0 || $options.hasOptionGroup === true && _ctx.filteredOptions.length === 0) && !_ctx.search && !$props.loading)]
              ]),
              renderSlot(_ctx.$slots, "afterList")
            ], 12, _hoisted_9$2)
          ],
          36
          /* STYLE, NEED_HYDRATION */
        ), [
          [vShow, _ctx.isOpen]
        ])
      ]),
      _: 3
      /* FORWARDED */
    })
  ], 42, _hoisted_1$g);
}
script.render = render;
const FormElementMixin = {
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
      }
    },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    focus: { type: Boolean, default: false }
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    },
    getId() {
      return "id-" + this.name;
    },
    hasError() {
      return this.errors && Object.prototype.hasOwnProperty.call(this.errors, this.name);
    },
    error() {
      if (this.hasError) return this.errors[this.name];
      return null;
    }
  },
  methods: {
    setFocus() {
      if (this.focus === true) {
        this.$nextTick(() => {
          this.$refs[`input-${this.name}`].focus();
        });
      }
    }
  }
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$h = {
  name: "FormAsyncSelect",
  components: { Multiselect: script },
  mixins: [FormElementMixin],
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
    searchValue: { type: String, default: "" }
  },
  emits: ["update:selected-option"],
  mounted() {
    if (this.isSearchable && this.searchValue) {
      this.$refs[this.name].search = this.searchValue;
    }
  },
  methods: {
    customLabel(o) {
      return o.hasOwnProperty(this.labelSelectAttr) ? o[this.labelSelectAttr] : this.placeholder;
    },
    updateValue(e2) {
      this.$refs[this.name].search = e2[this.labelSelectAttr];
      this.$emit("update:selected-option", e2);
    }
  }
};
const _hoisted_1$f = { slot: "noOptions" };
const _hoisted_2$e = { slot: "noResult" };
const _hoisted_3$a = ["data-cy"];
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_multiselect = resolveComponent("multiselect");
  return openBlock(), createElementBlock("div", null, [
    createVNode(_component_multiselect, {
      ref: _ctx.name,
      value: $props.selectedOption,
      options: $props.selectOptions,
      placeholder: _ctx.placeholder,
      label: $props.labelSelectAttr,
      class: normalizeClass({ "is-invalid": _ctx.hasError }),
      "track-by": $props.labelSelectAttr,
      "data-cy": _ctx.name + "-select",
      loading: $props.isLoading,
      disabled: _ctx.disabled,
      "show-labels": false,
      "allow-empty": false,
      searchable: $props.isSearchable,
      "internal-search": false,
      "clear-on-select": false,
      "show-no-results": true,
      "hide-selected": false,
      "custom-label": $options.customLabel,
      "preserve-search": true,
      onChange: $options.updateValue,
      onInput: $options.updateValue,
      onSearchChange: $props.onSearchChange
    }, {
      default: withCtx(() => [
        createElementVNode("small", _hoisted_1$f, toDisplayString($props.noOptionsText), 1),
        createElementVNode("span", _hoisted_2$e, toDisplayString($props.noResultText), 1)
      ]),
      _: 1
    }, 8, ["value", "options", "placeholder", "label", "class", "track-by", "data-cy", "loading", "disabled", "searchable", "custom-label", "onChange", "onInput", "onSearchChange"]),
    _ctx.help && !_ctx.error ? (openBlock(), createElementBlock("small", {
      key: 0,
      class: normalizeClass(_ctx.helperClass)
    }, toDisplayString(_ctx.help), 3)) : createCommentVNode("", true),
    _ctx.error ? (openBlock(), createElementBlock("div", {
      key: 1,
      class: "invalid-feedback",
      "data-cy": _ctx.name + "-error"
    }, toDisplayString(_ctx.error), 9, _hoisted_3$a)) : createCommentVNode("", true)
  ]);
}
const FormAsyncSelect = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$9], ["__scopeId", "data-v-86f788cf"]]);
const commonProps = {
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
    }
  },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  focus: { type: Boolean, default: false }
};
function useFormCommon(eltName, formErrors) {
  const getId = computed(() => "id-" + eltName.value);
  const inputRefName = computed(() => `input-${eltName.value}`);
  const hasError = computed(() => formErrors.value && eltName.value in formErrors.value);
  const error = computed(
    () => hasError.value ? formErrors.value[eltName.value] : null
  );
  return { hasError, error, getId, inputRefName };
}
const _hoisted_1$e = ["id", "checked", "disabled", "data-cy"];
const _hoisted_2$d = ["for"];
const _sfc_main$g = /* @__PURE__ */ Object.assign({ name: "FormCheckbox" }, {
  __name: "FormCheckbox",
  props: {
    ...commonProps,
    modelValue: { type: Boolean },
    inline: { type: Boolean, default: false },
    switch: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const props = __props;
    const { getId, inputRefName } = useFormCommon(
      toRef(props, "name"),
      toRef(props, "errors")
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["custom-control custom-checkbox", {
          "custom-control-inline": props.inline,
          "custom-switch": props.switch,
          "custom-checkbox": !props.switch
        }])
      }, [
        createElementVNode("input", {
          ref: unref(inputRefName),
          id: unref(getId),
          type: "checkbox",
          class: normalizeClass([["custom-control-input", { "mouse-pointer": !_ctx.disabled }], "form-control-lg"]),
          checked: __props.modelValue,
          disabled: _ctx.disabled,
          "data-cy": _ctx.name + "-checkbox",
          onChange: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("update:modelValue", $event.target.checked))
        }, null, 42, _hoisted_1$e),
        createElementVNode("label", {
          class: "custom-control-label",
          for: unref(getId)
        }, toDisplayString(_ctx.label), 9, _hoisted_2$d)
      ], 2);
    };
  }
});
function buildFormatLongFn(args) {
  return function() {
    var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format2 = args.formats[width] || args.formats[args.defaultWidth];
    return format2;
  };
}
function buildLocalizeFn(args) {
  return function(dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : "standalone";
    var valuesArray;
    if (context === "formatting" && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index2 = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    return valuesArray[index2];
  };
}
function buildMatchFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    }) : findKey$1(parsePatterns, function(pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function findKey$1(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return void 0;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return void 0;
}
function buildMatchPatternFn(args) {
  return function(string) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value,
      rest
    };
  };
}
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }
  var number = Number(dirtyNumber);
  if (isNaN(number)) {
    return number;
  }
  return number < 0 ? Math.ceil(number) : Math.floor(number);
}
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
  }
}
function toDate(argument) {
  requiredArgs(1, arguments);
  var argStr = Object.prototype.toString.call(argument);
  if (argument instanceof Date || _typeof(argument) === "object" && argStr === "[object Date]") {
    return new Date(argument.getTime());
  } else if (typeof argument === "number" || argStr === "[object Number]") {
    return new Date(argument);
  } else {
    if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      console.warn(new Error().stack);
    }
    return /* @__PURE__ */ new Date(NaN);
  }
}
function addDays(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  date.setDate(date.getDate() + amount);
  return date;
}
function addMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var amount = toInteger(dirtyAmount);
  if (isNaN(amount)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (!amount) {
    return date;
  }
  var dayOfMonth = date.getDate();
  var endOfDesiredMonth = new Date(date.getTime());
  endOfDesiredMonth.setMonth(date.getMonth() + amount + 1, 0);
  var daysInMonth = endOfDesiredMonth.getDate();
  if (dayOfMonth >= daysInMonth) {
    return endOfDesiredMonth;
  } else {
    date.setFullYear(endOfDesiredMonth.getFullYear(), endOfDesiredMonth.getMonth(), dayOfMonth);
    return date;
  }
}
function addMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var timestamp = toDate(dirtyDate).getTime();
  var amount = toInteger(dirtyAmount);
  return new Date(timestamp + amount);
}
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}
function startOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
function addYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}
function max(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray;
  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === "function") {
    datesArray = dirtyDatesArray;
  } else if (_typeof(dirtyDatesArray) === "object" && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
  var result;
  datesArray.forEach(function(dirtyDate) {
    var currentDate = toDate(dirtyDate);
    if (result === void 0 || result < currentDate || isNaN(Number(currentDate))) {
      result = currentDate;
    }
  });
  return result || /* @__PURE__ */ new Date(NaN);
}
function min(dirtyDatesArray) {
  requiredArgs(1, arguments);
  var datesArray;
  if (dirtyDatesArray && typeof dirtyDatesArray.forEach === "function") {
    datesArray = dirtyDatesArray;
  } else if (_typeof(dirtyDatesArray) === "object" && dirtyDatesArray !== null) {
    datesArray = Array.prototype.slice.call(dirtyDatesArray);
  } else {
    return /* @__PURE__ */ new Date(NaN);
  }
  var result;
  datesArray.forEach(function(dirtyDate) {
    var currentDate = toDate(dirtyDate);
    if (result === void 0 || result > currentDate || isNaN(currentDate.getDate())) {
      result = currentDate;
    }
  });
  return result || /* @__PURE__ */ new Date(NaN);
}
var millisecondsInMinute = 6e4;
var millisecondsInHour = 36e5;
var millisecondsInSecond = 1e3;
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}
function isDate$1(value) {
  requiredArgs(1, arguments);
  return value instanceof Date || _typeof(value) === "object" && Object.prototype.toString.call(value) === "[object Date]";
}
function isValid(dirtyDate) {
  requiredArgs(1, arguments);
  if (!isDate$1(dirtyDate) && typeof dirtyDate !== "number") {
    return false;
  }
  var date = toDate(dirtyDate);
  return !isNaN(Number(date));
}
function endOfDay(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}
function endOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
function eachDayOfInterval(dirtyInterval, options) {
  var _options$step;
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  var step = Number((_options$step = void 0) !== null && _options$step !== void 0 ? _options$step : 1);
  if (step < 1 || isNaN(step)) throw new RangeError("`options.step` must be a number greater than 1");
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
    currentDate.setHours(0, 0, 0, 0);
  }
  return dates;
}
function startOfMinute(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setSeconds(0, 0);
  return date;
}
function eachMonthOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  var dates = [];
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setDate(1);
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setMonth(currentDate.getMonth() + 1);
  }
  return dates;
}
function startOfMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function endOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
function startOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var cleanDate = toDate(dirtyDate);
  var date = /* @__PURE__ */ new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function eachYearOfInterval(dirtyInterval) {
  requiredArgs(1, arguments);
  var interval = dirtyInterval || {};
  var startDate = toDate(interval.start);
  var endDate = toDate(interval.end);
  var endTime = endDate.getTime();
  if (!(startDate.getTime() <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  currentDate.setMonth(0, 1);
  while (currentDate.getTime() <= endTime) {
    dates.push(toDate(currentDate));
    currentDate.setFullYear(currentDate.getFullYear() + 1);
  }
  return dates;
}
function endOfDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = 9 + Math.floor(year / 10) * 10;
  date.setFullYear(decade, 11, 31);
  date.setHours(23, 59, 59, 999);
  return date;
}
function endOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}
function subMilliseconds(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
var MILLISECONDS_IN_DAY = 864e5;
function getUTCDayOfYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
}
function startOfUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var fourthOfJanuaryOfNextYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = /* @__PURE__ */ new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCISOWeekYear(dirtyDate) {
  requiredArgs(1, arguments);
  var year = getUTCISOWeekYear(dirtyDate);
  var fourthOfJanuary = /* @__PURE__ */ new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary);
  return date;
}
var MILLISECONDS_IN_WEEK$1 = 6048e5;
function getUTCISOWeek(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
}
function startOfUTCWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date;
}
function getUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getUTCFullYear();
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var firstWeekOfNextYear = /* @__PURE__ */ new Date(0);
  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, options);
  var firstWeekOfThisYear = /* @__PURE__ */ new Date(0);
  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, options);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
function startOfUTCWeekYear(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$firstWeekCon, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(1, arguments);
  var defaultOptions2 = getDefaultOptions();
  var firstWeekContainsDate = toInteger((_ref = (_ref2 = (_ref3 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref !== void 0 ? _ref : 1);
  var year = getUTCWeekYear(dirtyDate, options);
  var firstWeek = /* @__PURE__ */ new Date(0);
  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
  firstWeek.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCWeek(firstWeek, options);
  return date;
}
var MILLISECONDS_IN_WEEK = 6048e5;
function getUTCWeek(dirtyDate, options) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
function addLeadingZeros(number, targetLength) {
  var sign = number < 0 ? "-" : "";
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return sign + output;
}
var formatters$1 = {
  // Year
  y: function y(date, token) {
    var signedYear = date.getUTCFullYear();
    var year = signedYear > 0 ? signedYear : 1 - signedYear;
    return addLeadingZeros(token === "yy" ? year % 100 : year, token.length);
  },
  // Month
  M: function M(date, token) {
    var month = date.getUTCMonth();
    return token === "M" ? String(month + 1) : addLeadingZeros(month + 1, 2);
  },
  // Day of the month
  d: function d(date, token) {
    return addLeadingZeros(date.getUTCDate(), token.length);
  },
  // AM or PM
  a: function a(date, token) {
    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return dayPeriodEnumValue.toUpperCase();
      case "aaa":
        return dayPeriodEnumValue;
      case "aaaaa":
        return dayPeriodEnumValue[0];
      case "aaaa":
      default:
        return dayPeriodEnumValue === "am" ? "a.m." : "p.m.";
    }
  },
  // Hour [1-12]
  h: function h(date, token) {
    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
  },
  // Hour [0-23]
  H: function H(date, token) {
    return addLeadingZeros(date.getUTCHours(), token.length);
  },
  // Minute
  m: function m(date, token) {
    return addLeadingZeros(date.getUTCMinutes(), token.length);
  },
  // Second
  s: function s(date, token) {
    return addLeadingZeros(date.getUTCSeconds(), token.length);
  },
  // Fraction of second
  S: function S(date, token) {
    var numberOfDigits = token.length;
    var milliseconds = date.getUTCMilliseconds();
    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
    return addLeadingZeros(fractionalSeconds, token.length);
  }
};
var dayPeriodEnum = {
  midnight: "midnight",
  noon: "noon",
  morning: "morning",
  afternoon: "afternoon",
  evening: "evening",
  night: "night"
};
var formatters = {
  // Era
  G: function G(date, token, localize2) {
    var era = date.getUTCFullYear() > 0 ? 1 : 0;
    switch (token) {
      // AD, BC
      case "G":
      case "GG":
      case "GGG":
        return localize2.era(era, {
          width: "abbreviated"
        });
      // A, B
      case "GGGGG":
        return localize2.era(era, {
          width: "narrow"
        });
      // Anno Domini, Before Christ
      case "GGGG":
      default:
        return localize2.era(era, {
          width: "wide"
        });
    }
  },
  // Year
  y: function y2(date, token, localize2) {
    if (token === "yo") {
      var signedYear = date.getUTCFullYear();
      var year = signedYear > 0 ? signedYear : 1 - signedYear;
      return localize2.ordinalNumber(year, {
        unit: "year"
      });
    }
    return formatters$1.y(date, token);
  },
  // Local week-numbering year
  Y: function Y(date, token, localize2, options) {
    var signedWeekYear = getUTCWeekYear(date, options);
    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear;
    if (token === "YY") {
      var twoDigitYear = weekYear % 100;
      return addLeadingZeros(twoDigitYear, 2);
    }
    if (token === "Yo") {
      return localize2.ordinalNumber(weekYear, {
        unit: "year"
      });
    }
    return addLeadingZeros(weekYear, token.length);
  },
  // ISO week-numbering year
  R: function R(date, token) {
    var isoWeekYear = getUTCISOWeekYear(date);
    return addLeadingZeros(isoWeekYear, token.length);
  },
  // Extended year. This is a single number designating the year of this calendar system.
  // The main difference between `y` and `u` localizers are B.C. years:
  // | Year | `y` | `u` |
  // |------|-----|-----|
  // | AC 1 |   1 |   1 |
  // | BC 1 |   1 |   0 |
  // | BC 2 |   2 |  -1 |
  // Also `yy` always returns the last two digits of a year,
  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
  u: function u(date, token) {
    var year = date.getUTCFullYear();
    return addLeadingZeros(year, token.length);
  },
  // Quarter
  Q: function Q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "Q":
        return String(quarter);
      // 01, 02, 03, 04
      case "QQ":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "Qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      // Q1, Q2, Q3, Q4
      case "QQQ":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "formatting"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "QQQQQ":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "formatting"
        });
      // 1st quarter, 2nd quarter, ...
      case "QQQQ":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone quarter
  q: function q(date, token, localize2) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    switch (token) {
      // 1, 2, 3, 4
      case "q":
        return String(quarter);
      // 01, 02, 03, 04
      case "qq":
        return addLeadingZeros(quarter, 2);
      // 1st, 2nd, 3rd, 4th
      case "qo":
        return localize2.ordinalNumber(quarter, {
          unit: "quarter"
        });
      // Q1, Q2, Q3, Q4
      case "qqq":
        return localize2.quarter(quarter, {
          width: "abbreviated",
          context: "standalone"
        });
      // 1, 2, 3, 4 (narrow quarter; could be not numerical)
      case "qqqqq":
        return localize2.quarter(quarter, {
          width: "narrow",
          context: "standalone"
        });
      // 1st quarter, 2nd quarter, ...
      case "qqqq":
      default:
        return localize2.quarter(quarter, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Month
  M: function M2(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      case "M":
      case "MM":
        return formatters$1.M(date, token);
      // 1st, 2nd, ..., 12th
      case "Mo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      // Jan, Feb, ..., Dec
      case "MMM":
        return localize2.month(month, {
          width: "abbreviated",
          context: "formatting"
        });
      // J, F, ..., D
      case "MMMMM":
        return localize2.month(month, {
          width: "narrow",
          context: "formatting"
        });
      // January, February, ..., December
      case "MMMM":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone month
  L: function L(date, token, localize2) {
    var month = date.getUTCMonth();
    switch (token) {
      // 1, 2, ..., 12
      case "L":
        return String(month + 1);
      // 01, 02, ..., 12
      case "LL":
        return addLeadingZeros(month + 1, 2);
      // 1st, 2nd, ..., 12th
      case "Lo":
        return localize2.ordinalNumber(month + 1, {
          unit: "month"
        });
      // Jan, Feb, ..., Dec
      case "LLL":
        return localize2.month(month, {
          width: "abbreviated",
          context: "standalone"
        });
      // J, F, ..., D
      case "LLLLL":
        return localize2.month(month, {
          width: "narrow",
          context: "standalone"
        });
      // January, February, ..., December
      case "LLLL":
      default:
        return localize2.month(month, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // Local week of year
  w: function w(date, token, localize2, options) {
    var week = getUTCWeek(date, options);
    if (token === "wo") {
      return localize2.ordinalNumber(week, {
        unit: "week"
      });
    }
    return addLeadingZeros(week, token.length);
  },
  // ISO week of year
  I: function I(date, token, localize2) {
    var isoWeek = getUTCISOWeek(date);
    if (token === "Io") {
      return localize2.ordinalNumber(isoWeek, {
        unit: "week"
      });
    }
    return addLeadingZeros(isoWeek, token.length);
  },
  // Day of the month
  d: function d2(date, token, localize2) {
    if (token === "do") {
      return localize2.ordinalNumber(date.getUTCDate(), {
        unit: "date"
      });
    }
    return formatters$1.d(date, token);
  },
  // Day of year
  D: function D(date, token, localize2) {
    var dayOfYear = getUTCDayOfYear(date);
    if (token === "Do") {
      return localize2.ordinalNumber(dayOfYear, {
        unit: "dayOfYear"
      });
    }
    return addLeadingZeros(dayOfYear, token.length);
  },
  // Day of week
  E: function E(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    switch (token) {
      // Tue
      case "E":
      case "EE":
      case "EEE":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "EEEEE":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "EEEEEE":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "EEEE":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Local day of week
  e: function e(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (Nth day of week with current locale or weekStartsOn)
      case "e":
        return String(localDayOfWeek);
      // Padded numerical value
      case "ee":
        return addLeadingZeros(localDayOfWeek, 2);
      // 1st, 2nd, ..., 7th
      case "eo":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "eee":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "eeeee":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "eeeeee":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "eeee":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Stand-alone local day of week
  c: function c(date, token, localize2, options) {
    var dayOfWeek = date.getUTCDay();
    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;
    switch (token) {
      // Numerical value (same as in `e`)
      case "c":
        return String(localDayOfWeek);
      // Padded numerical value
      case "cc":
        return addLeadingZeros(localDayOfWeek, token.length);
      // 1st, 2nd, ..., 7th
      case "co":
        return localize2.ordinalNumber(localDayOfWeek, {
          unit: "day"
        });
      case "ccc":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "standalone"
        });
      // T
      case "ccccc":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "standalone"
        });
      // Tu
      case "cccccc":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "standalone"
        });
      // Tuesday
      case "cccc":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "standalone"
        });
    }
  },
  // ISO day of week
  i: function i(date, token, localize2) {
    var dayOfWeek = date.getUTCDay();
    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;
    switch (token) {
      // 2
      case "i":
        return String(isoDayOfWeek);
      // 02
      case "ii":
        return addLeadingZeros(isoDayOfWeek, token.length);
      // 2nd
      case "io":
        return localize2.ordinalNumber(isoDayOfWeek, {
          unit: "day"
        });
      // Tue
      case "iii":
        return localize2.day(dayOfWeek, {
          width: "abbreviated",
          context: "formatting"
        });
      // T
      case "iiiii":
        return localize2.day(dayOfWeek, {
          width: "narrow",
          context: "formatting"
        });
      // Tu
      case "iiiiii":
        return localize2.day(dayOfWeek, {
          width: "short",
          context: "formatting"
        });
      // Tuesday
      case "iiii":
      default:
        return localize2.day(dayOfWeek, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM or PM
  a: function a2(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    switch (token) {
      case "a":
      case "aa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "aaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "aaaaa":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "aaaa":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // AM, PM, midnight, noon
  b: function b(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours === 12) {
      dayPeriodEnumValue = dayPeriodEnum.noon;
    } else if (hours === 0) {
      dayPeriodEnumValue = dayPeriodEnum.midnight;
    } else {
      dayPeriodEnumValue = hours / 12 >= 1 ? "pm" : "am";
    }
    switch (token) {
      case "b":
      case "bb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "bbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        }).toLowerCase();
      case "bbbbb":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "bbbb":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // in the morning, in the afternoon, in the evening, at night
  B: function B(date, token, localize2) {
    var hours = date.getUTCHours();
    var dayPeriodEnumValue;
    if (hours >= 17) {
      dayPeriodEnumValue = dayPeriodEnum.evening;
    } else if (hours >= 12) {
      dayPeriodEnumValue = dayPeriodEnum.afternoon;
    } else if (hours >= 4) {
      dayPeriodEnumValue = dayPeriodEnum.morning;
    } else {
      dayPeriodEnumValue = dayPeriodEnum.night;
    }
    switch (token) {
      case "B":
      case "BB":
      case "BBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "abbreviated",
          context: "formatting"
        });
      case "BBBBB":
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "narrow",
          context: "formatting"
        });
      case "BBBB":
      default:
        return localize2.dayPeriod(dayPeriodEnumValue, {
          width: "wide",
          context: "formatting"
        });
    }
  },
  // Hour [1-12]
  h: function h2(date, token, localize2) {
    if (token === "ho") {
      var hours = date.getUTCHours() % 12;
      if (hours === 0) hours = 12;
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return formatters$1.h(date, token);
  },
  // Hour [0-23]
  H: function H2(date, token, localize2) {
    if (token === "Ho") {
      return localize2.ordinalNumber(date.getUTCHours(), {
        unit: "hour"
      });
    }
    return formatters$1.H(date, token);
  },
  // Hour [0-11]
  K: function K(date, token, localize2) {
    var hours = date.getUTCHours() % 12;
    if (token === "Ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Hour [1-24]
  k: function k(date, token, localize2) {
    var hours = date.getUTCHours();
    if (hours === 0) hours = 24;
    if (token === "ko") {
      return localize2.ordinalNumber(hours, {
        unit: "hour"
      });
    }
    return addLeadingZeros(hours, token.length);
  },
  // Minute
  m: function m2(date, token, localize2) {
    if (token === "mo") {
      return localize2.ordinalNumber(date.getUTCMinutes(), {
        unit: "minute"
      });
    }
    return formatters$1.m(date, token);
  },
  // Second
  s: function s2(date, token, localize2) {
    if (token === "so") {
      return localize2.ordinalNumber(date.getUTCSeconds(), {
        unit: "second"
      });
    }
    return formatters$1.s(date, token);
  },
  // Fraction of second
  S: function S2(date, token) {
    return formatters$1.S(date, token);
  },
  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
  X: function X(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    if (timezoneOffset === 0) {
      return "Z";
    }
    switch (token) {
      // Hours and optional minutes
      case "X":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XX`
      case "XXXX":
      case "XX":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `XXX`
      case "XXXXX":
      case "XXX":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
  x: function x(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Hours and optional minutes
      case "x":
        return formatTimezoneWithOptionalMinutes(timezoneOffset);
      // Hours, minutes and optional seconds without `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xx`
      case "xxxx":
      case "xx":
        return formatTimezone(timezoneOffset);
      // Hours, minutes and optional seconds with `:` delimiter
      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
      // so this token always has the same output as `xxx`
      case "xxxxx":
      case "xxx":
      // Hours and minutes with `:` delimiter
      default:
        return formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (GMT)
  O: function O(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case "O":
      case "OO":
      case "OOO":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "OOOO":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Timezone (specific non-location)
  z: function z(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timezoneOffset = originalDate.getTimezoneOffset();
    switch (token) {
      // Short
      case "z":
      case "zz":
      case "zzz":
        return "GMT" + formatTimezoneShort(timezoneOffset, ":");
      // Long
      case "zzzz":
      default:
        return "GMT" + formatTimezone(timezoneOffset, ":");
    }
  },
  // Seconds timestamp
  t: function t(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = Math.floor(originalDate.getTime() / 1e3);
    return addLeadingZeros(timestamp, token.length);
  },
  // Milliseconds timestamp
  T: function T(date, token, _localize, options) {
    var originalDate = options._originalDate || date;
    var timestamp = originalDate.getTime();
    return addLeadingZeros(timestamp, token.length);
  }
};
function formatTimezoneShort(offset, dirtyDelimiter) {
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  if (minutes === 0) {
    return sign + String(hours);
  }
  var delimiter = dirtyDelimiter;
  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
}
function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
  if (offset % 60 === 0) {
    var sign = offset > 0 ? "-" : "+";
    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
  }
  return formatTimezone(offset, dirtyDelimiter);
}
function formatTimezone(offset, dirtyDelimiter) {
  var delimiter = dirtyDelimiter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
  var minutes = addLeadingZeros(absOffset % 60, 2);
  return sign + hours + delimiter + minutes;
}
var dateLongFormatter = function dateLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "P":
      return formatLong2.date({
        width: "short"
      });
    case "PP":
      return formatLong2.date({
        width: "medium"
      });
    case "PPP":
      return formatLong2.date({
        width: "long"
      });
    case "PPPP":
    default:
      return formatLong2.date({
        width: "full"
      });
  }
};
var timeLongFormatter = function timeLongFormatter2(pattern, formatLong2) {
  switch (pattern) {
    case "p":
      return formatLong2.time({
        width: "short"
      });
    case "pp":
      return formatLong2.time({
        width: "medium"
      });
    case "ppp":
      return formatLong2.time({
        width: "long"
      });
    case "pppp":
    default:
      return formatLong2.time({
        width: "full"
      });
  }
};
var dateTimeLongFormatter = function dateTimeLongFormatter2(pattern, formatLong2) {
  var matchResult = pattern.match(/(P+)(p+)?/) || [];
  var datePattern = matchResult[1];
  var timePattern = matchResult[2];
  if (!timePattern) {
    return dateLongFormatter(pattern, formatLong2);
  }
  var dateTimeFormat;
  switch (datePattern) {
    case "P":
      dateTimeFormat = formatLong2.dateTime({
        width: "short"
      });
      break;
    case "PP":
      dateTimeFormat = formatLong2.dateTime({
        width: "medium"
      });
      break;
    case "PPP":
      dateTimeFormat = formatLong2.dateTime({
        width: "long"
      });
      break;
    case "PPPP":
    default:
      dateTimeFormat = formatLong2.dateTime({
        width: "full"
      });
      break;
  }
  return dateTimeFormat.replace("{{date}}", dateLongFormatter(datePattern, formatLong2)).replace("{{time}}", timeLongFormatter(timePattern, formatLong2));
};
var longFormatters = {
  p: timeLongFormatter,
  P: dateTimeLongFormatter
};
var protectedDayOfYearTokens = ["D", "DD"];
var protectedWeekYearTokens = ["YY", "YYYY"];
function isProtectedDayOfYearToken(token) {
  return protectedDayOfYearTokens.indexOf(token) !== -1;
}
function isProtectedWeekYearToken(token) {
  return protectedWeekYearTokens.indexOf(token) !== -1;
}
function throwProtectedError(token, format2, input) {
  if (token === "YYYY") {
    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "YY") {
    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format2, "`) for formatting years to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "D") {
    throw new RangeError("Use `d` instead of `D` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  } else if (token === "DD") {
    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format2, "`) for formatting days of the month to the input `").concat(input, "`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));
  }
}
var formatDistanceLocale$3 = {
  lessThanXSeconds: {
    one: "less than a second",
    other: "less than {{count}} seconds"
  },
  xSeconds: {
    one: "1 second",
    other: "{{count}} seconds"
  },
  halfAMinute: "half a minute",
  lessThanXMinutes: {
    one: "less than a minute",
    other: "less than {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "about 1 hour",
    other: "about {{count}} hours"
  },
  xHours: {
    one: "1 hour",
    other: "{{count}} hours"
  },
  xDays: {
    one: "1 day",
    other: "{{count}} days"
  },
  aboutXWeeks: {
    one: "about 1 week",
    other: "about {{count}} weeks"
  },
  xWeeks: {
    one: "1 week",
    other: "{{count}} weeks"
  },
  aboutXMonths: {
    one: "about 1 month",
    other: "about {{count}} months"
  },
  xMonths: {
    one: "1 month",
    other: "{{count}} months"
  },
  aboutXYears: {
    one: "about 1 year",
    other: "about {{count}} years"
  },
  xYears: {
    one: "1 year",
    other: "{{count}} years"
  },
  overXYears: {
    one: "over 1 year",
    other: "over {{count}} years"
  },
  almostXYears: {
    one: "almost 1 year",
    other: "almost {{count}} years"
  }
};
var formatDistance$3 = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$3[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "in " + result;
    } else {
      return result + " ago";
    }
  }
  return result;
};
var dateFormats$4 = {
  full: "EEEE, MMMM do, y",
  long: "MMMM do, y",
  medium: "MMM d, y",
  short: "MM/dd/yyyy"
};
var timeFormats$4 = {
  full: "h:mm:ss a zzzz",
  long: "h:mm:ss a z",
  medium: "h:mm:ss a",
  short: "h:mm a"
};
var dateTimeFormats$4 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong$4 = {
  date: buildFormatLongFn({
    formats: dateFormats$4,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$4,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$4,
    defaultWidth: "full"
  })
};
var formatRelativeLocale$3 = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: "P"
};
var formatRelative$3 = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale$3[token];
};
var eraValues$3 = {
  narrow: ["B", "A"],
  abbreviated: ["BC", "AD"],
  wide: ["Before Christ", "Anno Domini"]
};
var quarterValues$3 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
};
var monthValues$3 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};
var dayValues$3 = {
  narrow: ["S", "M", "T", "W", "T", "F", "S"],
  short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
};
var dayPeriodValues$3 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }
};
var formattingDayPeriodValues$2 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mi",
    noon: "n",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "midnight",
    noon: "noon",
    morning: "in the morning",
    afternoon: "in the afternoon",
    evening: "in the evening",
    night: "at night"
  }
};
var ordinalNumber$3 = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
};
var localize$3 = {
  ordinalNumber: ordinalNumber$3,
  era: buildLocalizeFn({
    values: eraValues$3,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$3,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$3,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$3,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$3,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$2,
    defaultFormattingWidth: "wide"
  })
};
var matchOrdinalNumberPattern$3 = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern$3 = /\d+/i;
var matchEraPatterns$3 = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns$3 = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns$3 = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns$3 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$3 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns$3 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$3 = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns$3 = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns$3 = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns$3 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match$3 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$3,
    parsePattern: parseOrdinalNumberPattern$3,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$3,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$3,
    defaultParseWidth: "any",
    valueCallback: function valueCallback2(index2) {
      return index2 + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$3,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$3,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$3,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$3,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$3,
    defaultParseWidth: "any"
  })
};
var locale$4 = {
  code: "en-US",
  formatDistance: formatDistance$3,
  formatLong: formatLong$4,
  formatRelative: formatRelative$3,
  localize: localize$3,
  match: match$3,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp$1 = /^'([^]*?)'?$/;
var doubleQuoteRegExp$1 = /''/g;
var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
function format(dirtyDate, dirtyFormatStr, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(2, arguments);
  var formatStr = String(dirtyFormatStr);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : locale$4;
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (!locale2.localize) {
    throw new RangeError("locale must contain localize property");
  }
  if (!locale2.formatLong) {
    throw new RangeError("locale must contain formatLong property");
  }
  var originalDate = toDate(dirtyDate);
  if (!isValid(originalDate)) {
    throw new RangeError("Invalid time value");
  }
  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
  var utcDate = subMilliseconds(originalDate, timezoneOffset);
  var formatterOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2,
    _originalDate: originalDate
  };
  var result = formatStr.match(longFormattingTokensRegExp$1).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter === "p" || firstCharacter === "P") {
      var longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp$1).map(function(substring) {
    if (substring === "''") {
      return "'";
    }
    var firstCharacter = substring[0];
    if (firstCharacter === "'") {
      return cleanEscapedString$1(substring);
    }
    var formatter = formatters[firstCharacter];
    if (formatter) {
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(substring)) {
        throwProtectedError(substring, dirtyFormatStr, String(dirtyDate));
      }
      return formatter(utcDate, substring, locale2.localize, formatterOptions);
    }
    if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
      throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
    }
    return substring;
  }).join("");
  return result;
}
function cleanEscapedString$1(input) {
  var matched = input.match(escapedStringRegExp$1);
  if (!matched) {
    return input;
  }
  return matched[1].replace(doubleQuoteRegExp$1, "'");
}
function assign$1(target, object) {
  if (target == null) {
    throw new TypeError("assign requires that input parameter not be null or undefined");
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      target[property] = object[property];
    }
  }
  return target;
}
function getDaysInMonth(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = /* @__PURE__ */ new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}
function getDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  return decade;
}
function getYear(dirtyDate) {
  requiredArgs(1, arguments);
  return toDate(dirtyDate).getFullYear();
}
function isAfter(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}
function isBefore(dirtyDate, dirtyDateToCompare) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var dateToCompare = toDate(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}
function _arrayLikeToArray(r, a3) {
  (null == a3 || a3 > r.length) && (a3 = r.length);
  for (var e2 = 0, n = Array(a3); e2 < a3; e2++) n[e2] = r[e2];
  return n;
}
function _unsupportedIterableToArray(r, a3) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a3);
    var t2 = {}.toString.call(r).slice(8, -1);
    return "Object" === t2 && r.constructor && (t2 = r.constructor.name), "Map" === t2 || "Set" === t2 ? Array.from(r) : "Arguments" === t2 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t2) ? _arrayLikeToArray(r, a3) : void 0;
  }
}
function _createForOfIteratorHelper(r, e2) {
  var t2 = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t2) {
    if (Array.isArray(r) || (t2 = _unsupportedIterableToArray(r)) || e2) {
      t2 && (r = t2);
      var _n = 0, F = function F2() {
      };
      return {
        s: F,
        n: function n() {
          return _n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[_n++]
          };
        },
        e: function e3(r2) {
          throw r2;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o, a3 = true, u2 = false;
  return {
    s: function s3() {
      t2 = t2.call(r);
    },
    n: function n() {
      var r2 = t2.next();
      return a3 = r2.done, r2;
    },
    e: function e3(r2) {
      u2 = true, o = r2;
    },
    f: function f() {
      try {
        a3 || null == t2["return"] || t2["return"]();
      } finally {
        if (u2) throw o;
      }
    }
  };
}
function _assertThisInitialized(e2) {
  if (void 0 === e2) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e2;
}
function _setPrototypeOf(t2, e2) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t3, e3) {
    return t3.__proto__ = e3, t3;
  }, _setPrototypeOf(t2, e2);
}
function _inherits(t2, e2) {
  if ("function" != typeof e2 && null !== e2) throw new TypeError("Super expression must either be null or a function");
  t2.prototype = Object.create(e2 && e2.prototype, {
    constructor: {
      value: t2,
      writable: true,
      configurable: true
    }
  }), Object.defineProperty(t2, "prototype", {
    writable: false
  }), e2 && _setPrototypeOf(t2, e2);
}
function _getPrototypeOf(t2) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t3) {
    return t3.__proto__ || Object.getPrototypeOf(t3);
  }, _getPrototypeOf(t2);
}
function _isNativeReflectConstruct() {
  try {
    var t2 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t3) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t2;
  })();
}
function _possibleConstructorReturn(t2, e2) {
  if (e2 && ("object" == _typeof(e2) || "function" == typeof e2)) return e2;
  if (void 0 !== e2) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t2);
}
function _createSuper(t2) {
  var r = _isNativeReflectConstruct();
  return function() {
    var e2, o = _getPrototypeOf(t2);
    if (r) {
      var s3 = _getPrototypeOf(this).constructor;
      e2 = Reflect.construct(o, arguments, s3);
    } else e2 = o.apply(this, arguments);
    return _possibleConstructorReturn(this, e2);
  };
}
function _classCallCheck(a3, n) {
  if (!(a3 instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function toPrimitive(t2, r) {
  if ("object" != _typeof(t2) || !t2) return t2;
  var e2 = t2[Symbol.toPrimitive];
  if (void 0 !== e2) {
    var i2 = e2.call(t2, r);
    if ("object" != _typeof(i2)) return i2;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t2);
}
function toPropertyKey(t2) {
  var i2 = toPrimitive(t2, "string");
  return "symbol" == _typeof(i2) ? i2 : i2 + "";
}
function _defineProperties(e2, r) {
  for (var t2 = 0; t2 < r.length; t2++) {
    var o = r[t2];
    o.enumerable = o.enumerable || false, o.configurable = true, "value" in o && (o.writable = true), Object.defineProperty(e2, toPropertyKey(o.key), o);
  }
}
function _createClass(e2, r, t2) {
  return r && _defineProperties(e2.prototype, r), Object.defineProperty(e2, "prototype", {
    writable: false
  }), e2;
}
function _defineProperty(e2, r, t2) {
  return (r = toPropertyKey(r)) in e2 ? Object.defineProperty(e2, r, {
    value: t2,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e2[r] = t2, e2;
}
var TIMEZONE_UNIT_PRIORITY = 10;
var Setter = /* @__PURE__ */ function() {
  function Setter2() {
    _classCallCheck(this, Setter2);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", 0);
  }
  _createClass(Setter2, [{
    key: "validate",
    value: function validate(_utcDate, _options) {
      return true;
    }
  }]);
  return Setter2;
}();
var ValueSetter = /* @__PURE__ */ function(_Setter) {
  _inherits(ValueSetter2, _Setter);
  var _super = _createSuper(ValueSetter2);
  function ValueSetter2(value, validateValue, setValue, priority, subPriority) {
    var _this;
    _classCallCheck(this, ValueSetter2);
    _this = _super.call(this);
    _this.value = value;
    _this.validateValue = validateValue;
    _this.setValue = setValue;
    _this.priority = priority;
    if (subPriority) {
      _this.subPriority = subPriority;
    }
    return _this;
  }
  _createClass(ValueSetter2, [{
    key: "validate",
    value: function validate(utcDate, options) {
      return this.validateValue(utcDate, this.value, options);
    }
  }, {
    key: "set",
    value: function set2(utcDate, flags, options) {
      return this.setValue(utcDate, flags, this.value, options);
    }
  }]);
  return ValueSetter2;
}(Setter);
var DateToSystemTimezoneSetter = /* @__PURE__ */ function(_Setter2) {
  _inherits(DateToSystemTimezoneSetter2, _Setter2);
  var _super2 = _createSuper(DateToSystemTimezoneSetter2);
  function DateToSystemTimezoneSetter2() {
    var _this2;
    _classCallCheck(this, DateToSystemTimezoneSetter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this2 = _super2.call.apply(_super2, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this2), "priority", TIMEZONE_UNIT_PRIORITY);
    _defineProperty(_assertThisInitialized(_this2), "subPriority", -1);
    return _this2;
  }
  _createClass(DateToSystemTimezoneSetter2, [{
    key: "set",
    value: function set2(date, flags) {
      if (flags.timestampIsSet) {
        return date;
      }
      var convertedDate = /* @__PURE__ */ new Date(0);
      convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
      convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
      return convertedDate;
    }
  }]);
  return DateToSystemTimezoneSetter2;
}(Setter);
var Parser = /* @__PURE__ */ function() {
  function Parser2() {
    _classCallCheck(this, Parser2);
    _defineProperty(this, "incompatibleTokens", void 0);
    _defineProperty(this, "priority", void 0);
    _defineProperty(this, "subPriority", void 0);
  }
  _createClass(Parser2, [{
    key: "run",
    value: function run(dateString, token, match2, options) {
      var result = this.parse(dateString, token, match2, options);
      if (!result) {
        return null;
      }
      return {
        setter: new ValueSetter(result.value, this.validate, this.set, this.priority, this.subPriority),
        rest: result.rest
      };
    }
  }, {
    key: "validate",
    value: function validate(_utcDate, _value, _options) {
      return true;
    }
  }]);
  return Parser2;
}();
var EraParser = /* @__PURE__ */ function(_Parser) {
  _inherits(EraParser2, _Parser);
  var _super = _createSuper(EraParser2);
  function EraParser2() {
    var _this;
    _classCallCheck(this, EraParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 140);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["R", "u", "t", "T"]);
    return _this;
  }
  _createClass(EraParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        // AD, BC
        case "G":
        case "GG":
        case "GGG":
          return match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
        // A, B
        case "GGGGG":
          return match2.era(dateString, {
            width: "narrow"
          });
        // Anno Domini, Before Christ
        case "GGGG":
        default:
          return match2.era(dateString, {
            width: "wide"
          }) || match2.era(dateString, {
            width: "abbreviated"
          }) || match2.era(dateString, {
            width: "narrow"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      flags.era = value;
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return EraParser2;
}(Parser);
var numericPatterns = {
  month: /^(1[0-2]|0?\d)/,
  // 0 to 12
  date: /^(3[0-1]|[0-2]?\d)/,
  // 0 to 31
  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
  // 0 to 366
  week: /^(5[0-3]|[0-4]?\d)/,
  // 0 to 53
  hour23h: /^(2[0-3]|[0-1]?\d)/,
  // 0 to 23
  hour24h: /^(2[0-4]|[0-1]?\d)/,
  // 0 to 24
  hour11h: /^(1[0-1]|0?\d)/,
  // 0 to 11
  hour12h: /^(1[0-2]|0?\d)/,
  // 0 to 12
  minute: /^[0-5]?\d/,
  // 0 to 59
  second: /^[0-5]?\d/,
  // 0 to 59
  singleDigit: /^\d/,
  // 0 to 9
  twoDigits: /^\d{1,2}/,
  // 0 to 99
  threeDigits: /^\d{1,3}/,
  // 0 to 999
  fourDigits: /^\d{1,4}/,
  // 0 to 9999
  anyDigitsSigned: /^-?\d+/,
  singleDigitSigned: /^-?\d/,
  // 0 to 9, -0 to -9
  twoDigitsSigned: /^-?\d{1,2}/,
  // 0 to 99, -0 to -99
  threeDigitsSigned: /^-?\d{1,3}/,
  // 0 to 999, -0 to -999
  fourDigitsSigned: /^-?\d{1,4}/
  // 0 to 9999, -0 to -9999
};
var timezonePatterns = {
  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
  basic: /^([+-])(\d{2})(\d{2})|Z/,
  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
  extended: /^([+-])(\d{2}):(\d{2})|Z/,
  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
};
function mapValue(parseFnResult, mapFn) {
  if (!parseFnResult) {
    return parseFnResult;
  }
  return {
    value: mapFn(parseFnResult.value),
    rest: parseFnResult.rest
  };
}
function parseNumericPattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  return {
    value: parseInt(matchResult[0], 10),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseTimezonePattern(pattern, dateString) {
  var matchResult = dateString.match(pattern);
  if (!matchResult) {
    return null;
  }
  if (matchResult[0] === "Z") {
    return {
      value: 0,
      rest: dateString.slice(1)
    };
  }
  var sign = matchResult[1] === "+" ? 1 : -1;
  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
  return {
    value: sign * (hours * millisecondsInHour + minutes * millisecondsInMinute + seconds * millisecondsInSecond),
    rest: dateString.slice(matchResult[0].length)
  };
}
function parseAnyDigitsSigned(dateString) {
  return parseNumericPattern(numericPatterns.anyDigitsSigned, dateString);
}
function parseNDigits(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigit, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigits, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigits, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigits, dateString);
    default:
      return parseNumericPattern(new RegExp("^\\d{1," + n + "}"), dateString);
  }
}
function parseNDigitsSigned(n, dateString) {
  switch (n) {
    case 1:
      return parseNumericPattern(numericPatterns.singleDigitSigned, dateString);
    case 2:
      return parseNumericPattern(numericPatterns.twoDigitsSigned, dateString);
    case 3:
      return parseNumericPattern(numericPatterns.threeDigitsSigned, dateString);
    case 4:
      return parseNumericPattern(numericPatterns.fourDigitsSigned, dateString);
    default:
      return parseNumericPattern(new RegExp("^-?\\d{1," + n + "}"), dateString);
  }
}
function dayPeriodEnumToHours(dayPeriod) {
  switch (dayPeriod) {
    case "morning":
      return 4;
    case "evening":
      return 17;
    case "pm":
    case "noon":
    case "afternoon":
      return 12;
    case "am":
    case "midnight":
    case "night":
    default:
      return 0;
  }
}
function normalizeTwoDigitYear(twoDigitYear, currentYear) {
  var isCommonEra = currentYear > 0;
  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
  var result;
  if (absCurrentYear <= 50) {
    result = twoDigitYear || 100;
  } else {
    var rangeEnd = absCurrentYear + 50;
    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
  }
  return isCommonEra ? result : 1 - result;
}
function isLeapYearIndex(year) {
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
var YearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(YearParser2, _Parser);
  var _super = _createSuper(YearParser2);
  function YearParser2() {
    var _this;
    _classCallCheck(this, YearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "u", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(YearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback9 = function valueCallback10(year) {
        return {
          year,
          isTwoDigitYear: token === "yy"
        };
      };
      switch (token) {
        case "y":
          return mapValue(parseNDigits(4, dateString), valueCallback9);
        case "yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback9);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback9);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      var currentYear = date.getUTCFullYear();
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
        date.setUTCHours(0, 0, 0, 0);
        return date;
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return YearParser2;
}(Parser);
var LocalWeekYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(LocalWeekYearParser2, _Parser);
  var _super = _createSuper(LocalWeekYearParser2);
  function LocalWeekYearParser2() {
    var _this;
    _classCallCheck(this, LocalWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "Q", "q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass(LocalWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback9 = function valueCallback10(year) {
        return {
          year,
          isTwoDigitYear: token === "YY"
        };
      };
      switch (token) {
        case "Y":
          return mapValue(parseNDigits(4, dateString), valueCallback9);
        case "Yo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "year"
          }), valueCallback9);
        default:
          return mapValue(parseNDigits(token.length, dateString), valueCallback9);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value.isTwoDigitYear || value.year > 0;
    }
  }, {
    key: "set",
    value: function set2(date, flags, value, options) {
      var currentYear = getUTCWeekYear(date, options);
      if (value.isTwoDigitYear) {
        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
        date.setUTCHours(0, 0, 0, 0);
        return startOfUTCWeek(date, options);
      }
      var year = !("era" in flags) || flags.era === 1 ? value.year : 1 - value.year;
      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
      date.setUTCHours(0, 0, 0, 0);
      return startOfUTCWeek(date, options);
    }
  }]);
  return LocalWeekYearParser2;
}(Parser);
var ISOWeekYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOWeekYearParser2, _Parser);
  var _super = _createSuper(ISOWeekYearParser2);
  function ISOWeekYearParser2() {
    var _this;
    _classCallCheck(this, ISOWeekYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["G", "y", "Y", "u", "Q", "q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISOWeekYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "R") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      var firstWeekOfYear = /* @__PURE__ */ new Date(0);
      firstWeekOfYear.setUTCFullYear(value, 0, 4);
      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
      return startOfUTCISOWeek(firstWeekOfYear);
    }
  }]);
  return ISOWeekYearParser2;
}(Parser);
var ExtendedYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ExtendedYearParser2, _Parser);
  var _super = _createSuper(ExtendedYearParser2);
  function ExtendedYearParser2() {
    var _this;
    _classCallCheck(this, ExtendedYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 130);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["G", "y", "Y", "R", "w", "I", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ExtendedYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      if (token === "u") {
        return parseNDigitsSigned(4, dateString);
      }
      return parseNDigitsSigned(token.length, dateString);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCFullYear(value, 0, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ExtendedYearParser2;
}(Parser);
var QuarterParser = /* @__PURE__ */ function(_Parser) {
  _inherits(QuarterParser2, _Parser);
  var _super = _createSuper(QuarterParser2);
  function QuarterParser2() {
    var _this;
    _classCallCheck(this, QuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(QuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        // 1, 2, 3, 4
        case "Q":
        case "QQ":
          return parseNDigits(token.length, dateString);
        // 1st, 2nd, 3rd, 4th
        case "Qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        // Q1, Q2, Q3, Q4
        case "QQQ":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case "QQQQQ":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // 1st quarter, 2nd quarter, ...
        case "QQQQ":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return QuarterParser2;
}(Parser);
var StandAloneQuarterParser = /* @__PURE__ */ function(_Parser) {
  _inherits(StandAloneQuarterParser2, _Parser);
  var _super = _createSuper(StandAloneQuarterParser2);
  function StandAloneQuarterParser2() {
    var _this;
    _classCallCheck(this, StandAloneQuarterParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 120);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "Q", "M", "L", "w", "I", "d", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneQuarterParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        // 1, 2, 3, 4
        case "q":
        case "qq":
          return parseNDigits(token.length, dateString);
        // 1st, 2nd, 3rd, 4th
        case "qo":
          return match2.ordinalNumber(dateString, {
            unit: "quarter"
          });
        // Q1, Q2, Q3, Q4
        case "qqq":
          return match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // 1, 2, 3, 4 (narrow quarter; could be not numerical)
        case "qqqqq":
          return match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // 1st quarter, 2nd quarter, ...
        case "qqqq":
        default:
          return match2.quarter(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.quarter(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 4;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth((value - 1) * 3, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneQuarterParser2;
}(Parser);
var MonthParser = /* @__PURE__ */ function(_Parser) {
  _inherits(MonthParser2, _Parser);
  var _super = _createSuper(MonthParser2);
  function MonthParser2() {
    var _this;
    _classCallCheck(this, MonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "L", "w", "I", "D", "i", "e", "c", "t", "T"]);
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    return _this;
  }
  _createClass(MonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback9 = function valueCallback10(value) {
        return value - 1;
      };
      switch (token) {
        // 1, 2, ..., 12
        case "M":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback9);
        // 01, 02, ..., 12
        case "MM":
          return mapValue(parseNDigits(2, dateString), valueCallback9);
        // 1st, 2nd, ..., 12th
        case "Mo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback9);
        // Jan, Feb, ..., Dec
        case "MMM":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // J, F, ..., D
        case "MMMMM":
          return match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // January, February, ..., December
        case "MMMM":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return MonthParser2;
}(Parser);
var StandAloneMonthParser = /* @__PURE__ */ function(_Parser) {
  _inherits(StandAloneMonthParser2, _Parser);
  var _super = _createSuper(StandAloneMonthParser2);
  function StandAloneMonthParser2() {
    var _this;
    _classCallCheck(this, StandAloneMonthParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 110);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneMonthParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback9 = function valueCallback10(value) {
        return value - 1;
      };
      switch (token) {
        // 1, 2, ..., 12
        case "L":
          return mapValue(parseNumericPattern(numericPatterns.month, dateString), valueCallback9);
        // 01, 02, ..., 12
        case "LL":
          return mapValue(parseNDigits(2, dateString), valueCallback9);
        // 1st, 2nd, ..., 12th
        case "Lo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "month"
          }), valueCallback9);
        // Jan, Feb, ..., Dec
        case "LLL":
          return match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // J, F, ..., D
        case "LLLLL":
          return match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // January, February, ..., December
        case "LLLL":
        default:
          return match2.month(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.month(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(value, 1);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneMonthParser2;
}(Parser);
function setUTCWeek(dirtyDate, dirtyWeek, options) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var week = toInteger(dirtyWeek);
  var diff = getUTCWeek(date, options) - week;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
var LocalWeekParser = /* @__PURE__ */ function(_Parser) {
  _inherits(LocalWeekParser2, _Parser);
  var _super = _createSuper(LocalWeekParser2);
  function LocalWeekParser2() {
    var _this;
    _classCallCheck(this, LocalWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "i", "t", "T"]);
    return _this;
  }
  _createClass(LocalWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "w":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "wo":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      return startOfUTCWeek(setUTCWeek(date, value, options), options);
    }
  }]);
  return LocalWeekParser2;
}(Parser);
function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var isoWeek = toInteger(dirtyISOWeek);
  var diff = getUTCISOWeek(date) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date;
}
var ISOWeekParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOWeekParser2, _Parser);
  var _super = _createSuper(ISOWeekParser2);
  function ISOWeekParser2() {
    var _this;
    _classCallCheck(this, ISOWeekParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 100);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISOWeekParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "I":
          return parseNumericPattern(numericPatterns.week, dateString);
        case "Io":
          return match2.ordinalNumber(dateString, {
            unit: "week"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 53;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      return startOfUTCISOWeek(setUTCISOWeek(date, value));
    }
  }]);
  return ISOWeekParser2;
}(Parser);
var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DateParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DateParser2, _Parser);
  var _super = _createSuper(DateParser2);
  function DateParser2() {
    var _this;
    _classCallCheck(this, DateParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subPriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "w", "I", "D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DateParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "d":
          return parseNumericPattern(numericPatterns.date, dateString);
        case "do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);
      var month = date.getUTCMonth();
      if (isLeapYear) {
        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
      } else {
        return value >= 1 && value <= DAYS_IN_MONTH[month];
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCDate(value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DateParser2;
}(Parser);
var DayOfYearParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DayOfYearParser2, _Parser);
  var _super = _createSuper(DayOfYearParser2);
  function DayOfYearParser2() {
    var _this;
    _classCallCheck(this, DayOfYearParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "subpriority", 1);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["Y", "R", "q", "Q", "M", "L", "w", "I", "d", "E", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DayOfYearParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "D":
        case "DD":
          return parseNumericPattern(numericPatterns.dayOfYear, dateString);
        case "Do":
          return match2.ordinalNumber(dateString, {
            unit: "date"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(date, value) {
      var year = date.getUTCFullYear();
      var isLeapYear = isLeapYearIndex(year);
      if (isLeapYear) {
        return value >= 1 && value <= 366;
      } else {
        return value >= 1 && value <= 365;
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMonth(0, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayOfYearParser2;
}(Parser);
function setUTCDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var DayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DayParser2, _Parser);
  var _super = _createSuper(DayParser2);
  function DayParser2() {
    var _this;
    _classCallCheck(this, DayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["D", "i", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(DayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        // Tue
        case "E":
        case "EE":
        case "EEE":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // T
        case "EEEEE":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "EEEEEE":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // Tuesday
        case "EEEE":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return DayParser2;
}(Parser);
var LocalDayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(LocalDayParser2, _Parser);
  var _super = _createSuper(LocalDayParser2);
  function LocalDayParser2() {
    var _this;
    _classCallCheck(this, LocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "c", "t", "T"]);
    return _this;
  }
  _createClass(LocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback9 = function valueCallback10(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        // 3
        case "e":
        case "ee":
          return mapValue(parseNDigits(token.length, dateString), valueCallback9);
        // 3rd
        case "eo":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback9);
        // Tue
        case "eee":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // T
        case "eeeee":
          return match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // Tu
        case "eeeeee":
          return match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
        // Tuesday
        case "eeee":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return LocalDayParser2;
}(Parser);
var StandAloneLocalDayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(StandAloneLocalDayParser2, _Parser);
  var _super = _createSuper(StandAloneLocalDayParser2);
  function StandAloneLocalDayParser2() {
    var _this;
    _classCallCheck(this, StandAloneLocalDayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "R", "u", "q", "Q", "M", "L", "I", "d", "D", "E", "i", "e", "t", "T"]);
    return _this;
  }
  _createClass(StandAloneLocalDayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2, options) {
      var valueCallback9 = function valueCallback10(value) {
        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
      };
      switch (token) {
        // 3
        case "c":
        case "cc":
          return mapValue(parseNDigits(token.length, dateString), valueCallback9);
        // 3rd
        case "co":
          return mapValue(match2.ordinalNumber(dateString, {
            unit: "day"
          }), valueCallback9);
        // Tue
        case "ccc":
          return match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // T
        case "ccccc":
          return match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // Tu
        case "cccccc":
          return match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
        // Tuesday
        case "cccc":
        default:
          return match2.day(dateString, {
            width: "wide",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "short",
            context: "standalone"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "standalone"
          });
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 6;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value, options) {
      date = setUTCDay(date, value, options);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return StandAloneLocalDayParser2;
}(Parser);
function setUTCISODay(dirtyDate, dirtyDay) {
  requiredArgs(2, arguments);
  var day = toInteger(dirtyDay);
  if (day % 7 === 0) {
    day = day - 7;
  }
  var weekStartsOn = 1;
  var date = toDate(dirtyDate);
  var currentDay = date.getUTCDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
var ISODayParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISODayParser2, _Parser);
  var _super = _createSuper(ISODayParser2);
  function ISODayParser2() {
    var _this;
    _classCallCheck(this, ISODayParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 90);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["y", "Y", "u", "q", "Q", "M", "L", "w", "d", "D", "E", "e", "c", "t", "T"]);
    return _this;
  }
  _createClass(ISODayParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      var valueCallback9 = function valueCallback10(value) {
        if (value === 0) {
          return 7;
        }
        return value;
      };
      switch (token) {
        // 2
        case "i":
        case "ii":
          return parseNDigits(token.length, dateString);
        // 2nd
        case "io":
          return match2.ordinalNumber(dateString, {
            unit: "day"
          });
        // Tue
        case "iii":
          return mapValue(match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback9);
        // T
        case "iiiii":
          return mapValue(match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback9);
        // Tu
        case "iiiiii":
          return mapValue(match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback9);
        // Tuesday
        case "iiii":
        default:
          return mapValue(match2.day(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "short",
            context: "formatting"
          }) || match2.day(dateString, {
            width: "narrow",
            context: "formatting"
          }), valueCallback9);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 7;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date = setUTCISODay(date, value);
      date.setUTCHours(0, 0, 0, 0);
      return date;
    }
  }]);
  return ISODayParser2;
}(Parser);
var AMPMParser = /* @__PURE__ */ function(_Parser) {
  _inherits(AMPMParser2, _Parser);
  var _super = _createSuper(AMPMParser2);
  function AMPMParser2() {
    var _this;
    _classCallCheck(this, AMPMParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["b", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(AMPMParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "a":
        case "aa":
        case "aaa":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaaa":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMParser2;
}(Parser);
var AMPMMidnightParser = /* @__PURE__ */ function(_Parser) {
  _inherits(AMPMMidnightParser2, _Parser);
  var _super = _createSuper(AMPMMidnightParser2);
  function AMPMMidnightParser2() {
    var _this;
    _classCallCheck(this, AMPMMidnightParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "B", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(AMPMMidnightParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "b":
        case "bb":
        case "bbb":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbbb":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return AMPMMidnightParser2;
}(Parser);
var DayPeriodParser = /* @__PURE__ */ function(_Parser) {
  _inherits(DayPeriodParser2, _Parser);
  var _super = _createSuper(DayPeriodParser2);
  function DayPeriodParser2() {
    var _this;
    _classCallCheck(this, DayPeriodParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 80);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "t", "T"]);
    return _this;
  }
  _createClass(DayPeriodParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "B":
        case "BB":
        case "BBB":
          return match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBBB":
          return match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return match2.dayPeriod(dateString, {
            width: "wide",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "abbreviated",
            context: "formatting"
          }) || match2.dayPeriod(dateString, {
            width: "narrow",
            context: "formatting"
          });
      }
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
      return date;
    }
  }]);
  return DayPeriodParser2;
}(Parser);
var Hour1to12Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour1to12Parser2, _Parser);
  var _super = _createSuper(Hour1to12Parser2);
  function Hour1to12Parser2() {
    var _this;
    _classCallCheck(this, Hour1to12Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["H", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour1to12Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "h":
          return parseNumericPattern(numericPatterns.hour12h, dateString);
        case "ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 12;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else if (!isPM && value === 12) {
        date.setUTCHours(0, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour1to12Parser2;
}(Parser);
var Hour0to23Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour0to23Parser2, _Parser);
  var _super = _createSuper(Hour0to23Parser2);
  function Hour0to23Parser2() {
    var _this;
    _classCallCheck(this, Hour0to23Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "h", "K", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour0to23Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "H":
          return parseNumericPattern(numericPatterns.hour23h, dateString);
        case "Ho":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 23;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCHours(value, 0, 0, 0);
      return date;
    }
  }]);
  return Hour0to23Parser2;
}(Parser);
var Hour0To11Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour0To11Parser2, _Parser);
  var _super = _createSuper(Hour0To11Parser2);
  function Hour0To11Parser2() {
    var _this;
    _classCallCheck(this, Hour0To11Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["h", "H", "k", "t", "T"]);
    return _this;
  }
  _createClass(Hour0To11Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "K":
          return parseNumericPattern(numericPatterns.hour11h, dateString);
        case "Ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 11;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var isPM = date.getUTCHours() >= 12;
      if (isPM && value < 12) {
        date.setUTCHours(value + 12, 0, 0, 0);
      } else {
        date.setUTCHours(value, 0, 0, 0);
      }
      return date;
    }
  }]);
  return Hour0To11Parser2;
}(Parser);
var Hour1To24Parser = /* @__PURE__ */ function(_Parser) {
  _inherits(Hour1To24Parser2, _Parser);
  var _super = _createSuper(Hour1To24Parser2);
  function Hour1To24Parser2() {
    var _this;
    _classCallCheck(this, Hour1To24Parser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 70);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["a", "b", "h", "H", "K", "t", "T"]);
    return _this;
  }
  _createClass(Hour1To24Parser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "k":
          return parseNumericPattern(numericPatterns.hour24h, dateString);
        case "ko":
          return match2.ordinalNumber(dateString, {
            unit: "hour"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 1 && value <= 24;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      var hours = value <= 24 ? value % 24 : value;
      date.setUTCHours(hours, 0, 0, 0);
      return date;
    }
  }]);
  return Hour1To24Parser2;
}(Parser);
var MinuteParser = /* @__PURE__ */ function(_Parser) {
  _inherits(MinuteParser2, _Parser);
  var _super = _createSuper(MinuteParser2);
  function MinuteParser2() {
    var _this;
    _classCallCheck(this, MinuteParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 60);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(MinuteParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "m":
          return parseNumericPattern(numericPatterns.minute, dateString);
        case "mo":
          return match2.ordinalNumber(dateString, {
            unit: "minute"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMinutes(value, 0, 0);
      return date;
    }
  }]);
  return MinuteParser2;
}(Parser);
var SecondParser = /* @__PURE__ */ function(_Parser) {
  _inherits(SecondParser2, _Parser);
  var _super = _createSuper(SecondParser2);
  function SecondParser2() {
    var _this;
    _classCallCheck(this, SecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 50);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(SecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token, match2) {
      switch (token) {
        case "s":
          return parseNumericPattern(numericPatterns.second, dateString);
        case "so":
          return match2.ordinalNumber(dateString, {
            unit: "second"
          });
        default:
          return parseNDigits(token.length, dateString);
      }
    }
  }, {
    key: "validate",
    value: function validate(_date, value) {
      return value >= 0 && value <= 59;
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCSeconds(value, 0);
      return date;
    }
  }]);
  return SecondParser2;
}(Parser);
var FractionOfSecondParser = /* @__PURE__ */ function(_Parser) {
  _inherits(FractionOfSecondParser2, _Parser);
  var _super = _createSuper(FractionOfSecondParser2);
  function FractionOfSecondParser2() {
    var _this;
    _classCallCheck(this, FractionOfSecondParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 30);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T"]);
    return _this;
  }
  _createClass(FractionOfSecondParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      var valueCallback9 = function valueCallback10(value) {
        return Math.floor(value * Math.pow(10, -token.length + 3));
      };
      return mapValue(parseNDigits(token.length, dateString), valueCallback9);
    }
  }, {
    key: "set",
    value: function set2(date, _flags, value) {
      date.setUTCMilliseconds(value);
      return date;
    }
  }]);
  return FractionOfSecondParser2;
}(Parser);
var ISOTimezoneWithZParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOTimezoneWithZParser2, _Parser);
  var _super = _createSuper(ISOTimezoneWithZParser2);
  function ISOTimezoneWithZParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneWithZParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T", "x"]);
    return _this;
  }
  _createClass(ISOTimezoneWithZParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "X":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "XX":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "XXXX":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "XXXXX":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "XXX":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneWithZParser2;
}(Parser);
var ISOTimezoneParser = /* @__PURE__ */ function(_Parser) {
  _inherits(ISOTimezoneParser2, _Parser);
  var _super = _createSuper(ISOTimezoneParser2);
  function ISOTimezoneParser2() {
    var _this;
    _classCallCheck(this, ISOTimezoneParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 10);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", ["t", "T", "X"]);
    return _this;
  }
  _createClass(ISOTimezoneParser2, [{
    key: "parse",
    value: function parse2(dateString, token) {
      switch (token) {
        case "x":
          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, dateString);
        case "xx":
          return parseTimezonePattern(timezonePatterns.basic, dateString);
        case "xxxx":
          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, dateString);
        case "xxxxx":
          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, dateString);
        case "xxx":
        default:
          return parseTimezonePattern(timezonePatterns.extended, dateString);
      }
    }
  }, {
    key: "set",
    value: function set2(date, flags, value) {
      if (flags.timestampIsSet) {
        return date;
      }
      return new Date(date.getTime() - value);
    }
  }]);
  return ISOTimezoneParser2;
}(Parser);
var TimestampSecondsParser = /* @__PURE__ */ function(_Parser) {
  _inherits(TimestampSecondsParser2, _Parser);
  var _super = _createSuper(TimestampSecondsParser2);
  function TimestampSecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampSecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 40);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampSecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value * 1e3), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampSecondsParser2;
}(Parser);
var TimestampMillisecondsParser = /* @__PURE__ */ function(_Parser) {
  _inherits(TimestampMillisecondsParser2, _Parser);
  var _super = _createSuper(TimestampMillisecondsParser2);
  function TimestampMillisecondsParser2() {
    var _this;
    _classCallCheck(this, TimestampMillisecondsParser2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "priority", 20);
    _defineProperty(_assertThisInitialized(_this), "incompatibleTokens", "*");
    return _this;
  }
  _createClass(TimestampMillisecondsParser2, [{
    key: "parse",
    value: function parse2(dateString) {
      return parseAnyDigitsSigned(dateString);
    }
  }, {
    key: "set",
    value: function set2(_date, _flags, value) {
      return [new Date(value), {
        timestampIsSet: true
      }];
    }
  }]);
  return TimestampMillisecondsParser2;
}(Parser);
var parsers = {
  G: new EraParser(),
  y: new YearParser(),
  Y: new LocalWeekYearParser(),
  R: new ISOWeekYearParser(),
  u: new ExtendedYearParser(),
  Q: new QuarterParser(),
  q: new StandAloneQuarterParser(),
  M: new MonthParser(),
  L: new StandAloneMonthParser(),
  w: new LocalWeekParser(),
  I: new ISOWeekParser(),
  d: new DateParser(),
  D: new DayOfYearParser(),
  E: new DayParser(),
  e: new LocalDayParser(),
  c: new StandAloneLocalDayParser(),
  i: new ISODayParser(),
  a: new AMPMParser(),
  b: new AMPMMidnightParser(),
  B: new DayPeriodParser(),
  h: new Hour1to12Parser(),
  H: new Hour0to23Parser(),
  K: new Hour0To11Parser(),
  k: new Hour1To24Parser(),
  m: new MinuteParser(),
  s: new SecondParser(),
  S: new FractionOfSecondParser(),
  X: new ISOTimezoneWithZParser(),
  x: new ISOTimezoneParser(),
  t: new TimestampSecondsParser(),
  T: new TimestampMillisecondsParser()
};
var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g;
var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
var escapedStringRegExp = /^'([^]*?)'?$/;
var doubleQuoteRegExp = /''/g;
var notWhitespaceRegExp = /\S/;
var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, options) {
  var _ref, _options$locale, _ref2, _ref3, _ref4, _options$firstWeekCon, _options$locale2, _options$locale2$opti, _defaultOptions$local, _defaultOptions$local2, _ref5, _ref6, _ref7, _options$weekStartsOn, _options$locale3, _options$locale3$opti, _defaultOptions$local3, _defaultOptions$local4;
  requiredArgs(3, arguments);
  var dateString = String(dirtyDateString);
  var formatString = String(dirtyFormatString);
  var defaultOptions2 = getDefaultOptions();
  var locale2 = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions2.locale) !== null && _ref !== void 0 ? _ref : locale$4;
  if (!locale2.match) {
    throw new RangeError("locale must contain match property");
  }
  var firstWeekContainsDate = toInteger((_ref2 = (_ref3 = (_ref4 = (_options$firstWeekCon = options === null || options === void 0 ? void 0 : options.firstWeekContainsDate) !== null && _options$firstWeekCon !== void 0 ? _options$firstWeekCon : options === null || options === void 0 ? void 0 : (_options$locale2 = options.locale) === null || _options$locale2 === void 0 ? void 0 : (_options$locale2$opti = _options$locale2.options) === null || _options$locale2$opti === void 0 ? void 0 : _options$locale2$opti.firstWeekContainsDate) !== null && _ref4 !== void 0 ? _ref4 : defaultOptions2.firstWeekContainsDate) !== null && _ref3 !== void 0 ? _ref3 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.firstWeekContainsDate) !== null && _ref2 !== void 0 ? _ref2 : 1);
  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
    throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");
  }
  var weekStartsOn = toInteger((_ref5 = (_ref6 = (_ref7 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale3 = options.locale) === null || _options$locale3 === void 0 ? void 0 : (_options$locale3$opti = _options$locale3.options) === null || _options$locale3$opti === void 0 ? void 0 : _options$locale3$opti.weekStartsOn) !== null && _ref7 !== void 0 ? _ref7 : defaultOptions2.weekStartsOn) !== null && _ref6 !== void 0 ? _ref6 : (_defaultOptions$local3 = defaultOptions2.locale) === null || _defaultOptions$local3 === void 0 ? void 0 : (_defaultOptions$local4 = _defaultOptions$local3.options) === null || _defaultOptions$local4 === void 0 ? void 0 : _defaultOptions$local4.weekStartsOn) !== null && _ref5 !== void 0 ? _ref5 : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  if (formatString === "") {
    if (dateString === "") {
      return toDate(dirtyReferenceDate);
    } else {
      return /* @__PURE__ */ new Date(NaN);
    }
  }
  var subFnOptions = {
    firstWeekContainsDate,
    weekStartsOn,
    locale: locale2
  };
  var setters = [new DateToSystemTimezoneSetter()];
  var tokens = formatString.match(longFormattingTokensRegExp).map(function(substring) {
    var firstCharacter = substring[0];
    if (firstCharacter in longFormatters) {
      var longFormatter = longFormatters[firstCharacter];
      return longFormatter(substring, locale2.formatLong);
    }
    return substring;
  }).join("").match(formattingTokensRegExp);
  var usedTokens = [];
  var _iterator = _createForOfIteratorHelper(tokens), _step;
  try {
    var _loop = function _loop2() {
      var token = _step.value;
      if (!(options !== null && options !== void 0 && options.useAdditionalWeekYearTokens) && isProtectedWeekYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      if (!(options !== null && options !== void 0 && options.useAdditionalDayOfYearTokens) && isProtectedDayOfYearToken(token)) {
        throwProtectedError(token, formatString, dirtyDateString);
      }
      var firstCharacter = token[0];
      var parser = parsers[firstCharacter];
      if (parser) {
        var incompatibleTokens = parser.incompatibleTokens;
        if (Array.isArray(incompatibleTokens)) {
          var incompatibleToken = usedTokens.find(function(usedToken) {
            return incompatibleTokens.includes(usedToken.token) || usedToken.token === firstCharacter;
          });
          if (incompatibleToken) {
            throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
          }
        } else if (parser.incompatibleTokens === "*" && usedTokens.length > 0) {
          throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
        }
        usedTokens.push({
          token: firstCharacter,
          fullToken: token
        });
        var parseResult = parser.run(dateString, token, locale2.match, subFnOptions);
        if (!parseResult) {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
        setters.push(parseResult.setter);
        dateString = parseResult.rest;
      } else {
        if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
          throw new RangeError("Format string contains an unescaped latin alphabet character `" + firstCharacter + "`");
        }
        if (token === "''") {
          token = "'";
        } else if (firstCharacter === "'") {
          token = cleanEscapedString(token);
        }
        if (dateString.indexOf(token) === 0) {
          dateString = dateString.slice(token.length);
        } else {
          return {
            v: /* @__PURE__ */ new Date(NaN)
          };
        }
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var _ret = _loop();
      if (_typeof(_ret) === "object") return _ret.v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var uniquePrioritySetters = setters.map(function(setter2) {
    return setter2.priority;
  }).sort(function(a3, b2) {
    return b2 - a3;
  }).filter(function(priority, index2, array) {
    return array.indexOf(priority) === index2;
  }).map(function(priority) {
    return setters.filter(function(setter2) {
      return setter2.priority === priority;
    }).sort(function(a3, b2) {
      return b2.subPriority - a3.subPriority;
    });
  }).map(function(setterArray) {
    return setterArray[0];
  });
  var date = toDate(dirtyReferenceDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
  var flags = {};
  var _iterator2 = _createForOfIteratorHelper(uniquePrioritySetters), _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var setter = _step2.value;
      if (!setter.validate(utcDate, subFnOptions)) {
        return /* @__PURE__ */ new Date(NaN);
      }
      var result = setter.set(utcDate, flags, subFnOptions);
      if (Array.isArray(result)) {
        utcDate = result[0];
        assign$1(flags, result[1]);
      } else {
        utcDate = result;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return utcDate;
}
function cleanEscapedString(input) {
  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
}
function startOfHour(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  date.setMinutes(0, 0, 0);
  return date;
}
function isSameHour(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfHour = startOfHour(dirtyDateLeft);
  var dateRightStartOfHour = startOfHour(dirtyDateRight);
  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime();
}
function isSameMinute(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeftStartOfMinute = startOfMinute(dirtyDateLeft);
  var dateRightStartOfMinute = startOfMinute(dirtyDateRight);
  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime();
}
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}
function isSameYear(dirtyDateLeft, dirtyDateRight) {
  requiredArgs(2, arguments);
  var dateLeft = toDate(dirtyDateLeft);
  var dateRight = toDate(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}
function isWithinInterval(dirtyDate, interval) {
  requiredArgs(2, arguments);
  var time = toDate(dirtyDate).getTime();
  var startTime = toDate(interval.start).getTime();
  var endTime = toDate(interval.end).getTime();
  if (!(startTime <= endTime)) {
    throw new RangeError("Invalid interval");
  }
  return time >= startTime && time <= endTime;
}
function setMonth(dirtyDate, dirtyMonth) {
  requiredArgs(2, arguments);
  var date = toDate(dirtyDate);
  var month = toInteger(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = /* @__PURE__ */ new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
function set(dirtyDate, values) {
  requiredArgs(2, arguments);
  if (_typeof(values) !== "object" || values === null) {
    throw new RangeError("values parameter must be an object");
  }
  var date = toDate(dirtyDate);
  if (isNaN(date.getTime())) {
    return /* @__PURE__ */ new Date(NaN);
  }
  if (values.year != null) {
    date.setFullYear(values.year);
  }
  if (values.month != null) {
    date = setMonth(date, values.month);
  }
  if (values.date != null) {
    date.setDate(toInteger(values.date));
  }
  if (values.hours != null) {
    date.setHours(toInteger(values.hours));
  }
  if (values.minutes != null) {
    date.setMinutes(toInteger(values.minutes));
  }
  if (values.seconds != null) {
    date.setSeconds(toInteger(values.seconds));
  }
  if (values.milliseconds != null) {
    date.setMilliseconds(toInteger(values.milliseconds));
  }
  return date;
}
function setDay(dirtyDate, dirtyDay, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;
  requiredArgs(2, arguments);
  var defaultOptions2 = getDefaultOptions();
  var weekStartsOn = toInteger((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions2.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions2.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0);
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");
  }
  var date = toDate(dirtyDate);
  var day = toInteger(dirtyDay);
  var currentDay = date.getDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var delta = 7 - weekStartsOn;
  var diff = day < 0 || day > 6 ? day - (currentDay + delta) % 7 : (dayIndex + delta) % 7 - (currentDay + delta) % 7;
  return addDays(date, diff);
}
function startOfDecade(dirtyDate) {
  requiredArgs(1, arguments);
  var date = toDate(dirtyDate);
  var year = date.getFullYear();
  var decade = Math.floor(year / 10) * 10;
  date.setFullYear(decade, 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
function subMonths(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}
function subYears(dirtyDate, dirtyAmount) {
  requiredArgs(2, arguments);
  var amount = toInteger(dirtyAmount);
  return addYears(dirtyDate, -amount);
}
var dateFormats$3 = {
  full: "EEEE, d MMMM yyyy",
  long: "d MMMM yyyy",
  medium: "d MMM yyyy",
  short: "dd/MM/yyyy"
};
var timeFormats$3 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats$3 = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong$3 = {
  date: buildFormatLongFn({
    formats: dateFormats$3,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$3,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$3,
    defaultWidth: "full"
  })
};
var locale$3 = {
  code: "en-GB",
  formatDistance: formatDistance$3,
  formatLong: formatLong$3,
  formatRelative: formatRelative$3,
  localize: localize$3,
  match: match$3,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var formatDistanceLocale$2 = {
  lessThanXSeconds: {
    one: "menos de un segundo",
    other: "menos de {{count}} segundos"
  },
  xSeconds: {
    one: "1 segundo",
    other: "{{count}} segundos"
  },
  halfAMinute: "medio minuto",
  lessThanXMinutes: {
    one: "menos de un minuto",
    other: "menos de {{count}} minutos"
  },
  xMinutes: {
    one: "1 minuto",
    other: "{{count}} minutos"
  },
  aboutXHours: {
    one: "alrededor de 1 hora",
    other: "alrededor de {{count}} horas"
  },
  xHours: {
    one: "1 hora",
    other: "{{count}} horas"
  },
  xDays: {
    one: "1 día",
    other: "{{count}} días"
  },
  aboutXWeeks: {
    one: "alrededor de 1 semana",
    other: "alrededor de {{count}} semanas"
  },
  xWeeks: {
    one: "1 semana",
    other: "{{count}} semanas"
  },
  aboutXMonths: {
    one: "alrededor de 1 mes",
    other: "alrededor de {{count}} meses"
  },
  xMonths: {
    one: "1 mes",
    other: "{{count}} meses"
  },
  aboutXYears: {
    one: "alrededor de 1 año",
    other: "alrededor de {{count}} años"
  },
  xYears: {
    one: "1 año",
    other: "{{count}} años"
  },
  overXYears: {
    one: "más de 1 año",
    other: "más de {{count}} años"
  },
  almostXYears: {
    one: "casi 1 año",
    other: "casi {{count}} años"
  }
};
var formatDistance$2 = function formatDistance2(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale$2[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "en " + result;
    } else {
      return "hace " + result;
    }
  }
  return result;
};
var dateFormats$2 = {
  full: "EEEE, d 'de' MMMM 'de' y",
  long: "d 'de' MMMM 'de' y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats$2 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats$2 = {
  full: "{{date}} 'a las' {{time}}",
  long: "{{date}} 'a las' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong$2 = {
  date: buildFormatLongFn({
    formats: dateFormats$2,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$2,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$2,
    defaultWidth: "full"
  })
};
var formatRelativeLocale$2 = {
  lastWeek: "'el' eeee 'pasado a la' p",
  yesterday: "'ayer a la' p",
  today: "'hoy a la' p",
  tomorrow: "'mañana a la' p",
  nextWeek: "eeee 'a la' p",
  other: "P"
};
var formatRelativeLocalePlural = {
  lastWeek: "'el' eeee 'pasado a las' p",
  yesterday: "'ayer a las' p",
  today: "'hoy a las' p",
  tomorrow: "'mañana a las' p",
  nextWeek: "eeee 'a las' p",
  other: "P"
};
var formatRelative$2 = function formatRelative2(token, date, _baseDate, _options) {
  if (date.getUTCHours() !== 1) {
    return formatRelativeLocalePlural[token];
  } else {
    return formatRelativeLocale$2[token];
  }
};
var eraValues$2 = {
  narrow: ["AC", "DC"],
  abbreviated: ["AC", "DC"],
  wide: ["antes de cristo", "después de cristo"]
};
var quarterValues$2 = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["T1", "T2", "T3", "T4"],
  wide: ["1º trimestre", "2º trimestre", "3º trimestre", "4º trimestre"]
};
var monthValues$2 = {
  narrow: ["e", "f", "m", "a", "m", "j", "j", "a", "s", "o", "n", "d"],
  abbreviated: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
  wide: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
};
var dayValues$2 = {
  narrow: ["d", "l", "m", "m", "j", "v", "s"],
  short: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
  abbreviated: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
  wide: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"]
};
var dayPeriodValues$2 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "mañana",
    afternoon: "tarde",
    evening: "tarde",
    night: "noche"
  }
};
var formattingDayPeriodValues$1 = {
  narrow: {
    am: "a",
    pm: "p",
    midnight: "mn",
    noon: "md",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  },
  wide: {
    am: "a.m.",
    pm: "p.m.",
    midnight: "medianoche",
    noon: "mediodia",
    morning: "de la mañana",
    afternoon: "de la tarde",
    evening: "de la tarde",
    night: "de la noche"
  }
};
var ordinalNumber$2 = function ordinalNumber2(dirtyNumber, _options) {
  var number = Number(dirtyNumber);
  return number + "º";
};
var localize$2 = {
  ordinalNumber: ordinalNumber$2,
  era: buildLocalizeFn({
    values: eraValues$2,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$2,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback2(quarter) {
      return Number(quarter) - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$2,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$2,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$2,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues$1,
    defaultFormattingWidth: "wide"
  })
};
var matchOrdinalNumberPattern$2 = /^(\d+)(º)?/i;
var parseOrdinalNumberPattern$2 = /\d+/i;
var matchEraPatterns$2 = {
  narrow: /^(ac|dc|a|d)/i,
  abbreviated: /^(a\.?\s?c\.?|a\.?\s?e\.?\s?c\.?|d\.?\s?c\.?|e\.?\s?c\.?)/i,
  wide: /^(antes de cristo|antes de la era com[uú]n|despu[eé]s de cristo|era com[uú]n)/i
};
var parseEraPatterns$2 = {
  any: [/^ac/i, /^dc/i],
  wide: [/^(antes de cristo|antes de la era com[uú]n)/i, /^(despu[eé]s de cristo|era com[uú]n)/i]
};
var matchQuarterPatterns$2 = {
  narrow: /^[1234]/i,
  abbreviated: /^T[1234]/i,
  wide: /^[1234](º)? trimestre/i
};
var parseQuarterPatterns$2 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$2 = {
  narrow: /^[efmajsond]/i,
  abbreviated: /^(ene|feb|mar|abr|may|jun|jul|ago|sep|oct|nov|dic)/i,
  wide: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i
};
var parseMonthPatterns$2 = {
  narrow: [/^e/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^en/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i]
};
var matchDayPatterns$2 = {
  narrow: /^[dlmjvs]/i,
  short: /^(do|lu|ma|mi|ju|vi|s[áa])/i,
  abbreviated: /^(dom|lun|mar|mi[ée]|jue|vie|s[áa]b)/i,
  wide: /^(domingo|lunes|martes|mi[ée]rcoles|jueves|viernes|s[áa]bado)/i
};
var parseDayPatterns$2 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^do/i, /^lu/i, /^ma/i, /^mi/i, /^ju/i, /^vi/i, /^sa/i]
};
var matchDayPeriodPatterns$2 = {
  narrow: /^(a|p|mn|md|(de la|a las) (mañana|tarde|noche))/i,
  any: /^([ap]\.?\s?m\.?|medianoche|mediodia|(de la|a las) (mañana|tarde|noche))/i
};
var parseDayPeriodPatterns$2 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mn/i,
    noon: /^md/i,
    morning: /mañana/i,
    afternoon: /tarde/i,
    evening: /tarde/i,
    night: /noche/i
  }
};
var match$2 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$2,
    parsePattern: parseOrdinalNumberPattern$2,
    valueCallback: function valueCallback3(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$2,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$2,
    defaultParseWidth: "any",
    valueCallback: function valueCallback4(index2) {
      return index2 + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$2,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$2,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$2,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$2,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$2,
    defaultParseWidth: "any"
  })
};
var locale$2 = {
  code: "es",
  formatDistance: formatDistance$2,
  formatLong: formatLong$2,
  formatRelative: formatRelative$2,
  localize: localize$2,
  match: match$2,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 1
  }
};
var formatDistanceLocale$1 = {
  lessThanXSeconds: {
    one: "moins d’une seconde",
    other: "moins de {{count}} secondes"
  },
  xSeconds: {
    one: "1 seconde",
    other: "{{count}} secondes"
  },
  halfAMinute: "30 secondes",
  lessThanXMinutes: {
    one: "moins d’une minute",
    other: "moins de {{count}} minutes"
  },
  xMinutes: {
    one: "1 minute",
    other: "{{count}} minutes"
  },
  aboutXHours: {
    one: "environ 1 heure",
    other: "environ {{count}} heures"
  },
  xHours: {
    one: "1 heure",
    other: "{{count}} heures"
  },
  xDays: {
    one: "1 jour",
    other: "{{count}} jours"
  },
  aboutXWeeks: {
    one: "environ 1 semaine",
    other: "environ {{count}} semaines"
  },
  xWeeks: {
    one: "1 semaine",
    other: "{{count}} semaines"
  },
  aboutXMonths: {
    one: "environ 1 mois",
    other: "environ {{count}} mois"
  },
  xMonths: {
    one: "1 mois",
    other: "{{count}} mois"
  },
  aboutXYears: {
    one: "environ 1 an",
    other: "environ {{count}} ans"
  },
  xYears: {
    one: "1 an",
    other: "{{count}} ans"
  },
  overXYears: {
    one: "plus d’un an",
    other: "plus de {{count}} ans"
  },
  almostXYears: {
    one: "presqu’un an",
    other: "presque {{count}} ans"
  }
};
var formatDistance$1 = function formatDistance3(token, count, options) {
  var result;
  var form2 = formatDistanceLocale$1[token];
  if (typeof form2 === "string") {
    result = form2;
  } else if (count === 1) {
    result = form2.one;
  } else {
    result = form2.other.replace("{{count}}", String(count));
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return "dans " + result;
    } else {
      return "il y a " + result;
    }
  }
  return result;
};
var dateFormats$1 = {
  full: "EEEE d MMMM y",
  long: "d MMMM y",
  medium: "d MMM y",
  short: "dd/MM/y"
};
var timeFormats$1 = {
  full: "HH:mm:ss zzzz",
  long: "HH:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats$1 = {
  full: "{{date}} 'à' {{time}}",
  long: "{{date}} 'à' {{time}}",
  medium: "{{date}}, {{time}}",
  short: "{{date}}, {{time}}"
};
var formatLong$1 = {
  date: buildFormatLongFn({
    formats: dateFormats$1,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats$1,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats$1,
    defaultWidth: "full"
  })
};
var formatRelativeLocale$1 = {
  lastWeek: "eeee 'dernier à' p",
  yesterday: "'hier à' p",
  today: "'aujourd’hui à' p",
  tomorrow: "'demain à' p'",
  nextWeek: "eeee 'prochain à' p",
  other: "P"
};
var formatRelative$1 = function formatRelative3(token, _date, _baseDate, _options) {
  return formatRelativeLocale$1[token];
};
var eraValues$1 = {
  narrow: ["av. J.-C", "ap. J.-C"],
  abbreviated: ["av. J.-C", "ap. J.-C"],
  wide: ["avant Jésus-Christ", "après Jésus-Christ"]
};
var quarterValues$1 = {
  narrow: ["T1", "T2", "T3", "T4"],
  abbreviated: ["1er trim.", "2ème trim.", "3ème trim.", "4ème trim."],
  wide: ["1er trimestre", "2ème trimestre", "3ème trimestre", "4ème trimestre"]
};
var monthValues$1 = {
  narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
  abbreviated: ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
  wide: ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"]
};
var dayValues$1 = {
  narrow: ["D", "L", "M", "M", "J", "V", "S"],
  short: ["di", "lu", "ma", "me", "je", "ve", "sa"],
  abbreviated: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  wide: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
};
var dayPeriodValues$1 = {
  narrow: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "mat.",
    afternoon: "ap.m.",
    evening: "soir",
    night: "mat."
  },
  abbreviated: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "matin",
    afternoon: "après-midi",
    evening: "soir",
    night: "matin"
  },
  wide: {
    am: "AM",
    pm: "PM",
    midnight: "minuit",
    noon: "midi",
    morning: "du matin",
    afternoon: "de l’après-midi",
    evening: "du soir",
    night: "du matin"
  }
};
var ordinalNumber$1 = function ordinalNumber3(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = options === null || options === void 0 ? void 0 : options.unit;
  if (number === 0) return "0";
  var feminineUnits = ["year", "week", "hour", "minute", "second"];
  var suffix;
  if (number === 1) {
    suffix = unit && feminineUnits.includes(unit) ? "ère" : "er";
  } else {
    suffix = "ème";
  }
  return number + suffix;
};
var localize$1 = {
  ordinalNumber: ordinalNumber$1,
  era: buildLocalizeFn({
    values: eraValues$1,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues$1,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback3(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues$1,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues$1,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues$1,
    defaultWidth: "wide"
  })
};
var matchOrdinalNumberPattern$1 = /^(\d+)(ième|ère|ème|er|e)?/i;
var parseOrdinalNumberPattern$1 = /\d+/i;
var matchEraPatterns$1 = {
  narrow: /^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,
  abbreviated: /^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,
  wide: /^(avant Jésus-Christ|après Jésus-Christ)/i
};
var parseEraPatterns$1 = {
  any: [/^av/i, /^ap/i]
};
var matchQuarterPatterns$1 = {
  narrow: /^T?[1234]/i,
  abbreviated: /^[1234](er|ème|e)? trim\.?/i,
  wide: /^[1234](er|ème|e)? trimestre/i
};
var parseQuarterPatterns$1 = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns$1 = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,
  wide: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i
};
var parseMonthPatterns$1 = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^av/i, /^ma/i, /^juin/i, /^juil/i, /^ao/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns$1 = {
  narrow: /^[lmjvsd]/i,
  short: /^(di|lu|ma|me|je|ve|sa)/i,
  abbreviated: /^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,
  wide: /^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i
};
var parseDayPatterns$1 = {
  narrow: [/^d/i, /^l/i, /^m/i, /^m/i, /^j/i, /^v/i, /^s/i],
  any: [/^di/i, /^lu/i, /^ma/i, /^me/i, /^je/i, /^ve/i, /^sa/i]
};
var matchDayPeriodPatterns$1 = {
  narrow: /^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,
  any: /^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i
};
var parseDayPeriodPatterns$1 = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^min/i,
    noon: /^mid/i,
    morning: /mat/i,
    afternoon: /ap/i,
    evening: /soir/i,
    night: /nuit/i
  }
};
var match$1 = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern$1,
    parsePattern: parseOrdinalNumberPattern$1,
    valueCallback: function valueCallback5(value) {
      return parseInt(value);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns$1,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns$1,
    defaultParseWidth: "any",
    valueCallback: function valueCallback6(index2) {
      return index2 + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns$1,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns$1,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns$1,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns$1,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns$1,
    defaultParseWidth: "any"
  })
};
var locale$1 = {
  code: "fr",
  formatDistance: formatDistance$1,
  formatLong: formatLong$1,
  formatRelative: formatRelative$1,
  localize: localize$1,
  match: match$1,
  options: {
    weekStartsOn: 1,
    firstWeekContainsDate: 4
  }
};
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: "1초 미만",
    other: "{{count}}초 미만"
  },
  xSeconds: {
    one: "1초",
    other: "{{count}}초"
  },
  halfAMinute: "30초",
  lessThanXMinutes: {
    one: "1분 미만",
    other: "{{count}}분 미만"
  },
  xMinutes: {
    one: "1분",
    other: "{{count}}분"
  },
  aboutXHours: {
    one: "약 1시간",
    other: "약 {{count}}시간"
  },
  xHours: {
    one: "1시간",
    other: "{{count}}시간"
  },
  xDays: {
    one: "1일",
    other: "{{count}}일"
  },
  aboutXWeeks: {
    one: "약 1주",
    other: "약 {{count}}주"
  },
  xWeeks: {
    one: "1주",
    other: "{{count}}주"
  },
  aboutXMonths: {
    one: "약 1개월",
    other: "약 {{count}}개월"
  },
  xMonths: {
    one: "1개월",
    other: "{{count}}개월"
  },
  aboutXYears: {
    one: "약 1년",
    other: "약 {{count}}년"
  },
  xYears: {
    one: "1년",
    other: "{{count}}년"
  },
  overXYears: {
    one: "1년 이상",
    other: "{{count}}년 이상"
  },
  almostXYears: {
    one: "거의 1년",
    other: "거의 {{count}}년"
  }
};
var formatDistance4 = function formatDistance5(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === "string") {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace("{{count}}", count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return result + " 후";
    } else {
      return result + " 전";
    }
  }
  return result;
};
var dateFormats = {
  full: "y년 M월 d일 EEEE",
  long: "y년 M월 d일",
  medium: "y.MM.dd",
  short: "y.MM.dd"
};
var timeFormats = {
  full: "a H시 mm분 ss초 zzzz",
  long: "a H:mm:ss z",
  medium: "HH:mm:ss",
  short: "HH:mm"
};
var dateTimeFormats = {
  full: "{{date}} {{time}}",
  long: "{{date}} {{time}}",
  medium: "{{date}} {{time}}",
  short: "{{date}} {{time}}"
};
var formatLong = {
  date: buildFormatLongFn({
    formats: dateFormats,
    defaultWidth: "full"
  }),
  time: buildFormatLongFn({
    formats: timeFormats,
    defaultWidth: "full"
  }),
  dateTime: buildFormatLongFn({
    formats: dateTimeFormats,
    defaultWidth: "full"
  })
};
var formatRelativeLocale = {
  lastWeek: "'지난' eeee p",
  yesterday: "'어제' p",
  today: "'오늘' p",
  tomorrow: "'내일' p",
  nextWeek: "'다음' eeee p",
  other: "P"
};
var formatRelative4 = function formatRelative5(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
var eraValues = {
  narrow: ["BC", "AD"],
  abbreviated: ["BC", "AD"],
  wide: ["기원전", "서기"]
};
var quarterValues = {
  narrow: ["1", "2", "3", "4"],
  abbreviated: ["Q1", "Q2", "Q3", "Q4"],
  wide: ["1분기", "2분기", "3분기", "4분기"]
};
var monthValues = {
  narrow: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
  abbreviated: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
  wide: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
};
var dayValues = {
  narrow: ["일", "월", "화", "수", "목", "금", "토"],
  short: ["일", "월", "화", "수", "목", "금", "토"],
  abbreviated: ["일", "월", "화", "수", "목", "금", "토"],
  wide: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
};
var dayPeriodValues = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  abbreviated: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  },
  wide: {
    am: "오전",
    pm: "오후",
    midnight: "자정",
    noon: "정오",
    morning: "아침",
    afternoon: "오후",
    evening: "저녁",
    night: "밤"
  }
};
var ordinalNumber4 = function ordinalNumber5(dirtyNumber, options) {
  var number = Number(dirtyNumber);
  var unit = String(options === null || options === void 0 ? void 0 : options.unit);
  switch (unit) {
    case "minute":
    case "second":
      return String(number);
    case "date":
      return number + "일";
    default:
      return number + "번째";
  }
};
var localize = {
  ordinalNumber: ordinalNumber4,
  era: buildLocalizeFn({
    values: eraValues,
    defaultWidth: "wide"
  }),
  quarter: buildLocalizeFn({
    values: quarterValues,
    defaultWidth: "wide",
    argumentCallback: function argumentCallback4(quarter) {
      return quarter - 1;
    }
  }),
  month: buildLocalizeFn({
    values: monthValues,
    defaultWidth: "wide"
  }),
  day: buildLocalizeFn({
    values: dayValues,
    defaultWidth: "wide"
  }),
  dayPeriod: buildLocalizeFn({
    values: dayPeriodValues,
    defaultWidth: "wide",
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: "wide"
  })
};
var matchOrdinalNumberPattern = /^(\d+)(일|번째)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(기원전|서기)/i
};
var parseEraPatterns = {
  any: [/^(bc|기원전)/i, /^(ad|서기)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234]사?분기/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^(1[012]|[123456789])/,
  abbreviated: /^(1[012]|[123456789])월/i,
  wide: /^(1[012]|[123456789])월/i
};
var parseMonthPatterns = {
  any: [/^1월?$/, /^2/, /^3/, /^4/, /^5/, /^6/, /^7/, /^8/, /^9/, /^10/, /^11/, /^12/]
};
var matchDayPatterns = {
  narrow: /^[일월화수목금토]/,
  short: /^[일월화수목금토]/,
  abbreviated: /^[일월화수목금토]/,
  wide: /^[일월화수목금토]요일/
};
var parseDayPatterns = {
  any: [/^일/, /^월/, /^화/, /^수/, /^목/, /^금/, /^토/]
};
var matchDayPeriodPatterns = {
  any: /^(am|pm|오전|오후|자정|정오|아침|저녁|밤)/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^(am|오전)/i,
    pm: /^(pm|오후)/i,
    midnight: /^자정/i,
    noon: /^정오/i,
    morning: /^아침/i,
    afternoon: /^오후/i,
    evening: /^저녁/i,
    night: /^밤/i
  }
};
var match = {
  ordinalNumber: buildMatchPatternFn({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback7(value) {
      return parseInt(value, 10);
    }
  }),
  era: buildMatchFn({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseEraPatterns,
    defaultParseWidth: "any"
  }),
  quarter: buildMatchFn({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: "any",
    valueCallback: function valueCallback8(index2) {
      return index2 + 1;
    }
  }),
  month: buildMatchFn({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: "any"
  }),
  day: buildMatchFn({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: "wide",
    parsePatterns: parseDayPatterns,
    defaultParseWidth: "any"
  }),
  dayPeriod: buildMatchFn({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: "any",
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: "any"
  })
};
var locale = {
  code: "ko",
  formatDistance: formatDistance4,
  formatLong,
  formatRelative: formatRelative4,
  localize,
  match,
  options: {
    weekStartsOn: 0,
    firstWeekContainsDate: 1
  }
};
(function() {
  try {
    if (typeof document < "u") {
      var e2 = document.createElement("style");
      e2.appendChild(document.createTextNode(".v3dp__popout[data-v-65eb861b]{z-index:10;position:absolute;text-align:center;width:17.5em;background-color:var(--popout-bg-color);box-shadow:var(--box-shadow);border-radius:var(--border-radius);padding:8px 0 1em;color:var(--text-color)}.v3dp__popout *[data-v-65eb861b]{color:inherit;font-size:inherit;font-weight:inherit}.v3dp__popout[data-v-65eb861b] button{background:none;border:none;outline:none}.v3dp__popout[data-v-65eb861b] button:not(:disabled){cursor:pointer}.v3dp__heading[data-v-65eb861b]{width:100%;display:flex;height:var(--heading-size);line-height:var(--heading-size);font-weight:var(--heading-weight)}.v3dp__heading__button[data-v-65eb861b]{background:none;border:none;padding:0;display:flex;justify-content:center;align-items:center;width:var(--heading-size)}button.v3dp__heading__center[data-v-65eb861b]:hover,.v3dp__heading__button[data-v-65eb861b]:not(:disabled):hover{background-color:var(--heading-hover-color)}.v3dp__heading__center[data-v-65eb861b]{flex:1}.v3dp__heading__icon[data-v-65eb861b]{height:12px;stroke:var(--arrow-color)}.v3dp__heading__button:disabled .v3dp__heading__icon[data-v-65eb861b]{stroke:var(--elem-disabled-color)}.v3dp__subheading[data-v-65eb861b],.v3dp__elements[data-v-65eb861b]{display:grid;grid-template-columns:var(--popout-column-definition);font-size:var(--elem-font-size)}.v3dp__subheading[data-v-65eb861b]{margin-top:1em}.v3dp__divider[data-v-65eb861b]{border:1px solid var(--divider-color);border-radius:3px}.v3dp__elements[data-v-65eb861b] button:disabled{color:var(--elem-disabled-color)}.v3dp__elements[data-v-65eb861b] button{padding:.3em .6em}.v3dp__elements[data-v-65eb861b] button span{display:block;line-height:1.9em;height:1.8em;border-radius:var(--elem-border-radius)}.v3dp__elements[data-v-65eb861b] button:not(:disabled):hover span{background-color:var(--elem-hover-bg-color);color:var(--elem-hover-color)}.v3dp__elements[data-v-65eb861b] button.selected span{background-color:var(--elem-selected-bg-color);color:var(--elem-selected-color)}.v3dp__elements[data-v-65eb861b] button.current span{font-weight:var(--elem-current-font-weight);outline:1px solid var(--elem-current-outline-color)}.v3dp__column[data-v-81ac698d]{display:flex;flex-direction:column;overflow-y:auto;height:190px}.v3dp__datepicker{--popout-bg-color: var(--vdp-bg-color, #fff);--box-shadow: var( --vdp-box-shadow, 0 4px 10px 0 rgba(128, 144, 160, .1), 0 0 1px 0 rgba(128, 144, 160, .81) );--text-color: var(--vdp-text-color, #000000);--border-radius: var(--vdp-border-radius, 3px);--heading-size: var(--vdp-heading-size, 2.5em);--heading-weight: var(--vdp-heading-weight, bold);--heading-hover-color: var(--vdp-heading-hover-color, #eeeeee);--arrow-color: var(--vdp-arrow-color, currentColor);--elem-color: var(--vdp-elem-color, currentColor);--elem-disabled-color: var(--vdp-disabled-color, #d5d9e0);--elem-hover-color: var(--vdp-hover-color, #fff);--elem-hover-bg-color: var(--vdp-hover-bg-color, #0baf74);--elem-selected-color: var(--vdp-selected-color, #fff);--elem-selected-bg-color: var(--vdp-selected-bg-color, #0baf74);--elem-current-outline-color: var(--vdp-current-date-outline-color, #888);--elem-current-font-weight: var(--vdp-current-date-font-weight, bold);--elem-font-size: var(--vdp-elem-font-size, .8em);--elem-border-radius: var(--vdp-elem-border-radius, 3px);--divider-color: var(--vdp-divider-color, var(--elem-disabled-color));position:relative}.v3dp__clearable{display:inline;position:relative;left:-15px;cursor:pointer}")), document.head.appendChild(e2);
    }
  } catch (o) {
    console.error("vite-plugin-css-injected-by-js", o);
  }
})();
const je = ["year", "month", "day", "time", "custom"], Ye = defineComponent({
  emits: {
    elementClick: (e2) => isValid(e2),
    left: () => true,
    right: () => true,
    heading: () => true
  },
  props: {
    headingClickable: {
      type: Boolean,
      default: false
    },
    leftDisabled: {
      type: Boolean,
      default: false
    },
    rightDisabled: {
      type: Boolean,
      default: false
    },
    columnCount: {
      type: Number,
      default: 7
    },
    items: {
      type: Array,
      default: () => []
    },
    viewMode: {
      type: String,
      required: true,
      validate: (e2) => typeof e2 == "string" && je.includes(e2)
    }
  }
});
const T2 = (e2, t2) => {
  const r = e2.__vccOpts || e2;
  for (const [l, o] of t2)
    r[l] = o;
  return r;
}, te = (e2) => (pushScopeId("data-v-65eb861b"), e2 = e2(), popScopeId(), e2), Ne = { class: "v3dp__heading" }, Ae = ["disabled"], Ue = /* @__PURE__ */ te(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "v3dp__heading__icon",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 6 8"
}, [
  /* @__PURE__ */ createElementVNode("g", {
    fill: "none",
    "fill-rule": "evenodd"
  }, [
    /* @__PURE__ */ createElementVNode("path", {
      stroke: "none",
      d: "M-9 16V-8h24v24z"
    }),
    /* @__PURE__ */ createElementVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M5 0L1 4l4 4"
    })
  ])
], -1)), We = ["disabled"], Ze = /* @__PURE__ */ te(() => /* @__PURE__ */ createElementVNode("svg", {
  class: "v3dp__heading__icon",
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 6 8"
}, [
  /* @__PURE__ */ createElementVNode("g", {
    fill: "none",
    "fill-rule": "evenodd"
  }, [
    /* @__PURE__ */ createElementVNode("path", {
      stroke: "none",
      d: "M15-8v24H-9V-8z"
    }),
    /* @__PURE__ */ createElementVNode("path", {
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      d: "M1 8l4-4-4-4"
    })
  ])
], -1)), ze = { class: "v3dp__body" }, Ke = { class: "v3dp__subheading" }, Ge = /* @__PURE__ */ te(() => /* @__PURE__ */ createElementVNode("hr", { class: "v3dp__divider" }, null, -1)), Je = { class: "v3dp__elements" }, Qe = ["disabled", "onClick"];
function Xe(e2, t2, r, l, o, p) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["v3dp__popout", `v3dp__popout-${e2.viewMode}`]),
    style: normalizeStyle({ ["--popout-column-definition"]: `repeat(${e2.columnCount}, 1fr)` }),
    onMousedown: t2[3] || (t2[3] = withModifiers(() => {
    }, ["prevent"]))
  }, [
    createElementVNode("div", Ne, [
      createElementVNode("button", {
        class: "v3dp__heading__button v3dp__heading__button__left",
        disabled: e2.leftDisabled,
        onClick: t2[0] || (t2[0] = withModifiers((n) => e2.$emit("left"), ["stop", "prevent"]))
      }, [
        renderSlot(e2.$slots, "arrow-left", {}, () => [
          Ue
        ], true)
      ], 8, Ae),
      (openBlock(), createBlock(resolveDynamicComponent(e2.headingClickable ? "button" : "span"), {
        class: "v3dp__heading__center",
        onClick: t2[1] || (t2[1] = withModifiers((n) => e2.$emit("heading"), ["stop", "prevent"]))
      }, {
        default: withCtx(() => [
          renderSlot(e2.$slots, "heading", {}, void 0, true)
        ]),
        _: 3
      })),
      createElementVNode("button", {
        class: "v3dp__heading__button v3dp__heading__button__right",
        disabled: e2.rightDisabled,
        onClick: t2[2] || (t2[2] = withModifiers((n) => e2.$emit("right"), ["stop", "prevent"]))
      }, [
        renderSlot(e2.$slots, "arrow-right", {}, () => [
          Ze
        ], true)
      ], 8, We)
    ]),
    createElementVNode("div", ze, [
      "subheading" in e2.$slots ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createElementVNode("div", Ke, [
          renderSlot(e2.$slots, "subheading", {}, void 0, true)
        ]),
        Ge
      ], 64)) : createCommentVNode("", true),
      createElementVNode("div", Je, [
        renderSlot(e2.$slots, "body", {}, () => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(e2.items, (n) => (openBlock(), createElementBlock("button", {
            key: n.key,
            disabled: n.disabled,
            class: normalizeClass([
              {
                selected: n.selected,
                current: n.current
              },
              `v3dp__element__button__${e2.viewMode}`
            ]),
            onClick: withModifiers((a3) => e2.$emit("elementClick", n.value), ["stop", "prevent"])
          }, [
            createElementVNode("span", null, toDisplayString(n.display), 1)
          ], 10, Qe))), 128))
        ], true)
      ])
    ])
  ], 38);
}
const G2 = /* @__PURE__ */ T2(Ye, [["render", Xe], ["__scopeId", "data-v-65eb861b"]]), xe = defineComponent({
  components: {
    PickerPopup: G2
  },
  emits: {
    "update:pageDate": (e2) => isValid(e2),
    select: (e2) => isValid(e2)
  },
  props: {
    selected: {
      type: Date,
      required: false
    },
    pageDate: {
      type: Date,
      required: true
    },
    lowerLimit: {
      type: Date,
      required: false
    },
    upperLimit: {
      type: Date,
      required: false
    }
  },
  setup(e2, { emit: t2 }) {
    const r = computed(() => startOfDecade(e2.pageDate)), l = computed(() => endOfDecade(e2.pageDate)), o = (b2, y3, i2) => !y3 && !i2 ? true : !(y3 && getYear(b2) < getYear(y3) || i2 && getYear(b2) > getYear(i2)), p = computed(
      () => eachYearOfInterval({
        start: r.value,
        end: l.value
      }).map(
        (b2) => ({
          value: b2,
          key: String(getYear(b2)),
          display: getYear(b2),
          selected: !!e2.selected && getYear(b2) === getYear(e2.selected),
          disabled: !o(b2, e2.lowerLimit, e2.upperLimit)
        })
      )
    ), n = computed(() => {
      const b2 = getYear(r.value), y3 = getYear(l.value);
      return `${b2} - ${y3}`;
    }), a3 = computed(
      () => e2.lowerLimit && (getDecade(e2.lowerLimit) === getDecade(e2.pageDate) || isBefore(e2.pageDate, e2.lowerLimit))
    ), f = computed(
      () => e2.upperLimit && (getDecade(e2.upperLimit) === getDecade(e2.pageDate) || isAfter(e2.pageDate, e2.upperLimit))
    );
    return {
      years: p,
      heading: n,
      leftDisabled: a3,
      rightDisabled: f,
      previousPage: () => t2("update:pageDate", subYears(e2.pageDate, 10)),
      nextPage: () => t2("update:pageDate", addYears(e2.pageDate, 10))
    };
  }
});
function et(e2, t2, r, l, o, p) {
  const n = resolveComponent("picker-popup");
  return openBlock(), createBlock(n, {
    columnCount: 3,
    leftDisabled: e2.leftDisabled,
    rightDisabled: e2.rightDisabled,
    items: e2.years,
    viewMode: "year",
    onLeft: e2.previousPage,
    onRight: e2.nextPage,
    onElementClick: t2[0] || (t2[0] = (a3) => e2.$emit("select", a3))
  }, {
    heading: withCtx(() => [
      createTextVNode(toDisplayString(e2.heading), 1)
    ]),
    _: 1
  }, 8, ["leftDisabled", "rightDisabled", "items", "onLeft", "onRight"]);
}
const tt = /* @__PURE__ */ T2(xe, [["render", et]]), at = defineComponent({
  components: {
    PickerPopup: G2
  },
  emits: {
    "update:pageDate": (e2) => isValid(e2),
    select: (e2) => isValid(e2),
    back: () => true
  },
  props: {
    /**
     * Currently selected date, needed for highlighting
     */
    selected: {
      type: Date,
      required: false
    },
    pageDate: {
      type: Date,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: "LLL"
    },
    locale: {
      type: Object,
      required: false
    },
    lowerLimit: {
      type: Date,
      required: false
    },
    upperLimit: {
      type: Date,
      required: false
    }
  },
  setup(e2, { emit: t2 }) {
    const r = computed(() => startOfYear(e2.pageDate)), l = computed(() => endOfYear(e2.pageDate)), o = computed(
      () => (y3) => format(y3, e2.format, {
        locale: e2.locale
      })
    ), p = (y3, i2, D2) => !i2 && !D2 ? true : !(i2 && isBefore(y3, startOfMonth(i2)) || D2 && isAfter(y3, endOfMonth(D2))), n = computed(
      () => eachMonthOfInterval({
        start: r.value,
        end: l.value
      }).map(
        (y3) => ({
          value: y3,
          display: o.value(y3),
          key: o.value(y3),
          selected: !!e2.selected && isSameMonth(e2.selected, y3),
          disabled: !p(y3, e2.lowerLimit, e2.upperLimit)
        })
      )
    ), a3 = computed(() => getYear(r.value)), f = computed(
      () => e2.lowerLimit && (isSameYear(e2.lowerLimit, e2.pageDate) || isBefore(e2.pageDate, e2.lowerLimit))
    ), _ = computed(
      () => e2.upperLimit && (isSameYear(e2.upperLimit, e2.pageDate) || isAfter(e2.pageDate, e2.upperLimit))
    );
    return {
      months: n,
      heading: a3,
      leftDisabled: f,
      rightDisabled: _,
      previousPage: () => t2("update:pageDate", subYears(e2.pageDate, 1)),
      nextPage: () => t2("update:pageDate", addYears(e2.pageDate, 1))
    };
  }
});
function nt(e2, t2, r, l, o, p) {
  const n = resolveComponent("picker-popup");
  return openBlock(), createBlock(n, {
    headingClickable: "",
    columnCount: 3,
    items: e2.months,
    leftDisabled: e2.leftDisabled,
    rightDisabled: e2.rightDisabled,
    viewMode: "month",
    onLeft: e2.previousPage,
    onRight: e2.nextPage,
    onHeading: t2[0] || (t2[0] = (a3) => e2.$emit("back")),
    onElementClick: t2[1] || (t2[1] = (a3) => e2.$emit("select", a3))
  }, {
    heading: withCtx(() => [
      createTextVNode(toDisplayString(e2.heading), 1)
    ]),
    _: 1
  }, 8, ["items", "leftDisabled", "rightDisabled", "onLeft", "onRight"]);
}
const it = /* @__PURE__ */ T2(at, [["render", nt]]), lt = defineComponent({
  components: {
    PickerPopup: G2
  },
  emits: {
    "update:pageDate": (e2) => isValid(e2),
    select: (e2) => isValid(e2),
    back: () => true
  },
  props: {
    selected: {
      type: Date,
      required: false
    },
    pageDate: {
      type: Date,
      required: true
    },
    format: {
      type: String,
      required: false,
      default: "dd"
    },
    headingFormat: {
      type: String,
      required: false,
      default: "LLLL yyyy"
    },
    weekdayFormat: {
      type: String,
      required: false,
      default: "EE"
    },
    locale: {
      type: Object,
      required: false
    },
    weekStartsOn: {
      type: Number,
      required: false,
      default: 1,
      validator: (e2) => typeof e2 == "number" && Number.isInteger(e2) && e2 >= 0 && e2 <= 6
    },
    lowerLimit: {
      type: Date,
      required: false
    },
    upperLimit: {
      type: Date,
      required: false
    },
    disabledDates: {
      type: Object,
      required: false
    },
    allowOutsideInterval: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(e2, { emit: t2 }) {
    const r = computed(
      () => (g) => (v) => format(v, g, {
        locale: e2.locale,
        weekStartsOn: e2.weekStartsOn
      })
    ), l = computed(() => startOfMonth(e2.pageDate)), o = computed(() => endOfMonth(e2.pageDate)), p = computed(() => ({
      start: l.value,
      end: o.value
    })), n = computed(() => ({
      start: startOfWeek(l.value, {
        weekStartsOn: e2.weekStartsOn
      }),
      end: endOfWeek(o.value, {
        weekStartsOn: e2.weekStartsOn
      })
    })), a3 = computed(() => {
      const g = e2.weekStartsOn, v = r.value(e2.weekdayFormat);
      return Array.from(Array(7)).map((c2, k2) => (g + k2) % 7).map(
        (c2) => setDay(/* @__PURE__ */ new Date(), c2, {
          weekStartsOn: e2.weekStartsOn
        })
      ).map(v);
    }), f = (g, v, c2, k2) => {
      var E2, J;
      return (E2 = k2 == null ? void 0 : k2.dates) != null && E2.some((ae) => isSameDay(g, ae)) || (J = k2 == null ? void 0 : k2.predicate) != null && J.call(k2, g) ? false : !v && !c2 ? true : !(v && isBefore(g, startOfDay(v)) || c2 && isAfter(g, endOfDay(c2)));
    }, _ = computed(() => {
      const g = /* @__PURE__ */ new Date(), v = r.value(e2.format);
      return eachDayOfInterval(n.value).map(
        (c2) => ({
          value: c2,
          display: v(c2),
          selected: !!e2.selected && isSameDay(e2.selected, c2),
          current: isSameDay(g, c2),
          disabled: !e2.allowOutsideInterval && !isWithinInterval(c2, p.value) || !f(
            c2,
            e2.lowerLimit,
            e2.upperLimit,
            e2.disabledDates
          ),
          key: r.value("yyyy-MM-dd")(c2)
        })
      );
    }), d3 = computed(
      () => r.value(e2.headingFormat)(e2.pageDate)
    ), b2 = computed(
      () => e2.lowerLimit && (isSameMonth(e2.lowerLimit, e2.pageDate) || isBefore(e2.pageDate, e2.lowerLimit))
    ), y3 = computed(
      () => e2.upperLimit && (isSameMonth(e2.upperLimit, e2.pageDate) || isAfter(e2.pageDate, e2.upperLimit))
    );
    return {
      weekDays: a3,
      days: _,
      heading: d3,
      leftDisabled: b2,
      rightDisabled: y3,
      previousPage: () => t2("update:pageDate", subMonths(e2.pageDate, 1)),
      nextPage: () => t2("update:pageDate", addMonths(e2.pageDate, 1))
    };
  }
});
function ot(e2, t2, r, l, o, p) {
  const n = resolveComponent("picker-popup");
  return openBlock(), createBlock(n, {
    headingClickable: "",
    leftDisabled: e2.leftDisabled,
    rightDisabled: e2.rightDisabled,
    items: e2.days,
    viewMode: "day",
    onLeft: e2.previousPage,
    onRight: e2.nextPage,
    onHeading: t2[0] || (t2[0] = (a3) => e2.$emit("back")),
    onElementClick: t2[1] || (t2[1] = (a3) => e2.$emit("select", a3))
  }, {
    heading: withCtx(() => [
      createTextVNode(toDisplayString(e2.heading), 1)
    ]),
    subheading: withCtx(() => [
      (openBlock(true), createElementBlock(Fragment, null, renderList(e2.weekDays, (a3, f) => (openBlock(), createElementBlock("span", {
        key: a3,
        class: normalizeClass(`v3dp__subheading__weekday__${f}`)
      }, toDisplayString(a3), 3))), 128))
    ]),
    _: 1
  }, 8, ["leftDisabled", "rightDisabled", "items", "onLeft", "onRight"]);
}
const st = /* @__PURE__ */ T2(lt, [["render", ot]]);
function se(e2, t2) {
  const r = e2.getBoundingClientRect(), l = {
    height: e2.clientHeight,
    width: e2.clientWidth
  }, o = t2.getBoundingClientRect();
  if (!(o.top >= r.top && o.bottom <= r.top + l.height)) {
    const n = o.top - r.top, a3 = o.bottom - r.bottom;
    Math.abs(n) < Math.abs(a3) ? e2.scrollTop += n : e2.scrollTop += a3;
  }
}
const rt = defineComponent({
  components: {
    PickerPopup: G2
  },
  emits: {
    select: (e2) => isValid(e2),
    back: () => true
  },
  props: {
    selected: {
      type: Date,
      required: false
    },
    pageDate: {
      type: Date,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    disabledTime: {
      type: Object,
      required: false
    }
  },
  setup(e2, { emit: t2 }) {
    const r = ref(null), l = ref(null), o = computed(() => e2.pageDate ?? e2.selected), p = ref(o.value.getHours()), n = ref(o.value.getMinutes());
    watch(
      () => e2.selected,
      (i2) => {
        let D2 = 0, g = 0;
        i2 && (D2 = i2.getHours(), g = i2.getMinutes()), p.value = D2, n.value = g;
      }
    );
    const a3 = computed(
      () => [...Array(24).keys()].map(
        (i2) => ({
          value: i2,
          date: set(new Date(o.value.getTime()), {
            hours: i2,
            minutes: n.value,
            seconds: 0
          }),
          selected: p.value === i2,
          ref: ref(null)
        })
      )
    ), f = computed(
      () => [...Array(60).keys()].map((i2) => ({
        value: i2,
        date: set(new Date(o.value.getTime()), {
          hours: p.value,
          minutes: i2,
          seconds: 0
        }),
        selected: n.value === i2,
        ref: ref(null)
      }))
    ), _ = (i2) => {
      n.value = i2.value, t2("select", i2.date);
    }, d3 = () => {
      const i2 = a3.value.find(
        (g) => {
          var v, c2;
          return ((c2 = (v = g.ref.value) == null ? void 0 : v.classList) == null ? void 0 : c2.contains("selected")) ?? false;
        }
      ), D2 = f.value.find(
        (g) => {
          var v, c2;
          return ((c2 = (v = g.ref.value) == null ? void 0 : v.classList) == null ? void 0 : c2.contains("selected")) ?? false;
        }
      );
      i2 && D2 && (se(r.value, i2.ref.value), se(l.value, D2.ref.value));
    };
    return watch(
      () => e2.visible,
      (i2) => {
        i2 && nextTick(d3);
      }
    ), {
      hoursListRef: r,
      minutesListRef: l,
      hours: p,
      minutes: n,
      hoursList: a3,
      minutesList: f,
      padStartZero: (i2) => `0${i2}`.substr(-2),
      selectMinutes: _,
      isEnabled: (i2) => {
        var D2, g, v, c2;
        return !((g = (D2 = e2.disabledTime) == null ? void 0 : D2.dates) != null && g.some(
          (k2) => isSameHour(i2, k2) && isSameMinute(i2, k2)
        ) || (c2 = (v = e2.disabledTime) == null ? void 0 : v.predicate) != null && c2.call(v, i2));
      },
      scroll: d3
    };
  }
});
const dt = {
  ref: "hoursListRef",
  class: "v3dp__column"
}, ut = ["disabled", "onClick"], ct = {
  ref: "minutesListRef",
  class: "v3dp__column"
}, mt = ["disabled", "onClick"];
function ft(e2, t2, r, l, o, p) {
  const n = resolveComponent("picker-popup");
  return openBlock(), createBlock(n, {
    headingClickable: "",
    columnCount: 2,
    leftDisabled: true,
    rightDisabled: true,
    viewMode: "time",
    onHeading: t2[0] || (t2[0] = (a3) => e2.$emit("back"))
  }, {
    heading: withCtx(() => [
      createTextVNode(toDisplayString(e2.padStartZero(e2.hours)) + ":" + toDisplayString(e2.padStartZero(e2.minutes)), 1)
    ]),
    body: withCtx(() => [
      createElementVNode("div", dt, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e2.hoursList, (a3) => (openBlock(), createElementBlock("button", {
          key: a3.value,
          ref_for: true,
          ref: a3.ref,
          class: normalizeClass([{ selected: a3.selected }, "v3dp__element_button__hour"]),
          disabled: !e2.isEnabled(a3.date),
          onClick: withModifiers((f) => e2.hours = a3.value, ["stop", "prevent"])
        }, [
          createElementVNode("span", null, toDisplayString(e2.padStartZero(a3.value)), 1)
        ], 10, ut))), 128))
      ], 512),
      createElementVNode("div", ct, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(e2.minutesList, (a3) => (openBlock(), createElementBlock("button", {
          key: a3.value,
          ref_for: true,
          ref: a3.ref,
          class: normalizeClass([{ selected: a3.selected }, "v3dp__element_button__minute"]),
          disabled: !e2.isEnabled(a3.date),
          onClick: withModifiers((f) => e2.selectMinutes(a3), ["stop", "prevent"])
        }, [
          createElementVNode("span", null, toDisplayString(e2.padStartZero(a3.value)), 1)
        ], 10, mt))), 128))
      ], 512)
    ]),
    _: 1
  });
}
const pt = /* @__PURE__ */ T2(rt, [["render", ft], ["__scopeId", "data-v-81ac698d"]]), W = ["time", "day", "month", "year"], gt = (e2, t2, r = void 0) => {
  let l = r || /* @__PURE__ */ new Date();
  return e2 && (l = max([e2, l])), t2 && (l = min([t2, l])), l;
}, vt = defineComponent({
  components: {
    YearPicker: tt,
    MonthPicker: it,
    DayPicker: st,
    TimePicker: pt
  },
  inheritAttrs: false,
  props: {
    placeholder: {
      type: String,
      default: ""
    },
    /**
     * `v-model` for selected date
     */
    modelValue: {
      type: Date,
      required: false
    },
    /**
     * Dates not available for picking
     */
    disabledDates: {
      type: Object,
      required: false
    },
    allowOutsideInterval: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Time not available for picking
     */
    disabledTime: {
      type: Object,
      required: false
    },
    /**
     * Upper limit for available dates for picking
     */
    upperLimit: {
      type: Date,
      required: false
    },
    /**
     * Lower limit for available dates for picking
     */
    lowerLimit: {
      type: Date,
      required: false
    },
    /**
     * View on which the date picker should open. Can be either `year`, `month`, `day` or `time`
     */
    startingView: {
      type: String,
      required: false,
      default: "day",
      validate: (e2) => typeof e2 == "string" && W.includes(e2)
    },
    /**
     * Date which should be the "center" of the initial view.
     * When an empty datepicker opens, it focuses on the month/year
     * that contains this date
     */
    startingViewDate: {
      type: Date,
      required: false,
      default: () => /* @__PURE__ */ new Date()
    },
    /**
     * `date-fns`-type formatting for a month view heading
     */
    dayPickerHeadingFormat: {
      type: String,
      required: false,
      default: "LLLL yyyy"
    },
    /**
     * `date-fns`-type formatting for the month picker view
     */
    monthListFormat: {
      type: String,
      required: false,
      default: "LLL"
    },
    /**
     * `date-fns`-type formatting for a line of weekdays on day view
     */
    weekdayFormat: {
      type: String,
      required: false,
      default: "EE"
    },
    /**
     * `date-fns`-type formatting for the day picker view
     */
    dayFormat: {
      type: String,
      required: false,
      default: "dd"
    },
    /**
     * `date-fns`-type format in which the string in the input should be both
     * parsed and displayed
     */
    inputFormat: {
      type: String,
      required: false,
      default: "yyyy-MM-dd"
    },
    /**
     * [`date-fns` locale object](https://date-fns.org/v2.16.1/docs/I18n#usage).
     * Used in string formatting (see default `dayPickerHeadingFormat`)
     */
    locale: {
      type: Object,
      required: false
    },
    /**
     * Day on which the week should start.
     *
     * Number from 0 to 6, where 0 is Sunday and 6 is Saturday.
     * Week starts with a Monday (1) by default
     */
    weekStartsOn: {
      type: Number,
      required: false,
      default: 1,
      validator: (e2) => [0, 1, 2, 3, 4, 5, 6].includes(e2)
    },
    /**
     * Disables datepicker and prevents it's opening
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * Clears selected date
     */
    clearable: {
      type: Boolean,
      required: false,
      default: false
    },
    /*
     * Allows user to input date manually
     */
    typeable: {
      type: Boolean,
      required: false,
      default: false
    },
    /**
     * If set, lower-level views won't show
     */
    minimumView: {
      type: String,
      required: false,
      default: "day",
      validate: (e2) => typeof e2 == "string" && W.includes(e2)
    }
  },
  emits: {
    "update:modelValue": (e2) => e2 == null || isValid(e2),
    decadePageChanged: (e2) => true,
    yearPageChanged: (e2) => true,
    monthPageChanged: (e2) => true,
    opened: () => true,
    closed: () => true
  },
  setup(e2, { emit: t2, attrs: r }) {
    const l = ref("none"), o = ref(e2.startingViewDate), p = ref(null), n = ref(false), a3 = ref("");
    watchEffect(() => {
      const s3 = parse(a3.value, e2.inputFormat, /* @__PURE__ */ new Date(), {
        locale: e2.locale
      });
      isValid(s3) && (o.value = s3);
    }), watchEffect(
      () => a3.value = e2.modelValue && isValid(e2.modelValue) ? format(e2.modelValue, e2.inputFormat, {
        locale: e2.locale
      }) : ""
    );
    const f = (s3 = "none") => {
      e2.disabled || (s3 !== "none" && l.value === "none" && (o.value = e2.modelValue || gt(e2.lowerLimit, e2.upperLimit, o.value)), l.value = s3, t2(s3 !== "none" ? "opened" : "closed"));
    };
    watchEffect(() => {
      e2.disabled && (l.value = "none");
    });
    const _ = (s3, V) => {
      o.value = V, s3 === "year" ? t2("decadePageChanged", V) : s3 === "month" ? t2("yearPageChanged", V) : s3 === "day" && t2("monthPageChanged", V);
    }, d3 = (s3) => {
      o.value = s3, e2.minimumView === "year" ? (f("none"), t2("update:modelValue", s3)) : l.value = "month";
    }, b2 = (s3) => {
      o.value = s3, e2.minimumView === "month" ? (f("none"), t2("update:modelValue", s3)) : l.value = "day";
    }, y3 = (s3) => {
      o.value = s3, e2.minimumView === "day" ? (f("none"), t2("update:modelValue", s3)) : l.value = "time";
    }, i2 = (s3) => {
      f("none"), t2("update:modelValue", s3);
    }, D2 = () => {
      e2.clearable && (f("none"), t2("update:modelValue", null), o.value = e2.startingViewDate);
    }, g = () => n.value = true, v = () => f(E2.value), c2 = () => {
      n.value = false, f();
    }, k2 = (s3) => {
      const V = s3.keyCode ? s3.keyCode : s3.which;
      if ([
        27,
        // escape
        13
        // enter
      ].includes(V) && p.value.blur(), e2.typeable) {
        const Q2 = parse(
          p.value.value,
          e2.inputFormat,
          /* @__PURE__ */ new Date(),
          { locale: e2.locale }
        );
        isValid(Q2) && a3.value === format(Q2, e2.inputFormat, { locale: e2.locale }) && (a3.value = p.value.value, t2("update:modelValue", Q2));
      }
    }, E2 = computed(() => {
      const s3 = W.indexOf(e2.startingView), V = W.indexOf(e2.minimumView);
      return s3 < V ? e2.minimumView : e2.startingView;
    });
    return {
      blur: c2,
      focus: v,
      click: g,
      input: a3,
      inputRef: p,
      pageDate: o,
      renderView: f,
      updatePageDate: _,
      selectYear: d3,
      selectMonth: b2,
      selectDay: y3,
      selectTime: i2,
      keyUp: k2,
      viewShown: l,
      goBackFromTimepicker: () => e2.startingView === "time" && e2.minimumView === "time" ? null : l.value = "day",
      clearModelValue: D2,
      initialView: E2,
      log: (s3) => console.log(s3),
      variables: (s3) => Object.fromEntries(
        Object.entries(s3 ?? {}).filter(([V, fe]) => V.startsWith("--"))
      )
    };
  }
});
const yt = { class: "v3dp__input_wrapper" }, bt = ["readonly", "placeholder", "disabled", "tabindex"], ht = { class: "v3dp__clearable" };
function Dt(e2, t2, r, l, o, p) {
  const n = resolveComponent("year-picker"), a3 = resolveComponent("month-picker"), f = resolveComponent("day-picker"), _ = resolveComponent("time-picker");
  return openBlock(), createElementBlock("div", {
    class: "v3dp__datepicker",
    style: normalizeStyle(e2.variables(e2.$attrs.style))
  }, [
    createElementVNode("div", yt, [
      withDirectives(createElementVNode("input", mergeProps({
        type: "text",
        ref: "inputRef",
        readonly: !e2.typeable,
        "onUpdate:modelValue": t2[0] || (t2[0] = (d3) => e2.input = d3)
      }, e2.$attrs, {
        placeholder: e2.placeholder,
        disabled: e2.disabled,
        tabindex: e2.disabled ? -1 : 0,
        onKeyup: t2[1] || (t2[1] = (...d3) => e2.keyUp && e2.keyUp(...d3)),
        onBlur: t2[2] || (t2[2] = (...d3) => e2.blur && e2.blur(...d3)),
        onFocus: t2[3] || (t2[3] = (...d3) => e2.focus && e2.focus(...d3)),
        onClick: t2[4] || (t2[4] = (...d3) => e2.click && e2.click(...d3))
      }), null, 16, bt), [
        [vModelText, e2.input]
      ]),
      withDirectives(createElementVNode("div", ht, [
        renderSlot(e2.$slots, "clear", { onClear: e2.clearModelValue }, () => [
          createElementVNode("i", {
            onClick: t2[5] || (t2[5] = (d3) => e2.clearModelValue())
          }, "x")
        ])
      ], 512), [
        [vShow, e2.clearable && e2.modelValue]
      ])
    ]),
    withDirectives(createVNode(n, {
      pageDate: e2.pageDate,
      "onUpdate:pageDate": t2[6] || (t2[6] = (d3) => e2.updatePageDate("year", d3)),
      selected: e2.modelValue,
      lowerLimit: e2.lowerLimit,
      upperLimit: e2.upperLimit,
      onSelect: e2.selectYear
    }, null, 8, ["pageDate", "selected", "lowerLimit", "upperLimit", "onSelect"]), [
      [vShow, e2.viewShown === "year"]
    ]),
    withDirectives(createVNode(a3, {
      pageDate: e2.pageDate,
      "onUpdate:pageDate": t2[7] || (t2[7] = (d3) => e2.updatePageDate("month", d3)),
      selected: e2.modelValue,
      onSelect: e2.selectMonth,
      lowerLimit: e2.lowerLimit,
      upperLimit: e2.upperLimit,
      format: e2.monthListFormat,
      locale: e2.locale,
      onBack: t2[8] || (t2[8] = (d3) => e2.viewShown = "year")
    }, null, 8, ["pageDate", "selected", "onSelect", "lowerLimit", "upperLimit", "format", "locale"]), [
      [vShow, e2.viewShown === "month"]
    ]),
    withDirectives(createVNode(f, {
      pageDate: e2.pageDate,
      "onUpdate:pageDate": t2[9] || (t2[9] = (d3) => e2.updatePageDate("day", d3)),
      selected: e2.modelValue,
      weekStartsOn: e2.weekStartsOn,
      lowerLimit: e2.lowerLimit,
      upperLimit: e2.upperLimit,
      headingFormat: e2.dayPickerHeadingFormat,
      disabledDates: e2.disabledDates,
      locale: e2.locale,
      weekdayFormat: e2.weekdayFormat,
      "allow-outside-interval": e2.allowOutsideInterval,
      format: e2.dayFormat,
      onSelect: e2.selectDay,
      onBack: t2[10] || (t2[10] = (d3) => e2.viewShown = "month")
    }, null, 8, ["pageDate", "selected", "weekStartsOn", "lowerLimit", "upperLimit", "headingFormat", "disabledDates", "locale", "weekdayFormat", "allow-outside-interval", "format", "onSelect"]), [
      [vShow, e2.viewShown === "day"]
    ]),
    withDirectives(createVNode(_, {
      pageDate: e2.pageDate,
      visible: e2.viewShown === "time",
      selected: e2.modelValue,
      disabledTime: e2.disabledTime,
      onSelect: e2.selectTime,
      onBack: e2.goBackFromTimepicker
    }, null, 8, ["pageDate", "visible", "selected", "disabledTime", "onSelect", "onBack"]), [
      [vShow, e2.viewShown === "time"]
    ])
  ], 4);
}
const Lt = /* @__PURE__ */ T2(vt, [["render", Dt]]);
const _hoisted_1$d = ["data-cy"];
const _hoisted_2$c = ["data-cy"];
const _sfc_main$f = /* @__PURE__ */ Object.assign({ name: "FormDatepicker" }, {
  __name: "FormDatepicker",
  props: {
    ...commonProps,
    modelValue: { type: [Number, String, Date] },
    lang: { type: String, default: "fr" },
    dateFormat: { type: String },
    disableDatesLower: { type: Date },
    disableDatesUpper: { type: Date },
    // View on which the date picker should open: 'time' | 'day' | 'month' | 'year'
    startingView: { type: String, default: "day" },
    errors: {
      type: Object,
      default: () => {
      }
    }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const languages = { en: locale$3, es: locale$2, fr: locale$1, ko: locale };
    const { hasError, error } = useFormCommon(toRef(props, "name"), toRef(props, "errors"));
    const i18n = inject("i18n");
    const dateInput = ref(props.modelValue ? new Date(props.modelValue) : null);
    const language = computed(() => languages[props.lang]);
    const inputDateFormat = computed(() => {
      if (props.dateFormat) {
        return props.dateFormat;
      }
      return i18n("caareavlib.datepicker.date_format");
    });
    const isMondayFirst = computed(() => props.lang === "fr");
    const lowerLimit = computed(() => {
      if (props.disableDatesLower) {
        return props.disableDatesLower;
      }
      return null;
    });
    const upperLimit = computed(() => {
      if (props.disableDatesUpper) {
        return props.disableDatesUpper;
      }
      return null;
    });
    const getDataCy = computed(() => {
      return props.name.replace(/_/g, "-");
    });
    const getInputId = computed(() => {
      return "input-" + getDataCy.value;
    });
    const emit = __emit;
    const onUpdateModelValue = (newVal) => {
      dateInput.value = newVal;
      if (newVal === null) {
        emit("update:modelValue", null);
      } else {
        emit("update:modelValue", format(newVal, "yyyy-MM-dd"));
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createElementVNode("div", {
          "data-cy": getDataCy.value,
          class: normalizeClass(["date-picker input-group", { "is-invalid": unref(hasError) }])
        }, [
          createVNode(unref(Lt), {
            id: getInputId.value,
            "model-value": dateInput.value,
            class: normalizeClass(["date-picker-input form-control", { "is-invalid": unref(hasError) }]),
            locale: language.value,
            "week-starts-on": isMondayFirst.value ? 1 : 0,
            "input-format": inputDateFormat.value,
            "lower-limit": lowerLimit.value,
            "upper-limit": upperLimit.value,
            "starting-view": __props.startingView,
            "onUpdate:modelValue": onUpdateModelValue
          }, null, 8, ["id", "model-value", "class", "locale", "week-starts-on", "input-format", "lower-limit", "upper-limit", "starting-view"])
        ], 10, _hoisted_1$d),
        unref(hasError) ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: "invalid-feedback",
          "data-cy": _ctx.name + "-error"
        }, toDisplayString(unref(error)), 9, _hoisted_2$c)) : createCommentVNode("", true)
      ]);
    };
  }
});
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var lodash_debounce;
var hasRequiredLodash_debounce;
function requireLodash_debounce() {
  if (hasRequiredLodash_debounce) return lodash_debounce;
  hasRequiredLodash_debounce = 1;
  var FUNC_ERROR_TEXT = "Expected a function";
  var NAN = 0 / 0;
  var symbolTag = "[object Symbol]";
  var reTrim = /^\s+|\s+$/g;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  var objectProto = Object.prototype;
  var objectToString = objectProto.toString;
  var nativeMax = Math.max, nativeMin = Math.min;
  var now = function() {
    return root.Date.now();
  };
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject2(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result2 = wait - timeSinceLastCall;
      return maxing ? nativeMin(result2, maxWait - timeSinceLastInvoke) : result2;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  function isObject2(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
  }
  function isObjectLike(value) {
    return !!value && typeof value == "object";
  }
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject2(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject2(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, "");
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  lodash_debounce = debounce;
  return lodash_debounce;
}
var lodash_debounceExports = requireLodash_debounce();
const _debounce = /* @__PURE__ */ getDefaultExportFromCjs(lodash_debounceExports);
const _hoisted_1$c = ["id", "name", "placeholder", "type", "maxlength", "data-cy", "disabled", "min", "max"];
const _hoisted_2$b = {
  key: 0,
  class: "input-group-append"
};
const _hoisted_3$9 = ["data-cy"];
const _sfc_main$e = /* @__PURE__ */ Object.assign({ name: "FormInput" }, {
  __name: "FormInput",
  props: {
    ...commonProps,
    modelValue: { type: [Number, String] },
    type: { type: String, default: "text" },
    min: { type: Number, default: null },
    max: { type: Number, default: null },
    maxLength: { type: Number, default: null },
    placeholder: { type: String, default: "" },
    name: { type: String, required: true },
    debounceInput: { type: Boolean, default: false },
    debounceDelay: { type: Number, default: 1e3 },
    hasClearButton: { type: Boolean, default: false }
  },
  emits: ["keyboard-enter", "update:modelValue", "debounce:update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const internalModel = ref(props.modelValue);
    const emit = __emit;
    const { getId, hasError, inputRefName, error } = useFormCommon(
      toRef(props, "name"),
      toRef(props, "errors")
    );
    watch(internalModel, (newVal) => {
      props.debounceInput ? updateDebounceModel(newVal) : updateModel(newVal);
    });
    watch(
      () => props.modelValue,
      (newVal) => {
        internalModel.value = newVal;
      }
    );
    const updateModel = (newVal) => {
      emit("update:modelValue", newVal);
    };
    const updateDebounceModel = _debounce((newVal) => {
      updateModel(newVal);
      emit("debounce:update", newVal);
    }, props.debounceDelay);
    const vFocus = {
      mounted: (el) => {
        props.focus ? el.focus() : null;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(__props.hasClearButton ? "input-group d-flex align-items-center" : "")
      }, [
        withDirectives(createElementVNode("input", {
          id: unref(getId),
          ref: unref(inputRefName),
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => internalModel.value = $event),
          name: __props.name,
          placeholder: __props.placeholder,
          class: normalizeClass([[{ "is-invalid": unref(error) }, _ctx.inputClass], "padding-space"]),
          type: __props.type,
          maxlength: __props.maxLength,
          "data-cy": `input-${__props.name}`,
          disabled: _ctx.disabled,
          min: __props.min,
          max: __props.max,
          style: { "height": "44px" },
          onKeyup: _cache[1] || (_cache[1] = withKeys(($event) => _ctx.$emit("keyboard-enter", $event.target.value), ["enter"]))
        }, null, 42, _hoisted_1$c), [
          [vModelDynamic, internalModel.value],
          [vFocus]
        ]),
        __props.hasClearButton && _ctx.model.value ? (openBlock(), createElementBlock("div", _hoisted_2$b, _cache[2] || (_cache[2] = [
          createElementVNode("button", { class: "btn btn-icon font-size-22 text-secondary" }, [
            createElementVNode("i", {
              class: "icon-cross",
              "aria-hidden": "true"
            })
          ], -1)
        ]))) : createCommentVNode("", true),
        _ctx.help && !unref(hasError) ? (openBlock(), createElementBlock("small", {
          key: 1,
          class: normalizeClass(_ctx.helperClass)
        }, toDisplayString(_ctx.help), 3)) : createCommentVNode("", true),
        unref(hasError) ? (openBlock(), createElementBlock("div", {
          key: 2,
          class: "invalid-feedback text-left",
          "data-cy": __props.name + "-error"
        }, toDisplayString(unref(error)), 9, _hoisted_3$9)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const FormInput = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-a9500c5f"]]);
const _sfc_main$d = {
  name: "FormRadio",
  mixins: [FormElementMixin],
  props: {
    // value set in v-model on change
    option: { Type: String, required: true },
    modelValue: { Type: Boolean, required: true },
    disabled: { Type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  computed: {
    getId() {
      return "id-" + this.name + "-" + this.option;
    }
  }
};
const _hoisted_1$b = { class: "custom-control custom-radio" };
const _hoisted_2$a = ["id", "disabled", "data-cy", "value"];
const _hoisted_3$8 = ["for"];
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$b, [
    withDirectives(createElementVNode("input", {
      id: $options.getId,
      "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.inputVal = $event),
      class: normalizeClass(["custom-control-input", { "mouse-pointer": !$props.disabled }]),
      disabled: $props.disabled,
      "data-cy": _ctx.name + "-" + $props.option + "-radio",
      value: $props.option,
      type: "radio",
      onInput: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("update:modelValue", $event.target.value))
    }, null, 42, _hoisted_2$a), [
      [vModelRadio, _ctx.inputVal]
    ]),
    createElementVNode("label", {
      class: "custom-control-label",
      for: $options.getId
    }, toDisplayString(_ctx.label), 9, _hoisted_3$8)
  ]);
}
const FormRadio = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$8]]);
const _sfc_main$c = {
  name: "FormRow",
  props: {
    label: String,
    labelClass: { type: Array, default: () => ["col-sm-4", "text-right"] },
    controlClass: { type: Array, default: () => ["col-sm-8"] },
    forId: String,
    required: { type: Boolean, default: false },
    inline: { type: Boolean, default: true }
  }
};
const _hoisted_1$a = {
  key: 0,
  class: "row"
};
const _hoisted_2$9 = ["for"];
const _hoisted_3$7 = { key: 0 };
const _hoisted_4$6 = { key: 1 };
const _hoisted_5$5 = ["for"];
const _hoisted_6$5 = { key: 0 };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  return $props.inline ? (openBlock(), createElementBlock("div", _hoisted_1$a, [
    $props.label ? (openBlock(), createElementBlock("div", {
      key: 0,
      class: normalizeClass([...$props.labelClass])
    }, [
      createElementVNode("label", {
        for: $props.forId,
        class: "mb-0"
      }, [
        createTextVNode(toDisplayString($props.label) + " ", 1),
        $props.required ? (openBlock(), createElementBlock("sup", _hoisted_3$7, "*")) : createCommentVNode("", true)
      ], 8, _hoisted_2$9)
    ], 2)) : createCommentVNode("", true),
    createElementVNode("div", {
      class: normalizeClass([...$props.controlClass])
    }, [
      renderSlot(_ctx.$slots, "default", { ref: "control" })
    ], 2)
  ])) : (openBlock(), createElementBlock("div", _hoisted_4$6, [
    $props.label ? (openBlock(), createElementBlock("label", {
      key: 0,
      for: $props.forId,
      class: "mb-1"
    }, [
      createTextVNode(toDisplayString($props.label) + " ", 1),
      $props.required ? (openBlock(), createElementBlock("sup", _hoisted_6$5, "*")) : createCommentVNode("", true)
    ], 8, _hoisted_5$5)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default", { ref: "control" })
  ]));
}
const FormRow = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$7]]);
const _hoisted_1$9 = { slot: "noOptions" };
const _hoisted_2$8 = ["data-cy"];
const _sfc_main$b = /* @__PURE__ */ Object.assign({ name: "FormSelect" }, {
  __name: "FormSelect",
  props: {
    ...commonProps,
    selectOptions: Object,
    modelValue: [String, Array],
    labelSelectAttr: { type: String, default: "label" },
    labelOptionsOrder: { type: Boolean, default: true },
    isLoading: { type: Boolean, default: false },
    allowEmpty: { type: Boolean, default: false },
    emptyValue: { type: [String, Number], default: null },
    emptyLabel: { type: String, default: null },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const i18n = inject("i18n");
    const { hasError, error } = useFormCommon(toRef(props, "name"), toRef(props, "errors"));
    const emit = __emit;
    const multiSelectOptions = computed(() => {
      let options = Object.keys(props.selectOptions).reduce((acc, o) => {
        acc.push({ key: o, label: props.selectOptions[o] });
        return acc;
      }, []);
      if (props.labelOptionsOrder) {
        options.sort((a3, b2) => {
          return a3.label.localeCompare(b2.label, void 0, {
            numeric: true,
            sensitivity: "base"
          });
        });
      }
      if (props.allowEmpty && props.emptyLabel) {
        options = [...[{ key: props.emptyValue, label: props.emptyLabel }], ...options];
      }
      return options;
    });
    const multiselectSelectedOption = computed(() => {
      if (props.multiple) {
        return multiSelectOptions.value.filter((o) => props.modelValue.includes(o.key));
      }
      return multiSelectOptions.value.find((o) => o.key === props.modelValue);
    });
    function updateValue(e2) {
      if (e2 === null) return emit("update:modelValue", e2);
      if (props.multiple === false) {
        return emit("update:modelValue", e2.key);
      }
      const values = e2.reduce((acc, v) => {
        acc.push(v.key);
        return acc;
      }, []);
      return emit("update:modelValue", values);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(unref(script), {
          "model-value": multiselectSelectedOption.value,
          "show-labels": false,
          options: multiSelectOptions.value,
          placeholder: _ctx.placeholder,
          label: __props.labelSelectAttr,
          class: normalizeClass({ "is-invalid": unref(hasError) }),
          "track-by": __props.labelSelectAttr,
          "data-cy": _ctx.name + "-select",
          disabled: __props.disabled,
          "allow-empty": __props.allowEmpty,
          loading: __props.isLoading,
          multiple: __props.multiple,
          taggable: __props.multiple,
          "onUpdate:modelValue": updateValue
        }, {
          default: withCtx(() => [
            createElementVNode("span", _hoisted_1$9, toDisplayString(unref(i18n)("caareavlib.form.rowSelect.emptySelect")), 1)
          ]),
          _: 1
        }, 8, ["model-value", "options", "placeholder", "label", "class", "track-by", "data-cy", "disabled", "allow-empty", "loading", "multiple", "taggable"]),
        _ctx.help && !unref(error) ? (openBlock(), createElementBlock("small", {
          key: 0,
          class: normalizeClass(_ctx.helperClass)
        }, toDisplayString(_ctx.help), 3)) : createCommentVNode("", true),
        unref(error) ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: "invalid-feedback",
          "data-cy": _ctx.name + "-error"
        }, toDisplayString(unref(error)), 9, _hoisted_2$8)) : createCommentVNode("", true)
      ]);
    };
  }
});
const FormSelect = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-47e527fa"]]);
const _hoisted_1$8 = ["id", "name", "placeholder", "maxlength", "rows", "cols", "data-cy"];
const _sfc_main$a = /* @__PURE__ */ Object.assign({ name: "FormTextArea" }, {
  __name: "FormTextArea",
  props: {
    ...commonProps,
    modelValue: { type: [Number, String] },
    maxLength: { type: Number, default: null },
    placeholder: { type: String, default: "" },
    name: { type: String, required: true },
    rows: { type: Number, default: 5 },
    columns: { type: Number, default: 20 },
    debounceInput: { type: Boolean, default: false },
    debounceDelay: { type: Number, default: 1e3 }
  },
  emits: ["update:modelValue", "debounce:update"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const internalModel = ref(props.modelValue);
    const emit = __emit;
    const { getId } = useFormCommon(toRef(props, "name"), toRef(props, "errors"));
    watch(internalModel, (newVal) => {
      props.debounceInput ? updateDebounceModel(newVal) : updateModel(newVal);
    });
    watch(
      () => props.modelValue,
      (newVal) => {
        internalModel.value = newVal;
      }
    );
    const updateModel = (newVal) => {
      emit("update:modelValue", newVal);
    };
    const updateDebounceModel = _debounce((newVal) => {
      updateModel(newVal);
      emit("debounce:update", newVal);
    }, props.debounceDelay);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        withDirectives(createElementVNode("textarea", {
          id: unref(getId),
          ref: `input-${__props.name}`,
          name: __props.name,
          placeholder: __props.placeholder,
          class: normalizeClass(_ctx.inputClass),
          maxlength: __props.maxLength,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => internalModel.value = $event),
          rows: __props.rows,
          cols: __props.columns,
          "data-cy": `textarea-${__props.name}`
        }, null, 10, _hoisted_1$8), [
          [vModelText, internalModel.value]
        ])
      ]);
    };
  }
});
const FormTextArea = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-28860bf5"]]);
const _sfc_main$9 = /* @__PURE__ */ Object.assign({ name: "FormRowInput" }, {
  __name: "FormRowInput",
  props: /* @__PURE__ */ mergeModels({
    ...commonProps,
    modelValue: [Number, String],
    type: { type: String, default: "text" },
    maxLength: { type: Number, default: null },
    debounceInput: { type: Boolean, default: false },
    debounceDelay: { type: Number, default: 500 }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue", "debounce:update"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const model = useModel(__props, "modelValue");
    const { getId } = useFormCommon(toRef(props, "name"), toRef(props, "errors"));
    function onDebounceUpdate(newVal) {
      emit("debounce:update", newVal);
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(FormRow, {
        label: _ctx.label,
        "label-class": _ctx.labelClass,
        "control-class": _ctx.controlClass,
        "for-id": unref(getId),
        required: _ctx.required,
        inline: _ctx.labelInline
      }, {
        default: withCtx(() => [
          createVNode(FormInput, {
            name: _ctx.name,
            "max-length": __props.maxLength,
            errors: _ctx.errors,
            type: __props.type,
            modelValue: model.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
            "debounce-input": __props.debounceInput,
            "debounce-delay": __props.debounceDelay,
            placeholder: _ctx.placeholder,
            help: _ctx.help,
            focus: _ctx.focus,
            required: _ctx.required,
            disabled: _ctx.disabled,
            onKeyboardEnter: _cache[1] || (_cache[1] = ($event) => emit("keyboard-enter", $event)),
            "onDebounce:update": onDebounceUpdate
          }, null, 8, ["name", "max-length", "errors", "type", "modelValue", "debounce-input", "debounce-delay", "placeholder", "help", "focus", "required", "disabled"])
        ]),
        _: 1
      }, 8, ["label", "label-class", "control-class", "for-id", "required", "inline"]);
    };
  }
});
const _sfc_main$8 = /* @__PURE__ */ Object.assign({ name: "FormRowSelect" }, {
  __name: "FormRowSelect",
  props: /* @__PURE__ */ mergeModels({
    ...commonProps,
    modelValue: [String, Array],
    selectOptions: Object,
    labelSelectAttr: { type: String, required: true },
    labelOptionsOrder: { type: Boolean, default: true },
    isLoading: { type: Boolean, default: false },
    allowEmpty: { type: Boolean, default: false },
    emptyValue: { type: [String, Number], default: null },
    emptyLabel: { type: String, default: null },
    multiple: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue"], ["update:modelValue"]),
  setup(__props) {
    const props = __props;
    const { getId } = useFormCommon(toRef(props, "name"), toRef(props, "errors"));
    const model = useModel(__props, "modelValue");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(FormRow), {
        label: _ctx.label,
        "label-class": _ctx.labelClass,
        "control-class": _ctx.controlClass,
        "for-id": unref(getId),
        required: _ctx.required,
        inline: _ctx.labelInline
      }, {
        default: withCtx(() => [
          createVNode(unref(FormSelect), {
            modelValue: model.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => model.value = $event),
            name: _ctx.name,
            label: _ctx.label,
            "label-select-attr": "label",
            "label-options-order": __props.labelOptionsOrder,
            "select-options": __props.selectOptions,
            errors: _ctx.errors,
            placeholder: _ctx.placeholder,
            disabled: __props.disabled,
            "is-loading": __props.isLoading,
            "allow-empty": __props.allowEmpty,
            "empty-label": __props.emptyLabel,
            "empty-value": __props.emptyValue,
            multiple: __props.multiple
          }, null, 8, ["modelValue", "name", "label", "label-options-order", "select-options", "errors", "placeholder", "disabled", "is-loading", "allow-empty", "empty-label", "empty-value", "multiple"])
        ]),
        _: 1
      }, 8, ["label", "label-class", "control-class", "for-id", "required", "inline"]);
    };
  }
});
const _sfc_main$7 = {
  name: "FormUsedVehicleSearch",
  inject: ["i18n"],
  components: { FormInput },
  props: {
    searchType: String,
    modelValue: String,
    usedVehiclesSearchErrors: Object,
    isSearchLoading: { type: Boolean, required: true },
    isImmatMocked: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "submit"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    searchHelp() {
      if (this.isImmatMocked) {
        return this.isVinSelected ? "'validvin' pour simuler un n° de série valide" : "'aa000aa' pour simuler une plaque valide";
      }
      return "";
    },
    isVinSelected() {
      return this.searchType === "vin";
    },
    isButtonDisable() {
      return this.value === "";
    }
  },
  methods: {
    onSubmitButton() {
      this.$emit("submit", this.searchType, this.value);
    }
  }
};
const _hoisted_1$7 = {
  class: "bg-light d-flex flex-column",
  style: { "min-width": "268px" }
};
const _hoisted_2$7 = ["data-cy"];
const _hoisted_3$6 = { class: "mb-1" };
const _hoisted_4$5 = { class: "p-2 text-center mt-auto" };
const _hoisted_5$4 = ["disabled", "data-cy"];
const _hoisted_6$4 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormInput = resolveComponent("FormInput");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    createElementVNode("div", {
      "data-cy": `search-by-${$props.searchType}`
    }, [
      createElementVNode("p", _hoisted_3$6, toDisplayString($options.i18n(`caareavlib.vehicle.search.by_${$props.searchType}`)), 1),
      _cache[1] || (_cache[1] = createElementVNode("div", { style: { "width": "4rem", "height": "1px", "background-color": "#1c2b4e", "margin-bottom": "2rem" } }, null, -1))
    ], 8, _hoisted_2$7),
    createElementVNode("div", null, [
      createVNode(_component_FormInput, {
        value: $options.value,
        placeholder: $options.i18n(`caareavlib.vehicle.search.placeholder.${$props.searchType}`),
        "max-length": 17,
        errors: $props.usedVehiclesSearchErrors,
        name: $props.searchType,
        "data-cy": `search-input-${$props.searchType}`,
        help: $options.searchHelp,
        onInput: _ctx.onInput,
        onKeyboardEnter: $options.onSubmitButton
      }, null, 8, ["value", "placeholder", "errors", "name", "data-cy", "help", "onInput", "onKeyboardEnter"])
    ]),
    createElementVNode("div", _hoisted_4$5, [
      createElementVNode("button", {
        type: "button",
        class: "btn btn-primary rounded mt-4",
        disabled: $options.isButtonDisable || $props.isSearchLoading,
        "data-cy": `search-button-${$props.searchType}`,
        onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.onSubmitButton && $options.onSubmitButton(...args), ["prevent"]))
      }, [
        $props.isSearchLoading ? (openBlock(), createElementBlock("span", _hoisted_6$4)) : createCommentVNode("", true),
        createTextVNode(" " + toDisplayString($options.i18n("caareavlib.vehicle.search.button.validate")), 1)
      ], 8, _hoisted_5$4)
    ])
  ]);
}
const FormUsedVehicleSearch = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6]]);
const _sfc_main$6 = {
  name: "FormManualSearch",
  inject: ["i18n"],
  components: { FormRowInput: _sfc_main$9 },
  props: {
    fullWidth: { type: Boolean, default: false },
    isSearchLoading: { type: Boolean, required: true },
    modelValue: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ["update:formData", "manual-vehicle-search"],
  computed: {
    isButtonDisable() {
      return this.formData.manual === "";
    },
    widthClass() {
      return this.fullWidth ? "col-12" : "col-10";
    }
  },
  methods: {
    onInput() {
      this.$emit("update:formData", this.formData);
    },
    onSubmitButton() {
      this.$emit("manual-vehicle-search");
    }
  }
};
const _hoisted_1$6 = {
  class: "bg-light d-flex flex-column",
  style: { "min-width": "490px" }
};
const _hoisted_2$6 = { "data-cy": "search-by-text" };
const _hoisted_3$5 = { class: "mb-1" };
const _hoisted_4$4 = {
  class: "p-2 text-center mt-auto align-self-end",
  style: { "margin-right": "2.4rem" }
};
const _hoisted_5$3 = ["disabled"];
const _hoisted_6$3 = {
  key: 0,
  class: "spinner-border spinner-border-sm",
  role: "status",
  "aria-hidden": "true"
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormRowInput = resolveComponent("FormRowInput");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createElementVNode("div", _hoisted_2$6, [
      createElementVNode("p", _hoisted_3$5, toDisplayString($options.i18n(`caareavlib.vehicle.search.by_manual_search`)), 1),
      _cache[3] || (_cache[3] = createElementVNode("div", { style: { "width": "4rem", "height": "1px", "background-color": "#1c2b4e", "margin-bottom": "2rem" } }, null, -1))
    ]),
    createElementVNode("div", null, [
      createVNode(_component_FormRowInput, {
        modelValue: _ctx.form_data.manual,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.form_data.manual = $event),
        "data-cy": "search-input-manual",
        class: normalizeClass(["col-11", $options.widthClass]),
        name: "manual",
        type: "text",
        "max-length": 64,
        label: $options.i18n("caareavlib.vehicle.search.brand_and_model"),
        errors: $props.errors,
        help: $options.i18n("caareavlib.vehicle.search.help.velastic"),
        onKeyboardEnter: $options.onSubmitButton,
        onInput: $options.onInput
      }, null, 8, ["modelValue", "label", "errors", "class", "help", "onKeyboardEnter", "onInput"]),
      createVNode(_component_FormRowInput, {
        modelValue: _ctx.form_data.filters.model_year.value,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.form_data.filters.model_year.value = $event),
        "data-cy": "search-input-year",
        class: normalizeClass(["col-11", $options.widthClass]),
        name: "model_year",
        type: "text",
        "max-length": 4,
        label: $options.i18n("caareavlib.vehicle.search.model_year"),
        errors: "filters" in $props.errors ? $props.errors.filters : {},
        onKeyboardEnter: $options.onSubmitButton,
        onInput: $options.onInput
      }, null, 8, ["modelValue", "label", "errors", "class", "onKeyboardEnter", "onInput"])
    ]),
    createElementVNode("div", _hoisted_4$4, [
      createElementVNode("button", {
        type: "button",
        class: "btn btn-primary rounded mt-4",
        disabled: $options.isButtonDisable || $props.isSearchLoading,
        "data-cy": "search-button-manual",
        onClick: _cache[2] || (_cache[2] = withModifiers((...args) => $options.onSubmitButton && $options.onSubmitButton(...args), ["prevent"]))
      }, [
        $props.isSearchLoading ? (openBlock(), createElementBlock("span", _hoisted_6$3)) : createCommentVNode("", true),
        createTextVNode(" " + toDisplayString($options.i18n("caareavlib.vehicle.search.button.validate")), 1)
      ], 8, _hoisted_5$3)
    ])
  ]);
}
const FormManualSearch = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5]]);
const _sfc_main$5 = {
  name: "VehicleSearchArea",
  components: {
    FormUsedVehicleSearch,
    FormManualSearch
  },
  props: {
    usedVehiclesSearchErrors: Object,
    manualSearchErrors: Object,
    isSearchLoading: { type: Boolean, required: true },
    isImmatMocked: { type: Boolean, default: false },
    modelValue: { type: Object, required: true }
  },
  emits: ["update:modelValue", "used-vehicle-search", "manual-vehicle-search"],
  data: function() {
    return {
      formData: this.value
    };
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    onPlateSearch() {
      this.formData.vin = "";
      this.formData.manual = "";
      this.formData.filters.model_year.value = null;
      this.onVehicleSearch("plate");
    },
    onVinSearch() {
      this.formData.plate = "";
      this.formData.manual = "";
      this.formData.filters.model_year.value = null;
      this.onVehicleSearch("vin");
    },
    onVehicleSearch(searchType) {
      this.$emit("used-vehicle-search", searchType);
    },
    onVehicleManualSearch() {
      this.formData.plate = "";
      this.formData.vin = "";
      this.$emit("manual-vehicle-search", this.value);
    }
  }
};
const _hoisted_1$5 = { class: "row" };
const _hoisted_2$5 = { class: "col-3" };
const _hoisted_3$4 = { class: "col-3" };
const _hoisted_4$3 = { class: "col-6" };
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormUsedVehicleSearch = resolveComponent("FormUsedVehicleSearch");
  const _component_form_manual_search = resolveComponent("form-manual-search");
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createElementVNode("div", _hoisted_2$5, [
      createVNode(_component_FormUsedVehicleSearch, {
        modelValue: _ctx.formData.plate,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.formData.plate = $event),
        "search-type": "plate",
        class: "h-100 p-3",
        "used-vehicles-search-errors": $props.usedVehiclesSearchErrors,
        "is-search-loading": $props.isSearchLoading,
        "is-immat-mocked": $props.isImmatMocked,
        onSubmit: $options.onPlateSearch
      }, null, 8, ["modelValue", "used-vehicles-search-errors", "is-search-loading", "is-immat-mocked", "onSubmit"])
    ]),
    createElementVNode("div", _hoisted_3$4, [
      createVNode(_component_FormUsedVehicleSearch, {
        modelValue: _ctx.formData.vin,
        "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => _ctx.formData.vin = $event),
        "search-type": "vin",
        class: "h-100 p-3",
        "used-vehicles-search-errors": $props.usedVehiclesSearchErrors,
        "is-search-loading": $props.isSearchLoading,
        "is-immat-mocked": $props.isImmatMocked,
        onSubmit: $options.onVinSearch
      }, null, 8, ["modelValue", "used-vehicles-search-errors", "is-search-loading", "is-immat-mocked", "onSubmit"])
    ]),
    createElementVNode("div", _hoisted_4$3, [
      createVNode(_component_form_manual_search, {
        modelValue: _ctx.formData,
        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => _ctx.formData = $event),
        class: "h-100 p-3",
        "full-width": true,
        "is-search-loading": $props.isSearchLoading,
        errors: $props.manualSearchErrors,
        onManualVehicleSearch: $options.onVehicleManualSearch
      }, null, 8, ["modelValue", "is-search-loading", "errors", "onManualVehicleSearch"])
    ])
  ]);
}
const VehicleSearchArea = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4]]);
const _sfc_main$4 = {
  name: "VehicleSearchResultItem",
  inject: ["i18n"],
  props: {
    vehicle: { type: Object, required: true },
    image: { type: String, default: null },
    canValidate: { type: Boolean, default: true }
  },
  methods: {
    onButtonClick() {
      this.$emit("validate-version", this.vehicle);
    }
  }
};
const _hoisted_1$4 = {
  key: 0,
  class: "col-2"
};
const _hoisted_2$4 = ["src"];
const _hoisted_3$3 = {
  class: "col-3 result-name",
  "data-cy": "search-result-name"
};
const _hoisted_4$2 = {
  class: "col-2 result-details text-center",
  "data-cy": "search-result-item-energy"
};
const _hoisted_5$2 = {
  class: "col-1 result-details text-center",
  "data-cy": "search-result-item-fiscalhp"
};
const _hoisted_6$2 = {
  class: "col-2 result-details text-center",
  "data-cy": "search-result-item-transmission"
};
const _hoisted_7$2 = {
  class: "col-2 result-details text-center",
  "data-cy": "search-result-item-year"
};
const _hoisted_8$1 = {
  class: "col-2 result-details text-center",
  "data-cy": "search-result-item-id"
};
const _hoisted_9$1 = {
  key: 1,
  class: "col-1 ml-auto text-right icon-fade"
};
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "vehicle-list-item-border row no-gutters justify-content-between align-items-center w-100 py-3",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.onButtonClick && $options.onButtonClick(...args))
  }, [
    $props.image ? (openBlock(), createElementBlock("div", _hoisted_1$4, [
      createElementVNode("img", {
        src: $props.image,
        alt: "image"
      }, null, 8, _hoisted_2$4)
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3$3, toDisplayString($props.vehicle.make) + " " + toDisplayString($props.vehicle.model) + " " + toDisplayString($props.vehicle.version), 1),
    createElementVNode("div", _hoisted_4$2, toDisplayString(_ctx.$filters.capitalize(
      $props.vehicle.energy ? $options.i18n(`caareavlib.vehicle.search.${$props.vehicle.energy}`) : "--"
    )), 1),
    createElementVNode("div", _hoisted_5$2, toDisplayString($props.vehicle.fiscal_hp ? `${$props.vehicle.fiscal_hp} ${$options.i18n("caareavlib.vehicle.search.horsepower")}` : "--"), 1),
    createElementVNode("div", _hoisted_6$2, toDisplayString(_ctx.$filters.capitalize(
      $props.vehicle.transmission ? $options.i18n(`caareavlib.vehicle.search.${$props.vehicle.transmission}`) : "--"
    )), 1),
    createElementVNode("div", _hoisted_7$2, toDisplayString($props.vehicle.model_year ? $props.vehicle.model_year : "--"), 1),
    createElementVNode("div", _hoisted_8$1, toDisplayString($props.vehicle.vehicle_id ? $props.vehicle.vehicle_id : "--"), 1),
    $props.canValidate ? (openBlock(), createElementBlock("div", _hoisted_9$1, _cache[1] || (_cache[1] = [
      createElementVNode("i", {
        class: "icon-chevron-right font-size-40",
        "aria-hidden": "true"
      }, null, -1)
    ]))) : createCommentVNode("", true)
  ]);
}
const VehicleSearchResultItem = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3]]);
const _sfc_main$3 = {
  name: "VerticalFormVehicleFilters",
  inject: ["i18n"],
  components: { FormSelect, FormInput },
  props: {
    modelValue: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ["update:modelValue", "filter-input", "reset-filters"],
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    filterErrors(criteria) {
      let err = {};
      if ("filters" in this.errors && criteria in this.errors.filters) {
        err[`filter-${criteria}`] = this.errors.filters[criteria];
      }
      return err;
    },
    onEraseFilters() {
      for (const filter2 in this.value.filters) {
        if (Array.isArray(this.value.filters[filter2].value)) {
          this.value.filters[filter2].value = [];
        } else {
          this.value.filters[filter2].value = "";
        }
      }
      this.$emit("reset-filters");
    }
  }
};
const _hoisted_1$3 = { class: "p-3 d-flex flex-column" };
const _hoisted_2$3 = { class: "border-bottom mb-4 pb-3" };
const _hoisted_3$2 = { class: "my-1" };
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_FormSelect = resolveComponent("FormSelect");
  const _component_FormInput = resolveComponent("FormInput");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createElementVNode("div", _hoisted_2$3, toDisplayString($options.i18n("caareavlib.vehicle.search.refine_the_search")), 1),
    (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys($options.value.filters), (criteria) => {
      return openBlock(), createElementBlock("div", { key: criteria }, [
        createElementVNode("div", _hoisted_3$2, toDisplayString($options.i18n(`caareavlib.vehicle.search.${criteria}`)), 1),
        $options.value.filters[criteria].inputType === "select" ? (openBlock(), createBlock(_component_FormSelect, {
          key: criteria,
          modelValue: $options.value.filters[criteria].value,
          "onUpdate:modelValue": [($event) => $options.value.filters[criteria].value = $event, ($event) => _ctx.$emit("filter-input", criteria, $options.value.filters[criteria])],
          name: `filter-${criteria}`,
          "select-options": $options.value.filters[criteria].choices,
          "label-select-attr": "label",
          "allow-empty": true,
          "empty-label": $options.i18n(`caareavlib.vehicle.search.all_${criteria}`),
          multiple: true,
          disabled: Object.keys($options.value.filters[criteria].choices).length === 0
        }, null, 8, ["modelValue", "onUpdate:modelValue", "name", "select-options", "empty-label", "disabled"])) : (openBlock(), createBlock(_component_FormInput, {
          key: 1,
          modelValue: $options.value.filters[criteria].value,
          "onUpdate:modelValue": [($event) => $options.value.filters[criteria].value = $event, ($event) => _ctx.$emit("filter-input", criteria, $options.value.filters[criteria])],
          label: $options.i18n("caareavlib.vehicle.search.model_year"),
          "debounce-input": true,
          name: `filter-${criteria}`,
          "label-class": ["col-2"],
          type: $options.value.filters[criteria].inputType,
          errors: $options.filterErrors(criteria)
        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "name", "type", "errors"]))
      ]);
    }), 128)),
    createElementVNode("div", {
      class: "btn btn-outline-secondary mx-auto mt-3 font-size-12",
      "data-cy": "vehicle-reset-filters",
      onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.onEraseFilters && $options.onEraseFilters(...args), ["prevent"]))
    }, toDisplayString($options.i18n("caareavlib.vehicle.search.erase_filters")), 1)
  ]);
}
const VerticalFormVehicleFilters = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2]]);
const _sfc_main$2 = {
  name: "VehicleSearchResult",
  inject: ["i18n"],
  components: {
    VehicleSearchResultItem,
    VerticalFormVehicleFilters
  },
  props: {
    modelValue: { type: Object, required: true },
    searchText: {
      type: String,
      required: true
    },
    elements: {
      type: Array,
      required: true
    },
    areElementClickable: {
      type: Boolean,
      default: false
    },
    totalHitsNb: { type: Number, required: true },
    errors: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  emits: ["update:modelValue", "filter-input", "reset-filters", "validate-version"],
  data: function() {
    return {
      isLoading: false
    };
  },
  computed: {
    formData: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    }
  },
  methods: {
    onFilterInput(criteria, value) {
      this.$emit("filter-input", criteria, value);
    },
    onEraseFilters() {
      this.$emit("update:modelValue", this.modelValue);
      this.$emit("reset-filters");
    },
    onValidateVersion(selectedVehicle) {
      this.$emit("validate-version", selectedVehicle);
    }
  }
};
const _hoisted_1$2 = { class: "row mt-3" };
const _hoisted_2$2 = {
  key: 0,
  class: "col-3",
  "data-cy": "vehicle-search-filters"
};
const _hoisted_3$1 = { class: "col-9" };
const _hoisted_4$1 = { class: "bg-light p-3 d-flex justify-content-between" };
const _hoisted_5$1 = {
  key: 0,
  class: "font-weight-bold"
};
const _hoisted_6$1 = {
  key: 1,
  class: "text-secondary"
};
const _hoisted_7$1 = {
  class: "bg-light mt-3",
  "data-cy": "used-vehicle-search-result-content"
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_VerticalFormVehicleFilters = resolveComponent("VerticalFormVehicleFilters");
  const _component_VehicleSearchResultItem = resolveComponent("VehicleSearchResultItem");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    $props.elements !== null || $props.errors !== {} ? (openBlock(), createElementBlock("div", _hoisted_2$2, [
      createVNode(_component_VerticalFormVehicleFilters, {
        modelValue: $options.formData,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $options.formData = $event),
        errors: $props.errors,
        class: "bg-light",
        onFilterInput: $options.onFilterInput,
        onResetFilters: $options.onEraseFilters
      }, null, 8, ["modelValue", "errors", "onFilterInput", "onResetFilters"])
    ])) : createCommentVNode("", true),
    createElementVNode("div", _hoisted_3$1, [
      createElementVNode("div", _hoisted_4$1, [
        $props.areElementClickable && $props.elements.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_5$1, toDisplayString($options.i18n("caareavlib.vehicle.search.pick_version")), 1)) : createCommentVNode("", true),
        $props.elements.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_6$1, toDisplayString($props.totalHitsNb) + " " + toDisplayString($options.i18n("caareavlib.vehicle.search.results_for")) + ' "' + toDisplayString($props.searchText) + '" ', 1)) : createCommentVNode("", true)
      ]),
      createElementVNode("div", _hoisted_7$1, [
        (openBlock(true), createElementBlock(Fragment, null, renderList($props.elements, (element) => {
          return openBlock(), createBlock(_component_VehicleSearchResultItem, {
            key: element.hasOwnProperty("vehicle_id") ? element.vehicle_id : element.id,
            vehicle: element,
            "can-validate": $props.areElementClickable,
            class: "border-bottom clickable px-4",
            "data-cy": `vehicle-result-item-${element.hasOwnProperty("vehicle_id") ? element.vehicle_id : element.id}`,
            onValidateVersion: $options.onValidateVersion
          }, null, 8, ["vehicle", "can-validate", "data-cy", "onValidateVersion"]);
        }), 128))
      ])
    ])
  ]);
}
const VehicleSearchResult = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1]]);
const _sfc_main$1 = {
  name: "VehicleSearchResultCard",
  props: {
    vehicle: { type: Object, required: true },
    image: { type: String, default: null },
    productCode: { type: String }
  },
  computed: {
    vehicleExtra() {
      let text = "";
      if (this.vehicle.hasOwnProperty("energy") && this.vehicle.energy)
        text += " " + this.$filters.capitalize(
          this.$t(`caareavlib.vehicle.search.${this.vehicle.energy}`)
        );
      if (this.vehicle.hasOwnProperty("fiscal_hp") && this.vehicle.fiscal_hp)
        text += ` ${this.vehicle.fiscal_hp} ${this.$t(
          "caareavlib.vehicle.search.horsepower"
        )}`;
      if (this.vehicle.hasOwnProperty("transmission") && this.vehicle.transmission)
        text += " " + this.$filters.capitalize(
          this.$t(`caareavlib.vehicle.search.${this.vehicle.transmission}`)
        );
      if (this.vehicle.hasOwnProperty("year") && this.vehicle.year)
        text += ` ${this.vehicle.year}`;
      return text;
    }
  }
};
const _hoisted_1$1 = { class: "justify-content-center card mt-4 rounded-0" };
const _hoisted_2$1 = { class: "card-header d-flex justify-content-start align-items-center w-100 p-3 border-bottom-0" };
const _hoisted_3 = { class: "justify-content-center result-image d-flex align-items-center bg-white" };
const _hoisted_4 = ["src"];
const _hoisted_5 = {
  key: 1,
  class: "m-3 icon-caarea-car font-size-40",
  "aria-hidden": "true"
};
const _hoisted_6 = { class: "d-flex flex-column ml-3" };
const _hoisted_7 = { class: "font-weight-bold font-size-22" };
const _hoisted_8 = { class: "font-size-14" };
const _hoisted_9 = {
  key: 0,
  class: "ml-2 vehicle-extra font-size-12"
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$1, [
    createElementVNode("div", _hoisted_2$1, [
      createElementVNode("span", _hoisted_3, [
        $props.image ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: $props.image,
          alt: "image"
        }, null, 8, _hoisted_4)) : (openBlock(), createElementBlock("i", _hoisted_5))
      ]),
      createElementVNode("div", _hoisted_6, [
        createElementVNode("div", _hoisted_7, toDisplayString($props.vehicle.name), 1),
        createElementVNode("div", null, [
          createElementVNode("span", _hoisted_8, toDisplayString($props.vehicle.version), 1),
          $options.vehicleExtra ? (openBlock(), createElementBlock("span", _hoisted_9, toDisplayString($options.vehicleExtra), 1)) : createCommentVNode("", true)
        ])
      ])
    ])
  ]);
}
const VehicleSearchResultCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _hoisted_1 = { class: "p-3 form-vehicle-container" };
const _hoisted_2 = { class: "form-vehicle-left" };
const _sfc_main = /* @__PURE__ */ Object.assign({ name: "FormVehicleFilters" }, {
  __name: "FormVehicleFilters",
  props: /* @__PURE__ */ mergeModels({
    modelValue: { type: Object, required: true },
    errors: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }, {
    "modelValue": {},
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["update:modelValue", "filter-input", "reset-filters"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const i18n = inject("i18n");
    const model = useModel(__props, "modelValue");
    const emit = __emit;
    function getEmptyLabel(criteria) {
      return i18n(`caareavlib.vehicle.search.all_${criteria}`);
    }
    function onInputUpdate(criteria) {
      console.log("onInputUpdate", criteria, model.value.filters[criteria]);
      emit("filter-input", criteria, model.value.filters[criteria]);
    }
    function filterErrors(criteria) {
      let err = {};
      if (!props.errors) {
        return err;
      }
      if ("filters" in props.errors && criteria in props.errors.filters) {
        err[`filter-${criteria}`] = props.errors.filters[criteria];
      }
      return err;
    }
    function onEraseFilters() {
      for (const filter2 in model.value.filters) {
        if (Array.isArray(model.value.filters[filter2].value)) {
          model.value.filters[filter2].value = [];
        } else {
          model.value.filters[filter2].value = "";
        }
      }
      emit("reset-filters");
    }
    return (_ctx, _cache) => {
      const _component_FormRowSelect = resolveComponent("FormRowSelect");
      const _component_FormRowInput = resolveComponent("FormRowInput");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(model.value.filters), (criteria) => {
            return openBlock(), createElementBlock("div", {
              key: criteria,
              class: "form-vehicle-input px-1"
            }, [
              model.value.filters[criteria].inputType === "select" ? (openBlock(), createBlock(_component_FormRowSelect, {
                key: criteria,
                modelValue: model.value.filters[criteria].value,
                "onUpdate:modelValue": [($event) => model.value.filters[criteria].value = $event, ($event) => _ctx.$emit("filter-input", criteria, model.value.filters[criteria])],
                name: `filter-${criteria}`,
                label: _ctx.$t(`caareavlib.vehicle.search.${criteria}`),
                "label-inline": false,
                "select-options": model.value.filters[criteria].choices,
                "label-select-attr": "label",
                "allow-empty": true,
                placeholder: model.value.filters[criteria].value.length === 0 ? getEmptyLabel(criteria) : "",
                multiple: true,
                disabled: Object.keys(model.value.filters[criteria].choices).length === 0
              }, null, 8, ["modelValue", "onUpdate:modelValue", "name", "label", "select-options", "placeholder", "disabled"])) : (openBlock(), createBlock(_component_FormRowInput, {
                key: 1,
                modelValue: model.value.filters[criteria].value,
                "onUpdate:modelValue": [($event) => model.value.filters[criteria].value = $event, ($event) => onInputUpdate(criteria)],
                label: _ctx.$t(`caareavlib.vehicle.search.${criteria}`),
                "label-inline": false,
                "debounce-input": true,
                name: `filter-${criteria}`,
                "label-class": ["col-2"],
                type: model.value.filters[criteria].inputType,
                errors: filterErrors(criteria)
              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "name", "type", "errors"]))
            ]);
          }), 128)),
          createElementVNode("button", {
            class: "btn btn-outline-secondary font-size-11 p-1 ml-1",
            style: { "max-height": "2.8rem", "margin-top": "1.7rem" },
            "data-cy": "vehicle-reset-filters",
            onClick: withModifiers(onEraseFilters, ["prevent"])
          }, toDisplayString(unref(i18n)("caareavlib.vehicle.search.erase_filters")), 1)
        ])
      ]);
    };
  }
});
const components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FormAsyncSelect,
  FormCheckbox: _sfc_main$g,
  FormDatepicker: _sfc_main$f,
  FormInput,
  FormRadio,
  FormRow,
  FormRowInput: _sfc_main$9,
  FormRowSelect: _sfc_main$8,
  FormSelect,
  FormTextArea,
  FormVehicleFilters: _sfc_main,
  VehicleSearchArea,
  VehicleSearchResult,
  VehicleSearchResultCard,
  VehicleSearchResultItem,
  VerticalFormVehicleFilters
}, Symbol.toStringTag, { value: "Module" }));
function install(app, options) {
  if (!options || false in options) {
    throw new Error(
      "CaareaVlibPlugin error: i18n_global is not defined, please provide it in options (ex: app.use(CaareaVlibPlugin, { i18n_global: i18n.global }))"
    );
  }
  BeneficiaryCriteriaService.setI18n(options.i18n_global);
  PricingService$1.setI18n(options.i18n_global);
  app.provide("i18n", options.i18n_global.t);
  for (const key in components) {
    app.component(key, components[key]);
  }
}
const index = { install };
class AbstractService {
  constructor() {
    if (this.constructor === AbstractService) {
      throw new TypeError(
        'Abstract class "AbstractService" cannot be instantiated directly'
      );
    }
    if (!this.instance) {
      this.instance = this;
    }
    return this.instance;
  }
  clear() {
  }
  isInitialized() {
    return true;
  }
  checkIsInitialized() {
    if (this.isInitialized()) return true;
    throw Error("Service should be initialized first");
  }
}
function useImage() {
  function transformImage(imageUrl, transform) {
    return imageUrl.replace("/upload/", `/upload/${transform},e_improve/`);
  }
  function fitToSizeWithAspectRatioRetained(imageUrl, width, height, backgroundColor = "b_white") {
    const transform = `w_${width},h_${height},c_pad,${backgroundColor}`;
    return transformImage(imageUrl, transform);
  }
  return {
    transformImage,
    fitToSizeWithAspectRatioRetained
  };
}
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const { iterator, toStringTag } = Symbol;
const kindOf = /* @__PURE__ */ ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject$1 = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject$1 = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(toStringTag in val) && !(iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject$1(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const [isReadableStream, isRequest, isResponse, isHeaders] = ["ReadableStream", "Request", "Response", "Headers"].map(kindOfTest);
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i2;
  let l;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i2 = 0, l = obj.length; i2 < l; i2++) {
      fn.call(null, obj[i2], i2, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i2 = 0; i2 < len; i2++) {
      key = keys[i2];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i2 = keys.length;
  let _key;
  while (i2-- > 0) {
    _key = keys[i2];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject$1(result[targetKey]) && isPlainObject$1(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject$1(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i2 = 0, l = arguments.length; i2 < l; i2++) {
    arguments[i2] && forEach(arguments[i2], assignValue);
  }
  return result;
}
const extend = (a3, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a3[key] = bind(val, thisArg);
    } else {
      a3[key] = val;
    }
  }, { allOwnKeys });
  return a3;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i2;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null) return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i2 = props.length;
    while (i2-- > 0) {
      prop = props[i2];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i2 = thing.length;
  if (!isNumber(i2)) return null;
  const arr = new Array(i2);
  while (i2-- > 0) {
    arr[i2] = thing[i2];
  }
  return arr;
};
const isTypedArray = /* @__PURE__ */ ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[iterator];
  const _iterator = generator.call(obj);
  let result;
  while ((result = _iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m3, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value)) return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop$1 = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  return value != null && Number.isFinite(value = +value) ? value : defaultValue;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[toStringTag] === "FormData" && thing[iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i2) => {
    if (isObject$1(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i2] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i2 + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i2] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject$1(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const _setImmediate = ((setImmediateSupported, postMessageSupported) => {
  if (setImmediateSupported) {
    return setImmediate;
  }
  return postMessageSupported ? ((token, callbacks) => {
    _global.addEventListener("message", ({ source, data }) => {
      if (source === _global && data === token) {
        callbacks.length && callbacks.shift()();
      }
    }, false);
    return (cb) => {
      callbacks.push(cb);
      _global.postMessage(token, "*");
    };
  })(`axios@${Math.random()}`, []) : (cb) => setTimeout(cb);
})(
  typeof setImmediate === "function",
  isFunction(_global.postMessage)
);
const asap = typeof queueMicrotask !== "undefined" ? queueMicrotask.bind(_global) : typeof process !== "undefined" && process.nextTick || _setImmediate;
const isIterable = (thing) => thing != null && isFunction(thing[iterator]);
const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject: isObject$1,
  isPlainObject: isPlainObject$1,
  isReadableStream,
  isRequest,
  isResponse,
  isHeaders,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop: noop$1,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable,
  setImmediate: _setImmediate,
  asap,
  isIterable
};
function AxiosError$1(message, code, config2, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config2 && (this.config = config2);
  request && (this.request = request);
  if (response) {
    this.response = response;
    this.status = response.status ? response.status : null;
  }
}
utils$1.inherits(AxiosError$1, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const prototype$1 = AxiosError$1.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError$1, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError$1.from = (error, code, config2, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils$1.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError$1.call(axiosError, error.message, code, config2, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}
function removeBrackets(key) {
  return utils$1.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i2) {
    token = removeBrackets(token);
    return !dots && i2 ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData$1(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils$1.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);
  if (!utils$1.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null) return "";
    if (utils$1.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError$1("Blob is not supported. Use a Buffer instead.");
    }
    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils$1.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils$1.isArray(value) && isFlatArray(value) || (utils$1.isFileList(value) || utils$1.endsWith(key, "[]")) && (arr = utils$1.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el, index2) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index2, dots) : indexes === null ? key : key + "[]",
            convertValue(el)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils$1.isUndefined(value)) return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData,
        el,
        utils$1.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils$1.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match2) {
    return charMap[match2];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData$1(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  if (utils$1.isFunction(options)) {
    options = {
      serialize: options
    };
  }
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h3) {
      if (h3 !== null) {
        fn(h3);
      }
    });
  }
}
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const platform$1 = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
const hasBrowserEnv = typeof window !== "undefined" && typeof document !== "undefined";
const _navigator = typeof navigator === "object" && navigator || void 0;
const hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ["ReactNative", "NativeScript", "NS"].indexOf(_navigator.product) < 0);
const hasStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const origin = hasBrowserEnv && window.location.href || "http://localhost";
const utils = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv,
  hasStandardBrowserEnv,
  hasStandardBrowserWebWorkerEnv,
  navigator: _navigator,
  origin
}, Symbol.toStringTag, { value: "Module" }));
const platform = {
  ...utils,
  ...platform$1
};
function toURLEncodedForm(data, options) {
  return toFormData$1(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map((match2) => {
    return match2[0] === "[]" ? "" : match2[1] || match2[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i2;
  const len = keys.length;
  let key;
  for (i2 = 0; i2 < len; i2++) {
    key = keys[i2];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index2) {
    let name = path[index2++];
    if (name === "__proto__") return true;
    const isNumericKey = Number.isFinite(+name);
    const isLast = index2 >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index2);
    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};
    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils$1.isObject(data);
    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils$1.isFormData(data);
    if (isFormData2) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils$1.isArrayBuffer(data) || utils$1.isBuffer(data) || utils$1.isStream(data) || utils$1.isFile(data) || utils$1.isBlob(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils$1.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData$1(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (utils$1.isResponse(data) || utils$1.isReadableStream(data)) {
      return data;
    }
    if (data && utils$1.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError$1.from(e2, AxiosError$1.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
utils$1.forEach(["delete", "get", "head", "post", "put", "patch"], (method) => {
  defaults.headers[method] = {};
});
const ignoreDuplicateOf = utils$1.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i2;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i2 = line.indexOf(":");
    key = line.substring(0, i2).trim().toLowerCase();
    val = line.substring(i2 + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match2;
  while (match2 = tokensRE.exec(str)) {
    tokens[match2[1]] = match2[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils$1.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils$1.isString(value)) return;
  if (utils$1.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils$1.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
let AxiosHeaders$1 = class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils$1.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else if (utils$1.isObject(header) && utils$1.isIterable(header)) {
      let obj = {}, dest, key;
      for (const entry of header) {
        if (!utils$1.isArray(entry)) {
          throw TypeError("Object iterator must return a key-value pair");
        }
        obj[key = entry[0]] = (dest = obj[key]) ? utils$1.isArray(dest) ? [...dest, entry[1]] : [dest, entry[1]] : entry[1];
      }
      setHeaders(obj, valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils$1.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils$1.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i2 = keys.length;
    let deleted = false;
    while (i2--) {
      const key = keys[i2];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format2) {
    const self2 = this;
    const headers = {};
    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format2 ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed2 = new this(first);
    targets.forEach((target) => computed2.set(target));
    return computed2;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
};
AxiosHeaders$1.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils$1.reduceDescriptors(AxiosHeaders$1.prototype, ({ value }, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1);
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  };
});
utils$1.freezeMethods(AxiosHeaders$1);
function transformData(fns, response) {
  const config2 = this || defaults;
  const context = response || config2;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config2, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel$1(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError$1(message, config2, request) {
  AxiosError$1.call(this, message == null ? "canceled" : message, AxiosError$1.ERR_CANCELED, config2, request);
  this.name = "CanceledError";
}
utils$1.inherits(CanceledError$1, AxiosError$1, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError$1(
      "Request failed with status code " + response.status,
      [AxiosError$1.ERR_BAD_REQUEST, AxiosError$1.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
function parseProtocol(url) {
  const match2 = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match2 && match2[1] || "";
}
function speedometer(samplesCount, min2) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min2 = min2 !== void 0 ? min2 : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i2 = tail;
    let bytesCount = 0;
    while (i2 !== head) {
      bytesCount += bytes[i2++];
      i2 = i2 % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min2) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function throttle(fn, freq) {
  let timestamp = 0;
  let threshold = 1e3 / freq;
  let lastArgs;
  let timer;
  const invoke = (args, now = Date.now()) => {
    timestamp = now;
    lastArgs = null;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    fn.apply(null, args);
  };
  const throttled = (...args) => {
    const now = Date.now();
    const passed = now - timestamp;
    if (passed >= threshold) {
      invoke(args, now);
    } else {
      lastArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          invoke(lastArgs);
        }, threshold - passed);
      }
    }
  };
  const flush = () => lastArgs && invoke(lastArgs);
  return [throttled, flush];
}
const progressEventReducer = (listener, isDownloadStream, freq = 3) => {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return throttle((e2) => {
    const loaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e2,
      lengthComputable: total != null,
      [isDownloadStream ? "download" : "upload"]: true
    };
    listener(data);
  }, freq);
};
const progressEventDecorator = (total, throttled) => {
  const lengthComputable = total != null;
  return [(loaded) => throttled[0]({
    lengthComputable,
    total,
    loaded
  }), throttled[1]];
};
const asyncDecorator = (fn) => (...args) => utils$1.asap(() => fn(...args));
const isURLSameOrigin = platform.hasStandardBrowserEnv ? /* @__PURE__ */ ((origin2, isMSIE) => (url) => {
  url = new URL(url, platform.origin);
  return origin2.protocol === url.protocol && origin2.host === url.host && (isMSIE || origin2.port === url.port);
})(
  new URL(platform.origin),
  platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent)
) : () => true;
const cookies = platform.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + "=" + encodeURIComponent(value)];
      utils$1.isNumber(expires) && cookie.push("expires=" + new Date(expires).toGMTString());
      utils$1.isString(path) && cookie.push("path=" + path);
      utils$1.isString(domain) && cookie.push("domain=" + domain);
      secure === true && cookie.push("secure");
      document.cookie = cookie.join("; ");
    },
    read(name) {
      const match2 = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
      return match2 ? decodeURIComponent(match2[3]) : null;
    },
    remove(name) {
      this.write(name, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/?\/$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL, allowAbsoluteUrls) {
  let isRelativeUrl = !isAbsoluteURL(requestedURL);
  if (baseURL && (isRelativeUrl || allowAbsoluteUrls == false)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;
function mergeConfig$1(config1, config2) {
  config2 = config2 || {};
  const config3 = {};
  function getMergedValue(target, source, prop, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({ caseless }, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a3, b2, prop, caseless) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(a3, b2, prop, caseless);
    } else if (!utils$1.isUndefined(a3)) {
      return getMergedValue(void 0, a3, prop, caseless);
    }
  }
  function valueFromConfig2(a3, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a3, b2) {
    if (!utils$1.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils$1.isUndefined(a3)) {
      return getMergedValue(void 0, a3);
    }
  }
  function mergeDirectKeys(a3, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a3, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a3);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a3, b2, prop) => mergeDeepProperties(headersToObject(a3), headersToObject(b2), prop, true)
  };
  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils$1.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config3[prop] = configValue);
  });
  return config3;
}
const resolveConfig = (config2) => {
  const newConfig = mergeConfig$1({}, config2);
  let { data, withXSRFToken, xsrfHeaderName, xsrfCookieName, headers, auth: auth2 } = newConfig;
  newConfig.headers = headers = AxiosHeaders$1.from(headers);
  newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url, newConfig.allowAbsoluteUrls), config2.params, config2.paramsSerializer);
  if (auth2) {
    headers.set(
      "Authorization",
      "Basic " + btoa((auth2.username || "") + ":" + (auth2.password ? unescape(encodeURIComponent(auth2.password)) : ""))
    );
  }
  let contentType;
  if (utils$1.isFormData(data)) {
    if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
      headers.setContentType(void 0);
    } else if ((contentType = headers.getContentType()) !== false) {
      const [type, ...tokens] = contentType ? contentType.split(";").map((token) => token.trim()).filter(Boolean) : [];
      headers.setContentType([type || "multipart/form-data", ...tokens].join("; "));
    }
  }
  if (platform.hasStandardBrowserEnv) {
    withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));
    if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
      const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);
      if (xsrfValue) {
        headers.set(xsrfHeaderName, xsrfValue);
      }
    }
  }
  return newConfig;
};
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config2) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    const _config = resolveConfig(config2);
    let requestData = _config.data;
    const requestHeaders = AxiosHeaders$1.from(_config.headers).normalize();
    let { responseType, onUploadProgress, onDownloadProgress } = _config;
    let onCanceled;
    let uploadThrottled, downloadThrottled;
    let flushUpload, flushDownload;
    function done() {
      flushUpload && flushUpload();
      flushDownload && flushDownload();
      _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
      _config.signal && _config.signal.removeEventListener("abort", onCanceled);
    }
    let request = new XMLHttpRequest();
    request.open(_config.method.toUpperCase(), _config.url, true);
    request.timeout = _config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config2,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError$1("Request aborted", AxiosError$1.ECONNABORTED, config2, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config2, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = _config.timeout ? "timeout of " + _config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = _config.transitional || transitionalDefaults;
      if (_config.timeoutErrorMessage) {
        timeoutErrorMessage = _config.timeoutErrorMessage;
      }
      reject(new AxiosError$1(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError$1.ETIMEDOUT : AxiosError$1.ECONNABORTED,
        config2,
        request
      ));
      request = null;
    };
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils$1.isUndefined(_config.withCredentials)) {
      request.withCredentials = !!_config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = _config.responseType;
    }
    if (onDownloadProgress) {
      [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
      request.addEventListener("progress", downloadThrottled);
    }
    if (onUploadProgress && request.upload) {
      [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
      request.upload.addEventListener("progress", uploadThrottled);
      request.upload.addEventListener("loadend", flushUpload);
    }
    if (_config.cancelToken || _config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError$1(null, config2, request) : cancel);
        request.abort();
        request = null;
      };
      _config.cancelToken && _config.cancelToken.subscribe(onCanceled);
      if (_config.signal) {
        _config.signal.aborted ? onCanceled() : _config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(_config.url);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError$1("Unsupported protocol " + protocol + ":", AxiosError$1.ERR_BAD_REQUEST, config2));
      return;
    }
    request.send(requestData || null);
  });
};
const composeSignals = (signals, timeout) => {
  const { length } = signals = signals ? signals.filter(Boolean) : [];
  if (timeout || length) {
    let controller = new AbortController();
    let aborted;
    const onabort = function(reason) {
      if (!aborted) {
        aborted = true;
        unsubscribe();
        const err = reason instanceof Error ? reason : this.reason;
        controller.abort(err instanceof AxiosError$1 ? err : new CanceledError$1(err instanceof Error ? err.message : err));
      }
    };
    let timer = timeout && setTimeout(() => {
      timer = null;
      onabort(new AxiosError$1(`timeout ${timeout} of ms exceeded`, AxiosError$1.ETIMEDOUT));
    }, timeout);
    const unsubscribe = () => {
      if (signals) {
        timer && clearTimeout(timer);
        timer = null;
        signals.forEach((signal2) => {
          signal2.unsubscribe ? signal2.unsubscribe(onabort) : signal2.removeEventListener("abort", onabort);
        });
        signals = null;
      }
    };
    signals.forEach((signal2) => signal2.addEventListener("abort", onabort));
    const { signal } = controller;
    signal.unsubscribe = () => utils$1.asap(unsubscribe);
    return signal;
  }
};
const streamChunk = function* (chunk, chunkSize) {
  let len = chunk.byteLength;
  if (len < chunkSize) {
    yield chunk;
    return;
  }
  let pos = 0;
  let end;
  while (pos < len) {
    end = pos + chunkSize;
    yield chunk.slice(pos, end);
    pos = end;
  }
};
const readBytes = async function* (iterable, chunkSize) {
  for await (const chunk of readStream(iterable)) {
    yield* streamChunk(chunk, chunkSize);
  }
};
const readStream = async function* (stream) {
  if (stream[Symbol.asyncIterator]) {
    yield* stream;
    return;
  }
  const reader = stream.getReader();
  try {
    for (; ; ) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      yield value;
    }
  } finally {
    await reader.cancel();
  }
};
const trackStream = (stream, chunkSize, onProgress, onFinish) => {
  const iterator2 = readBytes(stream, chunkSize);
  let bytes = 0;
  let done;
  let _onFinish = (e2) => {
    if (!done) {
      done = true;
      onFinish && onFinish(e2);
    }
  };
  return new ReadableStream({
    async pull(controller) {
      try {
        const { done: done2, value } = await iterator2.next();
        if (done2) {
          _onFinish();
          controller.close();
          return;
        }
        let len = value.byteLength;
        if (onProgress) {
          let loadedBytes = bytes += len;
          onProgress(loadedBytes);
        }
        controller.enqueue(new Uint8Array(value));
      } catch (err) {
        _onFinish(err);
        throw err;
      }
    },
    cancel(reason) {
      _onFinish(reason);
      return iterator2.return();
    }
  }, {
    highWaterMark: 2
  });
};
const isFetchSupported = typeof fetch === "function" && typeof Request === "function" && typeof Response === "function";
const isReadableStreamSupported = isFetchSupported && typeof ReadableStream === "function";
const encodeText = isFetchSupported && (typeof TextEncoder === "function" ? /* @__PURE__ */ ((encoder) => (str) => encoder.encode(str))(new TextEncoder()) : async (str) => new Uint8Array(await new Response(str).arrayBuffer()));
const test = (fn, ...args) => {
  try {
    return !!fn(...args);
  } catch (e2) {
    return false;
  }
};
const supportsRequestStream = isReadableStreamSupported && test(() => {
  let duplexAccessed = false;
  const hasContentType = new Request(platform.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      duplexAccessed = true;
      return "half";
    }
  }).headers.has("Content-Type");
  return duplexAccessed && !hasContentType;
});
const DEFAULT_CHUNK_SIZE = 64 * 1024;
const supportsResponseStream = isReadableStreamSupported && test(() => utils$1.isReadableStream(new Response("").body));
const resolvers = {
  stream: supportsResponseStream && ((res) => res.body)
};
isFetchSupported && ((res) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((type) => {
    !resolvers[type] && (resolvers[type] = utils$1.isFunction(res[type]) ? (res2) => res2[type]() : (_, config2) => {
      throw new AxiosError$1(`Response type '${type}' is not supported`, AxiosError$1.ERR_NOT_SUPPORT, config2);
    });
  });
})(new Response());
const getBodyLength = async (body) => {
  if (body == null) {
    return 0;
  }
  if (utils$1.isBlob(body)) {
    return body.size;
  }
  if (utils$1.isSpecCompliantForm(body)) {
    const _request = new Request(platform.origin, {
      method: "POST",
      body
    });
    return (await _request.arrayBuffer()).byteLength;
  }
  if (utils$1.isArrayBufferView(body) || utils$1.isArrayBuffer(body)) {
    return body.byteLength;
  }
  if (utils$1.isURLSearchParams(body)) {
    body = body + "";
  }
  if (utils$1.isString(body)) {
    return (await encodeText(body)).byteLength;
  }
};
const resolveBodyLength = async (headers, body) => {
  const length = utils$1.toFiniteNumber(headers.getContentLength());
  return length == null ? getBodyLength(body) : length;
};
const fetchAdapter = isFetchSupported && (async (config2) => {
  let {
    url,
    method,
    data,
    signal,
    cancelToken,
    timeout,
    onDownloadProgress,
    onUploadProgress,
    responseType,
    headers,
    withCredentials = "same-origin",
    fetchOptions
  } = resolveConfig(config2);
  responseType = responseType ? (responseType + "").toLowerCase() : "text";
  let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
  let request;
  const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
    composedSignal.unsubscribe();
  });
  let requestContentLength;
  try {
    if (onUploadProgress && supportsRequestStream && method !== "get" && method !== "head" && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
      let _request = new Request(url, {
        method: "POST",
        body: data,
        duplex: "half"
      });
      let contentTypeHeader;
      if (utils$1.isFormData(data) && (contentTypeHeader = _request.headers.get("content-type"))) {
        headers.setContentType(contentTypeHeader);
      }
      if (_request.body) {
        const [onProgress, flush] = progressEventDecorator(
          requestContentLength,
          progressEventReducer(asyncDecorator(onUploadProgress))
        );
        data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
      }
    }
    if (!utils$1.isString(withCredentials)) {
      withCredentials = withCredentials ? "include" : "omit";
    }
    const isCredentialsSupported = "credentials" in Request.prototype;
    request = new Request(url, {
      ...fetchOptions,
      signal: composedSignal,
      method: method.toUpperCase(),
      headers: headers.normalize().toJSON(),
      body: data,
      duplex: "half",
      credentials: isCredentialsSupported ? withCredentials : void 0
    });
    let response = await fetch(request);
    const isStreamResponse = supportsResponseStream && (responseType === "stream" || responseType === "response");
    if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
      const options = {};
      ["status", "statusText", "headers"].forEach((prop) => {
        options[prop] = response[prop];
      });
      const responseContentLength = utils$1.toFiniteNumber(response.headers.get("content-length"));
      const [onProgress, flush] = onDownloadProgress && progressEventDecorator(
        responseContentLength,
        progressEventReducer(asyncDecorator(onDownloadProgress), true)
      ) || [];
      response = new Response(
        trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
          flush && flush();
          unsubscribe && unsubscribe();
        }),
        options
      );
    }
    responseType = responseType || "text";
    let responseData = await resolvers[utils$1.findKey(resolvers, responseType) || "text"](response, config2);
    !isStreamResponse && unsubscribe && unsubscribe();
    return await new Promise((resolve, reject) => {
      settle(resolve, reject, {
        data: responseData,
        headers: AxiosHeaders$1.from(response.headers),
        status: response.status,
        statusText: response.statusText,
        config: config2,
        request
      });
    });
  } catch (err) {
    unsubscribe && unsubscribe();
    if (err && err.name === "TypeError" && /Load failed|fetch/i.test(err.message)) {
      throw Object.assign(
        new AxiosError$1("Network Error", AxiosError$1.ERR_NETWORK, config2, request),
        {
          cause: err.cause || err
        }
      );
    }
    throw AxiosError$1.from(err, err && err.code, config2, request);
  }
});
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter,
  fetch: fetchAdapter
};
utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const renderReason = (reason) => `- ${reason}`;
const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils$1.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    const rejectedReasons = {};
    for (let i2 = 0; i2 < length; i2++) {
      nameOrAdapter = adapters2[i2];
      let id;
      adapter = nameOrAdapter;
      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];
        if (adapter === void 0) {
          throw new AxiosError$1(`Unknown adapter '${id}'`);
        }
      }
      if (adapter) {
        break;
      }
      rejectedReasons[id || "#" + i2] = adapter;
    }
    if (!adapter) {
      const reasons = Object.entries(rejectedReasons).map(
        ([id, state2]) => `adapter ${id} ` + (state2 === false ? "is not supported by the environment" : "is not available in the build")
      );
      let s3 = length ? reasons.length > 1 ? "since :\n" + reasons.map(renderReason).join("\n") : " " + renderReason(reasons[0]) : "as no adapter specified";
      throw new AxiosError$1(
        `There is no suitable adapter to dispatch the request ` + s3,
        "ERR_NOT_SUPPORT"
      );
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config2) {
  if (config2.cancelToken) {
    config2.cancelToken.throwIfRequested();
  }
  if (config2.signal && config2.signal.aborted) {
    throw new CanceledError$1(null, config2);
  }
}
function dispatchRequest(config2) {
  throwIfCancellationRequested(config2);
  config2.headers = AxiosHeaders$1.from(config2.headers);
  config2.data = transformData.call(
    config2,
    config2.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config2.method) !== -1) {
    config2.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config2.adapter || defaults.adapter);
  return adapter(config2).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config2);
    response.data = transformData.call(
      config2,
      config2.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel$1(reason)) {
      throwIfCancellationRequested(config2);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config2,
          config2.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const VERSION$1 = "1.9.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i2) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i2 < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION$1 + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError$1(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError$1.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
validators$1.spelling = function spelling(correctSpelling) {
  return (value, opt) => {
    console.warn(`${opt} is likely a misspelling of ${correctSpelling}`);
    return true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError$1("options must be an object", AxiosError$1.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i2 = keys.length;
  while (i2-- > 0) {
    const opt = keys[i2];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError$1("option " + opt + " must be " + result, AxiosError$1.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError$1("Unknown option " + opt, AxiosError$1.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
let Axios$1 = class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig || {};
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config2) {
    try {
      return await this._request(configOrUrl, config2);
    } catch (err) {
      if (err instanceof Error) {
        let dummy = {};
        Error.captureStackTrace ? Error.captureStackTrace(dummy) : dummy = new Error();
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, "") : "";
        try {
          if (!err.stack) {
            err.stack = stack;
          } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ""))) {
            err.stack += "\n" + stack;
          }
        } catch (e2) {
        }
      }
      throw err;
    }
  }
  _request(configOrUrl, config2) {
    if (typeof configOrUrl === "string") {
      config2 = config2 || {};
      config2.url = configOrUrl;
    } else {
      config2 = configOrUrl || {};
    }
    config2 = mergeConfig$1(this.defaults, config2);
    const { transitional: transitional2, paramsSerializer, headers } = config2;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config2.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    if (config2.allowAbsoluteUrls !== void 0) ;
    else if (this.defaults.allowAbsoluteUrls !== void 0) {
      config2.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls;
    } else {
      config2.allowAbsoluteUrls = true;
    }
    validator.assertOptions(config2, {
      baseUrl: validators.spelling("baseURL"),
      withXsrfToken: validators.spelling("withXSRFToken")
    }, true);
    config2.method = (config2.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config2.method]
    );
    headers && utils$1.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config2.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config2) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i2 = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config2);
      while (i2 < len) {
        promise = promise.then(chain[i2++], chain[i2++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config2;
    i2 = 0;
    while (i2 < len) {
      const onFulfilled = requestInterceptorChain[i2++];
      const onRejected = requestInterceptorChain[i2++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i2 = 0;
    len = responseInterceptorChain.length;
    while (i2 < len) {
      promise = promise.then(responseInterceptorChain[i2++], responseInterceptorChain[i2++]);
    }
    return promise;
  }
  getUri(config2) {
    config2 = mergeConfig$1(this.defaults, config2);
    const fullPath = buildFullPath(config2.baseURL, config2.url, config2.allowAbsoluteUrls);
    return buildURL(fullPath, config2.params, config2.paramsSerializer);
  }
};
utils$1.forEach(["delete", "get", "head", "options"], function forEachMethodNoData(method) {
  Axios$1.prototype[method] = function(url, config2) {
    return this.request(mergeConfig$1(config2 || {}, {
      method,
      url,
      data: (config2 || {}).data
    }));
  };
});
utils$1.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config2) {
      return this.request(mergeConfig$1(config2 || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios$1.prototype[method] = generateHTTPMethod();
  Axios$1.prototype[method + "Form"] = generateHTTPMethod(true);
});
let CancelToken$1 = class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners) return;
      let i2 = token._listeners.length;
      while (i2-- > 0) {
        token._listeners[i2](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config2, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError$1(message, config2, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  }
  toAbortSignal() {
    const controller = new AbortController();
    const abort = (err) => {
      controller.abort(err);
    };
    this.subscribe(abort);
    controller.signal.unsubscribe = () => this.unsubscribe(abort);
    return controller.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
};
function spread$1(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError$1(payload) {
  return utils$1.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode$1 = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode$1).forEach(([key, value]) => {
  HttpStatusCode$1[value] = key;
});
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils$1.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils$1.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig$1(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios = createInstance(defaults);
axios.Axios = Axios$1;
axios.CanceledError = CanceledError$1;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel$1;
axios.VERSION = VERSION$1;
axios.toFormData = toFormData$1;
axios.AxiosError = AxiosError$1;
axios.Cancel = axios.CanceledError;
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = spread$1;
axios.isAxiosError = isAxiosError$1;
axios.mergeConfig = mergeConfig$1;
axios.AxiosHeaders = AxiosHeaders$1;
axios.formToJSON = (thing) => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);
axios.getAdapter = adapters.getAdapter;
axios.HttpStatusCode = HttpStatusCode$1;
axios.default = axios;
const {
  Axios: Axios2,
  AxiosError,
  CanceledError,
  isCancel,
  CancelToken: CancelToken2,
  VERSION,
  all: all2,
  Cancel,
  isAxiosError,
  spread,
  toFormData,
  AxiosHeaders: AxiosHeaders2,
  HttpStatusCode,
  formToJSON,
  getAdapter,
  mergeConfig
} = axios;
class BeneficiaryCriteria extends AbstractService {
  constructor() {
    super();
    this._i18n_t = null;
  }
  setI18n(i18n) {
    this._i18n_t = i18n.t;
  }
  hasCoverageCriteria(beneficiaryCriteria) {
    return Object.keys(this.getCoverageCritNames(beneficiaryCriteria)).length > 0;
  }
  getCoverageCritNames(beneficiaryCriteria) {
    return Object.keys(beneficiaryCriteria).reduce((names, criterionKey) => {
      if (criterionKey.includes("coverage_duration")) names.duration = criterionKey;
      else if (criterionKey.includes("coverage_km")) names.km = criterionKey;
      return names;
    }, {});
  }
  hasCoverageDurationKmCouple(beneficiaryCriteria) {
    const names = this.getCoverageCritNames(beneficiaryCriteria);
    return ["duration", "km"].every((elem) => Object.keys(names).includes(elem));
  }
  isCriterionValueInCovDurationOptions(beneficiaryCriteria, coverageDurationOptions, criterion) {
    return Object.keys(coverageDurationOptions).includes(beneficiaryCriteria[criterion]);
  }
  getValidCoverageDurationWithoutSelectValues(defaultValue, coverageDurationOptions, criterion = null) {
    const coverageDurationOptionsKeys = Object.keys(coverageDurationOptions);
    if (criterion) {
      if (coverageDurationOptionsKeys.includes(defaultValue[criterion])) {
        return defaultValue;
      }
      defaultValue[criterion] = coverageDurationOptionsKeys[0];
      return defaultValue;
    }
    if (coverageDurationOptionsKeys.includes(defaultValue)) {
      return defaultValue;
    }
    return coverageDurationOptionsKeys[0];
  }
  getValidCoverageDuration(beneficiaryCriteria, defaultValue, userSelectableValues) {
    const critNames = this.getCoverageCritNames(beneficiaryCriteria);
    const selectedDuration = beneficiaryCriteria[critNames.duration];
    const durationDefaultValue = defaultValue[critNames.duration];
    if (userSelectableValues.duration[selectedDuration]) {
      return beneficiaryCriteria;
    }
    if (selectedDuration !== durationDefaultValue && userSelectableValues.duration[durationDefaultValue]) {
      return defaultValue;
    }
    return {
      [critNames.duration]: Object.keys(userSelectableValues.duration).filter(
        (duration) => userSelectableValues.duration[duration] === true
      )[0]
    };
  }
  getCoverageDurationFirstSelectableValue(userSelectableValues) {
    const selectableDurations = Object.keys(userSelectableValues.duration_km).filter(
      (duration) => this._isCoverageCoupleDurationSelectable(userSelectableValues, duration)
    );
    return selectableDurations[0];
  }
  getValidCoverageCouple(beneficiaryCriteria, defaultValues, userSelectableValues) {
    const critNames = this.getCoverageCritNames(beneficiaryCriteria);
    const selectedDuration = beneficiaryCriteria[critNames.duration];
    const selectedKm = beneficiaryCriteria[critNames.km];
    const durationDefaultValue = defaultValues[critNames.duration];
    const kmDefaultValue = defaultValues[critNames.km];
    if (userSelectableValues.duration_km[selectedDuration][selectedKm]) {
      return beneficiaryCriteria;
    }
    if ((selectedDuration !== durationDefaultValue || selectedKm !== kmDefaultValue) && userSelectableValues.duration_km[durationDefaultValue][kmDefaultValue]) {
      return defaultValues;
    }
    return {
      [critNames.duration]: this.getCoverageDurationFirstSelectableValue(userSelectableValues),
      [critNames.km]: this.getCoverageKmFirstSelectableValue(userSelectableValues)
    };
  }
  getValidCoverageCoupleOnDurationChange(beneficiaryCriteria, userSelectableValues) {
    const critNames = this.getCoverageCritNames(beneficiaryCriteria);
    const selectedDuration = beneficiaryCriteria[critNames.duration];
    const selectedKm = beneficiaryCriteria[critNames.km];
    const firstSelectableKm = this.getCoverageKmFirstSelectableValueForDuration(
      userSelectableValues,
      selectedDuration
    );
    if (userSelectableValues.duration_km[selectedDuration][selectedKm] || firstSelectableKm === null) {
      return {
        [critNames.duration]: selectedDuration,
        [critNames.km]: selectedKm
      };
    }
    return {
      [critNames.duration]: selectedDuration,
      [critNames.km]: firstSelectableKm
    };
  }
  getCoverageKmFirstSelectableValue(userSelectableValues) {
    for (const duration of Object.keys(userSelectableValues.duration_km)) {
      const firstSelectableKm = this.getCoverageKmFirstSelectableValueForDuration(
        userSelectableValues,
        duration
      );
      if (firstSelectableKm !== null) {
        return firstSelectableKm;
      }
    }
  }
  getCoverageDurationOptions(beneficiaryCriteria, userSelectableValues) {
    if (this.hasCoverageDurationKmCouple(beneficiaryCriteria)) {
      return Object.keys(userSelectableValues.duration_km).reduce(
        (options, duration) => {
          if (this._isCoverageCoupleDurationSelectable(userSelectableValues, duration)) {
            options[duration] = this._i18n_t(`criteria.durations.${duration}`);
          }
          return options;
        },
        {}
      );
    }
    return Object.keys(userSelectableValues.duration).reduce((options, duration) => {
      if (userSelectableValues.duration[duration]) {
        options[duration] = this._i18n_t(`criteria.durations.${duration}`);
      }
      return options;
    }, {});
  }
  getCoverageKmOptionsForDuration(userSelectableValues, duration) {
    return Object.keys(userSelectableValues.duration_km[duration]).reduce(
      (options, km) => {
        if (userSelectableValues.duration_km[duration][km]) {
          options[km] = this._i18n_t(`criteria.kms.${km}`);
        }
        return options;
      },
      {}
    );
  }
  getCoverageKmFirstSelectableValueForDuration(userSelectableValues, duration) {
    const selectableKms = Object.keys(
      userSelectableValues.duration_km[duration]
    ).filter((km) => userSelectableValues.duration_km[duration][km] === true);
    if (selectableKms.length > 0) {
      selectableKms.sort((a3, b2) => {
        return a3.localeCompare(b2, void 0, {
          numeric: true,
          sensitivity: "base"
        });
      });
      return selectableKms[0];
    }
    return null;
  }
  _isCoverageCoupleDurationSelectable(userSelectableValues, duration) {
    return Object.values(userSelectableValues.duration_km[duration]).some(
      (isSelectable) => isSelectable === true
    );
  }
  areAllCoverageUserSelectableValuesFalse(userSelectableValues) {
    let userBooleanValuesArray = [];
    if (Object.prototype.hasOwnProperty.call(userSelectableValues, "duration_km")) {
      userBooleanValuesArray = Object.values(userSelectableValues.duration_km).map((obj) => Object.values(obj)).flat();
    } else {
      userBooleanValuesArray = Object.values(userSelectableValues.duration).flat();
    }
    return !userBooleanValuesArray.some((value) => value === true);
  }
  areAllCoverageUserSelectableValuesTrue(userSelectableValues) {
    let userBooleanValuesArray = [];
    if (Object.prototype.hasOwnProperty.call(userSelectableValues, "duration_km")) {
      userBooleanValuesArray = Object.values(userSelectableValues.duration_km).map((obj) => Object.values(obj)).flat();
    } else {
      userBooleanValuesArray = Object.values(userSelectableValues.duration).flat();
    }
    return !userBooleanValuesArray.some((value) => value === false);
  }
}
let BeneficiaryCriteriaService = new BeneficiaryCriteria();
class Criteria extends AbstractService {
  constructor() {
    super(...arguments);
    __publicField(this, "special_criteria", ["sales_mode_", "usage_"]);
  }
  getSpecialCriteriaValue(offerConfig, listCriteria, criteriaBeginningName) {
    for (let criteria in listCriteria) {
      const criteriaName = listCriteria[criteria];
      if (criteriaName.startsWith(criteriaBeginningName)) {
        return criteriaName;
      }
    }
    return "";
  }
  getSpecialCriteriaName(listCriteria) {
    let specialCriteria = [];
    for (let criteria in listCriteria) {
      const criteriaName = listCriteria[criteria];
      for (let criteriaBeginning in this.special_criteria) {
        if (criteriaName.startsWith(this.special_criteria[criteriaBeginning])) {
          specialCriteria.push(criteriaName);
        }
      }
    }
    return specialCriteria;
  }
}
let CriteriaService = new Criteria();
class CurrencyService extends AbstractService {
  constructor() {
    super(...arguments);
    __publicField(this, "currencyCode", {
      kow: "₩",
      eur: "€"
    });
  }
  getCurrencySymbol() {
    const currencySymbol = "eur";
    return this.currencyCode[currencySymbol];
  }
  getProductMemoCurrencySymbol(currentLang) {
    return currentLang !== "ko" ? this.currencyCode["eur"] : this.currencyCode["kow"];
  }
  getCurrencyEurToKrwRate() {
    return 1400;
  }
}
const CurrencyService$1 = new CurrencyService();
const INTERNAL_ADMIN = 1;
const DISTRIBUTOR_ADMIN = 2;
const INTERNAL_USER = 3;
const SELLER_DISTRIBUTOR = 4;
const BENEFICIARY = 5;
const GUEST = 6;
class Group extends AbstractService {
  constructor() {
    super(...arguments);
    __publicField(this, "mappingGroups", {
      1: "internal_admin",
      2: "distributor_admin",
      3: "internal_user",
      4: "seller_distributor",
      5: "beneficiary",
      6: "guest"
    });
  }
  get INTERNAL_ADMIN() {
    return 1;
  }
  get DISTRIBUTOR_ADMIN() {
    return 2;
  }
  get INTERNAL_USER() {
    return 3;
  }
  get SELLER_DISTRIBUTOR() {
    return 4;
  }
  get BENEFICIARY() {
    return 5;
  }
  get GUEST() {
    return 6;
  }
  getCodeById(id) {
    return this.mappingGroups[id];
  }
}
let GroupService = new Group();
class PricingService extends AbstractService {
  constructor() {
    super();
    this._i18n = null;
  }
  setI18n(i18n) {
    this._i18n = i18n;
  }
  /**
   * Return the price formatted for display, according to the current locale and whether it's a cash or monthly price.
   * Cash price must be displayed without any decimals ; monthly price must be displayed with 2 decimals.
   *
   * @param {Number} price price to be formatted
   * @param {String} currency_code currency_code to be applied
   * @param {Boolean} isMonthly whether it's a monthly price or not
   *
   * @returns {String} formatted price
   */
  getFormattedPriceToDisplay(price, isMonthly = false, currency_code = "EUR") {
    const key = isMonthly ? "monthly_pricing" : "cash_pricing";
    return this._i18n.n(price, { key, currency: currency_code });
  }
}
const PricingService$1 = new PricingService();
class ArrayUtils extends AbstractService {
  isArray(value) {
    return Array.isArray(value);
  }
  /**
   * Creates a sequence of numbers, starting from 0 by default, increments by 1
   * and stops before a specified number
   *
   * same as Python range()
   *
   * @param start
   * @param end
   * @returns {unknown[]}
   */
  range(start, end) {
    return [...Array(end - start).keys()].map((v) => start + v);
  }
  areSame(first, second) {
    return first.every((e2) => second.includes(e2)) && second.every((e2) => first.includes(e2));
  }
  /**
   * Adds an element to the array if it does not already exist
   *
   * @param baseArray
   * @param value
   */
  pushIfNotExist(baseArray, value) {
    if (!baseArray.includes(value)) {
      baseArray.push(value);
    }
    return baseArray;
  }
  /**
   * Return an object containing only the entries common to all objects.
   * Limitation: dict should contain only simple types
   *
   * @param {Array} array
   */
  getObjectWithCommonEntriesOnly(array) {
    if (array.length === 0) {
      return {};
    }
    const arrayCopy = [...array];
    const arraySortedByNbOfEntries = arrayCopy.sort((a3, b2) => {
      return Object.keys(a3).length > Object.keys(b2).length ? 1 : -1;
    });
    return Object.fromEntries(
      Object.entries(arraySortedByNbOfEntries[0]).filter(([key]) => {
        return arrayCopy.every((item) => Object.keys(item).includes(key));
      })
    );
  }
  /**
   * Returns the length of the longest string in the provided array.
   *
   * @param array
   * @returns {Number}
   */
  getStringMaxLength(array) {
    return array.reduce((acc, item) => {
      return item.length > acc ? item.length : acc;
    }, 0);
  }
  /**
   * Check if array contains provided values.
   * Values must be simple elements like string, integers, ...
   *
   * @param baseArray
   * @param values
   * @returns boolean
   */
  areValuesInArray(baseArray, values) {
    return values.every((value) => baseArray.includes(value));
  }
  /**
   * Returns an array that contains the items of both input arrays, without duplicated items.
   *
   * @param array1
   * @param array2
   * @returns {Array}
   */
  concatWithoutDuplicates(array1, array2) {
    let resultArray = array1;
    array2.forEach(
      (item) => resultArray = ArrayService.pushIfNotExist(resultArray, item)
    );
    return resultArray;
  }
  /**
   * Returns an array that contains the items in ascending order.
   *
   * @param array
   * @returns {Array}
   */
  sortIntegers(array) {
    if (array.some((item) => !Number.isInteger(item))) {
      throw new TypeError();
    }
    return array.sort((a3, b2) => a3 - b2);
  }
  /**
   * Returns an indicator whether an object with the provided values exists in an array.
   * It only checks property - value couples not whether it's the same object.
   *
   * @param array
   * @param object
   * @returns {boolean}
   */
  isObjectWithSameValuesInArray(array, object) {
    return array.some((item) => JSON.stringify(item) === JSON.stringify(object));
  }
}
let ArrayService = new ArrayUtils();
var dayjs_min$1 = { exports: {} };
var dayjs_min = dayjs_min$1.exports;
var hasRequiredDayjs_min;
function requireDayjs_min() {
  if (hasRequiredDayjs_min) return dayjs_min$1.exports;
  hasRequiredDayjs_min = 1;
  (function(module, exports) {
    !function(t2, e2) {
      module.exports = e2();
    }(dayjs_min, function() {
      var t2 = 1e3, e2 = 6e4, n = 36e5, r = "millisecond", i2 = "second", s3 = "minute", u2 = "hour", a3 = "day", o = "week", c2 = "month", f = "quarter", h3 = "year", d3 = "date", l = "Invalid Date", $ = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y3 = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M3 = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(t3) {
        var e3 = ["th", "st", "nd", "rd"], n2 = t3 % 100;
        return "[" + t3 + (e3[(n2 - 20) % 10] || e3[n2] || e3[0]) + "]";
      } }, m3 = function(t3, e3, n2) {
        var r2 = String(t3);
        return !r2 || r2.length >= e3 ? t3 : "" + Array(e3 + 1 - r2.length).join(n2) + t3;
      }, v = { s: m3, z: function(t3) {
        var e3 = -t3.utcOffset(), n2 = Math.abs(e3), r2 = Math.floor(n2 / 60), i3 = n2 % 60;
        return (e3 <= 0 ? "+" : "-") + m3(r2, 2, "0") + ":" + m3(i3, 2, "0");
      }, m: function t3(e3, n2) {
        if (e3.date() < n2.date()) return -t3(n2, e3);
        var r2 = 12 * (n2.year() - e3.year()) + (n2.month() - e3.month()), i3 = e3.clone().add(r2, c2), s4 = n2 - i3 < 0, u3 = e3.clone().add(r2 + (s4 ? -1 : 1), c2);
        return +(-(r2 + (n2 - i3) / (s4 ? i3 - u3 : u3 - i3)) || 0);
      }, a: function(t3) {
        return t3 < 0 ? Math.ceil(t3) || 0 : Math.floor(t3);
      }, p: function(t3) {
        return { M: c2, y: h3, w: o, d: a3, D: d3, h: u2, m: s3, s: i2, ms: r, Q: f }[t3] || String(t3 || "").toLowerCase().replace(/s$/, "");
      }, u: function(t3) {
        return void 0 === t3;
      } }, g = "en", D2 = {};
      D2[g] = M3;
      var p = "$isDayjsObject", S3 = function(t3) {
        return t3 instanceof _ || !(!t3 || !t3[p]);
      }, w2 = function t3(e3, n2, r2) {
        var i3;
        if (!e3) return g;
        if ("string" == typeof e3) {
          var s4 = e3.toLowerCase();
          D2[s4] && (i3 = s4), n2 && (D2[s4] = n2, i3 = s4);
          var u3 = e3.split("-");
          if (!i3 && u3.length > 1) return t3(u3[0]);
        } else {
          var a4 = e3.name;
          D2[a4] = e3, i3 = a4;
        }
        return !r2 && i3 && (g = i3), i3 || !r2 && g;
      }, O2 = function(t3, e3) {
        if (S3(t3)) return t3.clone();
        var n2 = "object" == typeof e3 ? e3 : {};
        return n2.date = t3, n2.args = arguments, new _(n2);
      }, b2 = v;
      b2.l = w2, b2.i = S3, b2.w = function(t3, e3) {
        return O2(t3, { locale: e3.$L, utc: e3.$u, x: e3.$x, $offset: e3.$offset });
      };
      var _ = function() {
        function M4(t3) {
          this.$L = w2(t3.locale, null, true), this.parse(t3), this.$x = this.$x || t3.x || {}, this[p] = true;
        }
        var m4 = M4.prototype;
        return m4.parse = function(t3) {
          this.$d = function(t4) {
            var e3 = t4.date, n2 = t4.utc;
            if (null === e3) return /* @__PURE__ */ new Date(NaN);
            if (b2.u(e3)) return /* @__PURE__ */ new Date();
            if (e3 instanceof Date) return new Date(e3);
            if ("string" == typeof e3 && !/Z$/i.test(e3)) {
              var r2 = e3.match($);
              if (r2) {
                var i3 = r2[2] - 1 || 0, s4 = (r2[7] || "0").substring(0, 3);
                return n2 ? new Date(Date.UTC(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s4)) : new Date(r2[1], i3, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s4);
              }
            }
            return new Date(e3);
          }(t3), this.init();
        }, m4.init = function() {
          var t3 = this.$d;
          this.$y = t3.getFullYear(), this.$M = t3.getMonth(), this.$D = t3.getDate(), this.$W = t3.getDay(), this.$H = t3.getHours(), this.$m = t3.getMinutes(), this.$s = t3.getSeconds(), this.$ms = t3.getMilliseconds();
        }, m4.$utils = function() {
          return b2;
        }, m4.isValid = function() {
          return !(this.$d.toString() === l);
        }, m4.isSame = function(t3, e3) {
          var n2 = O2(t3);
          return this.startOf(e3) <= n2 && n2 <= this.endOf(e3);
        }, m4.isAfter = function(t3, e3) {
          return O2(t3) < this.startOf(e3);
        }, m4.isBefore = function(t3, e3) {
          return this.endOf(e3) < O2(t3);
        }, m4.$g = function(t3, e3, n2) {
          return b2.u(t3) ? this[e3] : this.set(n2, t3);
        }, m4.unix = function() {
          return Math.floor(this.valueOf() / 1e3);
        }, m4.valueOf = function() {
          return this.$d.getTime();
        }, m4.startOf = function(t3, e3) {
          var n2 = this, r2 = !!b2.u(e3) || e3, f2 = b2.p(t3), l2 = function(t4, e4) {
            var i3 = b2.w(n2.$u ? Date.UTC(n2.$y, e4, t4) : new Date(n2.$y, e4, t4), n2);
            return r2 ? i3 : i3.endOf(a3);
          }, $2 = function(t4, e4) {
            return b2.w(n2.toDate()[t4].apply(n2.toDate("s"), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e4)), n2);
          }, y4 = this.$W, M5 = this.$M, m5 = this.$D, v2 = "set" + (this.$u ? "UTC" : "");
          switch (f2) {
            case h3:
              return r2 ? l2(1, 0) : l2(31, 11);
            case c2:
              return r2 ? l2(1, M5) : l2(0, M5 + 1);
            case o:
              var g2 = this.$locale().weekStart || 0, D3 = (y4 < g2 ? y4 + 7 : y4) - g2;
              return l2(r2 ? m5 - D3 : m5 + (6 - D3), M5);
            case a3:
            case d3:
              return $2(v2 + "Hours", 0);
            case u2:
              return $2(v2 + "Minutes", 1);
            case s3:
              return $2(v2 + "Seconds", 2);
            case i2:
              return $2(v2 + "Milliseconds", 3);
            default:
              return this.clone();
          }
        }, m4.endOf = function(t3) {
          return this.startOf(t3, false);
        }, m4.$set = function(t3, e3) {
          var n2, o2 = b2.p(t3), f2 = "set" + (this.$u ? "UTC" : ""), l2 = (n2 = {}, n2[a3] = f2 + "Date", n2[d3] = f2 + "Date", n2[c2] = f2 + "Month", n2[h3] = f2 + "FullYear", n2[u2] = f2 + "Hours", n2[s3] = f2 + "Minutes", n2[i2] = f2 + "Seconds", n2[r] = f2 + "Milliseconds", n2)[o2], $2 = o2 === a3 ? this.$D + (e3 - this.$W) : e3;
          if (o2 === c2 || o2 === h3) {
            var y4 = this.clone().set(d3, 1);
            y4.$d[l2]($2), y4.init(), this.$d = y4.set(d3, Math.min(this.$D, y4.daysInMonth())).$d;
          } else l2 && this.$d[l2]($2);
          return this.init(), this;
        }, m4.set = function(t3, e3) {
          return this.clone().$set(t3, e3);
        }, m4.get = function(t3) {
          return this[b2.p(t3)]();
        }, m4.add = function(r2, f2) {
          var d4, l2 = this;
          r2 = Number(r2);
          var $2 = b2.p(f2), y4 = function(t3) {
            var e3 = O2(l2);
            return b2.w(e3.date(e3.date() + Math.round(t3 * r2)), l2);
          };
          if ($2 === c2) return this.set(c2, this.$M + r2);
          if ($2 === h3) return this.set(h3, this.$y + r2);
          if ($2 === a3) return y4(1);
          if ($2 === o) return y4(7);
          var M5 = (d4 = {}, d4[s3] = e2, d4[u2] = n, d4[i2] = t2, d4)[$2] || 1, m5 = this.$d.getTime() + r2 * M5;
          return b2.w(m5, this);
        }, m4.subtract = function(t3, e3) {
          return this.add(-1 * t3, e3);
        }, m4.format = function(t3) {
          var e3 = this, n2 = this.$locale();
          if (!this.isValid()) return n2.invalidDate || l;
          var r2 = t3 || "YYYY-MM-DDTHH:mm:ssZ", i3 = b2.z(this), s4 = this.$H, u3 = this.$m, a4 = this.$M, o2 = n2.weekdays, c3 = n2.months, f2 = n2.meridiem, h4 = function(t4, n3, i4, s5) {
            return t4 && (t4[n3] || t4(e3, r2)) || i4[n3].slice(0, s5);
          }, d4 = function(t4) {
            return b2.s(s4 % 12 || 12, t4, "0");
          }, $2 = f2 || function(t4, e4, n3) {
            var r3 = t4 < 12 ? "AM" : "PM";
            return n3 ? r3.toLowerCase() : r3;
          };
          return r2.replace(y3, function(t4, r3) {
            return r3 || function(t5) {
              switch (t5) {
                case "YY":
                  return String(e3.$y).slice(-2);
                case "YYYY":
                  return b2.s(e3.$y, 4, "0");
                case "M":
                  return a4 + 1;
                case "MM":
                  return b2.s(a4 + 1, 2, "0");
                case "MMM":
                  return h4(n2.monthsShort, a4, c3, 3);
                case "MMMM":
                  return h4(c3, a4);
                case "D":
                  return e3.$D;
                case "DD":
                  return b2.s(e3.$D, 2, "0");
                case "d":
                  return String(e3.$W);
                case "dd":
                  return h4(n2.weekdaysMin, e3.$W, o2, 2);
                case "ddd":
                  return h4(n2.weekdaysShort, e3.$W, o2, 3);
                case "dddd":
                  return o2[e3.$W];
                case "H":
                  return String(s4);
                case "HH":
                  return b2.s(s4, 2, "0");
                case "h":
                  return d4(1);
                case "hh":
                  return d4(2);
                case "a":
                  return $2(s4, u3, true);
                case "A":
                  return $2(s4, u3, false);
                case "m":
                  return String(u3);
                case "mm":
                  return b2.s(u3, 2, "0");
                case "s":
                  return String(e3.$s);
                case "ss":
                  return b2.s(e3.$s, 2, "0");
                case "SSS":
                  return b2.s(e3.$ms, 3, "0");
                case "Z":
                  return i3;
              }
              return null;
            }(t4) || i3.replace(":", "");
          });
        }, m4.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
        }, m4.diff = function(r2, d4, l2) {
          var $2, y4 = this, M5 = b2.p(d4), m5 = O2(r2), v2 = (m5.utcOffset() - this.utcOffset()) * e2, g2 = this - m5, D3 = function() {
            return b2.m(y4, m5);
          };
          switch (M5) {
            case h3:
              $2 = D3() / 12;
              break;
            case c2:
              $2 = D3();
              break;
            case f:
              $2 = D3() / 3;
              break;
            case o:
              $2 = (g2 - v2) / 6048e5;
              break;
            case a3:
              $2 = (g2 - v2) / 864e5;
              break;
            case u2:
              $2 = g2 / n;
              break;
            case s3:
              $2 = g2 / e2;
              break;
            case i2:
              $2 = g2 / t2;
              break;
            default:
              $2 = g2;
          }
          return l2 ? $2 : b2.a($2);
        }, m4.daysInMonth = function() {
          return this.endOf(c2).$D;
        }, m4.$locale = function() {
          return D2[this.$L];
        }, m4.locale = function(t3, e3) {
          if (!t3) return this.$L;
          var n2 = this.clone(), r2 = w2(t3, e3, true);
          return r2 && (n2.$L = r2), n2;
        }, m4.clone = function() {
          return b2.w(this.$d, this);
        }, m4.toDate = function() {
          return new Date(this.valueOf());
        }, m4.toJSON = function() {
          return this.isValid() ? this.toISOString() : null;
        }, m4.toISOString = function() {
          return this.$d.toISOString();
        }, m4.toString = function() {
          return this.$d.toUTCString();
        }, M4;
      }(), k2 = _.prototype;
      return O2.prototype = k2, [["$ms", r], ["$s", i2], ["$m", s3], ["$H", u2], ["$W", a3], ["$M", c2], ["$y", h3], ["$D", d3]].forEach(function(t3) {
        k2[t3[1]] = function(e3) {
          return this.$g(e3, t3[0], t3[1]);
        };
      }), O2.extend = function(t3, e3) {
        return t3.$i || (t3(e3, _, O2), t3.$i = true), O2;
      }, O2.locale = w2, O2.isDayjs = S3, O2.unix = function(t3) {
        return O2(1e3 * t3);
      }, O2.en = D2[g], O2.Ls = D2, O2.p = {}, O2;
    });
  })(dayjs_min$1);
  return dayjs_min$1.exports;
}
var dayjs_minExports = requireDayjs_min();
const dayjs = /* @__PURE__ */ getDefaultExportFromCjs(dayjs_minExports);
var fr$4 = { exports: {} };
var fr$3 = fr$4.exports;
var hasRequiredFr;
function requireFr() {
  if (hasRequiredFr) return fr$4.exports;
  hasRequiredFr = 1;
  (function(module, exports) {
    !function(e2, n) {
      module.exports = n(requireDayjs_min());
    }(fr$3, function(e2) {
      function n(e3) {
        return e3 && "object" == typeof e3 && "default" in e3 ? e3 : { default: e3 };
      }
      var t2 = n(e2), i2 = { name: "fr", weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"), weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"), weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"), months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"), monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"), weekStart: 1, yearStart: 4, formats: { LT: "HH:mm", LTS: "HH:mm:ss", L: "DD/MM/YYYY", LL: "D MMMM YYYY", LLL: "D MMMM YYYY HH:mm", LLLL: "dddd D MMMM YYYY HH:mm" }, relativeTime: { future: "dans %s", past: "il y a %s", s: "quelques secondes", m: "une minute", mm: "%d minutes", h: "une heure", hh: "%d heures", d: "un jour", dd: "%d jours", M: "un mois", MM: "%d mois", y: "un an", yy: "%d ans" }, ordinal: function(e3) {
        return "" + e3 + (1 === e3 ? "er" : "");
      } };
      return t2.default.locale(i2, null, true), i2;
    });
  })(fr$4);
  return fr$4.exports;
}
var frExports = requireFr();
const fr$2 = /* @__PURE__ */ getDefaultExportFromCjs(frExports);
var en$4 = { exports: {} };
var en$3 = en$4.exports;
var hasRequiredEn;
function requireEn() {
  if (hasRequiredEn) return en$4.exports;
  hasRequiredEn = 1;
  (function(module, exports) {
    !function(e2, n) {
      module.exports = n();
    }(en$3, function() {
      return { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(e2) {
        var n = ["th", "st", "nd", "rd"], t2 = e2 % 100;
        return "[" + e2 + (n[(t2 - 20) % 10] || n[t2] || n[0]) + "]";
      } };
    });
  })(en$4);
  return en$4.exports;
}
var enExports = requireEn();
const en$2 = /* @__PURE__ */ getDefaultExportFromCjs(enExports);
var es$3 = { exports: {} };
var es$2 = es$3.exports;
var hasRequiredEs;
function requireEs() {
  if (hasRequiredEs) return es$3.exports;
  hasRequiredEs = 1;
  (function(module, exports) {
    !function(e2, o) {
      module.exports = o(requireDayjs_min());
    }(es$2, function(e2) {
      function o(e3) {
        return e3 && "object" == typeof e3 && "default" in e3 ? e3 : { default: e3 };
      }
      var s3 = o(e2), d3 = { name: "es", monthsShort: "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"), weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"), weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"), weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"), months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"), weekStart: 1, formats: { LT: "H:mm", LTS: "H:mm:ss", L: "DD/MM/YYYY", LL: "D [de] MMMM [de] YYYY", LLL: "D [de] MMMM [de] YYYY H:mm", LLLL: "dddd, D [de] MMMM [de] YYYY H:mm" }, relativeTime: { future: "en %s", past: "hace %s", s: "unos segundos", m: "un minuto", mm: "%d minutos", h: "una hora", hh: "%d horas", d: "un día", dd: "%d días", M: "un mes", MM: "%d meses", y: "un año", yy: "%d años" }, ordinal: function(e3) {
        return e3 + "º";
      } };
      return s3.default.locale(d3, null, true), d3;
    });
  })(es$3);
  return es$3.exports;
}
var esExports = requireEs();
const es$1 = /* @__PURE__ */ getDefaultExportFromCjs(esExports);
var ko$3 = { exports: {} };
var ko$2 = ko$3.exports;
var hasRequiredKo;
function requireKo() {
  if (hasRequiredKo) return ko$3.exports;
  hasRequiredKo = 1;
  (function(module, exports) {
    !function(e2, _) {
      module.exports = _(requireDayjs_min());
    }(ko$2, function(e2) {
      function _(e3) {
        return e3 && "object" == typeof e3 && "default" in e3 ? e3 : { default: e3 };
      }
      var d3 = _(e2), t2 = { name: "ko", weekdays: "일요일_월요일_화요일_수요일_목요일_금요일_토요일".split("_"), weekdaysShort: "일_월_화_수_목_금_토".split("_"), weekdaysMin: "일_월_화_수_목_금_토".split("_"), months: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), monthsShort: "1월_2월_3월_4월_5월_6월_7월_8월_9월_10월_11월_12월".split("_"), ordinal: function(e3) {
        return e3 + "일";
      }, formats: { LT: "A h:mm", LTS: "A h:mm:ss", L: "YYYY.MM.DD.", LL: "YYYY년 MMMM D일", LLL: "YYYY년 MMMM D일 A h:mm", LLLL: "YYYY년 MMMM D일 dddd A h:mm", l: "YYYY.MM.DD.", ll: "YYYY년 MMMM D일", lll: "YYYY년 MMMM D일 A h:mm", llll: "YYYY년 MMMM D일 dddd A h:mm" }, meridiem: function(e3) {
        return e3 < 12 ? "오전" : "오후";
      }, relativeTime: { future: "%s 후", past: "%s 전", s: "몇 초", m: "1분", mm: "%d분", h: "한 시간", hh: "%d시간", d: "하루", dd: "%d일", M: "한 달", MM: "%d달", y: "일 년", yy: "%d년" } };
      return d3.default.locale(t2, null, true), t2;
    });
  })(ko$3);
  return ko$3.exports;
}
var koExports = requireKo();
const ko$1 = /* @__PURE__ */ getDefaultExportFromCjs(koExports);
class DateUtils extends AbstractService {
  constructor() {
    super();
    dayjs.locale(fr$2);
    this.localeLang = {
      en: en$2,
      fr: fr$2,
      es: es$1,
      ko: ko$1
    };
  }
  /**
   *
   * @returns {dayjs.Dayjs}
   */
  now() {
    return dayjs();
  }
  /**
   * Return the first day of the month for the given date
   * @param {Date|string|number|import('dayjs').Dayjs} date
   * @returns {import('dayjs').Dayjs}
   */
  getFirstDayOfMonth(date) {
    const d3 = dayjs(date);
    return d3.startOf("month");
  }
  /**
   * Return the last day of the month for the given date
   * @param {Date|string|number|import('dayjs').Dayjs} date
   * @returns {import('dayjs').Dayjs}
   */
  getLastDayOfMonth(date) {
    const d3 = dayjs(date);
    return d3.endOf("month");
  }
  /**
   * Shift a date/time by relative amounts, inspired by Python's Arrow.shift.
   * Usage examples:
   *  - shift({ days: 1 }) // from now, plus 1 day
   *  - shift(date, { months: -2, days: 3 })
   * Supported keys: years, months, weeks, days, hours, minutes, seconds, milliseconds.
   * Positive values move forward in time; negative values move backward.
   *
   * @param {Date|string|number|import('dayjs').Dayjs} date - base date
   * @param {Object} [deltas] - deltas to apply
   * @returns {import('dayjs').Dayjs} a dayjs instance with the applied shift
   */
  shift(date, deltas) {
    let d3 = dayjs(date);
    if (!d3.isValid()) {
      throw new Error(`Invalid date: ${date}`);
    }
    const {
      years = 0,
      months = 0,
      weeks = 0,
      days = 0,
      hours = 0,
      minutes = 0,
      seconds = 0,
      milliseconds = 0
    } = deltas || {};
    const totalDays = Number(days) + Number(weeks) * 7;
    const parts = [
      ["year", Number(years)],
      ["month", Number(months)],
      ["day", totalDays],
      ["hour", Number(hours)],
      ["minute", Number(minutes)],
      ["second", Number(seconds)],
      ["millisecond", Number(milliseconds)]
    ];
    for (const [unit, amount] of parts) {
      if (amount && !Number.isNaN(amount) && amount !== 0) {
        d3 = d3.add(amount, unit);
      }
    }
    return d3;
  }
  /**
   * @param date
   * @param date2 optional
   * @returns {number}
   */
  diffDaysBetweenDates(date, date2 = this.now()) {
    return dayjs(date).diff(date2, "days");
  }
  /**
   * @param numberOfDays
   * @returns {string}
   */
  getFormattedDateDaysAgoFromNow(numberOfDays) {
    console.log("numberOfDays", numberOfDays);
    return this.format(this.now().subtract(numberOfDays, "days"), "YYYY-MM-DD");
  }
  /**
   * @param numberOfMonths
   * @returns {string}
   */
  getFormattedDateMonthsAgoFromNow(numberOfMonths) {
    console.log("numberOfMonths", numberOfMonths);
    return this.format(this.now().subtract(numberOfMonths, "months"), "YYYY-MM-DD");
  }
  /**
   * @param numberOfYears
   * @returns {string}
   */
  getFormattedDateYearsAgoFromNow(numberOfYears) {
    console.log("numberOfYears", numberOfYears);
    return this.format(this.now().subtract(numberOfYears, "years"), "YYYY-MM-DD");
  }
  /**
   * @param date
   * @param format
   * @param localLanguageParam
   * @returns {string}
   */
  format(date, format2 = "dd/mm/YYYY", localLanguageParam = "fr") {
    dayjs.locale(this.localeLang[localLanguageParam]);
    return dayjs(date).format(format2);
  }
  /**
   * Convert date to MySQL format
   * @param date
   * @returns {string}
   */
  to_mysql_date(date) {
    return this.format(date, "YYYY-MM-DD");
  }
}
let DateService = new DateUtils();
var FileSaver_min$1 = { exports: {} };
var FileSaver_min = FileSaver_min$1.exports;
var hasRequiredFileSaver_min;
function requireFileSaver_min() {
  if (hasRequiredFileSaver_min) return FileSaver_min$1.exports;
  hasRequiredFileSaver_min = 1;
  (function(module, exports) {
    (function(a3, b2) {
      b2();
    })(FileSaver_min, function() {
      function b2(a4, b3) {
        return "undefined" == typeof b3 ? b3 = { autoBom: false } : "object" != typeof b3 && (console.warn("Deprecated: Expected third argument to be a object"), b3 = { autoBom: !b3 }), b3.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a4.type) ? new Blob(["\uFEFF", a4], { type: a4.type }) : a4;
      }
      function c2(a4, b3, c3) {
        var d4 = new XMLHttpRequest();
        d4.open("GET", a4), d4.responseType = "blob", d4.onload = function() {
          g(d4.response, b3, c3);
        }, d4.onerror = function() {
          console.error("could not download file");
        }, d4.send();
      }
      function d3(a4) {
        var b3 = new XMLHttpRequest();
        b3.open("HEAD", a4, false);
        try {
          b3.send();
        } catch (a5) {
        }
        return 200 <= b3.status && 299 >= b3.status;
      }
      function e2(a4) {
        try {
          a4.dispatchEvent(new MouseEvent("click"));
        } catch (c3) {
          var b3 = document.createEvent("MouseEvents");
          b3.initMouseEvent("click", true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null), a4.dispatchEvent(b3);
        }
      }
      var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof commonjsGlobal && commonjsGlobal.global === commonjsGlobal ? commonjsGlobal : void 0, a3 = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent), g = f.saveAs || ("object" != typeof window || window !== f ? function() {
      } : "download" in HTMLAnchorElement.prototype && !a3 ? function(b3, g2, h3) {
        var i2 = f.URL || f.webkitURL, j = document.createElement("a");
        g2 = g2 || b3.name || "download", j.download = g2, j.rel = "noopener", "string" == typeof b3 ? (j.href = b3, j.origin === location.origin ? e2(j) : d3(j.href) ? c2(b3, g2, h3) : e2(j, j.target = "_blank")) : (j.href = i2.createObjectURL(b3), setTimeout(function() {
          i2.revokeObjectURL(j.href);
        }, 4e4), setTimeout(function() {
          e2(j);
        }, 0));
      } : "msSaveOrOpenBlob" in navigator ? function(f2, g2, h3) {
        if (g2 = g2 || f2.name || "download", "string" != typeof f2) navigator.msSaveOrOpenBlob(b2(f2, h3), g2);
        else if (d3(f2)) c2(f2, g2, h3);
        else {
          var i2 = document.createElement("a");
          i2.href = f2, i2.target = "_blank", setTimeout(function() {
            e2(i2);
          });
        }
      } : function(b3, d4, e3, g2) {
        if (g2 = g2 || open("", "_blank"), g2 && (g2.document.title = g2.document.body.innerText = "downloading..."), "string" == typeof b3) return c2(b3, d4, e3);
        var h3 = "application/octet-stream" === b3.type, i2 = /constructor/i.test(f.HTMLElement) || f.safari, j = /CriOS\/[\d]+/.test(navigator.userAgent);
        if ((j || h3 && i2 || a3) && "undefined" != typeof FileReader) {
          var k2 = new FileReader();
          k2.onloadend = function() {
            var a4 = k2.result;
            a4 = j ? a4 : a4.replace(/^data:[^;]*;/, "data:attachment/file;"), g2 ? g2.location.href = a4 : location = a4, g2 = null;
          }, k2.readAsDataURL(b3);
        } else {
          var l = f.URL || f.webkitURL, m3 = l.createObjectURL(b3);
          g2 ? g2.location = m3 : location.href = m3, g2 = null, setTimeout(function() {
            l.revokeObjectURL(m3);
          }, 4e4);
        }
      });
      f.saveAs = g.saveAs = g, module.exports = g;
    });
  })(FileSaver_min$1);
  return FileSaver_min$1.exports;
}
var FileSaver_minExports = requireFileSaver_min();
class HttpError extends Error {
  constructor(message, response) {
    super(message);
    this.status = response.status;
    this.data = response.data ? response.data : response.statusText;
    this.response = response;
  }
}
class Http extends AbstractService {
  /**
   * get data from url
   * @param url
   * @param options
   * @returns {Promise<unknown>}
   */
  get(url, options = {}) {
    return axios.get(url, options).then((response) => response.data).catch((e2) => {
      throw e2.response ? new HttpError(e2, e2.response) : e2;
    });
  }
  /**
   * post data to url
   * @param url
   * @param data
   * @param options
   * @returns {Promise<unknown>}
   */
  post(url, data, options = {}) {
    return axios.post(url, data, options).then((response) => response.data).catch((e2) => {
      throw e2.response ? new HttpError(e2, e2.response) : e2;
    });
  }
  /**
   * put data to url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  put(url, data, options = {}) {
    return axios.put(url, data, options).then((response) => response.data).catch((e2) => {
      throw e2.response ? new HttpError(e2, e2.response) : e2;
    });
  }
  /**
   * patch data to url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  patch(url, data, options = {}) {
    return axios.patch(url, data, options).then((response) => response.data).catch((e2) => {
      throw e2.response ? new HttpError(e2, e2.response) : e2;
    });
  }
  /**
   * delete data from url
   * @param url
   * @param data
   * @returns {Promise<unknown>}
   */
  delete(url, data, options = {}) {
    const params = { method: "delete", url, data, options };
    return axios(params).then((response) => response.data).catch((e2) => {
      throw e2.response ? new HttpError(e2, e2.response) : e2;
    });
  }
  /**
   * download file
   * ajouter CORS_EXPOSE_HEADERS = ("Content-Disposition",)
   * @param url
   * @param data
   * @param method
   * @returns {Promise<unknown>}
   */
  download(url, data = null, method = "get") {
    const params = { method, url, data, responseType: "blob" };
    console.log("download", params);
    return axios(params).then((response) => {
      const contentDisposition = response.headers["content-disposition"];
      const fileNameMatch = contentDisposition.match(/filename="(.+)"/);
      const filename = fileNameMatch ? fileNameMatch[1] : "nofilename";
      FileSaver_minExports.saveAs(response.data, filename);
    }).catch((e2) => {
      throw e2.response ? new HttpError(e2, e2.response) : e2;
    });
  }
}
let HttpService = new Http();
var numeral$2 = { exports: {} };
/*! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */
var numeral$1 = numeral$2.exports;
var hasRequiredNumeral;
function requireNumeral() {
  if (hasRequiredNumeral) return numeral$2.exports;
  hasRequiredNumeral = 1;
  (function(module) {
    (function(global2, factory) {
      if (module.exports) {
        module.exports = factory();
      } else {
        global2.numeral = factory();
      }
    })(numeral$1, function() {
      var numeral2, _, VERSION2 = "2.0.6", formats = {}, locales = {}, defaults2 = {
        currentLocale: "en",
        zeroFormat: null,
        nullFormat: null,
        defaultFormat: "0,0",
        scalePercentBy100: true
      }, options = {
        currentLocale: defaults2.currentLocale,
        zeroFormat: defaults2.zeroFormat,
        nullFormat: defaults2.nullFormat,
        defaultFormat: defaults2.defaultFormat,
        scalePercentBy100: defaults2.scalePercentBy100
      };
      function Numeral(input, number) {
        this._input = input;
        this._value = number;
      }
      numeral2 = function(input) {
        var value, kind, unformatFunction, regexp;
        if (numeral2.isNumeral(input)) {
          value = input.value();
        } else if (input === 0 || typeof input === "undefined") {
          value = 0;
        } else if (input === null || _.isNaN(input)) {
          value = null;
        } else if (typeof input === "string") {
          if (options.zeroFormat && input === options.zeroFormat) {
            value = 0;
          } else if (options.nullFormat && input === options.nullFormat || !input.replace(/[^0-9]+/g, "").length) {
            value = null;
          } else {
            for (kind in formats) {
              regexp = typeof formats[kind].regexps.unformat === "function" ? formats[kind].regexps.unformat() : formats[kind].regexps.unformat;
              if (regexp && input.match(regexp)) {
                unformatFunction = formats[kind].unformat;
                break;
              }
            }
            unformatFunction = unformatFunction || numeral2._.stringToNumber;
            value = unformatFunction(input);
          }
        } else {
          value = Number(input) || null;
        }
        return new Numeral(input, value);
      };
      numeral2.version = VERSION2;
      numeral2.isNumeral = function(obj) {
        return obj instanceof Numeral;
      };
      numeral2._ = _ = {
        // formats numbers separators, decimals places, signs, abbreviations
        numberToFormat: function(value, format2, roundingFunction) {
          var locale2 = locales[numeral2.options.currentLocale], negP = false, optDec = false, leadingCount = 0, abbr = "", trillion = 1e12, billion = 1e9, million = 1e6, thousand = 1e3, decimal = "", neg = false, abbrForce, abs, int, precision, signed, thousands, output;
          value = value || 0;
          abs = Math.abs(value);
          if (numeral2._.includes(format2, "(")) {
            negP = true;
            format2 = format2.replace(/[\(|\)]/g, "");
          } else if (numeral2._.includes(format2, "+") || numeral2._.includes(format2, "-")) {
            signed = numeral2._.includes(format2, "+") ? format2.indexOf("+") : value < 0 ? format2.indexOf("-") : -1;
            format2 = format2.replace(/[\+|\-]/g, "");
          }
          if (numeral2._.includes(format2, "a")) {
            abbrForce = format2.match(/a(k|m|b|t)?/);
            abbrForce = abbrForce ? abbrForce[1] : false;
            if (numeral2._.includes(format2, " a")) {
              abbr = " ";
            }
            format2 = format2.replace(new RegExp(abbr + "a[kmbt]?"), "");
            if (abs >= trillion && !abbrForce || abbrForce === "t") {
              abbr += locale2.abbreviations.trillion;
              value = value / trillion;
            } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === "b") {
              abbr += locale2.abbreviations.billion;
              value = value / billion;
            } else if (abs < billion && abs >= million && !abbrForce || abbrForce === "m") {
              abbr += locale2.abbreviations.million;
              value = value / million;
            } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === "k") {
              abbr += locale2.abbreviations.thousand;
              value = value / thousand;
            }
          }
          if (numeral2._.includes(format2, "[.]")) {
            optDec = true;
            format2 = format2.replace("[.]", ".");
          }
          int = value.toString().split(".")[0];
          precision = format2.split(".")[1];
          thousands = format2.indexOf(",");
          leadingCount = (format2.split(".")[0].split(",")[0].match(/0/g) || []).length;
          if (precision) {
            if (numeral2._.includes(precision, "[")) {
              precision = precision.replace("]", "");
              precision = precision.split("[");
              decimal = numeral2._.toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
            } else {
              decimal = numeral2._.toFixed(value, precision.length, roundingFunction);
            }
            int = decimal.split(".")[0];
            if (numeral2._.includes(decimal, ".")) {
              decimal = locale2.delimiters.decimal + decimal.split(".")[1];
            } else {
              decimal = "";
            }
            if (optDec && Number(decimal.slice(1)) === 0) {
              decimal = "";
            }
          } else {
            int = numeral2._.toFixed(value, 0, roundingFunction);
          }
          if (abbr && !abbrForce && Number(int) >= 1e3 && abbr !== locale2.abbreviations.trillion) {
            int = String(Number(int) / 1e3);
            switch (abbr) {
              case locale2.abbreviations.thousand:
                abbr = locale2.abbreviations.million;
                break;
              case locale2.abbreviations.million:
                abbr = locale2.abbreviations.billion;
                break;
              case locale2.abbreviations.billion:
                abbr = locale2.abbreviations.trillion;
                break;
            }
          }
          if (numeral2._.includes(int, "-")) {
            int = int.slice(1);
            neg = true;
          }
          if (int.length < leadingCount) {
            for (var i2 = leadingCount - int.length; i2 > 0; i2--) {
              int = "0" + int;
            }
          }
          if (thousands > -1) {
            int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + locale2.delimiters.thousands);
          }
          if (format2.indexOf(".") === 0) {
            int = "";
          }
          output = int + decimal + (abbr ? abbr : "");
          if (negP) {
            output = (negP && neg ? "(" : "") + output + (negP && neg ? ")" : "");
          } else {
            if (signed >= 0) {
              output = signed === 0 ? (neg ? "-" : "+") + output : output + (neg ? "-" : "+");
            } else if (neg) {
              output = "-" + output;
            }
          }
          return output;
        },
        // unformats numbers separators, decimals places, signs, abbreviations
        stringToNumber: function(string) {
          var locale2 = locales[options.currentLocale], stringOriginal = string, abbreviations = {
            thousand: 3,
            million: 6,
            billion: 9,
            trillion: 12
          }, abbreviation, value, regexp;
          if (options.zeroFormat && string === options.zeroFormat) {
            value = 0;
          } else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, "").length) {
            value = null;
          } else {
            value = 1;
            if (locale2.delimiters.decimal !== ".") {
              string = string.replace(/\./g, "").replace(locale2.delimiters.decimal, ".");
            }
            for (abbreviation in abbreviations) {
              regexp = new RegExp("[^a-zA-Z]" + locale2.abbreviations[abbreviation] + "(?:\\)|(\\" + locale2.currency.symbol + ")?(?:\\))?)?$");
              if (stringOriginal.match(regexp)) {
                value *= Math.pow(10, abbreviations[abbreviation]);
                break;
              }
            }
            value *= (string.split("-").length + Math.min(string.split("(").length - 1, string.split(")").length - 1)) % 2 ? 1 : -1;
            string = string.replace(/[^0-9\.]+/g, "");
            value *= Number(string);
          }
          return value;
        },
        isNaN: function(value) {
          return typeof value === "number" && isNaN(value);
        },
        includes: function(string, search2) {
          return string.indexOf(search2) !== -1;
        },
        insert: function(string, subString, start) {
          return string.slice(0, start) + subString + string.slice(start);
        },
        reduce: function(array, callback) {
          if (this === null) {
            throw new TypeError("Array.prototype.reduce called on null or undefined");
          }
          if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
          }
          var t2 = Object(array), len = t2.length >>> 0, k2 = 0, value;
          if (arguments.length === 3) {
            value = arguments[2];
          } else {
            while (k2 < len && !(k2 in t2)) {
              k2++;
            }
            if (k2 >= len) {
              throw new TypeError("Reduce of empty array with no initial value");
            }
            value = t2[k2++];
          }
          for (; k2 < len; k2++) {
            if (k2 in t2) {
              value = callback(value, t2[k2], k2, t2);
            }
          }
          return value;
        },
        /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
        multiplier: function(x2) {
          var parts = x2.toString().split(".");
          return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
        },
        /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
        correctionFactor: function() {
          var args = Array.prototype.slice.call(arguments);
          return args.reduce(function(accum, next) {
            var mn = _.multiplier(next);
            return accum > mn ? accum : mn;
          }, 1);
        },
        /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
        toFixed: function(value, maxDecimals, roundingFunction, optionals) {
          var splitValue = value.toString().split("."), minDecimals = maxDecimals - (optionals || 0), boundedPrecision, optionalsRegExp, power, output;
          if (splitValue.length === 2) {
            boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
          } else {
            boundedPrecision = minDecimals;
          }
          power = Math.pow(10, boundedPrecision);
          output = (roundingFunction(value + "e+" + boundedPrecision) / power).toFixed(boundedPrecision);
          if (optionals > maxDecimals - boundedPrecision) {
            optionalsRegExp = new RegExp("\\.?0{1," + (optionals - (maxDecimals - boundedPrecision)) + "}$");
            output = output.replace(optionalsRegExp, "");
          }
          return output;
        }
      };
      numeral2.options = options;
      numeral2.formats = formats;
      numeral2.locales = locales;
      numeral2.locale = function(key) {
        if (key) {
          options.currentLocale = key.toLowerCase();
        }
        return options.currentLocale;
      };
      numeral2.localeData = function(key) {
        if (!key) {
          return locales[options.currentLocale];
        }
        key = key.toLowerCase();
        if (!locales[key]) {
          throw new Error("Unknown locale : " + key);
        }
        return locales[key];
      };
      numeral2.reset = function() {
        for (var property in defaults2) {
          options[property] = defaults2[property];
        }
      };
      numeral2.zeroFormat = function(format2) {
        options.zeroFormat = typeof format2 === "string" ? format2 : null;
      };
      numeral2.nullFormat = function(format2) {
        options.nullFormat = typeof format2 === "string" ? format2 : null;
      };
      numeral2.defaultFormat = function(format2) {
        options.defaultFormat = typeof format2 === "string" ? format2 : "0.0";
      };
      numeral2.register = function(type, name, format2) {
        name = name.toLowerCase();
        if (this[type + "s"][name]) {
          throw new TypeError(name + " " + type + " already registered.");
        }
        this[type + "s"][name] = format2;
        return format2;
      };
      numeral2.validate = function(val, culture) {
        var _decimalSep, _thousandSep, _currSymbol, _valArray, _abbrObj, _thousandRegEx, localeData, temp;
        if (typeof val !== "string") {
          val += "";
          if (console.warn) {
            console.warn("Numeral.js: Value is not string. It has been co-erced to: ", val);
          }
        }
        val = val.trim();
        if (!!val.match(/^\d+$/)) {
          return true;
        }
        if (val === "") {
          return false;
        }
        try {
          localeData = numeral2.localeData(culture);
        } catch (e2) {
          localeData = numeral2.localeData(numeral2.locale());
        }
        _currSymbol = localeData.currency.symbol;
        _abbrObj = localeData.abbreviations;
        _decimalSep = localeData.delimiters.decimal;
        if (localeData.delimiters.thousands === ".") {
          _thousandSep = "\\.";
        } else {
          _thousandSep = localeData.delimiters.thousands;
        }
        temp = val.match(/^[^\d]+/);
        if (temp !== null) {
          val = val.substr(1);
          if (temp[0] !== _currSymbol) {
            return false;
          }
        }
        temp = val.match(/[^\d]+$/);
        if (temp !== null) {
          val = val.slice(0, -1);
          if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
            return false;
          }
        }
        _thousandRegEx = new RegExp(_thousandSep + "{2}");
        if (!val.match(/[^\d.,]/g)) {
          _valArray = val.split(_decimalSep);
          if (_valArray.length > 2) {
            return false;
          } else {
            if (_valArray.length < 2) {
              return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx);
            } else {
              if (_valArray[0].length === 1) {
                return !!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
              } else {
                return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
              }
            }
          }
        }
        return false;
      };
      numeral2.fn = Numeral.prototype = {
        clone: function() {
          return numeral2(this);
        },
        format: function(inputString, roundingFunction) {
          var value = this._value, format2 = inputString || options.defaultFormat, kind, output, formatFunction;
          roundingFunction = roundingFunction || Math.round;
          if (value === 0 && options.zeroFormat !== null) {
            output = options.zeroFormat;
          } else if (value === null && options.nullFormat !== null) {
            output = options.nullFormat;
          } else {
            for (kind in formats) {
              if (format2.match(formats[kind].regexps.format)) {
                formatFunction = formats[kind].format;
                break;
              }
            }
            formatFunction = formatFunction || numeral2._.numberToFormat;
            output = formatFunction(value, format2, roundingFunction);
          }
          return output;
        },
        value: function() {
          return this._value;
        },
        input: function() {
          return this._input;
        },
        set: function(value) {
          this._value = Number(value);
          return this;
        },
        add: function(value) {
          var corrFactor = _.correctionFactor.call(null, this._value, value);
          function cback(accum, curr, currI, O2) {
            return accum + Math.round(corrFactor * curr);
          }
          this._value = _.reduce([this._value, value], cback, 0) / corrFactor;
          return this;
        },
        subtract: function(value) {
          var corrFactor = _.correctionFactor.call(null, this._value, value);
          function cback(accum, curr, currI, O2) {
            return accum - Math.round(corrFactor * curr);
          }
          this._value = _.reduce([value], cback, Math.round(this._value * corrFactor)) / corrFactor;
          return this;
        },
        multiply: function(value) {
          function cback(accum, curr, currI, O2) {
            var corrFactor = _.correctionFactor(accum, curr);
            return Math.round(accum * corrFactor) * Math.round(curr * corrFactor) / Math.round(corrFactor * corrFactor);
          }
          this._value = _.reduce([this._value, value], cback, 1);
          return this;
        },
        divide: function(value) {
          function cback(accum, curr, currI, O2) {
            var corrFactor = _.correctionFactor(accum, curr);
            return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
          }
          this._value = _.reduce([this._value, value], cback);
          return this;
        },
        difference: function(value) {
          return Math.abs(numeral2(this._value).subtract(value).value());
        }
      };
      numeral2.register("locale", "en", {
        delimiters: {
          thousands: ",",
          decimal: "."
        },
        abbreviations: {
          thousand: "k",
          million: "m",
          billion: "b",
          trillion: "t"
        },
        ordinal: function(number) {
          var b2 = number % 10;
          return ~~(number % 100 / 10) === 1 ? "th" : b2 === 1 ? "st" : b2 === 2 ? "nd" : b2 === 3 ? "rd" : "th";
        },
        currency: {
          symbol: "$"
        }
      });
      (function() {
        numeral2.register("format", "bps", {
          regexps: {
            format: /(BPS)/,
            unformat: /(BPS)/
          },
          format: function(value, format2, roundingFunction) {
            var space = numeral2._.includes(format2, " BPS") ? " " : "", output;
            value = value * 1e4;
            format2 = format2.replace(/\s?BPS/, "");
            output = numeral2._.numberToFormat(value, format2, roundingFunction);
            if (numeral2._.includes(output, ")")) {
              output = output.split("");
              output.splice(-1, 0, space + "BPS");
              output = output.join("");
            } else {
              output = output + space + "BPS";
            }
            return output;
          },
          unformat: function(string) {
            return +(numeral2._.stringToNumber(string) * 1e-4).toFixed(15);
          }
        });
      })();
      (function() {
        var decimal = {
          base: 1e3,
          suffixes: ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
        }, binary = {
          base: 1024,
          suffixes: ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"]
        };
        var allSuffixes = decimal.suffixes.concat(binary.suffixes.filter(function(item) {
          return decimal.suffixes.indexOf(item) < 0;
        }));
        var unformatRegex = allSuffixes.join("|");
        unformatRegex = "(" + unformatRegex.replace("B", "B(?!PS)") + ")";
        numeral2.register("format", "bytes", {
          regexps: {
            format: /([0\s]i?b)/,
            unformat: new RegExp(unformatRegex)
          },
          format: function(value, format2, roundingFunction) {
            var output, bytes = numeral2._.includes(format2, "ib") ? binary : decimal, suffix = numeral2._.includes(format2, " b") || numeral2._.includes(format2, " ib") ? " " : "", power, min2, max2;
            format2 = format2.replace(/\s?i?b/, "");
            for (power = 0; power <= bytes.suffixes.length; power++) {
              min2 = Math.pow(bytes.base, power);
              max2 = Math.pow(bytes.base, power + 1);
              if (value === null || value === 0 || value >= min2 && value < max2) {
                suffix += bytes.suffixes[power];
                if (min2 > 0) {
                  value = value / min2;
                }
                break;
              }
            }
            output = numeral2._.numberToFormat(value, format2, roundingFunction);
            return output + suffix;
          },
          unformat: function(string) {
            var value = numeral2._.stringToNumber(string), power, bytesMultiplier;
            if (value) {
              for (power = decimal.suffixes.length - 1; power >= 0; power--) {
                if (numeral2._.includes(string, decimal.suffixes[power])) {
                  bytesMultiplier = Math.pow(decimal.base, power);
                  break;
                }
                if (numeral2._.includes(string, binary.suffixes[power])) {
                  bytesMultiplier = Math.pow(binary.base, power);
                  break;
                }
              }
              value *= bytesMultiplier || 1;
            }
            return value;
          }
        });
      })();
      (function() {
        numeral2.register("format", "currency", {
          regexps: {
            format: /(\$)/
          },
          format: function(value, format2, roundingFunction) {
            var locale2 = numeral2.locales[numeral2.options.currentLocale], symbols = {
              before: format2.match(/^([\+|\-|\(|\s|\$]*)/)[0],
              after: format2.match(/([\+|\-|\)|\s|\$]*)$/)[0]
            }, output, symbol, i2;
            format2 = format2.replace(/\s?\$\s?/, "");
            output = numeral2._.numberToFormat(value, format2, roundingFunction);
            if (value >= 0) {
              symbols.before = symbols.before.replace(/[\-\(]/, "");
              symbols.after = symbols.after.replace(/[\-\)]/, "");
            } else if (value < 0 && (!numeral2._.includes(symbols.before, "-") && !numeral2._.includes(symbols.before, "("))) {
              symbols.before = "-" + symbols.before;
            }
            for (i2 = 0; i2 < symbols.before.length; i2++) {
              symbol = symbols.before[i2];
              switch (symbol) {
                case "$":
                  output = numeral2._.insert(output, locale2.currency.symbol, i2);
                  break;
                case " ":
                  output = numeral2._.insert(output, " ", i2 + locale2.currency.symbol.length - 1);
                  break;
              }
            }
            for (i2 = symbols.after.length - 1; i2 >= 0; i2--) {
              symbol = symbols.after[i2];
              switch (symbol) {
                case "$":
                  output = i2 === symbols.after.length - 1 ? output + locale2.currency.symbol : numeral2._.insert(output, locale2.currency.symbol, -(symbols.after.length - (1 + i2)));
                  break;
                case " ":
                  output = i2 === symbols.after.length - 1 ? output + " " : numeral2._.insert(output, " ", -(symbols.after.length - (1 + i2) + locale2.currency.symbol.length - 1));
                  break;
              }
            }
            return output;
          }
        });
      })();
      (function() {
        numeral2.register("format", "exponential", {
          regexps: {
            format: /(e\+|e-)/,
            unformat: /(e\+|e-)/
          },
          format: function(value, format2, roundingFunction) {
            var output, exponential = typeof value === "number" && !numeral2._.isNaN(value) ? value.toExponential() : "0e+0", parts = exponential.split("e");
            format2 = format2.replace(/e[\+|\-]{1}0/, "");
            output = numeral2._.numberToFormat(Number(parts[0]), format2, roundingFunction);
            return output + "e" + parts[1];
          },
          unformat: function(string) {
            var parts = numeral2._.includes(string, "e+") ? string.split("e+") : string.split("e-"), value = Number(parts[0]), power = Number(parts[1]);
            power = numeral2._.includes(string, "e-") ? power *= -1 : power;
            function cback(accum, curr, currI, O2) {
              var corrFactor = numeral2._.correctionFactor(accum, curr), num = accum * corrFactor * (curr * corrFactor) / (corrFactor * corrFactor);
              return num;
            }
            return numeral2._.reduce([value, Math.pow(10, power)], cback, 1);
          }
        });
      })();
      (function() {
        numeral2.register("format", "ordinal", {
          regexps: {
            format: /(o)/
          },
          format: function(value, format2, roundingFunction) {
            var locale2 = numeral2.locales[numeral2.options.currentLocale], output, ordinal = numeral2._.includes(format2, " o") ? " " : "";
            format2 = format2.replace(/\s?o/, "");
            ordinal += locale2.ordinal(value);
            output = numeral2._.numberToFormat(value, format2, roundingFunction);
            return output + ordinal;
          }
        });
      })();
      (function() {
        numeral2.register("format", "percentage", {
          regexps: {
            format: /(%)/,
            unformat: /(%)/
          },
          format: function(value, format2, roundingFunction) {
            var space = numeral2._.includes(format2, " %") ? " " : "", output;
            if (numeral2.options.scalePercentBy100) {
              value = value * 100;
            }
            format2 = format2.replace(/\s?\%/, "");
            output = numeral2._.numberToFormat(value, format2, roundingFunction);
            if (numeral2._.includes(output, ")")) {
              output = output.split("");
              output.splice(-1, 0, space + "%");
              output = output.join("");
            } else {
              output = output + space + "%";
            }
            return output;
          },
          unformat: function(string) {
            var number = numeral2._.stringToNumber(string);
            if (numeral2.options.scalePercentBy100) {
              return number * 0.01;
            }
            return number;
          }
        });
      })();
      (function() {
        numeral2.register("format", "time", {
          regexps: {
            format: /(:)/,
            unformat: /(:)/
          },
          format: function(value, format2, roundingFunction) {
            var hours = Math.floor(value / 60 / 60), minutes = Math.floor((value - hours * 60 * 60) / 60), seconds = Math.round(value - hours * 60 * 60 - minutes * 60);
            return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);
          },
          unformat: function(string) {
            var timeArray = string.split(":"), seconds = 0;
            if (timeArray.length === 3) {
              seconds = seconds + Number(timeArray[0]) * 60 * 60;
              seconds = seconds + Number(timeArray[1]) * 60;
              seconds = seconds + Number(timeArray[2]);
            } else if (timeArray.length === 2) {
              seconds = seconds + Number(timeArray[0]) * 60;
              seconds = seconds + Number(timeArray[1]);
            }
            return Number(seconds);
          }
        });
      })();
      return numeral2;
    });
  })(numeral$2);
  return numeral$2.exports;
}
var numeralExports = requireNumeral();
const numeral = /* @__PURE__ */ getDefaultExportFromCjs(numeralExports);
class NumberUtils extends AbstractService {
  /**
   * Returns true if str param is a number.
   * @param str
   * @returns {boolean}
   */
  isNumber(str) {
    return !isNaN(str);
  }
  /**
   * format a number
   * @param value
   * @param format
   * @returns {*}
   */
  // todofsc: faire les tests si utilisé products
  numberFormat(value, format2 = "0,0") {
    return numeral(value).format(format2);
  }
  numeralFormat(value, format2 = "0,0[.]00 $") {
    return this.numberFormat(value, format2);
  }
}
let NumberService = new NumberUtils();
class ObjectUtils extends AbstractService {
  /**
   *
   * @param {String} from
   * @param {String} to
   * @param {Object} obj
   */
  getRange(from, to, obj) {
    const asArray = Object.entries(obj);
    const filtered = asArray.filter(([, value]) => value >= from && value <= to);
    return Object.fromEntries(filtered);
  }
  deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  }
  /**
   * Return a string that can be used to print the content of an object.
   * An optional delimiter can be set to separate the properties in the string. Default delimiter is ", ".
   * Warning (limitation) : for now, only use this service if all the values are printable.
   *
   * @param {Object} object object to be treated
   * @param {String} [delimiter=", "] delimiter to separate properties
   *
   * @returns {String}
   */
  getPrintableContent(object, delimiter = ", ") {
    if (object === null) {
      return "";
    }
    const printableContent = Object.keys(object).map((key) => `${key}: ${object[key]}`);
    return printableContent.join(delimiter);
  }
}
let ObjectService = new ObjectUtils();
function Keycloak(config2) {
  if (!(this instanceof Keycloak)) {
    throw new Error("The 'Keycloak' constructor must be invoked with 'new'.");
  }
  if (typeof config2 !== "string" && !isObject(config2)) {
    throw new Error("The 'Keycloak' constructor must be provided with a configuration object, or a URL to a JSON configuration file.");
  }
  if (isObject(config2)) {
    const requiredProperties = "oidcProvider" in config2 ? ["clientId"] : ["url", "realm", "clientId"];
    for (const property of requiredProperties) {
      if (!config2[property]) {
        throw new Error(`The configuration object is missing the required '${property}' property.`);
      }
    }
  }
  var kc = this;
  var adapter;
  var refreshQueue = [];
  var callbackStorage;
  var loginIframe = {
    enable: true,
    callbackList: [],
    interval: 5
  };
  kc.didInitialize = false;
  var useNonce = true;
  var logInfo = createLogger(console.info);
  var logWarn = createLogger(console.warn);
  if (!globalThis.isSecureContext) {
    logWarn(
      "[KEYCLOAK] Keycloak JS must be used in a 'secure context' to function properly as it relies on browser APIs that are otherwise not available.\nContinuing to run your application insecurely will lead to unexpected behavior and breakage.\n\nFor more information see: https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
    );
  }
  kc.init = function(initOptions = {}) {
    if (kc.didInitialize) {
      throw new Error("A 'Keycloak' instance can only be initialized once.");
    }
    kc.didInitialize = true;
    kc.authenticated = false;
    callbackStorage = createCallbackStorage();
    var adapters2 = ["default", "cordova", "cordova-native"];
    if (adapters2.indexOf(initOptions.adapter) > -1) {
      adapter = loadAdapter(initOptions.adapter);
    } else if (typeof initOptions.adapter === "object") {
      adapter = initOptions.adapter;
    } else {
      if (window.Cordova || window.cordova) {
        adapter = loadAdapter("cordova");
      } else {
        adapter = loadAdapter();
      }
    }
    if (typeof initOptions.useNonce !== "undefined") {
      useNonce = initOptions.useNonce;
    }
    if (typeof initOptions.checkLoginIframe !== "undefined") {
      loginIframe.enable = initOptions.checkLoginIframe;
    }
    if (initOptions.checkLoginIframeInterval) {
      loginIframe.interval = initOptions.checkLoginIframeInterval;
    }
    if (initOptions.onLoad === "login-required") {
      kc.loginRequired = true;
    }
    if (initOptions.responseMode) {
      if (initOptions.responseMode === "query" || initOptions.responseMode === "fragment") {
        kc.responseMode = initOptions.responseMode;
      } else {
        throw "Invalid value for responseMode";
      }
    }
    if (initOptions.flow) {
      switch (initOptions.flow) {
        case "standard":
          kc.responseType = "code";
          break;
        case "implicit":
          kc.responseType = "id_token token";
          break;
        case "hybrid":
          kc.responseType = "code id_token token";
          break;
        default:
          throw "Invalid value for flow";
      }
      kc.flow = initOptions.flow;
    }
    if (initOptions.timeSkew != null) {
      kc.timeSkew = initOptions.timeSkew;
    }
    if (initOptions.redirectUri) {
      kc.redirectUri = initOptions.redirectUri;
    }
    if (initOptions.silentCheckSsoRedirectUri) {
      kc.silentCheckSsoRedirectUri = initOptions.silentCheckSsoRedirectUri;
    }
    if (typeof initOptions.silentCheckSsoFallback === "boolean") {
      kc.silentCheckSsoFallback = initOptions.silentCheckSsoFallback;
    } else {
      kc.silentCheckSsoFallback = true;
    }
    if (typeof initOptions.pkceMethod !== "undefined") {
      if (initOptions.pkceMethod !== "S256" && initOptions.pkceMethod !== false) {
        throw new TypeError(`Invalid value for pkceMethod', expected 'S256' or false but got ${initOptions.pkceMethod}.`);
      }
      kc.pkceMethod = initOptions.pkceMethod;
    } else {
      kc.pkceMethod = "S256";
    }
    if (typeof initOptions.enableLogging === "boolean") {
      kc.enableLogging = initOptions.enableLogging;
    } else {
      kc.enableLogging = false;
    }
    if (initOptions.logoutMethod === "POST") {
      kc.logoutMethod = "POST";
    } else {
      kc.logoutMethod = "GET";
    }
    if (typeof initOptions.scope === "string") {
      kc.scope = initOptions.scope;
    }
    if (typeof initOptions.acrValues === "string") {
      kc.acrValues = initOptions.acrValues;
    }
    if (typeof initOptions.messageReceiveTimeout === "number" && initOptions.messageReceiveTimeout > 0) {
      kc.messageReceiveTimeout = initOptions.messageReceiveTimeout;
    } else {
      kc.messageReceiveTimeout = 1e4;
    }
    if (!kc.responseMode) {
      kc.responseMode = "fragment";
    }
    if (!kc.responseType) {
      kc.responseType = "code";
      kc.flow = "standard";
    }
    var promise = createPromise();
    var initPromise = createPromise();
    initPromise.promise.then(function() {
      kc.onReady && kc.onReady(kc.authenticated);
      promise.setSuccess(kc.authenticated);
    }).catch(function(error) {
      promise.setError(error);
    });
    var configPromise = loadConfig();
    function onLoad() {
      var doLogin = function(prompt) {
        if (!prompt) {
          options.prompt = "none";
        }
        if (initOptions.locale) {
          options.locale = initOptions.locale;
        }
        kc.login(options).then(function() {
          initPromise.setSuccess();
        }).catch(function(error) {
          initPromise.setError(error);
        });
      };
      var checkSsoSilently = async function() {
        var ifrm = document.createElement("iframe");
        var src = await kc.createLoginUrl({ prompt: "none", redirectUri: kc.silentCheckSsoRedirectUri });
        ifrm.setAttribute("src", src);
        ifrm.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
        ifrm.setAttribute("title", "keycloak-silent-check-sso");
        ifrm.style.display = "none";
        document.body.appendChild(ifrm);
        var messageCallback = function(event) {
          if (event.origin !== window.location.origin || ifrm.contentWindow !== event.source) {
            return;
          }
          var oauth = parseCallback(event.data);
          processCallback(oauth, initPromise);
          document.body.removeChild(ifrm);
          window.removeEventListener("message", messageCallback);
        };
        window.addEventListener("message", messageCallback);
      };
      var options = {};
      switch (initOptions.onLoad) {
        case "check-sso":
          if (loginIframe.enable) {
            setupCheckLoginIframe().then(function() {
              checkLoginIframe().then(function(unchanged) {
                if (!unchanged) {
                  kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
                } else {
                  initPromise.setSuccess();
                }
              }).catch(function(error) {
                initPromise.setError(error);
              });
            });
          } else {
            kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
          }
          break;
        case "login-required":
          doLogin(true);
          break;
        default:
          throw "Invalid value for onLoad";
      }
    }
    function processInit() {
      var callback = parseCallback(window.location.href);
      if (callback) {
        window.history.replaceState(window.history.state, null, callback.newUrl);
      }
      if (callback && callback.valid) {
        return setupCheckLoginIframe().then(function() {
          processCallback(callback, initPromise);
        }).catch(function(error) {
          initPromise.setError(error);
        });
      }
      if (initOptions.token && initOptions.refreshToken) {
        setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken);
        if (loginIframe.enable) {
          setupCheckLoginIframe().then(function() {
            checkLoginIframe().then(function(unchanged) {
              if (unchanged) {
                kc.onAuthSuccess && kc.onAuthSuccess();
                initPromise.setSuccess();
                scheduleCheckIframe();
              } else {
                initPromise.setSuccess();
              }
            }).catch(function(error) {
              initPromise.setError(error);
            });
          });
        } else {
          kc.updateToken(-1).then(function() {
            kc.onAuthSuccess && kc.onAuthSuccess();
            initPromise.setSuccess();
          }).catch(function(error) {
            kc.onAuthError && kc.onAuthError();
            if (initOptions.onLoad) {
              onLoad();
            } else {
              initPromise.setError(error);
            }
          });
        }
      } else if (initOptions.onLoad) {
        onLoad();
      } else {
        initPromise.setSuccess();
      }
    }
    configPromise.then(function() {
      check3pCookiesSupported().then(processInit).catch(function(error) {
        promise.setError(error);
      });
    });
    configPromise.catch(function(error) {
      promise.setError(error);
    });
    return promise.promise;
  };
  kc.login = function(options) {
    return adapter.login(options);
  };
  function generateRandomData(len) {
    if (typeof crypto === "undefined" || typeof crypto.getRandomValues === "undefined") {
      throw new Error("Web Crypto API is not available.");
    }
    return crypto.getRandomValues(new Uint8Array(len));
  }
  function generateCodeVerifier(len) {
    return generateRandomString(len, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  }
  function generateRandomString(len, alphabet) {
    var randomData = generateRandomData(len);
    var chars = new Array(len);
    for (var i2 = 0; i2 < len; i2++) {
      chars[i2] = alphabet.charCodeAt(randomData[i2] % alphabet.length);
    }
    return String.fromCharCode.apply(null, chars);
  }
  async function generatePkceChallenge(pkceMethod, codeVerifier) {
    if (pkceMethod !== "S256") {
      throw new TypeError(`Invalid value for 'pkceMethod', expected 'S256' but got '${pkceMethod}'.`);
    }
    const hashBytes = new Uint8Array(await sha256Digest(codeVerifier));
    const encodedHash = bytesToBase64(hashBytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    return encodedHash;
  }
  function buildClaimsParameter(requestedAcr) {
    var claims = {
      id_token: {
        acr: requestedAcr
      }
    };
    return JSON.stringify(claims);
  }
  kc.createLoginUrl = async function(options) {
    var state2 = createUUID();
    var nonce = createUUID();
    var redirectUri = adapter.redirectUri(options);
    var callbackState = {
      state: state2,
      nonce,
      redirectUri: encodeURIComponent(redirectUri),
      loginOptions: options
    };
    if (options && options.prompt) {
      callbackState.prompt = options.prompt;
    }
    var baseUrl;
    if (options && options.action == "register") {
      baseUrl = kc.endpoints.register();
    } else {
      baseUrl = kc.endpoints.authorize();
    }
    var scope = options && options.scope || kc.scope;
    if (!scope) {
      scope = "openid";
    } else if (scope.indexOf("openid") === -1) {
      scope = "openid " + scope;
    }
    var url = baseUrl + "?client_id=" + encodeURIComponent(kc.clientId) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + encodeURIComponent(state2) + "&response_mode=" + encodeURIComponent(kc.responseMode) + "&response_type=" + encodeURIComponent(kc.responseType) + "&scope=" + encodeURIComponent(scope);
    if (useNonce) {
      url = url + "&nonce=" + encodeURIComponent(nonce);
    }
    if (options && options.prompt) {
      url += "&prompt=" + encodeURIComponent(options.prompt);
    }
    if (options && typeof options.maxAge === "number") {
      url += "&max_age=" + encodeURIComponent(options.maxAge);
    }
    if (options && options.loginHint) {
      url += "&login_hint=" + encodeURIComponent(options.loginHint);
    }
    if (options && options.idpHint) {
      url += "&kc_idp_hint=" + encodeURIComponent(options.idpHint);
    }
    if (options && options.action && options.action != "register") {
      url += "&kc_action=" + encodeURIComponent(options.action);
    }
    if (options && options.locale) {
      url += "&ui_locales=" + encodeURIComponent(options.locale);
    }
    if (options && options.acr) {
      var claimsParameter = buildClaimsParameter(options.acr);
      url += "&claims=" + encodeURIComponent(claimsParameter);
    }
    if (options && options.acrValues || kc.acrValues) {
      url += "&acr_values=" + encodeURIComponent(options.acrValues || kc.acrValues);
    }
    if (kc.pkceMethod) {
      try {
        const codeVerifier = generateCodeVerifier(96);
        const pkceChallenge = await generatePkceChallenge(kc.pkceMethod, codeVerifier);
        callbackState.pkceCodeVerifier = codeVerifier;
        url += "&code_challenge=" + pkceChallenge;
        url += "&code_challenge_method=" + kc.pkceMethod;
      } catch (error) {
        throw new Error("Failed to generate PKCE challenge.", { cause: error });
      }
    }
    callbackStorage.add(callbackState);
    return url;
  };
  kc.logout = function(options) {
    return adapter.logout(options);
  };
  kc.createLogoutUrl = function(options) {
    const logoutMethod = (options == null ? void 0 : options.logoutMethod) ?? kc.logoutMethod;
    if (logoutMethod === "POST") {
      return kc.endpoints.logout();
    }
    var url = kc.endpoints.logout() + "?client_id=" + encodeURIComponent(kc.clientId) + "&post_logout_redirect_uri=" + encodeURIComponent(adapter.redirectUri(options, false));
    if (kc.idToken) {
      url += "&id_token_hint=" + encodeURIComponent(kc.idToken);
    }
    return url;
  };
  kc.register = function(options) {
    return adapter.register(options);
  };
  kc.createRegisterUrl = async function(options) {
    if (!options) {
      options = {};
    }
    options.action = "register";
    return await kc.createLoginUrl(options);
  };
  kc.createAccountUrl = function(options) {
    var realm = getRealmUrl();
    var url = void 0;
    if (typeof realm !== "undefined") {
      url = realm + "/account?referrer=" + encodeURIComponent(kc.clientId) + "&referrer_uri=" + encodeURIComponent(adapter.redirectUri(options));
    }
    return url;
  };
  kc.accountManagement = function() {
    return adapter.accountManagement();
  };
  kc.hasRealmRole = function(role) {
    var access = kc.realmAccess;
    return !!access && access.roles.indexOf(role) >= 0;
  };
  kc.hasResourceRole = function(role, resource) {
    if (!kc.resourceAccess) {
      return false;
    }
    var access = kc.resourceAccess[resource || kc.clientId];
    return !!access && access.roles.indexOf(role) >= 0;
  };
  kc.loadUserProfile = function() {
    var url = getRealmUrl() + "/account";
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "bearer " + kc.token);
    var promise = createPromise();
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          kc.profile = JSON.parse(req.responseText);
          promise.setSuccess(kc.profile);
        } else {
          promise.setError();
        }
      }
    };
    req.send();
    return promise.promise;
  };
  kc.loadUserInfo = function() {
    var url = kc.endpoints.userinfo();
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "bearer " + kc.token);
    var promise = createPromise();
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          kc.userInfo = JSON.parse(req.responseText);
          promise.setSuccess(kc.userInfo);
        } else {
          promise.setError();
        }
      }
    };
    req.send();
    return promise.promise;
  };
  kc.isTokenExpired = function(minValidity) {
    if (!kc.tokenParsed || !kc.refreshToken && kc.flow != "implicit") {
      throw "Not authenticated";
    }
    if (kc.timeSkew == null) {
      logInfo("[KEYCLOAK] Unable to determine if token is expired as timeskew is not set");
      return true;
    }
    var expiresIn = kc.tokenParsed["exp"] - Math.ceil((/* @__PURE__ */ new Date()).getTime() / 1e3) + kc.timeSkew;
    if (minValidity) {
      if (isNaN(minValidity)) {
        throw "Invalid minValidity";
      }
      expiresIn -= minValidity;
    }
    return expiresIn < 0;
  };
  kc.updateToken = function(minValidity) {
    var promise = createPromise();
    if (!kc.refreshToken) {
      promise.setError();
      return promise.promise;
    }
    minValidity = minValidity || 5;
    var exec = function() {
      var refreshToken = false;
      if (minValidity == -1) {
        refreshToken = true;
        logInfo("[KEYCLOAK] Refreshing token: forced refresh");
      } else if (!kc.tokenParsed || kc.isTokenExpired(minValidity)) {
        refreshToken = true;
        logInfo("[KEYCLOAK] Refreshing token: token expired");
      }
      if (!refreshToken) {
        promise.setSuccess(false);
      } else {
        var params = "grant_type=refresh_token&refresh_token=" + kc.refreshToken;
        var url = kc.endpoints.token();
        refreshQueue.push(promise);
        if (refreshQueue.length == 1) {
          var req = new XMLHttpRequest();
          req.open("POST", url, true);
          req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          req.withCredentials = true;
          params += "&client_id=" + encodeURIComponent(kc.clientId);
          var timeLocal = (/* @__PURE__ */ new Date()).getTime();
          req.onreadystatechange = function() {
            if (req.readyState == 4) {
              if (req.status == 200) {
                logInfo("[KEYCLOAK] Token refreshed");
                timeLocal = (timeLocal + (/* @__PURE__ */ new Date()).getTime()) / 2;
                var tokenResponse = JSON.parse(req.responseText);
                setToken(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], timeLocal);
                kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                  p.setSuccess(true);
                }
              } else {
                logWarn("[KEYCLOAK] Failed to refresh token");
                if (req.status == 400) {
                  kc.clearToken();
                }
                kc.onAuthRefreshError && kc.onAuthRefreshError();
                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                  p.setError("Failed to refresh token: An unexpected HTTP error occurred while attempting to refresh the token.");
                }
              }
            }
          };
          req.send(params);
        }
      }
    };
    if (loginIframe.enable) {
      var iframePromise = checkLoginIframe();
      iframePromise.then(function() {
        exec();
      }).catch(function(error) {
        promise.setError(error);
      });
    } else {
      exec();
    }
    return promise.promise;
  };
  kc.clearToken = function() {
    if (kc.token) {
      setToken(null, null, null);
      kc.onAuthLogout && kc.onAuthLogout();
      if (kc.loginRequired) {
        kc.login();
      }
    }
  };
  function getRealmUrl() {
    if (typeof kc.authServerUrl !== "undefined") {
      if (kc.authServerUrl.charAt(kc.authServerUrl.length - 1) == "/") {
        return kc.authServerUrl + "realms/" + encodeURIComponent(kc.realm);
      } else {
        return kc.authServerUrl + "/realms/" + encodeURIComponent(kc.realm);
      }
    } else {
      return void 0;
    }
  }
  function getOrigin() {
    if (!window.location.origin) {
      return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    } else {
      return window.location.origin;
    }
  }
  function processCallback(oauth, promise) {
    var code = oauth.code;
    var error = oauth.error;
    var prompt = oauth.prompt;
    var timeLocal = (/* @__PURE__ */ new Date()).getTime();
    if (oauth["kc_action_status"]) {
      kc.onActionUpdate && kc.onActionUpdate(oauth["kc_action_status"], oauth["kc_action"]);
    }
    if (error) {
      if (prompt != "none") {
        if (oauth.error_description && oauth.error_description === "authentication_expired") {
          kc.login(oauth.loginOptions);
        } else {
          var errorData = { error, error_description: oauth.error_description };
          kc.onAuthError && kc.onAuthError(errorData);
          promise && promise.setError(errorData);
        }
      } else {
        promise && promise.setSuccess();
      }
      return;
    } else if (kc.flow != "standard" && (oauth.access_token || oauth.id_token)) {
      authSuccess(oauth.access_token, null, oauth.id_token, true);
    }
    if (kc.flow != "implicit" && code) {
      var params = "code=" + code + "&grant_type=authorization_code";
      var url = kc.endpoints.token();
      var req = new XMLHttpRequest();
      req.open("POST", url, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      params += "&client_id=" + encodeURIComponent(kc.clientId);
      params += "&redirect_uri=" + oauth.redirectUri;
      if (oauth.pkceCodeVerifier) {
        params += "&code_verifier=" + oauth.pkceCodeVerifier;
      }
      req.withCredentials = true;
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200) {
            var tokenResponse = JSON.parse(req.responseText);
            authSuccess(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], kc.flow === "standard");
            scheduleCheckIframe();
          } else {
            kc.onAuthError && kc.onAuthError();
            promise && promise.setError();
          }
        }
      };
      req.send(params);
    }
    function authSuccess(accessToken, refreshToken, idToken, fulfillPromise) {
      timeLocal = (timeLocal + (/* @__PURE__ */ new Date()).getTime()) / 2;
      setToken(accessToken, refreshToken, idToken, timeLocal);
      if (useNonce && (kc.idTokenParsed && kc.idTokenParsed.nonce != oauth.storedNonce)) {
        logInfo("[KEYCLOAK] Invalid nonce, clearing token");
        kc.clearToken();
        promise && promise.setError();
      } else {
        if (fulfillPromise) {
          kc.onAuthSuccess && kc.onAuthSuccess();
          promise && promise.setSuccess();
        }
      }
    }
  }
  function loadConfig() {
    var promise = createPromise();
    var configUrl;
    if (typeof config2 === "string") {
      configUrl = config2;
    }
    function setupOidcEndoints(oidcConfiguration) {
      if (!oidcConfiguration) {
        kc.endpoints = {
          authorize: function() {
            return getRealmUrl() + "/protocol/openid-connect/auth";
          },
          token: function() {
            return getRealmUrl() + "/protocol/openid-connect/token";
          },
          logout: function() {
            return getRealmUrl() + "/protocol/openid-connect/logout";
          },
          checkSessionIframe: function() {
            return getRealmUrl() + "/protocol/openid-connect/login-status-iframe.html";
          },
          thirdPartyCookiesIframe: function() {
            return getRealmUrl() + "/protocol/openid-connect/3p-cookies/step1.html";
          },
          register: function() {
            return getRealmUrl() + "/protocol/openid-connect/registrations";
          },
          userinfo: function() {
            return getRealmUrl() + "/protocol/openid-connect/userinfo";
          }
        };
      } else {
        kc.endpoints = {
          authorize: function() {
            return oidcConfiguration.authorization_endpoint;
          },
          token: function() {
            return oidcConfiguration.token_endpoint;
          },
          logout: function() {
            if (!oidcConfiguration.end_session_endpoint) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.end_session_endpoint;
          },
          checkSessionIframe: function() {
            if (!oidcConfiguration.check_session_iframe) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.check_session_iframe;
          },
          register: function() {
            throw 'Redirection to "Register user" page not supported in standard OIDC mode';
          },
          userinfo: function() {
            if (!oidcConfiguration.userinfo_endpoint) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.userinfo_endpoint;
          }
        };
      }
    }
    if (configUrl) {
      var req = new XMLHttpRequest();
      req.open("GET", configUrl, true);
      req.setRequestHeader("Accept", "application/json");
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200 || fileLoaded(req)) {
            var config3 = JSON.parse(req.responseText);
            kc.authServerUrl = config3["auth-server-url"];
            kc.realm = config3["realm"];
            kc.clientId = config3["resource"];
            setupOidcEndoints(null);
            promise.setSuccess();
          } else {
            promise.setError();
          }
        }
      };
      req.send();
    } else {
      kc.clientId = config2.clientId;
      var oidcProvider = config2["oidcProvider"];
      if (!oidcProvider) {
        kc.authServerUrl = config2.url;
        kc.realm = config2.realm;
        setupOidcEndoints(null);
        promise.setSuccess();
      } else {
        if (typeof oidcProvider === "string") {
          var oidcProviderConfigUrl;
          if (oidcProvider.charAt(oidcProvider.length - 1) == "/") {
            oidcProviderConfigUrl = oidcProvider + ".well-known/openid-configuration";
          } else {
            oidcProviderConfigUrl = oidcProvider + "/.well-known/openid-configuration";
          }
          var req = new XMLHttpRequest();
          req.open("GET", oidcProviderConfigUrl, true);
          req.setRequestHeader("Accept", "application/json");
          req.onreadystatechange = function() {
            if (req.readyState == 4) {
              if (req.status == 200 || fileLoaded(req)) {
                var oidcProviderConfig = JSON.parse(req.responseText);
                setupOidcEndoints(oidcProviderConfig);
                promise.setSuccess();
              } else {
                promise.setError();
              }
            }
          };
          req.send();
        } else {
          setupOidcEndoints(oidcProvider);
          promise.setSuccess();
        }
      }
    }
    return promise.promise;
  }
  function fileLoaded(xhr) {
    return xhr.status == 0 && xhr.responseText && xhr.responseURL.startsWith("file:");
  }
  function setToken(token, refreshToken, idToken, timeLocal) {
    if (kc.tokenTimeoutHandle) {
      clearTimeout(kc.tokenTimeoutHandle);
      kc.tokenTimeoutHandle = null;
    }
    if (refreshToken) {
      kc.refreshToken = refreshToken;
      kc.refreshTokenParsed = decodeToken(refreshToken);
    } else {
      delete kc.refreshToken;
      delete kc.refreshTokenParsed;
    }
    if (idToken) {
      kc.idToken = idToken;
      kc.idTokenParsed = decodeToken(idToken);
    } else {
      delete kc.idToken;
      delete kc.idTokenParsed;
    }
    if (token) {
      kc.token = token;
      kc.tokenParsed = decodeToken(token);
      kc.sessionId = kc.tokenParsed.sid;
      kc.authenticated = true;
      kc.subject = kc.tokenParsed.sub;
      kc.realmAccess = kc.tokenParsed.realm_access;
      kc.resourceAccess = kc.tokenParsed.resource_access;
      if (timeLocal) {
        kc.timeSkew = Math.floor(timeLocal / 1e3) - kc.tokenParsed.iat;
      }
      if (kc.timeSkew != null) {
        logInfo("[KEYCLOAK] Estimated time difference between browser and server is " + kc.timeSkew + " seconds");
        if (kc.onTokenExpired) {
          var expiresIn = (kc.tokenParsed["exp"] - (/* @__PURE__ */ new Date()).getTime() / 1e3 + kc.timeSkew) * 1e3;
          logInfo("[KEYCLOAK] Token expires in " + Math.round(expiresIn / 1e3) + " s");
          if (expiresIn <= 0) {
            kc.onTokenExpired();
          } else {
            kc.tokenTimeoutHandle = setTimeout(kc.onTokenExpired, expiresIn);
          }
        }
      }
    } else {
      delete kc.token;
      delete kc.tokenParsed;
      delete kc.subject;
      delete kc.realmAccess;
      delete kc.resourceAccess;
      kc.authenticated = false;
    }
  }
  function createUUID() {
    if (typeof crypto === "undefined" || typeof crypto.randomUUID === "undefined") {
      throw new Error("Web Crypto API is not available.");
    }
    return crypto.randomUUID();
  }
  function parseCallback(url) {
    var oauth = parseCallbackUrl(url);
    if (!oauth) {
      return;
    }
    var oauthState = callbackStorage.get(oauth.state);
    if (oauthState) {
      oauth.valid = true;
      oauth.redirectUri = oauthState.redirectUri;
      oauth.storedNonce = oauthState.nonce;
      oauth.prompt = oauthState.prompt;
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
      oauth.loginOptions = oauthState.loginOptions;
    }
    return oauth;
  }
  function parseCallbackUrl(url) {
    var supportedParams;
    switch (kc.flow) {
      case "standard":
        supportedParams = ["code", "state", "session_state", "kc_action_status", "kc_action", "iss"];
        break;
      case "implicit":
        supportedParams = ["access_token", "token_type", "id_token", "state", "session_state", "expires_in", "kc_action_status", "kc_action", "iss"];
        break;
      case "hybrid":
        supportedParams = ["access_token", "token_type", "id_token", "code", "state", "session_state", "expires_in", "kc_action_status", "kc_action", "iss"];
        break;
    }
    supportedParams.push("error");
    supportedParams.push("error_description");
    supportedParams.push("error_uri");
    var queryIndex = url.indexOf("?");
    var fragmentIndex = url.indexOf("#");
    var newUrl;
    var parsed;
    if (kc.responseMode === "query" && queryIndex !== -1) {
      newUrl = url.substring(0, queryIndex);
      parsed = parseCallbackParams(url.substring(queryIndex + 1, fragmentIndex !== -1 ? fragmentIndex : url.length), supportedParams);
      if (parsed.paramsString !== "") {
        newUrl += "?" + parsed.paramsString;
      }
      if (fragmentIndex !== -1) {
        newUrl += url.substring(fragmentIndex);
      }
    } else if (kc.responseMode === "fragment" && fragmentIndex !== -1) {
      newUrl = url.substring(0, fragmentIndex);
      parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams);
      if (parsed.paramsString !== "") {
        newUrl += "#" + parsed.paramsString;
      }
    }
    if (parsed && parsed.oauthParams) {
      if (kc.flow === "standard" || kc.flow === "hybrid") {
        if ((parsed.oauthParams.code || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl;
          return parsed.oauthParams;
        }
      } else if (kc.flow === "implicit") {
        if ((parsed.oauthParams.access_token || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl;
          return parsed.oauthParams;
        }
      }
    }
  }
  function parseCallbackParams(paramsString, supportedParams) {
    var p = paramsString.split("&");
    var result = {
      paramsString: "",
      oauthParams: {}
    };
    for (var i2 = 0; i2 < p.length; i2++) {
      var split = p[i2].indexOf("=");
      var key = p[i2].slice(0, split);
      if (supportedParams.indexOf(key) !== -1) {
        result.oauthParams[key] = p[i2].slice(split + 1);
      } else {
        if (result.paramsString !== "") {
          result.paramsString += "&";
        }
        result.paramsString += p[i2];
      }
    }
    return result;
  }
  function createPromise() {
    var p = {
      setSuccess: function(result) {
        p.resolve(result);
      },
      setError: function(result) {
        p.reject(result);
      }
    };
    p.promise = new Promise(function(resolve, reject) {
      p.resolve = resolve;
      p.reject = reject;
    });
    return p;
  }
  function applyTimeoutToPromise(promise, timeout, errorMessage) {
    var timeoutHandle = null;
    var timeoutPromise = new Promise(function(resolve, reject) {
      timeoutHandle = setTimeout(function() {
        reject({ "error": errorMessage });
      }, timeout);
    });
    return Promise.race([promise, timeoutPromise]).finally(function() {
      clearTimeout(timeoutHandle);
    });
  }
  function setupCheckLoginIframe() {
    var promise = createPromise();
    if (!loginIframe.enable) {
      promise.setSuccess();
      return promise.promise;
    }
    if (loginIframe.iframe) {
      promise.setSuccess();
      return promise.promise;
    }
    var iframe = document.createElement("iframe");
    loginIframe.iframe = iframe;
    iframe.onload = function() {
      var authUrl = kc.endpoints.authorize();
      if (authUrl.charAt(0) === "/") {
        loginIframe.iframeOrigin = getOrigin();
      } else {
        loginIframe.iframeOrigin = authUrl.substring(0, authUrl.indexOf("/", 8));
      }
      promise.setSuccess();
    };
    var src = kc.endpoints.checkSessionIframe();
    iframe.setAttribute("src", src);
    iframe.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
    iframe.setAttribute("title", "keycloak-session-iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var messageCallback = function(event) {
      if (event.origin !== loginIframe.iframeOrigin || loginIframe.iframe.contentWindow !== event.source) {
        return;
      }
      if (!(event.data == "unchanged" || event.data == "changed" || event.data == "error")) {
        return;
      }
      if (event.data != "unchanged") {
        kc.clearToken();
      }
      var callbacks = loginIframe.callbackList.splice(0, loginIframe.callbackList.length);
      for (var i2 = callbacks.length - 1; i2 >= 0; --i2) {
        var promise2 = callbacks[i2];
        if (event.data == "error") {
          promise2.setError();
        } else {
          promise2.setSuccess(event.data == "unchanged");
        }
      }
    };
    window.addEventListener("message", messageCallback, false);
    return promise.promise;
  }
  function scheduleCheckIframe() {
    if (loginIframe.enable) {
      if (kc.token) {
        setTimeout(function() {
          checkLoginIframe().then(function(unchanged) {
            if (unchanged) {
              scheduleCheckIframe();
            }
          });
        }, loginIframe.interval * 1e3);
      }
    }
  }
  function checkLoginIframe() {
    var promise = createPromise();
    if (loginIframe.iframe && loginIframe.iframeOrigin) {
      var msg = kc.clientId + " " + (kc.sessionId ? kc.sessionId : "");
      loginIframe.callbackList.push(promise);
      var origin2 = loginIframe.iframeOrigin;
      if (loginIframe.callbackList.length == 1) {
        loginIframe.iframe.contentWindow.postMessage(msg, origin2);
      }
    } else {
      promise.setSuccess();
    }
    return promise.promise;
  }
  function check3pCookiesSupported() {
    var promise = createPromise();
    if ((loginIframe.enable || kc.silentCheckSsoRedirectUri) && typeof kc.endpoints.thirdPartyCookiesIframe === "function") {
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", kc.endpoints.thirdPartyCookiesIframe());
      iframe.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
      iframe.setAttribute("title", "keycloak-3p-check-iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      var messageCallback = function(event) {
        if (iframe.contentWindow !== event.source) {
          return;
        }
        if (event.data !== "supported" && event.data !== "unsupported") {
          return;
        } else if (event.data === "unsupported") {
          logWarn(
            "[KEYCLOAK] Your browser is blocking access to 3rd-party cookies, this means:\n\n - It is not possible to retrieve tokens without redirecting to the Keycloak server (a.k.a. no support for silent authentication).\n - It is not possible to automatically detect changes to the session status (such as the user logging out in another tab).\n\nFor more information see: https://www.keycloak.org/securing-apps/javascript-adapter#_modern_browsers"
          );
          loginIframe.enable = false;
          if (kc.silentCheckSsoFallback) {
            kc.silentCheckSsoRedirectUri = false;
          }
        }
        document.body.removeChild(iframe);
        window.removeEventListener("message", messageCallback);
        promise.setSuccess();
      };
      window.addEventListener("message", messageCallback, false);
    } else {
      promise.setSuccess();
    }
    return applyTimeoutToPromise(promise.promise, kc.messageReceiveTimeout, "Timeout when waiting for 3rd party check iframe message.");
  }
  function loadAdapter(type) {
    if (!type || type == "default") {
      return {
        login: async function(options) {
          window.location.assign(await kc.createLoginUrl(options));
          return createPromise().promise;
        },
        logout: async function(options) {
          const logoutMethod = (options == null ? void 0 : options.logoutMethod) ?? kc.logoutMethod;
          if (logoutMethod === "GET") {
            window.location.replace(kc.createLogoutUrl(options));
            return;
          }
          const form2 = document.createElement("form");
          form2.setAttribute("method", "POST");
          form2.setAttribute("action", kc.createLogoutUrl(options));
          form2.style.display = "none";
          const data = {
            id_token_hint: kc.idToken,
            client_id: kc.clientId,
            post_logout_redirect_uri: adapter.redirectUri(options, false)
          };
          for (const [name, value] of Object.entries(data)) {
            const input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", name);
            input.setAttribute("value", value);
            form2.appendChild(input);
          }
          document.body.appendChild(form2);
          form2.submit();
        },
        register: async function(options) {
          window.location.assign(await kc.createRegisterUrl(options));
          return createPromise().promise;
        },
        accountManagement: function() {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            window.location.href = accountUrl;
          } else {
            throw "Not supported by the OIDC server";
          }
          return createPromise().promise;
        },
        redirectUri: function(options, encodeHash) {
          if (options && options.redirectUri) {
            return options.redirectUri;
          } else if (kc.redirectUri) {
            return kc.redirectUri;
          } else {
            return location.href;
          }
        }
      };
    }
    if (type == "cordova") {
      loginIframe.enable = false;
      var cordovaOpenWindowWrapper = function(loginUrl, target, options) {
        if (window.cordova && window.cordova.InAppBrowser) {
          return window.cordova.InAppBrowser.open(loginUrl, target, options);
        } else {
          return window.open(loginUrl, target, options);
        }
      };
      var shallowCloneCordovaOptions = function(userOptions) {
        if (userOptions && userOptions.cordovaOptions) {
          return Object.keys(userOptions.cordovaOptions).reduce(function(options, optionName) {
            options[optionName] = userOptions.cordovaOptions[optionName];
            return options;
          }, {});
        } else {
          return {};
        }
      };
      var formatCordovaOptions = function(cordovaOptions) {
        return Object.keys(cordovaOptions).reduce(function(options, optionName) {
          options.push(optionName + "=" + cordovaOptions[optionName]);
          return options;
        }, []).join(",");
      };
      var createCordovaOptions = function(userOptions) {
        var cordovaOptions = shallowCloneCordovaOptions(userOptions);
        cordovaOptions.location = "no";
        if (userOptions && userOptions.prompt == "none") {
          cordovaOptions.hidden = "yes";
        }
        return formatCordovaOptions(cordovaOptions);
      };
      var getCordovaRedirectUri = function() {
        return kc.redirectUri || "http://localhost";
      };
      return {
        login: async function(options) {
          var promise = createPromise();
          var cordovaOptions = createCordovaOptions(options);
          var loginUrl = await kc.createLoginUrl(options);
          var ref2 = cordovaOpenWindowWrapper(loginUrl, "_blank", cordovaOptions);
          var completed = false;
          var closed = false;
          var closeBrowser = function() {
            closed = true;
            ref2.close();
          };
          ref2.addEventListener("loadstart", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              var callback = parseCallback(event.url);
              processCallback(callback, promise);
              closeBrowser();
              completed = true;
            }
          });
          ref2.addEventListener("loaderror", function(event) {
            if (!completed) {
              if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
                var callback = parseCallback(event.url);
                processCallback(callback, promise);
                closeBrowser();
                completed = true;
              } else {
                promise.setError();
                closeBrowser();
              }
            }
          });
          ref2.addEventListener("exit", function(event) {
            if (!closed) {
              promise.setError({
                reason: "closed_by_user"
              });
            }
          });
          return promise.promise;
        },
        logout: function(options) {
          var promise = createPromise();
          var logoutUrl = kc.createLogoutUrl(options);
          var ref2 = cordovaOpenWindowWrapper(logoutUrl, "_blank", "location=no,hidden=yes,clearcache=yes");
          var error;
          ref2.addEventListener("loadstart", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref2.close();
            }
          });
          ref2.addEventListener("loaderror", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref2.close();
            } else {
              error = true;
              ref2.close();
            }
          });
          ref2.addEventListener("exit", function(event) {
            if (error) {
              promise.setError();
            } else {
              kc.clearToken();
              promise.setSuccess();
            }
          });
          return promise.promise;
        },
        register: async function(options) {
          var promise = createPromise();
          var registerUrl = await kc.createRegisterUrl();
          var cordovaOptions = createCordovaOptions(options);
          var ref2 = cordovaOpenWindowWrapper(registerUrl, "_blank", cordovaOptions);
          ref2.addEventListener("loadstart", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref2.close();
              var oauth = parseCallback(event.url);
              processCallback(oauth, promise);
            }
          });
          return promise.promise;
        },
        accountManagement: function() {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            var ref2 = cordovaOpenWindowWrapper(accountUrl, "_blank", "location=no");
            ref2.addEventListener("loadstart", function(event) {
              if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
                ref2.close();
              }
            });
          } else {
            throw "Not supported by the OIDC server";
          }
        },
        redirectUri: function(options) {
          return getCordovaRedirectUri();
        }
      };
    }
    if (type == "cordova-native") {
      loginIframe.enable = false;
      return {
        login: async function(options) {
          var promise = createPromise();
          var loginUrl = await kc.createLoginUrl(options);
          universalLinks.subscribe("keycloak", function(event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            var oauth = parseCallback(event.url);
            processCallback(oauth, promise);
          });
          window.cordova.plugins.browsertab.openUrl(loginUrl);
          return promise.promise;
        },
        logout: function(options) {
          var promise = createPromise();
          var logoutUrl = kc.createLogoutUrl(options);
          universalLinks.subscribe("keycloak", function(event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            kc.clearToken();
            promise.setSuccess();
          });
          window.cordova.plugins.browsertab.openUrl(logoutUrl);
          return promise.promise;
        },
        register: async function(options) {
          var promise = createPromise();
          var registerUrl = await kc.createRegisterUrl(options);
          universalLinks.subscribe("keycloak", function(event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            var oauth = parseCallback(event.url);
            processCallback(oauth, promise);
          });
          window.cordova.plugins.browsertab.openUrl(registerUrl);
          return promise.promise;
        },
        accountManagement: function() {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            window.cordova.plugins.browsertab.openUrl(accountUrl);
          } else {
            throw "Not supported by the OIDC server";
          }
        },
        redirectUri: function(options) {
          if (options && options.redirectUri) {
            return options.redirectUri;
          } else if (kc.redirectUri) {
            return kc.redirectUri;
          } else {
            return "http://localhost";
          }
        }
      };
    }
    throw "invalid adapter type: " + type;
  }
  const STORAGE_KEY_PREFIX = "kc-callback-";
  var LocalStorage = function() {
    if (!(this instanceof LocalStorage)) {
      return new LocalStorage();
    }
    localStorage.setItem("kc-test", "test");
    localStorage.removeItem("kc-test");
    var cs = this;
    function clearInvalidValues() {
      const currentTime = Date.now();
      for (const [key, value] of getStoredEntries()) {
        const expiry = parseExpiry(value);
        if (expiry === null || expiry < currentTime) {
          localStorage.removeItem(key);
        }
      }
    }
    function clearAllValues() {
      for (const [key] of getStoredEntries()) {
        localStorage.removeItem(key);
      }
    }
    function getStoredEntries() {
      return Object.entries(localStorage).filter(([key]) => key.startsWith(STORAGE_KEY_PREFIX));
    }
    function parseExpiry(value) {
      let parsedValue;
      try {
        parsedValue = JSON.parse(value);
      } catch (error) {
        return null;
      }
      if (isObject(parsedValue) && "expires" in parsedValue && typeof parsedValue.expires === "number") {
        return parsedValue.expires;
      }
      return null;
    }
    cs.get = function(state2) {
      if (!state2) {
        return;
      }
      var key = STORAGE_KEY_PREFIX + state2;
      var value = localStorage.getItem(key);
      if (value) {
        localStorage.removeItem(key);
        value = JSON.parse(value);
      }
      clearInvalidValues();
      return value;
    };
    cs.add = function(state2) {
      clearInvalidValues();
      const key = STORAGE_KEY_PREFIX + state2.state;
      const value = JSON.stringify({
        ...state2,
        // Set the expiry time to 1 hour from now.
        expires: Date.now() + 60 * 60 * 1e3
      });
      try {
        localStorage.setItem(key, value);
      } catch (error) {
        clearAllValues();
        localStorage.setItem(key, value);
      }
    };
  };
  var CookieStorage = function() {
    if (!(this instanceof CookieStorage)) {
      return new CookieStorage();
    }
    var cs = this;
    cs.get = function(state2) {
      if (!state2) {
        return;
      }
      var value = getCookie(STORAGE_KEY_PREFIX + state2);
      setCookie(STORAGE_KEY_PREFIX + state2, "", cookieExpiration(-100));
      if (value) {
        return JSON.parse(value);
      }
    };
    cs.add = function(state2) {
      setCookie(STORAGE_KEY_PREFIX + state2.state, JSON.stringify(state2), cookieExpiration(60));
    };
    cs.removeItem = function(key) {
      setCookie(key, "", cookieExpiration(-100));
    };
    var cookieExpiration = function(minutes) {
      var exp = /* @__PURE__ */ new Date();
      exp.setTime(exp.getTime() + minutes * 60 * 1e3);
      return exp;
    };
    var getCookie = function(key) {
      var name = key + "=";
      var ca = document.cookie.split(";");
      for (var i2 = 0; i2 < ca.length; i2++) {
        var c2 = ca[i2];
        while (c2.charAt(0) == " ") {
          c2 = c2.substring(1);
        }
        if (c2.indexOf(name) == 0) {
          return c2.substring(name.length, c2.length);
        }
      }
      return "";
    };
    var setCookie = function(key, value, expirationDate) {
      var cookie = key + "=" + value + "; expires=" + expirationDate.toUTCString() + "; ";
      document.cookie = cookie;
    };
  };
  function createCallbackStorage() {
    try {
      return new LocalStorage();
    } catch (err) {
    }
    return new CookieStorage();
  }
  function createLogger(fn) {
    return function() {
      if (kc.enableLogging) {
        fn.apply(console, Array.prototype.slice.call(arguments));
      }
    };
  }
}
function bytesToBase64(bytes) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}
async function sha256Digest(message) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  if (typeof crypto === "undefined" || typeof crypto.subtle === "undefined") {
    throw new Error("Web Crypto API is not available.");
  }
  return await crypto.subtle.digest("SHA-256", data);
}
function decodeToken(token) {
  const [header, payload] = token.split(".");
  if (typeof payload !== "string") {
    throw new Error("Unable to decode token, payload not found.");
  }
  let decoded;
  try {
    decoded = base64UrlDecode(payload);
  } catch (error) {
    throw new Error("Unable to decode token, payload is not a valid Base64URL value.", { cause: error });
  }
  try {
    return JSON.parse(decoded);
  } catch (error) {
    throw new Error("Unable to decode token, payload is not a valid JSON value.", { cause: error });
  }
}
function base64UrlDecode(input) {
  let output = input.replaceAll("-", "+").replaceAll("_", "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("Input is not of the correct length.");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (error) {
    return atob(output);
  }
}
function b64DecodeUnicode(input) {
  return decodeURIComponent(atob(input).replace(/(.)/g, (m3, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function isObject(input) {
  return typeof input === "object" && input !== null;
}
class SsoUtils extends AbstractService {
  constructor() {
    super();
    this.clear();
  }
  initialize(url, realm, clientId) {
    this._url = url;
    this._realm = realm;
    this._clientId = clientId;
  }
  isInitialized() {
    return this._url !== void 0;
  }
  clear() {
    this._keycloakAuth = null;
  }
  _initSsoClient() {
    if (!this._keycloakAuth) {
      this._keycloakAuth = new Keycloak({
        url: this._url,
        realm: this._realm,
        clientId: this._clientId
      });
    }
  }
  isAuthenticated() {
    return this._keycloakAuth && this._keycloakAuth.authenticated;
  }
  async init(context, callbackSuccess, callbackError) {
    this.checkIsInitialized();
    this._initSsoClient();
    try {
      const authenticated = await this._keycloakAuth.init({
        onLoad: "login-required",
        checkLoginIframe: !window.Cypress
      });
      if (authenticated) {
        return await callbackSuccess(context);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Sso failed", error);
      return await callbackError(context, error);
    }
  }
  async refreshToken() {
    if (!this._keycloakAuth || !this.isAuthenticated()) {
      return null;
    }
    try {
      const refreshed = await this._keycloakAuth.updateToken(70);
      if (!refreshed) {
      }
    } catch (error) {
      console.error("Failed to refresh token: " + error);
    }
    return this._keycloakAuth.token;
  }
  async logout() {
    if (!this._keycloakAuth) {
      return null;
    }
    await this._keycloakAuth.logout();
  }
}
class FakeSsoUtils extends AbstractService {
  constructor() {
    super();
    this.fake_token = "fake-token";
    this.is_authenticated = false;
  }
  initialize(url, realm, clientId) {
    console.log(
      "FakeSsoService initialize on: ",
      url,
      " realm: ",
      realm,
      " clientId: ",
      clientId
    );
    this._url = url;
  }
  isAuthenticated() {
    return this.is_authenticated;
  }
  async init(context, callbackSuccess, callbackError) {
    try {
      this.is_authenticated = true;
      if (this.is_authenticated) {
        return await callbackSuccess(context);
      } else {
        window.location.reload();
      }
    } catch (error) {
      console.error("Fake Sso failed", error);
      return await callbackError(context, error);
    }
  }
  async refreshToken() {
    if (!this._keycloakAuth || !this.isAuthenticated()) {
      return null;
    }
    return this.fake_token;
  }
  async logout() {
    console.log("Fake logout");
    this.is_authenticated = false;
  }
}
function getSsoService() {
  let isCypress;
  try {
    window;
    isCypress = window.Cypress;
  } catch (e2) {
    isCypress = false;
  }
  if (isCypress) {
    return new FakeSsoUtils();
  }
  return new SsoUtils();
}
const SsoService = getSsoService();
class StringUtils extends AbstractService {
  /**
   * Returns a string where the first character in every word is upper case.
   * @param str
   * @returns {string}
   */
  title(str) {
    return str.trim().toLowerCase().split(" ").map(function(word) {
      return word[0].toUpperCase() + word.substr(1);
    }).join(" ");
  }
  upperFirst(value) {
    if (!value) return "";
    value = value.toString();
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
}
let StringService = new StringUtils();
class Url extends AbstractService {
  constructor() {
    super();
    this._urls = null;
  }
  clear() {
    this._urls = null;
  }
  isInitialized() {
    return this._urls !== null;
  }
  initialize(urls) {
    this._urls = urls;
  }
  /**
   * retrieve query string
   *
   * @param {object} queryString - {<key>: <value>} to build as query string
   *
   * @return {string}
   */
  getQueryString(queryString) {
    return Object.keys(queryString).map(
      (key) => encodeURIComponent(key) + "=" + encodeURIComponent(queryString[key])
    ).join("&");
  }
  _checkUrlNameExists(urlName) {
    if (Object.prototype.hasOwnProperty.call(this._urls, urlName))
      return this._urls[urlName];
    throw Error(`url name '${urlName}' not found in urls`);
  }
  /**
   * Render api url
   *
   * ex:
   * urls = {user: "user/{id}/permissions/"}
   * const result = render("user", {id: 24});
   * result is equal to : user/24/permissions/
   *
   * NB: base url should be define with axios baseURL
   *
   * @param {String} urlName url name to use
   * @param {Object} params (optional) key to substitute with value in url
   * @param {Object} queryString (optional) query string to add to url
   *
   * @return {string}
   */
  render(urlName, params = {}, queryString = {}) {
    params = params || {};
    queryString = queryString || {};
    this.checkIsInitialized();
    let url = this._checkUrlNameExists(urlName);
    Object.keys(params).forEach(
      (name) => url = url.replace("{" + name + "}", params[name])
    );
    queryString = this.getQueryString(queryString);
    if (queryString) {
      url += "?" + queryString;
    }
    return url;
  }
}
let UrlService = new Url();
const AxiosHelper = {
  initialize(endpoint, vueRouter, ssoClientId = null) {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = endpoint;
    axios.defaults.headers.common["Sso-Client-Id"] = ssoClientId;
    axios.interceptors.request.use(
      async (config2) => {
        const token = await SsoService.refreshToken();
        if (token) {
          config2.headers["Authorization"] = `Bearer ${token}`;
        }
        return config2;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    axios.interceptors.response.use(
      void 0,
      async (error) => await this.errorHandler(error, vueRouter)
    );
  },
  setAuthorizationSharedTokenHeader(accessToken) {
    axios.defaults.headers.common["Authorization"] = "Shared-Token " + accessToken;
  },
  resetAuthorizationHeader() {
    delete axios.defaults.headers.common["Authorization"];
  },
  async errorHandler(error, vueRouter) {
    console.error("errorHandler", error, error.response);
    if (error.response) {
      if (error.response.status === 401) {
        SsoService.logout();
        vueRouter.replace({ name: "403" });
        return Promise.reject(error.response);
      }
      if (error.response.status === 403) {
        vueRouter.replace({ name: "403" });
        return Promise.reject(error.response);
      }
      if (error.response.status < 500) {
        console.warn("Axios interception error < 500", error);
        return Promise.reject(error);
      }
    }
    console.error("Axios unknown error", error.response);
    vueRouter.replace({ name: "500" });
    return Promise.reject(error.response);
  }
};
class BadRequestError extends Error {
}
class NotFoundError extends Error {
}
class AlreadyExistsError extends Error {
}
class ValidationError extends Error {
  constructor(message, errors) {
    super(message);
    __publicField(this, "errors");
    this.errors = errors;
  }
}
const apiCall = async (method, url, data = null, options = {}) => {
  var _a, _b, _c, _d;
  console.log("apiCall", method, url, data, options);
  data = data || {};
  try {
    const response = method !== "get" ? await HttpService[method](url, data, options) : await HttpService[method](url, options);
    if (method !== "download") {
      console.log("apiCall response", response);
      return response;
    }
  } catch (e2) {
    if (((_a = e2.response) == null ? void 0 : _a.status) === 422) {
      const errors = e2.response.data;
      console.warn("validations error", errors);
      throw new ValidationError("Validation error", errors);
    }
    if (((_b = e2.response) == null ? void 0 : _b.status) === 409) {
      throw new AlreadyExistsError(e2.response.data);
    }
    if (((_c = e2.response) == null ? void 0 : _c.status) === 400) {
      throw new BadRequestError(e2.response.data);
    }
    if (((_d = e2.response) == null ? void 0 : _d.status) === 404) {
      throw new NotFoundError(e2.response.data);
    }
    console.error("failed: ", e2);
    throw e2;
  }
};
const apiGet = async (url, options = {}) => {
  return await apiCall("get", url, null, options);
};
const apiPost = async (url, params, options = {}) => {
  return await apiCall("post", url, params, options);
};
const apiPut = async (url, params, options = {}) => {
  return await apiCall("put", url, params, options);
};
const apiPatch = async (url, params, options = {}) => {
  return await apiCall("patch", url, params, options);
};
const apiDelete = async (url, params, options = {}) => {
  return await apiCall("delete", url, params, options);
};
const apiGetDownload = async (url, params) => {
  return await apiCall("download", url, params, "get");
};
const apiPostDownload = async (url, params) => {
  return await apiCall("download", url, params, "post");
};
const ErrorPageMixin = {
  computed: {
    getUrlName() {
      return this.isLoggedIn && this.isGuestUser ? "sharingZone" : "privateZone";
    }
  }
};
const ImageMixin = {
  methods: {
    transformImage(imageUrl, transform) {
      return imageUrl.replace("/upload/", `/upload/${transform},e_improve/`);
    },
    fitToSizeWithAspectRatioRetained(imageUrl, width, height, backgroundColor = "b_white") {
      const transform = `w_${width},h_${height},c_pad,${backgroundColor}`;
      return this.transformImage(imageUrl, transform);
    }
  }
};
const state$1 = {
  current_user: null,
  current_user_group: null,
  sharing_token: null
};
const mutations$1 = {
  SET_CURRENT_USER(state2, user) {
    state2.current_user = user;
  },
  SET_CURRENT_USER_GROUP(state2, group) {
    state2.current_user_group = group;
  },
  SET_SHARING_TOKEN(state2, token) {
    state2.sharing_token = token;
    AxiosHelper.setAuthorizationSharedTokenHeader(token);
  },
  RESET_AUTH(state2) {
    AxiosHelper.resetAuthorizationHeader();
    state2.current_user = null;
    state2.current_user_group = null;
    state2.sharing_token = null;
  }
};
const actions$1 = {
  async fetchLoggedUser({ commit }) {
    try {
      let user = await HttpService.get(UrlService.render("fetchLoggedUser"));
      commit("SET_CURRENT_USER", user);
      commit("SET_CURRENT_USER_GROUP", user.group);
    } catch (e2) {
      console.error("failed: ", e2);
    }
  },
  async setSharingToken({ commit, dispatch }, token) {
    await dispatch("logout");
    commit("SET_SHARING_TOKEN", token);
  },
  async acceptCookies({ commit }, userId) {
    const payload = {
      accepted_cookies: true
    };
    try {
      const user = await HttpService.put(
        UrlService.render("userAcceptCookies", { id: userId }),
        payload
      );
      commit("SET_CURRENT_USER", user);
    } catch (e2) {
      console.error("acceptCookies failed: ", e2);
      throw e2;
    }
  },
  async logout({ commit }) {
    commit("RESET_AUTH");
    await SsoService.logout();
  },
  async updateLang({ dispatch }, payload) {
    await HttpService.put(UrlService.render("userLang", { id: payload.userId }), {
      lang: payload.lang
    });
    await dispatch("fetchLoggedUser");
  }
};
const getters$1 = {
  isLoggedIn: (state2, getters2) => state2.sharing_token && getters2.isGuestUser || SsoService.isAuthenticated(),
  isLoggedInSharingMode: (state2, getters2) => state2.sharing_token && getters2.isGuestUser,
  isGuestUser: (state2) => state2.current_user && state2.current_user.group.id === GroupService.GUEST,
  isSharingTokenExists: (state2) => (token) => state2.sharing_token && state2.sharing_token === token,
  getCurrentUser: (state2) => state2.current_user,
  getCurrentUserGroupId: (state2) => {
    var _a, _b;
    return (_b = (_a = state2.current_user) == null ? void 0 : _a.group) == null ? void 0 : _b.id;
  },
  areCookiesAccepted: (state2) => {
    var _a, _b;
    return (_b = (_a = state2.current_user) == null ? void 0 : _a.profile) == null ? void 0 : _b.accepted_cookies;
  },
  getRouteName: (state2) => (routeName) => state2.sharing_token ? `shared_${routeName}` : routeName,
  hasSharingToken: (state2) => state2.sharing_token !== null,
  getSharingToken: (state2) => state2.sharing_token,
  getUserLang: (state2) => state2.current_user.profile.lang
};
const auth = {
  namespaced: true,
  state: state$1,
  mutations: mutations$1,
  actions: actions$1,
  getters: getters$1
};
const localStorageName$1 = "cs-lang";
const state = {
  current_lang: null,
  i18n: null
};
const mutations = {
  SET_CURRENT_LANGUAGE: (state2, lang) => {
    state2.current_lang = lang;
    if (!state2.i18n) {
      throw Error(
        `You should initialize i18n with 'dispatch("config/initI18n")' first`
      );
    }
    state2.i18n.global.locale = lang;
  },
  SET_I18N: (state2, i18n) => {
    state2.i18n = i18n;
  }
};
const actions = {
  _setLang({ commit }, lang) {
    localStorage.setItem(localStorageName$1, lang);
    axios.defaults.headers.common["Accept-Language"] = lang;
    document.querySelector("html").setAttribute("lang", lang);
    commit("SET_CURRENT_LANGUAGE", lang);
  },
  initI18n({ dispatch, commit }, i18n) {
    commit("SET_I18N", i18n);
    const lang = localStorage.getItem(localStorageName$1) || navigator.language.slice(0, 2) || i18n.global.locale.value;
    dispatch("_setLang", lang);
  },
  setCurrentLang({ state: state2, dispatch }, lang) {
    if (state2.current_lang === null) {
      throw Error(
        `You should initialize language with 'dispatch("config/initLang")' first`
      );
    }
    dispatch("_setLang", lang);
  },
  setUserLang({ state: state2, dispatch, rootGetters }) {
    const userLang = rootGetters["auth/getUserLang"];
    if (userLang !== state2.current_lang) {
      dispatch("_setLang", userLang);
    }
  }
};
const getters = {
  getCurrentLang: (state2) => state2.current_lang,
  // isLangAvailable: (state) => (lang) => i18n.global.availableLocales.includes(lang),
  isLangAvailable: () => (lang) => state.i18n.global.availableLocales.includes(lang),
  availableLangs: () => state.i18n.global.availableLocales
};
const config = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
/*!
 * pinia v3.0.2
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia") : (
  /* istanbul ignore next */
  Symbol()
);
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
const IS_CLIENT = typeof window !== "undefined";
function patchObject(newState, oldState) {
  for (const key in oldState) {
    const subPatch = oldState[key];
    if (!(key in newState)) {
      continue;
    }
    const targetValue = newState[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && !isRef(subPatch) && !isReactive(subPatch)) {
      newState[key] = patchObject(targetValue, subPatch);
    } else {
      newState[key] = subPatch;
    }
  }
  return newState;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
const ACTION_MARKER = Symbol();
const ACTION_NAME = Symbol();
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  } else if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = process.env.NODE_ENV !== "production" ? Symbol("pinia:skipHydration") : (
  /* istanbul ignore next */
  Symbol()
);
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !Object.prototype.hasOwnProperty.call(obj, skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state: state2, actions: actions2, getters: getters2 } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
      pinia.state.value[id] = state2 ? state2() : {};
    }
    const localState = process.env.NODE_ENV !== "production" && hot ? (
      // use ref() to unwrap refs inside state TODO: check if this is still necessary
      toRefs(ref(state2 ? state2() : {}).value)
    ) : toRefs(pinia.state.value[id]);
    return assign(localState, actions2, Object.keys(getters2 || {}).reduce((computedGetters, name) => {
      if (process.env.NODE_ENV !== "production" && name in localState) {
        console.warn(`[🍍]: A getter cannot have the same name as another state property. Rename one of them. Found with "${name}" in store "${id}".`);
      }
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters2[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  if (process.env.NODE_ENV !== "production" && !pinia._e.active) {
    throw new Error("Pinia destroyed");
  }
  const $subscribeOptions = { deep: true };
  if (process.env.NODE_ENV !== "production") {
    $subscribeOptions.onTrigger = (event) => {
      if (isListening) {
        debuggerEvents = event;
      } else if (isListening == false && !store._hotUpdating) {
        if (Array.isArray(debuggerEvents)) {
          debuggerEvents.push(event);
        } else {
          console.error("🍍 debuggerEvents should be an array. This is most likely an internal Pinia bug.");
        }
      }
    };
  }
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!(process.env.NODE_ENV !== "production") || !hot)) {
    pinia.state.value[$id] = {};
  }
  const hotState = ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (process.env.NODE_ENV !== "production") {
      debuggerEvents = [];
    }
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state: state2 } = options;
    const newState = state2 ? state2() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  } : (
    /* istanbul ignore next */
    process.env.NODE_ENV !== "production" ? () => {
      throw new Error(`🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`);
    } : noop
  );
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  const action = (fn, name = "") => {
    if (ACTION_MARKER in fn) {
      fn[ACTION_NAME] = name;
      return fn;
    }
    const wrappedAction = function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name: wrappedAction[ACTION_NAME],
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = fn.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
    wrappedAction[ACTION_MARKER] = true;
    wrappedAction[ACTION_NAME] = name;
    return wrappedAction;
  };
  const _hmrPayload = /* @__PURE__ */ markRaw({
    actions: {},
    getters: {},
    state: [],
    hotState
  });
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state2) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state2);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(process.env.NODE_ENV !== "production" || (process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT ? assign(
    {
      _hmrPayload,
      _customProperties: markRaw(/* @__PURE__ */ new Set())
      // devtools custom properties
    },
    partialStore
    // must be added later
    // setupStore
  ) : partialStore);
  pinia._s.set($id, store);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = runWithContext(() => pinia._e.run(() => (scope = effectScope()).run(() => setup({ action }))));
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (process.env.NODE_ENV !== "production" && hot) {
        hotState.value[key] = toRef(setupStore, key);
      } else if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        pinia.state.value[$id][key] = prop;
      }
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.state.push(key);
      }
    } else if (typeof prop === "function") {
      const actionValue = process.env.NODE_ENV !== "production" && hot ? prop : action(prop, key);
      setupStore[key] = actionValue;
      if (process.env.NODE_ENV !== "production") {
        _hmrPayload.actions[key] = prop;
      }
      optionsForPlugin.actions[key] = prop;
    } else if (process.env.NODE_ENV !== "production") {
      if (isComputed(prop)) {
        _hmrPayload.getters[key] = isOptionsStore ? (
          // @ts-expect-error
          options.getters[key]
        ) : prop;
        if (IS_CLIENT) {
          const getters2 = setupStore._getters || // @ts-expect-error: same
          (setupStore._getters = markRaw([]));
          getters2.push(key);
        }
      }
    }
  }
  assign(store, setupStore);
  assign(toRaw(store), setupStore);
  Object.defineProperty(store, "$state", {
    get: () => process.env.NODE_ENV !== "production" && hot ? hotState.value : pinia.state.value[$id],
    set: (state2) => {
      if (process.env.NODE_ENV !== "production" && hot) {
        throw new Error("cannot set hotState");
      }
      $patch(($state) => {
        assign($state, state2);
      });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    store._hotUpdate = markRaw((newStore) => {
      store._hotUpdating = true;
      newStore._hmrPayload.state.forEach((stateKey) => {
        if (stateKey in store.$state) {
          const newStateTarget = newStore.$state[stateKey];
          const oldStateSource = store.$state[stateKey];
          if (typeof newStateTarget === "object" && isPlainObject(newStateTarget) && isPlainObject(oldStateSource)) {
            patchObject(newStateTarget, oldStateSource);
          } else {
            newStore.$state[stateKey] = oldStateSource;
          }
        }
        store[stateKey] = toRef(newStore.$state, stateKey);
      });
      Object.keys(store.$state).forEach((stateKey) => {
        if (!(stateKey in newStore.$state)) {
          delete store[stateKey];
        }
      });
      isListening = false;
      isSyncListening = false;
      pinia.state.value[$id] = toRef(newStore._hmrPayload, "hotState");
      isSyncListening = true;
      nextTick().then(() => {
        isListening = true;
      });
      for (const actionName in newStore._hmrPayload.actions) {
        const actionFn = newStore[actionName];
        store[actionName] = //
        action(actionFn, actionName);
      }
      for (const getterName in newStore._hmrPayload.getters) {
        const getter = newStore._hmrPayload.getters[getterName];
        const getterValue = isOptionsStore ? (
          // special handling of options api
          computed(() => {
            setActivePinia(pinia);
            return getter.call(store, store);
          })
        ) : getter;
        store[getterName] = //
        getterValue;
      }
      Object.keys(store._hmrPayload.getters).forEach((key) => {
        if (!(key in newStore._hmrPayload.getters)) {
          delete store[key];
        }
      });
      Object.keys(store._hmrPayload.actions).forEach((key) => {
        if (!(key in newStore._hmrPayload.actions)) {
          delete store[key];
        }
      });
      store._hmrPayload = newStore._hmrPayload;
      store._getters = newStore._getters;
      store._hotUpdating = false;
    });
  }
  if ((process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT) {
    const nonEnumerable = {
      writable: true,
      configurable: true,
      // avoid warning on devtools trying to display this property
      enumerable: false
    };
    ["_p", "_hmrPayload", "_getters", "_customProperties"].forEach((p) => {
      Object.defineProperty(store, p, assign({ value: store[p] }, nonEnumerable));
    });
  }
  pinia._p.forEach((extender) => {
    if ((process.env.NODE_ENV !== "production" || false) && !(process.env.NODE_ENV === "test") && IS_CLIENT) {
      const extensions = scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      }));
      Object.keys(extensions || {}).forEach((key) => store._customProperties.add(key));
      assign(store, extensions);
    } else {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (process.env.NODE_ENV !== "production" && store.$state && typeof store.$state === "object" && typeof store.$state.constructor === "function" && !store.$state.constructor.toString().includes("[native code]")) {
    console.warn(`[🍍]: The "state" must be a plain object. It cannot be
	state: () => new MyClass()
Found in store "${store.$id}".`);
  }
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineStore(id, setup, setupOptions) {
  let options;
  const isSetupStore = typeof setup === "function";
  options = isSetupStore ? setupOptions : setup;
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = // in test mode, ignore the argument provided as we can always retrieve a
    // pinia instance with getActivePinia()
    (process.env.NODE_ENV === "test" && activePinia && activePinia._testing ? null : pinia) || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    if (process.env.NODE_ENV !== "production" && !activePinia) {
      throw new Error(`[🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
See https://pinia.vuejs.org/core-concepts/outside-component-usage.html for help.
This will fail in production.`);
    }
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
      if (process.env.NODE_ENV !== "production") {
        useStore._pinia = pinia;
      }
    }
    const store = pinia._s.get(id);
    if (process.env.NODE_ENV !== "production" && hot) {
      const hotId = "__hot:" + id;
      const newStore = isSetupStore ? createSetupStore(hotId, setup, options, pinia, true) : createOptionsStore(hotId, assign({}, options), pinia, true);
      hot._hotUpdate(newStore);
      delete pinia.state.value[hotId];
      pinia._s.delete(hotId);
    }
    if (process.env.NODE_ENV !== "production" && IS_CLIENT) {
      const currentInstance = getCurrentInstance();
      if (currentInstance && currentInstance.proxy && // avoid adding stores that are just built for hot module replacement
      !hot) {
        const vm = currentInstance.proxy;
        const cache = "_pStores" in vm ? vm._pStores : vm._pStores = {};
        cache[id] = store;
      }
    }
    return store;
  }
  useStore.$id = id;
  return useStore;
}
const useAuthStore = /* @__PURE__ */ defineStore("auth", () => {
  const currentUser = ref(null);
  const currentUserGroup = ref(null);
  const sharingToken = ref(null);
  const setCurrentUser = (user) => {
    currentUser.value = user;
  };
  const setCurrentUserGroup = (group) => {
    currentUserGroup.value = group;
  };
  const setSharingToken = (token) => {
    sharingToken.value = token;
    AxiosHelper.setAuthorizationSharedTokenHeader(token);
  };
  const resetAuth = () => {
    AxiosHelper.resetAuthorizationHeader();
    currentUser.value = null;
    currentUserGroup.value = null;
    sharingToken.value = null;
  };
  const fetchLoggedUser = async () => {
    try {
      const user = await HttpService.get(UrlService.render("fetchLoggedUser"));
      setCurrentUser(user);
      setCurrentUserGroup(user.group);
    } catch (e2) {
      console.error("failed: ", e2);
    }
  };
  const acceptCookies = async (userId) => {
    const payload = { accepted_cookies: true };
    try {
      const user = await HttpService.put(
        UrlService.render("userAcceptCookies", { id: userId }),
        payload
      );
      setCurrentUser(user);
    } catch (e2) {
      console.error("acceptCookies failed: ", e2);
      throw e2;
    }
  };
  const logout = async () => {
    resetAuth();
    await SsoService.logout();
  };
  const updateLang = async (payload) => {
    await HttpService.put(UrlService.render("userLang", { id: payload.userId }), {
      lang: payload.lang
    });
    await fetchLoggedUser();
  };
  const isLoggedIn = computed(
    () => sharingToken.value && isGuestUser.value || SsoService.isAuthenticated()
  );
  const isLoggedInSharingMode = computed(() => sharingToken.value && isGuestUser.value);
  const isGuestUser = computed(
    () => currentUser.value && currentUser.value.group.id === GroupService.GUEST
  );
  const isSharingTokenExists = (token) => computed(() => sharingToken.value && sharingToken.value === token);
  const getCurrentUser = computed(() => currentUser.value);
  const getCurrentUserGroupId = computed(() => currentUser.value.group.id);
  const areCookiesAccepted = computed(() => currentUser.value.profile.accepted_cookies);
  const getRouteName = (routeName) => computed(() => sharingToken.value ? `shared_${routeName}` : routeName);
  const hasSharingToken = computed(() => sharingToken.value !== null);
  const getSharingToken = computed(() => sharingToken.value);
  const getUserLang = computed(() => currentUser.value.profile.lang);
  return {
    currentUser,
    currentUserGroup,
    sharingToken,
    setCurrentUser,
    setCurrentUserGroup,
    setSharingToken,
    resetAuth,
    fetchLoggedUser,
    acceptCookies,
    logout,
    updateLang,
    isLoggedIn,
    isLoggedInSharingMode,
    isGuestUser,
    isSharingTokenExists,
    getCurrentUser,
    getCurrentUserGroupId,
    areCookiesAccepted,
    getRouteName,
    hasSharingToken,
    getSharingToken,
    getUserLang
  };
});
const localStorageName = "cs-lang";
const configStorePinia = () => {
  const currentLang = ref(null);
  const i18nInstance = ref(null);
  const _setLang = (lang) => {
    localStorage.setItem(localStorageName, lang);
    i18nInstance.value.global.locale = lang;
    axios.defaults.headers.common["Accept-Language"] = lang;
    document.querySelector("html").setAttribute("lang", lang);
    currentLang.value = lang;
  };
  const initI18n = (i18n) => {
    i18nInstance.value = i18n;
    const lang = localStorage.getItem(localStorageName) || navigator.language.slice(0, 2) || i18n.global.locale.value;
    _setLang(lang);
  };
  const setCurrentLang = (lang) => {
    if (currentLang.value === null) {
      throw Error("You should initialize language with 'initI18n()' first");
    }
    _setLang(lang);
  };
  const setUserLang = (userLang) => {
    if (userLang !== currentLang.value) {
      _setLang(userLang);
    }
  };
  const getCurrentLang = computed(() => currentLang.value);
  const isLangAvailable = (lang) => i18nInstance.value.global.availableLocales.includes(lang);
  const availableLangs = computed(() => i18nInstance.value.global.availableLocales);
  return {
    currentLang,
    _setLang,
    initI18n,
    setCurrentLang,
    setUserLang,
    getCurrentLang,
    isLangAvailable,
    availableLangs
  };
};
const search$3 = { "title": "Select a vehicle", "by_plate": "By plate number", "by_vin": "By VIN number", "by_manual_search": "By manual search", "brand_and_model": "Brand / model", "refine_the_search": "Refine the search", "placeholder": { "plate": "", "vin": "Enter the VIN serial number" }, "button": { "search": "Search", "modify_search": "Edit search", "modify_version": "Edit version", "validate": "Validate", "next": "Next" }, "help": { "velastic": "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, "error": { "number": "Please enter a valid number" }, "pick_version": "Choose a result", "results_for": "results for", "no_results": "No result", "km": "Mileage", "age": "Age", "year": "Year", "month": "Month", "price": "Price", "automatic": "Automatic", "manual": "Manual", "essence": "gasoline", "diesel": "diesel", "electrique": "electric", "gpl": "lpg", "hybride": "hybrid", "horsepower": "Hp", "erase_filters": "Erase filters", "filter": "Filter", "make": "Make", "model": "Model", "energy": "Energy", "version": "Version", "trim_level": "Trim level", "fiscal_hp": "Fiscal power", "all_make": "All", "all_trim_level": "All", "all_version": "All", "all_model": "All", "all_energy": "All" };
const vehicle$3 = {
  search: search$3
};
const rowSelect$3 = { "emptySelect": "List is empty" };
const form$3 = {
  rowSelect: rowSelect$3
};
const date_format$3 = "MMMM d, yyyy";
const datepicker$3 = {
  date_format: date_format$3
};
const en$1 = { vehicle: vehicle$3, form: form$3, datepicker: datepicker$3 };
const search$2 = { "title": "Sélectionnez un véhicule", "by_plate": "Par plaque d'immatriculation", "by_vin": "Par numéro de chassis", "by_manual_search": "Par recherche directe", "brand_and_model": "Marque / modèle", "refine_the_search": "Affinez la recherche", "placeholder": { "plate": "", "vin": "Saisissez le n° de serie VIN" }, "button": { "search": "Rechercher", "modify_search": "Modifier la recherche", "modify_version": "Modifier la version", "validate": "Valider", "next": "Suivant" }, "help": { "velastic": "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, "error": { "number": "Veuillez renseigner un nombre valide" }, "pick_version": "Sélectionnez un des résultats", "results_for": "résultats pour", "no_results": "Aucun résultat", "km": "Kilométrage", "age": "Age", "year": "Année", "month": "Mois", "price": "Prix", "automatic": "Automatique", "manual": "Manuelle", "essence": "essence", "diesel": "diesel", "electrique": "électrique", "gpl": "gpl", "hybride": "hybride", "horsepower": "Cv", "erase_filters": "Effacer les filtres", "filter": "Filtrer", "make": "Marque", "model": "Modèle", "energy": "Énergie", "version": "Version", "trim_level": "Finition", "fiscal_hp": "Puissance fiscale", "all_make": "Toutes", "all_trim_level": "Toutes", "all_version": "Toutes", "all_model": "Tous", "all_energy": "Toutes" };
const vehicle$2 = {
  search: search$2
};
const rowSelect$2 = { "emptySelect": "La liste est vide" };
const form$2 = {
  rowSelect: rowSelect$2
};
const date_format$2 = "d MMMM yyyy";
const datepicker$2 = {
  date_format: date_format$2
};
const fr$1 = { vehicle: vehicle$2, form: form$2, datepicker: datepicker$2 };
const search$1 = { "title": "Seleccione un vehículo", "by_plate": "Por matrícula", "by_vin": "Por número de chasis", "by_manual_search": "Por búsqueda directa", "brand_and_model": "Marca / modelo", "refine_the_search": "Refinar la búsqueda", "placeholder": { "plate": "", "vin": "Introduzca el número de serie del VIN" }, "button": { "search": "Buscar en", "modify_search": "Modificar la búsqueda", "modify_version": "Cambiar la versión", "validate": "Validar", "next": "Siguiente" }, "help": { "velastic": "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, "error": { "number": "Introduzca un número válido" }, "pick_version": "Seleccione uno de los resultados", "results_for": "resultados para", "no_results": "Sin resultados", "km": "Kilometraje", "age": "Edad", "year": "Año", "month": "Mes", "price": "Premios", "automatic": "Automático", "manual": "Manual", "essence": "gasolina", "diesel": "diesel", "electrique": "eléctrico", "gpl": "glp", "hybride": "híbrido", "horsepower": "potencia", "erase_filters": "Borrar filtros", "filter": "Filtro", "make": "Marca", "model": "Modelo", "energy": "Energía", "version": "Versión", "trim_level": "Acabado", "fiscal_hp": "Poder fiscal", "all_make": "Todos", "all_trim_level": "Todos", "all_version": "Todos", "all_model": "Todos", "all_energy": "Todos" };
const vehicle$1 = {
  search: search$1
};
const rowSelect$1 = { "emptySelect": "La lista está vacía" };
const form$1 = {
  rowSelect: rowSelect$1
};
const date_format$1 = "d 'de' MMMM 'de' yyyy";
const datepicker$1 = {
  date_format: date_format$1
};
const es = { vehicle: vehicle$1, form: form$1, datepicker: datepicker$1 };
const search = { "title": "차량 선택", "by_plate": "번호판별", "by_vin": "섀시 번호별", "by_manual_search": "직접 검색으로", "brand_and_model": "제조사/모델", "refine_the_search": "검색 구체화", "placeholder": { "plate": "", "vin": "VIN 일련 번호를 입력합니다." }, "button": { "search": "검색", "modify_search": "검색 수정하기", "modify_version": "버전 변경", "validate": "유효성 검사", "next": "다음" }, "help": { "velastic": "ex: Volkswagen Touran 1.5 TSI EVO Lounge 7 places" }, "error": { "number": "유효한 번호를 입력하세요." }, "pick_version": "다음 결과 중 하나를 선택합니다.", "results_for": "에 대한 결과", "no_results": "결과 없음", "km": "마일리지", "age": "나이", "year": "연도", "month": "월", "price": "수상 경력", "automatic": "자동", "manual": "매뉴얼", "essence": "가솔린", "diesel": "디젤", "electrique": "전기", "gpl": "액화석유가스", "hybride": "하이브리드", "horsepower": "마력", "erase_filters": "필터 삭제", "filter": "필터", "make": "브랜드", "model": "모델", "energy": "에너지", "version": "버전", "trim_level": "완료", "fiscal_hp": "재정 능력", "all_make": "모두", "all_trim_level": "모두", "all_version": "모두", "all_model": "모두", "all_energy": "모두" };
const vehicle = {
  search
};
const rowSelect = { "emptySelect": "목록이 비어 있습니다." };
const form = {
  rowSelect
};
const date_format = "yyyy년 M월 d일";
const datepicker = {
  date_format
};
const ko = { vehicle, form, datepicker };
const fr = { "currency": { "style": "currency", "currency": "EUR" }, "cash_pricing": { "style": "currency", "minimumFractionDigits": 0, "maximumFractionDigits": 0 }, "monthly_pricing": { "style": "currency", "minimumFractionDigits": 2, "maximumFractionDigits": 2 } };
const en = { "currency": { "style": "currency", "currency": "EUR" }, "cash_pricing": { "style": "currency", "minimumFractionDigits": 0, "maximumFractionDigits": 0 }, "monthly_pricing": { "style": "currency", "minimumFractionDigits": 2, "maximumFractionDigits": 2 } };
const numberFormats = {
  fr,
  en
};
const caareaVlibI18n = {
  en: { caareavlib: en$1 },
  fr: { caareavlib: fr$1 },
  es: { caareavlib: es },
  ko: { caareavlib: ko }
};
const datePicker = {
  sanitize(name) {
    return name.replace(/_/g, "-");
  },
  getInputId(name) {
    return `input-${this.sanitize(name)}`;
  },
  getInput(name) {
    return cy.get(`input[id='${this.getInputId(name)}']`);
  },
  getDataCy(name) {
    cy.get(`div[data-cy='${this.sanitize(name)}']`);
  },
  openDropDown(name) {
    this.getInput(name).click();
  },
  getDate(name) {
    return this.getInput(name).invoke("val");
  },
  assertSelectedDateIsNotEmpty(name) {
    this.getDate(name).then((date) => {
      expect(date).not.to.be.empty;
    });
  },
  assertSelectedDateIsEmpty(name) {
    this.getInput(name).then((date) => {
      expect(date).to.be.empty;
    });
  },
  getPreviousMonthButton(name) {
    return cy.get(
      `div[data-cy='${this.sanitize(name)}'] [class*="popout-day"] > [class*="__heading"] button[class*="heading__button__left"]`
    );
  },
  clickPreviousMonth(name) {
    this.getPreviousMonthButton(name).click();
  },
  assertDateInPastCantBeSelected(name) {
    this.openDropDown(name);
    this.getPreviousMonthButton(name).should("be.disabled");
  },
  selectNewDate(name) {
    cy.get('button[class*="element__button__day"]:nth-child(18)').click();
    return this.getDate(name);
  },
  selectYear(year) {
    cy.get(`button[class*="element__button__year"]:nth-child(${year})`).click();
  },
  selectMonth(month) {
    cy.get(`button[class*="element__button__month"]:nth-child(${month})`).click();
  },
  selectDay(day) {
    cy.get(`button[class*="element__button__day"]:nth-child(${day})`).click();
  }
};
const multiselect = {
  _getDataCyLabel(name) {
    return `[data-cy="${name}-select"]`;
  },
  get(name) {
    return cy.get(this._getDataCyLabel(name));
  },
  click(name) {
    this.get(name).click({ force: true });
  },
  getSearchValueInput(name) {
    return cy.get(this._getDataCyLabel(name) + " input");
  },
  typeSearch(name, text) {
    this.click(name);
    this.getSearchValueInput(name).type(text);
  },
  select(name, itemNumber = 1) {
    cy.get(
      this._getDataCyLabel(name) + "  > .multiselect__content-wrapper > .multiselect__content > :nth-child(" + itemNumber + ") > .multiselect__option "
    ).click({ force: true });
  },
  clickAndSelect(name, itemNumber = 1) {
    this.click(name);
    this.select(name, itemNumber);
  },
  assertValueSelected(name, value) {
    cy.get(this._getDataCyLabel(name) + " .multiselect__single").contains(value);
  },
  assertValueMultiSelected(name, value) {
    cy.get(this._getDataCyLabel(name)).contains(value);
  }
};
export {
  AbstractService,
  AlreadyExistsError,
  ArrayService,
  AxiosHelper,
  BENEFICIARY,
  BeneficiaryCriteriaService,
  index as CaareaVlibPlugin,
  Criteria as CriteriaBaseService,
  CriteriaService,
  CurrencyService$1 as CurrencyService,
  DISTRIBUTOR_ADMIN,
  datePicker as DatePickerHelper,
  DateService,
  ErrorPageMixin,
  GUEST,
  GroupService,
  HttpError,
  HttpService,
  INTERNAL_ADMIN,
  INTERNAL_USER,
  ImageMixin,
  multiselect as MultiSelectHelper,
  NumberService,
  ObjectService,
  PricingService$1 as PricingService,
  SELLER_DISTRIBUTOR,
  SsoService,
  StringService,
  UrlService,
  ValidationError,
  apiDelete,
  apiGet,
  apiGetDownload,
  apiPatch,
  apiPost,
  apiPostDownload,
  apiPut,
  auth as authStore,
  caareaVlibI18n,
  numberFormats as caareaVlibI18nNumberFormats,
  config as configStore,
  configStorePinia,
  useAuthStore,
  useImage
};
