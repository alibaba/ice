---
title: 代码质量保障
order: 11
---

为了保证代码质量，我们推荐使用 lint 相关的工具对代码进行检测，同时为了降低常规 lint 工具的使用成本，我们封装了 [@ice/spec](https://github.com/ice-lab/spec) 这个 npm 包。

## 安装依赖

安装必要的工具依赖：

```bash
$ npm i eslint stylelint @commitlint/cli @ice/spec --save-dev
```

## 引入配置文件

### eslint

eslint 用来检测 js 代码的风格，新建配置文件 `.eslintrc.js` 引入 lint 规则：

```js
const { eslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(eslint, {
  rules: {
    // custom rules
  }
});
```

### tslint

如果你的项目使用的是 TypeScript，则引入 ts 相关 lint 规范即可：

```js
// .eslintrc.js
const { tslint } = require('@ice/spec');

module.exports = deepmerge(tslint);
```

### stylint

stylelint 用来检测样式代码的风格，新建配置文件 `.stylelintrc.js` 引入 lint 规则：

```js
const { stylelint } = require('@ice/spec');

module.exports = stylelint;
```

### commitlint

用于规范 commit message 的规范，防止全是 `fix` 这种无意义的 commit message 导致历史记录追溯比较麻烦，新建配置文件 `.commitlintrc.js` 引入 lint 规则：

```js
const { commitlint } = require('@ice/spec');

module.exports = commitlint;
```

## 配置命令行

通过 `npm scripts` 配置命令：

```json
// package.json
"scripts": {
  "lint": "npm run eslint && npm run stylelint",
  "eslint": "eslint --cache --ext .js,.jsx ./",
  "stylelint": "stylelint ./**/*.scss"
}
```

这样通过 `npm run lint` 就可以运行 lint 任务了。

## 流程保证

为了保证以上检测能力的有效执行，推荐通过在执行 git 命令时（Git hooks）强制运行检测任务来保证，这里推荐 [husky](https://github.com/typicode/husky) 这个工具。首先安装依赖：

```bash
$ npm install husky --save-dev
```

在 `package.json` 里配置 Git hooks：

```json
"husky": {
  "hooks": {
    // git commit 时校验 commit message
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
    // git push 时校验代码规范
    "pre-push": "npm run lint"
  }
}
```
