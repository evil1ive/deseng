const path = require("path")

module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        sourceType: "module",
    },
    extends: [path.resolve("../../.eslintrc.cjs")],
    root: false,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: [".eslintrc.js"],
}
