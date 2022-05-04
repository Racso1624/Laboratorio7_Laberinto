module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
  },
  plugins: [
    'react',
  ],
  rules: {
    semi: ["error", "never"],
    "linebreak-style": 0,
    quotes: ["error", "double"],
    "react/jsx-equals-spacing" : "off",
    "react/react-in-jsx-scope" : "off",
    "react/jsx-filename-extension" : "off",
  },
};
