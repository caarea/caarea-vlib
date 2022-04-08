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
- To stop using the lib as a local dependency : 
  - in your front project : run `yarn unlink "caarea-vlib"`, then run `yarn install --force` to reinstall the lib. You might have to re-serve your app.
  - in the caarea-vlib project : run `yarn unlink`
    
### Build the lib
- Run : `yarn build`

### Intégration caarea-vlib dans un nouveau projet Caarea

- dans les dépendances du package.json :  ```"caarea-vlib": "git+https://github.com/caarea/caarea-vlib.git#0.7.1",```
- Le css de caarea-vlib utilise du css bootstrap. Installer bootstrap sur le projet. Attention, il ne faut pas utiliser la version 5 de bootstrap. Bootstrap 4.6.0 fonctionne. 
- Installer vue-multiselect : ````"vue-multiselect": "^2.1.6"````
- ajouter le fichier ````vue-multiselect.scss```` dans src>assets>scss
- vérifier la présence de toutes les variables nécessaires dans _variables.scss
- Configurer src/assets/scss/app.scss
  ```scss
  @import "node_modules/bootstrap/scss/functions";
  @import "variables"; // to override bootstrap's variables
  @import "node_modules/bootstrap/scss/variables";
  @import "node_modules/bootstrap/scss/mixins";
  @import "node_modules/bootstrap/scss/bootstrap";
  @import "mixins";
  @import "vue-multiselect";
  ```
  



