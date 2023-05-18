module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'linebreak-style': 0,
    'react/function-component-definition': [
      <enabled />,
      {
        namedComponents:
          'function-declaration' |
          'function-expression' |
          'arrow-function' |
          (Array < 'function-declaration') |
          'function-expression' |
          'arrow-function',
        unnamedComponents:
          'function-expression' |
          'arrow-function' |
          (Array < 'function-expression') |
          'arrow-function',
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.js', '**/*.spec.js'] },
    ],
  },
};
