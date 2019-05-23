---
title: AppLink
order: 7
---

子应用内部跳转使用，替代 React Router 的 `Link` 组件，表示本次跳转可能需要重新加载静态资源，包含如下 props

## to

- 标识目标路径，同 `Link` 中的 `to` 保持一致 ，必填
- 类型：`string`
- 默认值：`-`

## message

- 表示当前跳转需要弹窗确认，message为提示文案内容，选填
- 类型：`string`
- 默认值：`-`
