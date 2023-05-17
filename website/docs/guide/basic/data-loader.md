---
title: 数据加载
order: 6
---
## 设计理念

框架对页面数据加载的编码规范做出了约定，来最大限度的提前页面的数据加载时机。
- 在传统的编码模式下，数据请求一般在组件内部发起，依赖于业务 Bundle 的加载解析执行，整个过程是串行、阻塞的。
- 而在 ice.js 中，页面的数据请求会由框架（或容器）统一发起，和业务 Bundle 的加载解析是并行、不阻塞的。

基于这种模式开发的页面，天然获得了更好的性能体验。

<img src="https://img.alicdn.com/imgextra/i1/O1CN01IaC2Oj26L0Jm5W06X_!!6000000007644-2-tps-1330-488.png" width="750px" />

常规的 React 应用，一般都会在组件首次 `useEffect` 时发起数据请求。这种组织方式，数据请求会在页面完成首次渲染后才发起，请求的时机是非常滞后的。

```tsx title="src/pages/index.tsx"
import { useState, useEffect } from 'react';

export default function Home() {
  const [data, setData] = useState();

  useEffect(async () => {
    const data = await fetch('https://example.com/api/xxx');

    setData(data);
  }, [])

  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
```

在 ice.js 中，我们推荐将页面的的数据请求和 UI 实现解耦，通过 `dataLoader` 来定义页面的数据请求。示例：

```tsx title="src/pages/index.tsx"
import { useData, defineDataLoader } from 'ice';

// 页面组件的 UI 实现
export default function Home() {
  const data = useData();

  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

// 页面的数据请求
export const dataLoader = defineDataLoader(async () => {
  const data = await fetch('https://example.com/api/xxx');
  return data;
});
```

通过 `dataLoader` 导出的数据请求，会由框架在进入页面时发起，和业务 Bundle 的加载解析是并行的。在支持预请求的容器下（例如 PHA），数据请求还可以被进一步的提升为预请求。

同一个项目，两种不同写法，数据请求发起时机的差异对比如下（测试环境 chrome slow 3G)：

<img src="https://iceworks.oss-cn-hangzhou.aliyuncs.com/site-assets/dataloader-compare.gif" width="750px" />

:::info
在 dataLoader 应避免处理 UI 相关逻辑，或引入较大的依赖，以确保 dataLoader 的构建产物足够小

受小程序环境限制，通过 `dataLoader` 定义的应用级数据加载将在 `App` 的 `onLaunch` 生命周期中进行，页面级数据加载则会在 `Page` 的 `onLoad` 生命周期中，二者均会阻塞页面的 UI 渲染。如果这不是你想要的效果，请按照常规方式进行数据请求。（比如在组件首次 `useEffect` 时发起数据请求）
:::


## 异步消费数据

默认情况下，页面会等待数据请求完成后，再开始渲染，在数据接口比较快的情况下，这可以避免页面的二次渲染。

如果数据接口较慢，也可以选择先渲染不依赖于动态数据的部分，待数据回来后，再重新渲染依赖数据的页面内容。

具体做法如下：
- 1. 在定义 dataLoader 时标记 defer: true
- 2. 在消费数据时，使用 Await 组件包裹依赖于数据的页面内容

```tsx title="src/pages/index.tsx"
import { useData, defineDataLoader, Await } from 'ice';

// 页面组件的 UI 实现
export default function Home() {
  const data = useData();

  return (
    <>
      <div>Hello ICE</div>
      <Await resolve={data} fallback={<div>loading...</div>} errorElement={<div>Error!</div>} />
        {
          (data) => <div>{JSON.stringify(data)}</div>
        }
      </Await>
    </>
  );
};

// 在定义 dataLoader 时标记 defer: true
export const dataLoader = defineDataLoader(async () => {
  const data = await fetch('https://example.com/api/xxx');
  return data;
}, { defer: true });
```

注意：
- 当 dataLoader 被声明为异步时，useData 返回的内容不可直接消费，需由 Await 组件处理

Await 组件接收三个参数
* resolve 数据请求对象
* fallback  数据加载过程中展示的 UI
* errorElement 请求失败时展示的 UI

## 静态 dataLoader

当开发者希望通过统一的发送函数处理静态配置以完成 `dataLoader` 时，可以通过自定义 `fetcher` 以完成发送逻辑的统一封装，在 `dataLoader` 中只需要传递一份配置即可。

```js
export const dataLoader = defineDataLoader({
  api: 'xxx',
  options: {}
});
```

