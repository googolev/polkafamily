module.exports = {
  extends: [
      // add more generic rulesets here, such as:
      // 'eslint:recommended',
      'plugin:vue/recommended'
  ],
  parserOptions: { parser: 'babel-eslint' },
  rules: {
      // override/add rules settings here, such as:
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/prop-name-casing': 'off',
      'vue/no-parsing-error': 'off',
  }
}