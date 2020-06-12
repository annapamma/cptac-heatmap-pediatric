module.exports = {
    root: true,
    parser: "babel-eslint",
    parserOptions: {
        sourceType: "module"
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: "standard",
    // required to lint *.vue files
    plugins: ["html"],
    // add your custom rules here
    rules: {
        // allow paren-less arrow functions
        "arrow-parens": 0,
        // allow async-await
        "generator-star-spacing": 0,
        // allow debugger during development
        "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
        // 4 space indentation
        indent: ["error", 2],
        // Allow extra semicolons
        semi: 0,
        "comma-dangle": ["error", "only-multiline"],
        'space-before-function-paren': ["error", "never"]
    },
    globals: {
        API_ROOT: 'readonly'
    }
};