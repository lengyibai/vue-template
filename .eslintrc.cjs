module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["import"],
  rules: {
    eqeqeq: "error", //要求使用 === 和 !==
    "no-var": "warn", //不允许使用 var 关键字
    "prefer-const": "warn", //要求使用 const 声明那些声明后不再被修改的变量
    "vue/multi-word-component-names": "off",

    "@typescript-eslint/no-var-requires": "warn", //不允许使用 require() 函数导入模块
    "@typescript-eslint/no-unused-vars": "warn", //不允许定义未使用的变量
    "@typescript-eslint/ban-types": "off", //禁止使用指定的类型
    "@typescript-eslint/no-explicit-any": "off", //禁止使用any类型
    "@typescript-eslint/no-namespace": "off", //不允许在ts文件中使用命名空间
    "@typescript-eslint/no-this-alias": "off", //禁止使用this别名
    "@typescript-eslint/ban-ts-comment": "off", //禁止在ts文件中使用// @ts-ignore
    "vue/no-v-html": "off",

    //import排序
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
      },
    ],
  },
};
