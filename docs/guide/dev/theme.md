---
title: 主题配置
order: 7
---

> 该能力需要满足项目依赖的基础组件为 `@alifd/next`，如果依赖的是 `@icedesign/base` 请参考 [这篇文档](https://www.yuque.com/ice-team/wiki/cur1z3)

Fusion 组件默认的主题是蓝色系，无法满足所有项目的需求，因此我们通过工程方式支持一键换肤的能力。有两种方式配置主题：

- 配置主题包方式
- 配置变量方式

**注意两种方案不能同时使用，请按需选择其一。**

## 方式一：配置主题包

### 选择主题包

主题包即一个 npm 包，包里面对应的是一堆主题变量。ICE 官方提供了几套不同颜色的主题包，分别是：

- 默认的蓝色主题：`@icedesign/theme`
- 橙色主题：`@alifd/theme-ice-orange`
- 绿色主题：`@alifd/theme-ice-green`
- 紫色主题：`@alifd/theme-ice-purple`

如果这几个不能满足需求，可以在 ICE 群里反馈由官方来支持，也可以通过更自由的方式自行配置：[配置组件主题样式](https://fusion.design/help.html#/design-config-component)。注意：如果需要自行配置主题，推荐让专业的设计师同学来做。

![](https://img.alicdn.com/tfs/TB1y78lECzqK1RjSZPxXXc4tVXa-1768-702.png)

### 安装主题包

```bash
# 项目/模板安装在 dependencies 里
npm install @icedesign/theme --save
# 区块/组件安装在 devDependencies 里
npm install @icedesign/theme --save-dev
```

注意区块/组件的主题包仅在开发区块/组件时有效，将区块引入到项目之后，最终以项目配置的主题包为准。

### 配置主题包

> ice-scripts 版本 2.0.0 以上，1.x 版本请使用 buildConfig.theme 的配置方式

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }]
  ]
}
```

然后重新 dev 即可生效。

### 使用主题包里的自定义 Icon

> 构建工具使用 ice-scripts 才能使用这个能力

在配置主题时，可以通过 iconfont 导入一些自定义的 icon，这些 icon 在项目代码里通过基础组件 Icon 即可使用：

```jsx
import { Icon } from 'react';

<Icon type="xxxx" />
```

## 方式二：配置 scss 变量

> ice-scripts 版本 2.0.0 以上，1.x 版本请使用 themeConfig 的配置方式

```js
// ice.config.js
module.exports = {
  plugins: [
    ['ice-plugin-fusion', {
      themeConfig: {
        // 根据配置推导主品牌色
        primaryColor: '#f60',
        // 覆盖 scss 原始变量
        'font-size-body-1': '14px',
      },
    }]
  ]
}
```

重新 dev 即可生效。

## 使用主题变量

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

按照这个步骤之后，在项目构建时，就会用开发者配置的主题包覆盖掉默认变量，实现一键换肤的能力。

### 常用变量说明

虽然 Design Tokens 提供了大量变量，但实际场景里用到的非常有限，这里介绍几个重点的变量：

- `$color-brand1-6`: 品牌主色
- `$color-brand1-9`: 深一点的品牌主色，常用来 hover 效果
- `$color-brand1-1`: 非常浅的品牌主色，常用来支持背景颜色
- 持续完善……