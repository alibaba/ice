---
title: 使用 Fusion 组件
order: 4
---

项目开发中如果使用 `@alifd/next` 作为基础 UI 组件，可以通过 `build-plugin-fusion` 插件实现组件按需加载和样式主题等相关能力，飞冰官方的模板都是基于 Fusion 组件的，因此一般不需要开发者再手动引入。

## 安装插件

```bash
$ npm install build-plugin-fusion --save-dev
```

## 插件配置

* `themePackage` Fusion 组件主题包配置，如果设置为数组则启动多主题能力
* `themeConfig` 主题配置，通过设置 sass 变量对现有主题进行覆盖
* `uniteBaseComponent` 如果项目里依赖了多个不同名称的基础包，可以通过 uniteBaseComponent 来统一基础包，减少重复的代码
* `nextPrefix`  Fusion 组件样式 prefix，一般情况下需要配合入口代码的 `ConfigProvider` 使用，可以将所有的 className 改掉
* `importOptions` 同 `babel-plugin-import` 参数，默认为 `{ style: true, libraryDirectory: 'es'}` 根据用户设置项将进行合并

## 基础用法

配置主题包：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": "@icedesign/theme",
      "nextPrefix": "nextfd-",
      "uniteBaseComponent": "@alife/next"
    }]
  ]
}
```

修改主题变量，注意不能跟主题包功能同时使用，[原因](https://github.com/alibaba/ice/pull/1435#issuecomment-460055905)：

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themeConfig": {
        "primaryColor": "#f60",
        "font-size-body-1": "14px"
      }
    }]
  ]
}
```

## 使用主题包

Fusion 组件默认的主题是蓝色系，无法满足所有项目的需求，因此我们通过工程方式支持一键换肤的能力。

### 选择主题包

主题包即一个 npm 包，包里面对应的是一堆主题变量。ICE 官方提供了几套不同颜色的主题包，分别是：

- 默认的蓝色主题：`@alifd/theme-design-pro`
- 橙色主题：`@alifd/theme-ice-orange`
- 绿色主题：`@alifd/theme-ice-green`
- 紫色主题：`@alifd/theme-ice-purple`

如果这几个不能满足需求，可以在 ICE 群里反馈由官方来支持，也可以通过更自由的方式自行配置：[配置组件主题样式](https://fusion.design/help.html#/design-config-component)。注意：如果需要自行配置主题，推荐让专业的设计师同学来做。

![](https://img.alicdn.com/tfs/TB1y78lECzqK1RjSZPxXXc4tVXa-1768-702.png)

### 使用主题包里的自定义 Icon

在配置主题时，可以通过 iconfont 导入一些自定义的 icon，这些 icon 在项目代码里通过基础组件 Icon 即可使用：

```jsx
import { Icon } from 'react';

<Icon type="xxxx" />
```

### 使用主题变量

在项目中也可以使用主题包的变量，这样未来如果需要更换主题，业务代码就不需要做任何改动了，可以使用的变量列表请参考 [fusion.design Design Tokens](https://fusion.design/component/tokens)，使用方式如下：

```scss
// 引入主题变量
@import "~@alifd/next/variables.scss";

// 使用主题变量
.title {
  color: $color-brand1-6;
}
```

## 动态切换主题

build-plugin-fusion 结合 fusion 自身可以配置主题包的能力，支持多个主题包的配置，大大简化多主题切换的成本，通过 css 变量能力实现动态主题的切换，核心实现思路如下：
1. 提取主题包中的 scss 变量（色值变量）
2. 将 scss 变量具体内容转换为 css 变量，即 `$color-brand1-1: #E2EDFF; => $color-brand1-1: var(--color-brand-1);`
3. 注入新的 scss 变量值（如 `$color-brand1-1: var(--color-brand-1)` ）进行编译
4. 在 window 下注入 `__changeTheme__` 方法，实现不同主题包全局 css 变量声明的切换

```json
{
  "plugins": [
    ["build-plugin-fusion", {
      "themePackage": [{
        "name": "@icedesign/theme",
        "default": true,
        "themeConfig": {
          "custom-color": "#000"
        }
      }, {
        "name": "@alifd/theme-ice-purple",
        "themeConfig": {
          "custom-color": "#fff"
        }
      }]
    }]
  ]
}
```

通过数组的方式配置多个主题，实现多主题内容的注入。
build.json 中完成多主题包配置后，业务代码中可以直接调用 `__changeTheme__` 方法在多个主题包之间进行切换：

```js
// 可以在设置的主题包 @icedesign/theme 和 @alifd/theme-ice-purple 之间切换
window.__changeTheme__('@alifd/theme-ice-purple');
```
