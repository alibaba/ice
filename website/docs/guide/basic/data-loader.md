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

  useEffect(() => {
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

## 使用示例

[示例工程](https://github.com/ice-lab/ice-next/tree/master/examples/with-data-loader)

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
import type { defineDataLoader } from 'ice';

// ...

export const dataLoader = defineDataLoader(async () => {
  const data = await fetch('https://example.com/api/xxx');
  return data;
}）;
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
  const [useInfo, itemInfo] = useData();

  return (
    <>
      <div>Hello {userInfo?.name}</div>
      <div>{JSON.stringify(itemInfo)}</div>
    </>
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
]);
```

多个数据请求的情况下，`useData` 获取的数据也对应的为数组，数组元素和 `dataLoader` 中定义的数据请求的返回值一一对应。