---
title: 服务端渲染 SSR
order: 11
---

:::tip
小程序端不支持该能力。
:::

服务器渲染，简称 SSR (Server Side Rendering)，是一种在服务端运行 Node.js 程序动态生成 HTML 的渲染方式。

SSR 相比传统在浏览器端渲染的模式(CSR)，受设备性能和网络情况的影响更小，可以达到更好的性能体验和 SEO 能力。

## 开启 SSR

与 SSG 不同的是，ice.js 中 SSR 不是默认启用的，需要手动开启。

在 `ice.config.mts` 中，增加如下配置：

```tsx title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  // ...
  ssr: true,
}));
```

## 数据请求

开启 SSR 后，路由组件中导出的 `dataLoader` 方法将优先在 Server 端执行，如果 SSR 渲染成功，在 Client 端将不会再次调用 `dataLoader`，而会复用 SSR 的结果。当页面在浏览器侧通过路由跳转，或页面降级时，才会在 Client 端调用 `dataLoader`。

因此，一般情况下 `dataLoader` 内的数据请求需要保持同构，在 Server 端和 Client 端都能执行。

示例：

```tsx title="src/pages/foo.tsx"
import { useData, defineDataLoader, defineServerDataLoader } from 'ice';

// 同构的数据请求
export const dataLoader = defineDataLoader(async () => {
  if (isClient) {
    return await fetch('https://example.com/api/xxx');
  } else if (isServer) {
    return await fetchDataAtServer();
  }
});
```

如果确实需要为 Server 端指定不一样的数据请求方式，可以通过定义 `serverDataLoader` 来实现。当路由组件声明了 `serverDataLoader`，会在 SSR 优先使用这个方法。

示例：

```tsx title="src/pages/foo.tsx"
import { useData, defineDataLoader, defineServerDataLoader } from 'ice';

// Client 端的数据请求
export const dataLoader = defineDataLoader(async () => {
  return await fetch('https://example.com/api/xxx');
});

// Server 端的数据请求
export const serverDataLoader = defineServerDataLoader(async () => {
  return await fetchDataAtServer();
});
```

在构建 Client 端的产物时，会移除导出的 `serverDataLoader` 及其相关依赖。

## 流式渲染

ice.js 结合 React 18 的 [Suspense SSR](https://github.com/reactwg/react-18/discussions/37) 提供了流式渲染的能力，页面中部分区块如果数据请求耗时过久，可以被异步的、流式的返回。

<img src="https://img.alicdn.com/imgextra/i3/O1CN01YMkkOz1LZrEebO72W_!!6000000001314-2-tps-1024-770.png" width="375px">

实现流式渲染，首先需要确认所部署的 SSR 服务是否支持 HTML 的流式返回，已知的是 FC、AWS 等云服务暂未支持。

如果渲染服务支持流式返回，那么可以遵循以下步骤在框架侧进行流式内容的开发：

1. 声明需要被流式渲染组件

流式渲染的组件开发规范和页面路由组件类似，需要导出以下内容：
- `default 组件`: 组件的 UI 实现
- `Loading 组件`: 组件在加载过程中需要显示的 Loading 状态
- `Fallback 组件`: 组件加载失败的情况下需要显示的兜底状态
- `dataLoader`: 组件的数据请求
- `serverDataLoader`: 如果组件需要区分 Server 端的数据请求，可以通过 serverDataLoader 导出具体实现

示例如下：

```tsx
import { useData } from 'ice';

export default function Footer() {
  // 消费数据
  const data = useData();

  return (
    <div>
      <h2>{data.title}</h2>
    </div>
  );
}

// 声明 loading 时的 UI
export function Loading() {
  return (
    <div>loading...</div>
  );
}

// 声明渲染失败时的 UI
export function Fallback() {
  return (
    <div>fallback</div>
  );
}

// 定义组件的数据请求
export const dataLoader = () => {
  // ...
};

// 定义 Server 端特有的数据请求(按需)
export const serverDataLoader = () => {
  // ...
};
```

2. 使用 Suspense 包裹需要被流式渲染的组件

```tsx
import { Suspense } from 'ice';
import * as Comments from '@/components/Comments';
import * as Footer from '@/components/Footer';

export default function Home() {
  return (
    <div>
      <Suspense module={Comments} id="comments" />
      <Suspense module={Footer} id="footer" />
    </div>
  );
}
```

注意：
- 必须使用 `import *` 导入整个模块
- 为 Suspense 组件传入唯一 id，用于标记该模块（要避免同一个页面中存在重复 id）

如果是 `布局组件` 或 `页面组件` 想要被流式返回，则无需使用 `Suspense` 包裹，只需要在遵循上述模块规范的基础，额外导出 `suspense` 标记即可：

```tsx
export default function Home() {
  return (
     // ...
  );
}

export const suspense = true;
```

注意：如果 `布局组件` 或 `页面组件` 同时开启 suspense 能力，他们的数据请求是串行的，需等待 `布局组件` 加载完成后，才会加载 `页面组件`。

3. 调整资源加载模式

框架默认的资源加载是阻塞渲染的，流式渲染模式下，推荐将资源顺序调整为 `defer` 或 `async` 模式，使页面的资源加载不阻塞流式内容的上屏。

对于内置资源，可在 `src/document.tsx` 中修改 `Scripts` 组件的 props 完成：

```tsx
function Document() {
  return (
    <html>
      <head></head>
      <body>
        <Main />
        <Scripts async />
      </body>
    </html>
  );
}
```

两种模式的差别是：
- `defer`：等待所有流式内容加载完成后，再执行 JS。适用于流式内容能较快返回的页面。
- `async`： JS 加载过程中，流式内容先上屏，一旦 JS 加载完成后，先执行 JS。适用于流式内容返回耗时较长，希望页面中其他区块尽快可交互的页面
