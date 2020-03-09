---
title: 接入微前端
order: 6
---

基于 icejs 的插件机制，我们封装了 build-plugin-icestark 插件，这个插件可以大大降低接入微前端方案的成本。

## 框架应用

通过物料模板快速创建一个微前端的子应用：

```bash
$ npm init ice icestark-framework @icedesign/stark-layout-scaffold
$ cd icestark-framework
$ npm install
$ npm start
```

该模板默认在 `build.json` 里引入了插件 `build-plugin-icestark`：

```json
{
  "plugins": {
    "build-plugin-icestark"
  }
}
```

同时我们需要在应用入口 `src/app.ts` 中配置框架应用的一些运行时信息：

```diff
import { createApp } from 'ice'
+import NotFound from '@/components/NotFound';
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
+    },
  },
};

createApp(appConfig)
```

`appConfig.icestark` 完整的配置项说明：

- type: string, framework|child
- Layout: Component, 系统对应的布局组件
- getApps: function，获取所有子应用数据，单个子应用的完整配置字段请参考 icestark 文档
- appRouter:
  - NotFoundComponent: 404 组件
  - LoadingComponent: 应用切换时的 Loading 组件

## 子应用

通过物料模板快速创建一个微前端的子应用：

``` bash
# 创建子应用
$ npm init ice icestark-child @icedesign/stark-child-scaffold
$ cd icestark-child
$ npm install
$ npm start
```

同框架应用一样，子应用也会默认引入插件 `build-plugin-icestark`，同时在应用入口 `src/app.ts` 中配置了子应用相关的信息：

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

只需要这么简单，你的 SPA 应用就可以变成微前端的子应用了。

关于微前端的更多内容，请查看文档 [icestark](https://ice.work/docs/icestark/about)。
