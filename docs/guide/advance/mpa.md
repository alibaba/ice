---
title: MPA 多页应用
order: 7
---

icejs 默认的应用类型是 SPA 单页应用，但在某些业务场景下存在 MPA 多页应用的诉求，基于此 icejs 内置提供了 MPA 的方案。

## 目录结构

MPA 应用以页面为维度进行划分，每个页面目录下面可单独配置页面的路由等信息，默认以 `src/pages/` 下一级目录 `app.js` 作为应用入口。

```diff
  ├── public/
+ │   ├── dashboard.html      # dashboard 页面 HTML
+ │   ├── index.html          # 未配置页面名称对应的 HTML 会默认使用 index.html

  │   └── favicon.png         # Favicon
  ├── src/pages               # 源码
  │    ├── Dashboard/         # Dashboard 页面
+ │    │   ├── app.js         # 页面配置入口
  │    │   └── index.jsx      # 页面组件入口
  │    └──  Home/
+ │         ├── app.js
  │         └── index.jsx
  ├── build.json
  ├── package.json
  └── tsconfig.json
```

## 工程配置

在工程配置文件 `build.json` 中开启 MPA 应用配置：

```json
{
  "mpa": true
}
```

## 路由配置

开启 MPA 插件后，默认添加路由（包括配置/约定）的逻辑失效，需要手动配置 MPA 应用的路由，在 MPA 场景下一般路由配置比较简单可以直接在 `app.js` 中进行配置：

配置如下：

```ts
import { createApp } from 'ice';
+ import Dashboard from './index';

const appConfig = {
+ router: {
+   routes: [{ path: '/', component: Dashboard }]
+ }
};

createApp(appConfig);
```

## 状态管理

在 MPA 场景下，我们推荐按照页面维度进行状态的管理，推荐的目录结构如下：

```diff
  ├── src/pages
  │    ├── Dashboard/
+ │    │   ├── models/        # 状态管理
  │    │   ├── app.js
  │    │   └── index.jsx
  │    └──  Home/
+ │         ├── models/
  │         ├── app.js
  │         └── index.jsx
  ├── build.json
  ├── package.json
  └── tsconfig.json
```

关于状态管理的更多内容，请查看文档 [状态管理](/docs/guide/basic/store.md)

只需要这么简单，你的 SPA 应用就可以变成 MPA 应用了。

* MPA 项目示例 [详见](https://github.com/ice-lab/icejs/tree/master/examples/basic-mpa)