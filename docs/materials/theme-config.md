---
title: 支持主题能力
order: 9
category: 物料
---

飞冰（ICE）提供了主题配置能力、，以满足业务和品牌多样化的视觉需求，包括但不限于主色、圆角、边框等的视觉自定义配置。无论是组件、区块、模板还是业务项目里，只要在代码里正确的使用主题变量，就可以通过主题包的配置实现一键换肤。

如果项目里有更换主题的需求，请参考文档 [使用主题能力](#/docs/advanced/use-theme)。本文重点介绍区块、组件、模板如何才能支持主题能力。

## 使用主题中的变量

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

## 常用变量说明

虽然 Design Tokens 提供了大量变量，但实际场景里用到的非常有限，这里介绍几个重点的变量：

- `$color-brand1-6`: 品牌主色
- `$color-brand1-9`: 深一点的品牌主色，常用来 hover 效果
- `$color-brand1-1`: 非常浅的品牌主色，常用来支持背景颜色
- 持续完善……