module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    },
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'import'
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  // 0: off   1: warn   2: error
  rules: {
    'array-bracket-spacing': [1, 'always'],
    'array-callback-return': 2,
    'arrow-spacing': [1, { before: true, after: true }],
    'object-curly-spacing': [1, 'always'],
    'block-scoped-var': 2,
    'block-spacing': [1, 'always'],
    'camelcase': [1, { properties: 'always' }],
    'comma-spacing': [1, { before: false, after: true }],
    'consistent-return': 2,
    'eqeqeq': [1, 'always'],
    'for-direction': 2,
    'guard-for-in': 2,
    // 'indent': [1, 2],
    "@typescript-eslint/indent": [1, 2],
    'jsx-quotes': [1, 'prefer-double'],
    'key-spacing': [1, { beforeColon: false, afterColon: true }],
    'prefer-const': 1,
    // 'quotes': [1, 'single'],
    'no-unused-vars': 0,

    'react/react-in-jsx-scope': 0,
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-unescaped-entities': 0
  //   'sort-imports': [1, {
  //     'ignoreCase': false,
  //     'ignoreMemberSort': false,
  //     'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single']
  // }]
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      }
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx', '.d.ts'],
    },
    react: {
      version: "detect"
    }
  },
  globals: {
    NODE_ENV: true,
    ASSET_PATH: true,
    API_ADAPTOR: true,
    ResponseData: true,
    ResponseNormalError: true,
    ResponseFormError: true
  }
};