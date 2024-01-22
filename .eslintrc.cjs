module.exports = {
    root: true,
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint/eslint-plugin", "simple-import-sort", "prettier"],
    rules: {
        "simple-import-sort/imports": [
            "error",
            {
                groups: [
                    ["^react", "^@?\\w"],
                    ["^@nestjs(/.*|$)", "^@?\\w"],
                    ["^(@|components)(/.*|$)"],
                ],
            },
        ],
        "simple-import-sort/exports": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
    },
}
