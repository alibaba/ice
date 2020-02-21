---
title: 接入微前端
order: 5
---

icejs 的项目可以快速接入微前端 icestark，让一个普通应用快速变成一个微前端框架应用。除了本文档你也可以直接基于我们封装好的脚手架进行项目的创建：

```bash
# 创建框架应用
$ npm init ice icestark-layout @icedesign/stark-layout-scaffold

# 创建子应用
$ npm init ice icestark-child @icedesign/stark-child-scaffold
```

## 引入插件

安装依赖：

```bash
$ npm i --save-dev build-plugin-icestark
```

在 `build.json` 中引入插件：

```json
{
  "plugins": [
    "build-plugin-icestark"
  ]
}
```

## 成为子应用

一个 icejs 的 SPA 应用可以快速变成 icestark 的子应用，在应用入口 `src/app.ts` 中配置 icestark 的运行时依赖：

```diff
import { createApp } from 'ice'

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
+    type: 'browser',
  },
  icestark: {
+    type: 'child',
  },
};

createApp(appConfig)
```

## 成为框架应用

> 框架应用建议通过模板来创建，不建议自己手动改，因为模板里针对框架需求做了很多定制

如果想将应用改为框架应用，则需要在应用入口 `src/app.ts` 中配置 icestark 的运行时依赖：

```diff
import { createApp } from 'ice'
+import NotFound from '@/components/NotFound';
+import PageLoading from '@/components/PageLoading';
+import BasicLayout from '@/layouts/BasicLayout';

const appConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
+    type: 'browser',
  },
  icestark: {
+    type: 'framework',
+    Layout: BasicLayout,
+    getApps: async () => {
+      const apps = [{
+        path: '/seller',
+        title: '商家平台',
+        url: [
+          '//ice.alicdn.com/icestark/child-seller-react/index.js',
+          '//ice.alicdn.com/icestark/child-seller-react/index.css',
+        ],
+      }];
+      return apps;
+    },
+    appRouter: {
+      NotFoundComponent: NotFound,
+      LoadingComponent: PageLoading,
+    },
  },
};

createApp(appConfig)
```

此处 `getApp()` 参数即获取所有的子应用，每个子应用的信息遵循 icestark 的约定即可。

> 关于 icestark 更多的使用请参考 [icetark 文档](/docs/icestark/about)