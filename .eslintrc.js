module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'linebreak-style': 'off',
    'react/react-in-jsx-scope': 'off',
    "react/function-component-definition": ['error', {
      "namedComponents": "arrow-function",
      "unnamedComponents": "arrow-function"
    }],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'max-len': 'off',
    'import/no-cycle': 'off',
  }
}