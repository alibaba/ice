---
title: ice-plugin-fusion
order: 1
---

`ice-plugin-fusion` 是 Fusion UI 体系开发下必不可少的插件，本文将详细介绍插件具体用法。

## 功能

- 组件按需加载
- 组件（包含业务组件）样式自动引入
- 主题定制能力
- 多个不同包名的基础组件统一

## 如何使用

```bash
$ npm i --save-dev ice-plugin-fusion
```

Options：

- `themePackage`: 主题包
- `themeConfig`: 主题配置
- `uniteBaseComponent`: 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码（社区用户无需关心该问题）


```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
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

## 配置项目主题

> 该能力需要满足项目依赖的基础组件为 `@alifd/next`，如果依赖的是 `@icedesign/base` 请参考 [这篇文档](https://www.yuque.com/ice-team/wiki/cur1z3)

飞冰（ICE）默认的主题是蓝色系，无法满足所有项目的需求，因此我们通过工程方式支持一键换肤的能力。有两种方式配置主题：

- 配置主题包方式
- 配置变量方式

**注意两种方案不能同时使用，请按需选择其一。**

### 方式一：配置主题包

#### 选择主题包

主题包即一个 npm 包，包里面对应的是一堆主题变量。ICE 官方提供了几套不同颜色的主题包，分别是：

- 默认的蓝色主题：`@icedesign/theme`
- 橙色主题：`@alifd/theme-ice-orange`
- 绿色主题：`@alifd/theme-ice-green`
- 紫色主题：`@alifd/theme-ice-purple`

如果这几个不能满足需求，可以在 ICE 群里反馈由官方来支持，也可以通过更自由的方式自行配置：[配置组件主题样式](https://fusion.design/help.html#/design-config-component)。注意：如果需要自行配置主题，推荐让专业的设计师同学来做。

![](https://img.alicdn.com/tfs/TB1y78lECzqK1RjSZPxXXc4tVXa-1768-702.png)

#### 安装主题包

```bash
# 项目/模板安装在 dependencies 里
npm install @icedesign/theme --save
# 区块/组件安装在 devDependencies 里
npm install @icedesign/theme --save-dev
```

注意区块/组件的主题包仅在开发区块/组件时有效，将区块引入到项目之后，最终以项目配置的主题包为准。

#### 配置主题包

在 `ice.config.js` 添加 `ice-plugin-fusion` 并配置对应主题包：

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
    }]
  ]
}
```

然后重新 dev 即可生效。

#### 使用主题包里的自定义 Icon

在配置主题时，可以通过 iconfont 导入一些自定义的 icon，这些 icon 在项目代码里通过基础组件 Icon 即可使用：

```jsx
import { Icon } from 'react';

<Icon type="xxxx" />
```

注意：工程工具使用 ice-scripts 才能使用这个能力

### 方式二：配置 scss 变量

在 `ice.config.js` 添加 `ice-plugin-fusion` 并配置主品牌色：

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      // 主题包
      themePackage: '@icedesign/theme',
      themeConfig: {
        primaryColor: '#f60',
      },
    }]
  ]
}
```

然后重新 dev 即可生效。

### 使用主题变量

无论是组件、区块、模板还是业务项目里，只要在代码里正确的使用主题变量，就可以通过主题包的配置实现一键换肤。

#### 使用主题中的变量

在对应 sass 文件中，先通过 `@import` 方式引入变量文件，然后使用其中的 sass 变量即可：

```scss
// 引入主题变量
@import "~@alifd/next/variables.scss";

// 使用主题变量
.title {
  color: $color-brand1-6;
}
```

可以使用的变量列表请参考 [fusion.design Design Tokens](https://fusion.design/component/tokens)。

按照这个步骤之后，在项目构建时，就会用开发者配置的 `buildConfig.theme` 包里对应变量覆盖掉默认变量，实现一键换肤的能力。

### 常用变量说明

虽然 Design Tokens 提供了大量变量，但实际场景里用到的非常有限，这里介绍几个重点的变量：

- `$color-brand1-6`: 品牌主色
- `$color-brand1-9`: 深一点的品牌主色，常用来 hover 效果
- `$color-brand1-1`: 非常浅的品牌主色，常用来支持背景颜色
- 持续完善……