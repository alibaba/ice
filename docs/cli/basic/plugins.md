---
title: 插件配置
order: 3
---

插件配置由配置文件 `ice.config.js` 中提供的 `plugins` 字段来配置插件列表。

## plugins

* 类型：`Array`
* 默认值：`[]`

插件数组项指向插件的路径，可以是npm依赖，相对路径、绝对路径或插件方法。如果是相对路径，会从项目根目录进行查找

```js
// ice.config.js
const icePluginMonaco = require('ice-plugin-monaco');

module.exports = {
  plugins: [
    // npm依赖
    'ice-scripts-plugin-antd',
    // 相对路径
    './plugins/custom-plugin',
    // 方法
    icePluginMonaco,
  ]
}
```

如果插件对应参数，则可以通过数组的形式配置

```js
module.exports = {
  plugins: [
    // 数组第一项为插件，第二项为参数
    ['ice-plugin-fusion', {
       themePackages: []
    }],
  ]
}

```

## 官方插件

### ice-scripts-plugin-antd

#### 功能

- antd组件按需加载
- 主题定制能力

#### 如何使用

```bash
$ npm i --save-dev ice-scripts-plugin-antd
```

Options：
- `themeConfig`: 设置替换主题颜色


```js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-antd', {
      themeConfig: {
        'primary-color': '#1DA57A',
        'link-color': '#1DA57A',
        'border-radius-base': '2px',
      }
    }]
  ]
}
```

### ice-scripts-plugin-component

#### 功能

- 支持组件模块开发 dev & build
- 支持接入 Fusion Cool & 设计板块的组件构建

#### 如何使用

```bash
$ npm i --save-dev ice-scripts-plugin-component
```

Options：

- `type`: 默认值 `fusion` ，如无需生成接入 Fusion 相关样式文件，可设置为 `component`

```js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-component', { type: 'fusion' }]
  ]
}
```

更多组件开发相关内容，详见[业务组件开发规范](/docs/cli/advanced/biz-component)

### ice-scripts-plugin-css-assets-local

#### 功能

- 将 CSS 中依赖的资源本地化，例如字体文件等。

#### 如何使用

```bash
$ npm i --save-dev ice-scripts-plugin-css-assets-local
```

Options：

- `outputPath`: 默认值： `assets` 提取后的文件目录前缀
- `relativeCssPath`: 默认值： `../` 提取的文件后相对于 CSS 的路径

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-css-assets-local', {
      outputPath: 'assets',
      relativeCssPath: '../'
    }]
  ]
}
```

### ice-scripts-plugin-fusion

#### 功能

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

#### 如何使用

```bash
$ npm i --save-dev ice-scripts-plugin-fusion
```

Options：

- `themePackage`: 主题包
- `themeConfig`: 主题配置
- `uniteBaseComponent`: 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码（社区用户无需关心该问题）


```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
      themeConfig: {
        // 自定义 css prefix，需要配合 ConfigProvider 更改 js 的 prefix
        nextPrefix: 'nextfd-',
        // 根据配置推导主品牌色
        primaryColor: '#f60',
        // 根据配置推导次品牌色，仅组件 0.x 版本支持
        secondaryCorlor: '#f60',
        // 覆盖 scss 原始变量
        'font-size-body-1': '14px',
      },
      // @icedesign/base | @alife/next | @ali/ice -> @alife/next
      uniteBaseComponent: '@alife/next'
    }]
  ]
}
```

更多主题配置，详见[配置项目主题](/docs/cli/basic/theme)

### ice-scripts-plugin-multi-pages

#### 功能

- 构建传统的多页应用，默认会将 `src/pages/*/index.js` 作为 entry，每个 page 都会作为一个 entry，以 pageName 构建多个同名 HTML 文件。

#### 如何使用

```bash
$ npm i --save-dev ice-scripts-plugin-multi-pages
```

Options：

- `getEntryName{function}`: 自定义 entry name，默认取小写的 `src/pages/*/index.js` 文件夹名称。


```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-scripts-plugin-multi-pages', {
      // customize entry name
      // BasicCharts => basic_charts
      getEntryName: (pageName) => _.snakeCase(pageName);
    }]
  ]
}
```
