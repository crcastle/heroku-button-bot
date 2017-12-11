module.exports = {
  env: {
    'node': true
  },
  extends: ['eslint:recommended', 'prettier'], // extending recommended config and config derived from eslint-config-prettier
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module', // es6 import/export
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        'singleQuote': true,
        'trailingComma': 'all'
      }
    ],
    'eqeqeq': ['error', 'always']
  },
  parser: 'babel-eslint', // class properties
  plugins: ['prettier'], // activating esling-plugin-prettier (--fix stuff)
};
