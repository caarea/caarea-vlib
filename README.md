# caarea-vlib

## Project setup
```bash
yarn install
```

### Compiles and hot-reloads for development
```bash
yarn serve
```

### Compiles and minifies for production
```bash
yarn build
```

### Lints and fixes files
```bash
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Traductions

Ajouter les traductions dans le dossier i18n. 

Pour que les traductions fonctionnent il faut:
- Prefixer par caareavlib les clefs : ex: `{{ $t("caareavlib.vehicle.search.button.search") }}`
- Dans l'application utilisant la lib, il faut importer les fichiers de traduction

ex: `src/i18n/fr/index.js`
```javascript
import login from "./views/login.json"
import button from "./button.json"
...
import caareavlib from "../../../node_modules/caarea-vlib/src/i18n/fr"

export default {
  button,
  login,
  ...
  caareavlib,
}
```

### Use Caarea-vlib in dev mode

- Clone the caarea-vlib project on your computer
- Build the lib : `yarn build`
- Once setup / README is done, run `yarn link`
- Then, in your front project, run `yarn link "caarea-vlib"` to use it as a local dependency
- To stop using the lib as a local dependency, run `yarn unlink "caarea-vlib"`

### Build the lib
- Run : `yarn build`