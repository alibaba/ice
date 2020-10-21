---
title: 多页应用 MPA
order: 1
---

icejs 默认的应用类型是 SPA 单页应用，但在某些业务场景下存在 MPA 多页应用的诉求，基于此 icejs 内置提供了 MPA 的方案。

## 目录结构

MPA 应用以页面为维度进行划分，每个页面目录下面可单独配置页面的路由等信息，默认以 `src/pages/` 下一级目录 `app.js` 作为应用入口。

```diff
  ├── public/
+ │   ├── dashboard.html        # dashboard 页面 HTML
+ │   ├── index.html            # 未配置页面名称对应的 HTML 会默认使用 index.html
  │   └── favicon.png           # Favicon
  ├── src/                      # 源码
  │   ├── layouts/              # 布局
  │   └── pages/                # 页面
  │        ├── Dashboard/       # Dashboard 页面
+ │        │     ├── app.js     # 页面配置入口
  │        │     ├── routes.js  # 路由配置入口
  │        │     └── index.jsx  # 页面组件入口
  │        └── Home/
+ │             ├── app.js
  │             └──index.jsx
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

开启 MPA 插件后，约定式路由逻辑失效，需要手动配置 MPA 应用的路由：

配置如下：

```ts
// src/pages/Dashboard/routes.js
+ import Dashboard from './index';

export default [{ path: '/', component: Dashboard }];
```

## 应用入口

配置完路由后在应用入口 `app.js` 中进行引入即可，更多配置[详见](/docs/guide/basic/app):

```ts
// src/pages/Dashboard/app.js
import { runApp } from 'ice';
+ import routes from './routes';

const appConfig = {
+ router: {
+   routes
+ }
};

runApp(appConfig);
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

> 注意：如果 layouts 中有状态管理需求，可以使用全局 models 的组织形式，但请不要在全局 models 管理页面的状态，否则会引起不必要的代码打包。

关于状态管理的更多内容，请查看文档 [状态管理](/docs/guide/basic/store.md)

## 高级功能

### 指定入口

默认 MPA 应用在开发阶段会启动所有页面，如果你只想调试某个页面，可以通过指定 `--mpa-entry` 来启动。

通过命令行参数指定启动的页面：

```bash
"scripts": {
  "start": "icejs start --mpa-entry dashboard",
}
```

### 指定 HTML 模板

可以通过配置 `template` 指定多个页面使用同一个 HTML 模板。

```json
"mpa": {
  "template": {
    "web.html": ["Dashboard", "Home"]
  }
}
```

### 指定打开页面

可以通过配置 `openPage` 指定多个页面时默认打开指定的页面。

```json
"mpa": {
  "openPage": "Home",
}
```

* MPA 项目示例 [详见](https://github.com/ice-lab/icejs/tree/master/examples/basic-mpa)
