---
title: 页面数据请求
order: 6
---

在 ICE 中，推荐为页面组件定义 `getData()` 方法，来发起页面的数据请求。在 `getData()` 中定义的数据请求，会和页面的资源加载并行发起，以达到更好的性能体验。

示例：

```tsx
// src/pages/index.tsx
import { useData } from 'ice';

export default function Home() {
  const data = useData();
  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};

export async function getData() {
  const data = await fetch('https://example.com/api/xxx');

  return data;
}
```

传统的做法，一般是在 useEffect 中发起数据请求，数据请求依赖于页面的 Bundle 加载、解析、执行，整个过程是串行的。

```tsx
// src/pages/index.tsx
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

相比之下，`getData()` 变数据请求从串行到并行，天然带来了更好的性能体验，是框架推荐的数据方法。

## 入参

`getData()` 的入参包含：

- `pathname`: `string`, 当前页面的路径名。
- `query`: `object`, 当前页面的 `query` 信息，会被提前解析。

```tsx
export async function getData(params) {
  console.log(params.pathname);
  console.log(params.query);

  const data = await fetch('https://example.com/api/xxx');

  return data;
}
```

## useData()

在路由组件里使用 `getData()` 返回的数据，需配合 `useData()` 使用。 示例：

```tsx
// src/pages/index.tsx
import { useData } from 'ice';

export default function Home() {
  const data = useData();
  return (
    <>
      <div>Hello ICE</div>
      <div>{JSON.stringify(data)}</div>
    </>
  );
};
```
