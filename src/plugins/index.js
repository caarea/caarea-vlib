import * as components from "./components"
export * from "./components"

function install(app, options) {
  if (!options || (!"i18n_translate") in options) {
    throw new Error(
      "CaareaVlibPlugin error: i18n_translate is not defined, please provide it in options" +
        " (ex: app.use(CaareaVlibPlugin, { i18n_translate: i18n.global.t }))",
    )
  }
  // BeneficiaryCriteriaService.setI18n(options.i18n_translate)
  app.provide("i18n", options.i18n_translate)
  for (const key in components) {
    app.component(key, components[key])
  }
}

export default { install }
