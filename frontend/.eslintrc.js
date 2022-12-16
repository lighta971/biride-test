module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module",
        "project": "tsconfig.json",
        "tsconfigRootDir": __dirname,
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
         "react/react-in-jsx-scope": "off",
    },
    ignorePatterns: ['.eslintrc.js']
}
