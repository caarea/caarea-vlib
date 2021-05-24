import * as components from "./components"

const CaareaVlib = {
  install(Vue, options = {}) {
    // components
    for (const componentName in components) {
      const component = components[componentName]
      Vue.component(component.name, component)
    }
  },
}

export default CaareaVlib

if (typeof window !== "undefined" && window.Vue) {
  window.Vue.use(CaareaVlib)
}