通过 `defineConfig` 配置 `dataLoader` 配置以自定义 `fetcher`。

```jsx title="ice.config.mts"
export default defineConfig(() => ({
  dataLoader: {
    fetcher: {
      packageName: '@ice/custom-fetcher-lib', // 统一处理静态 dataLoader 的 NPM 包
      method: 'request', // NPM 包导出的方法
    },
  },
}));
```

最终构建后会呈现以下形式：

```js
import { request as fetcher } '@ice/custom-fetcher-lib';

fetcher({
  api: 'xxx',
  options: {}
});
```

## 使用示例

[示例工程](https://github.com/alibaba/ice/tree/master/examples/with-data-loader)

### 页面级数据加载

页面路由组件或 `layout` 组件，都支持通过导出 `dataLoader` 来声明各自的数据请求。

下面是一个最基础的页面级数据请求示例：
- 通过 `defineDataLoader` 定义了页面数据请求的具体实现，并导出为 `dataLoader`。
- 通过 `useData` 方法，在组件侧获取和消费数据。

```tsx title="src/pages/index.tsx"
import { useData, defineDataLoader } from 'ice';

export default function Home() {
  const data = useData();

  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export const dataLoader = defineDataLoader(async (ctx) => {
  console.log(ctx.pathname);
  console.log(ctx.query);

  const data = await fetch('https://example.com/api/xxx');
  return data;
});
```

`defineDataLoader` 支持传入 Function，来定义页面数据请求的具体实现，其入参 `ctx` 包含：
- `pathname`: `string`, 当前页面的路径名。
- `query`: `object`, 当前页面的 `query` 信息，会被提前解析。

返回值为希望传给页面组件的具体数据，类型支持 `Data | Promise<Data>`。

### 应用级数据加载

如果是应用级的数据加载，可以在应用入口 `src/app.ts` 中定义并导出 `dataLoader` 方法，来注册数据加载逻辑。示例：

```ts title="src/app.ts"
import { defineDataLoader } from 'ice';

// ...

export const dataLoader = defineDataLoader(async () => {
  const data = await fetch('https://example.com/api/xxx');
  return data;
});
```

在页面或其他组件中，可以通过 `useAppData` 方法获取应用级数据。示例：

```ts
import { useAppData } from 'ice';

export default function Home(props) {
  const appData = useAppData();

  // ...
}
```

### 多个数据请求

如果页面需要同时发起多个数据请求，首先推荐使用[嵌套路由](./router.md)来组织页面内容，将不同区块的数据请求，放到不同路由组件下来注册。

<img src="https://img.alicdn.com/imgextra/i1/O1CN019fsC6o299xcHyZ2jo_!!6000000008026-2-tps-626-638.png" width="260px" />

如果多个数据请求属于同一个路由组件，则可以在 `defineDataLoader` 时，以数组的方式传入数据请求实现。示例：

```tsx
import { useData, defineDataLoader } from 'ice';

export default function Home() {
  const [userInfo, itemInfo] = useData();

  return (
    <>
      <div>Hello {userInfo?.name}</div>
      <div>{JSON.stringify(itemInfo)}</div>
    </>
  );
};

export const dataLoader = defineDataLoader([
  async () => {
    const userInfo = await fetch('https://example.com/api/userInfo');
    return userInfo;
  },
  async (ctx) => {
    const itemInfo = await fetch(`https://example.com/api/itemInfo${ctx?.query?.itemId}`);
    return itemInfo;
  },
]);
```

多个数据请求的情况下，`useData` 获取的数据也对应的为数组，数组元素和 `dataLoader` 中定义的数据请求的返回值一一对应。

如果 dataLoader 被声明为异步，消费时可以分别 Await 不同的数据，这样可以做到先返回的数据，先渲染。

```tsx
import { useData, defineDataLoader } from 'ice';

export default function Home() {
  const [userInfo, itemInfo] = useData();

  return (
    <>
      <Await resolve={userInfo}>
        { (data) => <div>Hello {data?.name}</div> }
      </Await>
      <Await resolve={itemInfo}>
        { (data) => <div>{JSON.stringify(data)}</div> }
      </Await>
    </Await>
  );
};

export const dataLoader = defineDataLoader([
  async () => {
    const useInfo = await fetch('https://example.com/api/userInfo');
    return useInfo;
  },
  async (ctx) => {
    const itemInfo = await fetch(`https://example.com/api/itemInfo${ctx?.query?.itemId}`);
    return itemInfo;
  },
], { defer: true });
```