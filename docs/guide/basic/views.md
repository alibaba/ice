---
title: 视图配置
order: 3
---

React 核心特点之一就是通过组件化构成复杂的 UI 界面，如下图所示页面均是由不同的组件组合而成，这很好的解决了页面之间的复用和对一个大型应用进行划分。

在实际开发过程中，除了组件之外构成视图的还有页面配置等内容，框架为页面提供了一些特殊的配置项，进一步对这些进行了约定和规范。

## 页面标题

`title`: 用于配置渲染页面的标题。

> Type: string (default: '')

```tsx
const HomePage = () => {
  return (
    // jsx code...
  )
}

HomePgae.pageConfig = {
  title: 'Home'
}
```

## 页面滚动

`scrollToTop`：用于渲染页面前是否需要将当前页面滚动至顶部，这个配置用于嵌套路由的应用场景。

> Type: Boolean (default: false)

```tsx
const HomePage = () => {
  return (
    // jsx code...
  )
}

HomePage.pageConfig = {
  scrollToTop: true
}
```

## 页面初始数据

`getInitialProps`: 用于设置页面的初始数据。

```tsx
const HomePage = () => {
  return (
    // jsx code...
  )
}

HomePage.getInitialProps = async () => {
  const data = await { a: 1 }
  return data
}
```
