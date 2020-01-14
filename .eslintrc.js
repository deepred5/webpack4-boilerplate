module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": ['airbnb', 'prettier', 'plugin:compat/recommended'],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'react/jsx-filename-extension': [1, { extensions: ['.js', 'jsx'] }],
        'import/no-unresolved': [2, { ignore: ['^@/'] }],
        "import/no-extraneous-dependencies": 0,
        'import/extensions': 0,
        'react/prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-no-bind': 1,
        'react/static-property-placement': ['warn', 'static public field'],
        "no-console": 1,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'compat/compat': 1,
        'react/prefer-stateless-function': 1
    }
};