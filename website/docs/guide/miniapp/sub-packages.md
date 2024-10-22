---
title: 分包
order: 9
---

> 目前还不支持独立分包

配置方式和原生小程序配置方式一致。唯一需要区别的是，`root` 字段和 `routes` 字段一样，不需要添加 `pages` 前缀。

例如有如下目录结构

```text
├── src/
├── app.ts
├── pages
│   └── packageA
│       ├── cat.tsx
│       └── dog.tsx
├── pages
│   ├── index.tsx
│   └── logs.tsx
```

```ts
// app.ts

export const miniappManifest = {
  routes: [/* ... */],
  subPackages: [{
    root: 'packageA',
    pages: [
      'cat',
      'dog'
    ]
  }]
}
```
