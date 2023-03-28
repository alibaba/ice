---
title: 代码分包
---

## 默认策略

为了给页面提供最优的性能，ice.js 默认以路由维度分割代码，每个路由会生成一个独立的 js 和 css（如果有 css 源码），另外默认会根据第三方模块体积自动拆分 `chunk`，有可能会出现多个产物包。

## 组件级别的代码分割

如果构建产物过大，可以考虑把体积较大的组件进行拆包：

```jsx
import { lazy, Suspense } from 'react';
// Avatar 组件会被单独拆包
const Avatar = lazy(() => import('@/components/Avatar'));

export default function Home() {
  return (
    <div>
      <Avatar />
    </div>
  );
}
```

## 控制三方依赖的分包

三方依赖默认根据体积大小进行拆分。如果三方依赖过多，在某些场景下可能出现较多的网络请求，导致页面加载速度过慢，可关闭 [splitChunks](../basic/config.md#splitchunks) 配置：

```diff title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
+  splitChunks: false,
}));
```
