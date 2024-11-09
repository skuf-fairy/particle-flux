module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    createDefaultProgram: true,
  },
  env: {
    node: true,
    jest: true,
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'error',
  },
  ignorePatterns: ['node_modules', 'lib'],
  overrides: [
    {
      files: ['*.ts'],
      rules: {
        '@typescript-eslint/no-var-requires': 'error',
        '@typescript-eslint/unbound-method': 'error',
      },
    },
  ],
};
