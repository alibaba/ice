# eslint-reporting-webpack-plugin

> A friendly ESLint reporting plugin for webpack.

## Install

```bash
npm install eslint-reporting-webpack-plugin
```

## Usage

In your webpack configuration:

```js
const ESLintReportingPlugin = require('eslint-reporting-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintReportingPlugin()],
  // ...
};
```

The ESLint error and warning are blocking hot update when [eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin) is used.

We provide a friendly way to show eslint reporting, like:

![img](https://img.alicdn.com/tfs/TB1R2wv1oY1gK0jSZFMXXaWcVXa-584-166.png)

**Show the changed file ESLint result.**

We hope to provide you a plugin that has the least impact with project building. 
This plugin is only run ESLint after the project is complete compiled.

PS: Used ESLint rules and config is base on your project `.eslintrc.*` setting.

Enjoy!
