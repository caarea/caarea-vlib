import * as components from "./index"
export * from "./index"

export default {
  install: (app) => {
    for (let c in components) {
      app.use(components[c])
    }
  },
}
