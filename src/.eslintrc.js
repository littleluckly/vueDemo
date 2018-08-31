module.exports={
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "@vue/standard"
    ],
    "rules": {
        "no-cond-assign": "error",
        "no-var": "error",
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        // @fixable 一个缩进必须用四个空格替代
        'indent': [
            'error',
            4,
            {
                SwitchCase: 1,
                flatTernaryExpressions: true,
                VariableDeclarator: 2
            }
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "semi": [
            "warn",
            "always"
        ],
        "linebreak-style": "off",
        "no-mixed-spaces-and-tabs": "off",
        "no-unused-vars": "warn",
        "no-useless-escape": "warn",
        "no-case-declarations": "warn",
    },
    "parserOptions": {
      "parser": "babel-eslint"
    }
}