import * as components from "./components"
import { BeneficiaryCriteriaService, PricingService } from "src"

function install(app, options) {
  if (!options || (!"i18n_global") in options) {
    throw new Error(
      "CaareaVlibPlugin error: i18n_global is not defined, please provide it in options" +
        " (ex: app.use(CaareaVlibPlugin, { i18n_global: i18n.global }))",
    )
  }
  BeneficiaryCriteriaService.setI18n(options.i18n_global)
  PricingService.setI18n(options.i18n_global)
  app.provide("i18n", options.i18n_global.t)
  for (const key in components) {
    // console.log("register", key, components[key])
    app.component(key, components[key])
  }
}

export default { install }
