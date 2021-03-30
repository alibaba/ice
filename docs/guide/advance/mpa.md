---
title: 多页应用 MPA
order: 1
---

icejs 默认的应用类型是 SPA 单页应用，但在某些业务场景下存在 MPA 多页应用的诉求，基于此 icejs 内置提供了 MPA 的方案。

## 工程配置

在工程配置文件 `build.json` 中开启 MPA 应用配置：

```json
{
  "mpa": true
}
```

## 目录结构

MPA 应用以页面为维度进行划分，符合 `src/pages/*/[index|app].[ts|js]` 的路径都会作为一个单独的 entry，整体结构：

```diff
  ├── build/
  │   ├── js/
  │   │    ├── dashboard.js
  │   │    └── about.js
  │   ├── css/
  │   │    ├── dashboard.css
  │   │    └── about.css
  │   ├── dashboard.html
  │   ├── about.html
  │   └── favicon.png           # Favicon
  ├── public/
+ │   ├── index.html            # 默认 html
  │   └── favicon.png           # Favicon
  ├── src/                      # 源码
- │   ├── app.js
- │   ├── routes.js
- │   ├── store.js
  │   └── pages/                # 页面
  │        ├── Dashboard/       # Dashboard 页面，一个完整的 SPA 页面
+ │        │     ├── app.js     # 页面配置入口
  │        │     └── routes.jsx # 路由配置入口
  │        ├── About/           # About 页面，比较简单，直接渲染一个组件
+ │        │     └── index.jsx  # 页面组件入口
  │        └── Market /         # Market 下没有 app 或者 index，不会作为一个 entry
  │              └── market.jsx 
  ├── build.json
  ├── package.json
  └── tsconfig.json
```

如上结构，开启 mpa 之后将会包含 dashboard、about 两个 entry。

## 不同的 entry 应用类型

pages 下的每个 entry 可以是一个单独的 SPA，也可以是简单的一个页面组件，具体可以结合业务情况使用。

### SPA 类型的 entry

SPA 类型的 entry 整体跟 icejs 的 SPA 应用基本接近，包含 `app.js`, `routes.js` 等文件。

目录结构：

```diff
  ├── src/pages
  │    └──  Dashboard/
+ │         ├── DashboardA/index.jsx
+ │         ├── DashboardB/index.jsx
+ │         ├── models/               // 如有状态管理相关诉求
+ │         ├── store.js              // 如有状态管理相关诉求
+ │         ├── routes.js             // 路由配置
+ │         └── app.js
  ├── build.json
  ├── package.json
  └── tsconfig.json
```

应用入口：

```diff
// src/pages/Dashboard/app.js
import { runApp } from 'ice';
+ import store from './store';
+ import routes from './routes';

const appConfig = {
  app: {
+   // 如有状态管理诉求，需要手动包裹 provider
+   addProvider: ({ children }) => {
+     return <store.Provider>{children}</store.Provider>;
+   },
  },
+ router: {
+   // 需要手动引入 routes
+   routes
+ }
};

runApp(appConfig);
```

接下来配置路由信息：

```diff
// src/pages/Dashboard/routes.js
+import DashboardA from '@/pages/Dashboard/DashboardA';
+import DashboardB from '@/pages/Dashboard/DashboardB';

export default [
  {
    path: '/foo',
    component: DashboardA
  },
  {
    path: '/bar',
    component: DashboardB
  },
]
```

### 组件类型的 entry

如果只是渲染一个简单的组件/页面，直接在 `index.jsx` 中导出组件即可：

```js
// src/pages/About/index.jsx
import React from 'react';

export default function About() {
  return <>About 页面</>
}
```

如果有 `export default` 那么框架会自动调用 `ReactDOM.render` 渲染组件，如果希望自行渲染组件的话则不需要通过 `export default` 导出组件。

## 指定不同 entry 的 HTML 模板

默认情况下，entryName 为 dashboard 的入口会优先使用 `public/dashboard.html` 作为 HTML 模板，如果该文件不存在则会使用 `public/index.html` 兜底。

同时 icejs 也支持通过 `template` 字段更加灵活的指定 HTML 模板： 

```json
// build.json
{
  "mpa": {
    "template": {
      "web.html": ["Dashboard", "Home"],
      "about.html": ["About"]
    }
  }
}
```

> 注意：通过 `entry` 字段配置的多页应用不支持配置 `mpa.template` 字段。

## 高级用法

### 调试时指定单个 entry

默认 MPA 应用在开发阶段会启动所有页面，如果你只想调试某个页面，可以通过指定 `--mpa-entry` 来启动。

```bash
"scripts": {
  "start": "icejs start --mpa-entry dashboard",
}
```

### EJS 模版

默认情况下 MPA 使用 `public/index.html` 作为 HTML 模版，如果存在一些简单的差异化渲染逻辑，可以通过 EJS 语法进行渲染。

可使用变量：

- NODE_ENV：可选值为 `development | production` 用来区分 start / build 命令
- pageName：当前渲染页面的页面名称，默认为 src/pages 目录下的一级目录名（默认小写）


html 中使用 EJS 语法：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1" />
    <meta name="viewport" content="width=device-width" />
    <title>title</title>
  </head>
  <body>
    <div>current env: <%= NODE_ENV %></div>
<% if (pageName === 'Home') { %>
    <h2>Home page</h2>
<% } %>
    <div id="ice-container"></div>
  </body>
</html>
```

### 指定调试时浏览器默认打开的页面

可以通过配置 `openPage` 指定多个页面时默认打开指定的页面。

```json
"mpa": {
  "openPage": "Home",
}
```

> 注意：通过 `entry` 字段配置的多页应用不支持配置 `mpa.openPage` 字段。

### 通过 entry 字段更加灵活的开启 MPA

`mpa: true` 是 icejs 推荐的 MPA 最佳实践，但有一些场景可能会更加灵活，比如应用整体还是一个大的 SPA 应用，只是需要增加一个轻量的 entry，这时候可以直接在 `build.json` 中配置 entry 字段：

```json
// build.json
{
  "entry": {
    "index": "src/app",
    "login": "src/LoginEntry"
  }
}
```

对应目录结构：

```diff
  ├── public/
  ├── src/                     
  │   ├── layouts/              
  │   ├── pages/             
  │   ├── routes.js
  │   ├── app.js
+ │   └── LoginEntry.jsx
  ├── build.json
  ├── package.json
  └── tsconfig.json
```

`LoginEntry.jsx` 只需要导出一个 React 组件即可。
