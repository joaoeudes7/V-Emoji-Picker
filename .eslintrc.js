module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: [ 'plugin:vue/essential', '@vue/typescript' ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
