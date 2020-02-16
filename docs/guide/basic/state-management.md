---
title: 状态管理
order: 6
---

框架内置集成了 icestore 状态管理方案，并在此基础上进一步遵循 “约定优于配置” 原则，进行抽象和封装，使得状态变得非常容易，只需要定义一个 model 即可。

## 目录约定

框架规范和约定了应用的状态主要分为 **全局状态** 和 **页面状态**，目录组织如下：

```md
src
├── models                // 全局状态
│   └── user.ts
└── pages
    ├── Home
    │   ├── index.tsx
    │   └── models.ts     // 页面状态
    ├── Dashboard
    │   ├── analysis.tsx
    │   ├── index.tsx
    │   └── models 
    │       ├── modelA.ts
    │       └── modelB.ts
    └── index.tsx
```

## 全局状态

全局状态即为多个页面之间共享的数据，框架约定全局共享的数据放在 `src/models` 目录下：

```md
src/models    // 全局目录
  ├── user.ts
  └── login.ts
```

定义方式如下：

```ts
// src/models/user.ts
export default {
  state: {
    user: {}
  },

  actions: {
    getUserInfo: async () => {}
  }
};
```

## 页面状态

页面状态顾名思义以页面为维度进程拆分，框架约定页面级别的状态目录组织形式如下：

```md
pages
├── Home
│   ├── index.tsx
│   └── models.ts       // 单文件
├── Dashboard
│   ├── analysis.tsx
│   ├── index.tsx
│   └── models          // 目录结构
│       ├── modelA.ts
│       └── modelB.ts
└── index.tsx
```

定义方式如下：

```ts
// pages/Home/models.ts
export default {
  state: {
    home: {}
  },

  actions: {
    getHomeData: async () => {}
  }
};
```

## 视图

定义好全局状态和页面级状态后，在视图中即可获取定义好的数据：

```tsx
// pages/Home/index.jsx
import { useApp, useHomePage } from 'ice'

const HomePage = () => {
  // 全局数据
  const app = useApp()
  // console.log(app.store)

  // 页面数据
  const page = useHomePage()
  console.log(page.store)

  return (
    <>
      // jsx code
    </>
  )
}
```

更多使用详见：[icestore](https://github.com/ice-lab/icestore)
