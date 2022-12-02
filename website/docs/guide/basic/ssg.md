---
title: 构建时渲染 SSG
order: 10
---

:::tip
小程序端不支持该能力。
:::

构建时渲染，简称 SSG (Static Site Generation)，是指在构建时提前生成内容 HTML 的渲染模式。

ice.js 默认开启 SSG 能力。SSG 不仅适用于静态站点，也适用于为普通 CSR 应用提前生成静态内容。

若有如下页面，内容为：

```tsx title="src/pages/home.tsx"
import { useData } from 'ice';

export default function Home() {
  const data = useData();
  return (
    <>
      <div>Hello ICE</div>
      <div>stars: {data?.stars}</div>
    </>
  );
}
```

其中，第一个 `div` 中的内容是不依赖于数据。在传统的 CSR 应用中，`<Home />` 组件内容，无论是否依赖数据，都需要等待 JS 加载、解析后渲染。

利用 SSG，则可以在构建时，就将不依赖于动态数据的部分提前生成到 HTML 中。示例：

```html
<html>
  <head>
    ...
  </head>
  <body>
    <div id="ice-container">
      <div>Hello ICE</div>
      <div>stars: </div>
    </div>
  </body>
</html>
```

### 注意事项

- 在消费 `data` 时，需要做好空值判断，避免 `data` 为 `undefined` 或 `null` 时，产生渲染异常，无法正常构建。
- 代码需要兼容 Node.js 端。SSG 会在构建时进行，因此代码会运行在 Node.js 侧，因此在消费一些浏览器特有的环境变量时，要做好环境判断。

### SSG 的数据请求

通常在 SSG 时，我们不能使用后端接口获取当前的数据，因为这通常与用户访问时不一致。这时我们可以为 SSG 定义特定的数据请求方法，通过为路由组件定义 `staticDataLoader` 来实现。这样在 SSG 时，组件通过 `useData()` 获取的数据为 `staticDataLoader` 的返回值。

```tsx title="src/pages/index.tsx"
import { useData, defineDataLoader, defineStaticDataLoader } from 'ice';

export default function Home() {
  const data = useData();
  return (
    <>
      <div>Hello ICE</div>
      <div>stars: {data?.stars}</div>
    </>
  );
}

// 浏览器侧的常规数据请求
export const dataLoader = defineDataLoader(() => {
  return fetch('https://example.com/stars');
});

// 返回用于 SSG 的兜底数据
export const staticDataLoader = defineStaticDataLoader(() => {
  return {
    stars: 0,
  };
});
```

:::tip
当 `defineDataLoader` 接受入参为数组时（定义了多个数据请求），`defineStaticDataLoader` 也需要与其一一对应。
:::

构建 Client 端的产物时，会移除 `staticDataLoader` 及其相关依赖。

## 关闭 SSG

在 `ice.config.mts` 下，按如下配置修改

```tsx title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  // ...
  ssg: false,
}));
```
