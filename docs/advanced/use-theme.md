---
title: 配置项目主题
order: 9
category: 进阶指南
---

> 该能力需要满足项目依赖的基础组件为 `@alifd/next`，如果依赖的是 `@icedesign/base` 请参考 [这篇文档](https://github.com/alibaba/ice/wiki/0.x-theme)

飞冰（ICE）默认的主题是蓝色系，无法满足所有项目的需求，因此我们通过工程方式支持一键换肤的能力。有两种方式配置主题：

- 配置主题包方式
- 配置变量方式

**注意两种方案不能同时使用，请按需选择其一。**

## 配置主题包方式

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

在 `package.json` 里配置对应主题包：

```json
// package.json
{
  "buildConfig": {
    "theme": "@icedesign/theme"
  }
}
```

然后重新 dev 即可生效。

## 配置变量方式

在 `package.json` 里配置主品牌色：

```json
// package.json
{
  "themeConfig": {
    "primary-color": "#f60"
  }
}
```

然后重新 dev 即可生效。