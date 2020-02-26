---
title: 页面配置
order: 8
---

框架为页面级组件提供了一些特殊的配置项，让页面级组件可以快速拥有一些能力，只需要在页面组件上声明 `pageConfig` 属性即可：

```jsx
// src/pages/Home/index.tsx
import React from 'react',

const Home = () => {
  return <div>Home</div>;
};

Home.pageConfig = {
  title: '',
  scrollTop: ''
};

export default Home;
```

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

