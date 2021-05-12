module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:prettier/recommended",
    "@vue/prettier",
    "plugin:cypress/recommended",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  ignorePatterns: "dist/*",
  rules: {
    semi: [2, "never"],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": "off",
    "vue/require-prop-types": "off",
    "vue/require-default-prop": "off",
    "prettier/prettier": ["error", { semi: false }],
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true,
      },
    },
  ],
}
