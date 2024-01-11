module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Ajouté pour prendre en charge l'environnement Node.js
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended', // Ajouté pour les recommandations TypeScript
    'prettier',
  ],
  parser: '@typescript-eslint/parser', // Utilisez le parseur de TypeScript
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', '@typescript-eslint'], // Ajout du plugin TypeScript
  rules: {
    'react/prop-types': 0,
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn'], // Utilisez la règle TypeScript pour les variables non utilisées
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'], // Ajout de glob patterns pour les fichiers TypeScript
      rules: {
        'no-undef': 'off', // Désactiver cette règle pour TypeScript
      },
    },
  ],
};
