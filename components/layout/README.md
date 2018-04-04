---
title: Layout
category: Components
chinese: 页面布局
cols: 1
---

提供页面框架性的 Layout 以及基础区块布局，除了 `Layout.Main` 必须以外, 其它的组件在页面中可以按需自由搭配使用。

## Layout

`import Layout from '@icedesign/layout';`

页面布局，一个页面有且只能有一个 `Layout` 组件。

### 参数（props）

| 参数名      | 说明           | 类型      | 默认值     |
|:---------|:-------------|:--------|:--------|
| fixable | 开启布局模块滚动跟随模式 | boolean | `false` |

`fixable` 一旦设置为 `true` 则整个页面所有模块都固定高度，内容区域不可滚动。子组件通过 `scrollable` props 使其可滚动，以此实现主体内容滚动，其余模块 fixed 的效果。

## Layout.Section

辅助布局组件，会创建 100% 宽度的一整行。当某一块区域需要两个模块左右排列，则需要使用 `Layout.Section` 组件包裹。

如：

`````html
<Layout.Section>
  <Layout.Aside />
  <Layout.Main />
</Layout.Section>
`````

### 参数（props）

| 参数名        | 说明                                        | 类型      | 默认值     |
|:-----------|:------------------------------------------|:--------|:--------|
| scrollable | 区域可滚动 *(`<Layout fixable={true} />` 下可用)* | boolean | `false` |

## Layout.Header

顶部布局，默认内部元素居中对其。

### 参数（props）

| 参数名        | 说明            | 类型     | 默认值      |
|:-----------|:--------------|:-------|:---------|
| alignItems | 内部元素垂直对其方式    | string | `center` |
| theme      | 配置 Header 皮肤色 | string | -        |

- alignItems：`flex-start` `flex-end` `center` `baseline` `stretch`
- theme：`dark, light`

## Layout.Aside

侧边栏，根据嵌套顺序，可左右布局。

### 参数（props）

| 参数名   | 说明            | 类型            | 默认值   |
|:------|:--------------|:--------------|:------|
| width | 展开状态下的宽度      | number/string | `200` |
| theme | 配置 Aside 皮肤色 | string        | -     |

- theme：`dark, light`

## Layout.Main

### 参数（props）

| 参数名        | 说明                                        | 类型      | 默认值     |
|:-----------|:------------------------------------------|:--------|:--------|
| scrollable | 区域可滚动 *(`<Layout fixable={true} />` 下可用)* | boolean | `false` |

主体内容。

## Layout.Footer

页脚布局。
