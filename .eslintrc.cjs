module.exports = {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: ["@nuxt/eslint-config", "plugin:prettier/recommended"],
  rules: {
    "vue/no-multiple-template-root": "off",
  }
};
