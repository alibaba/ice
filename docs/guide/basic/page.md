---
title: 页面配置
order: 9
---

框架为页面级组件提供了一些特殊的配置项，让页面级组件可以快速拥有一些能力。

## 页面标题

```jsx
// src/pages/Home/index.tsx
import React from 'react';
import { Helmet } from 'ice';

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Hello Home</title>
      </Helmet>
      <div>Home</div>
    </div>
  );
};


export default Home;
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

## 页面埋点

参考 [页面埋点](/docs/guide/advance/statistical.md)。
