---
title: 微前端 icestark
order: 3
---

基于 icejs 的插件机制，我们封装了 `build-plugin-icestark` 插件，这个插件可以大大降低接入微前端方案的成本。

## 框架应用

通过物料模板快速创建一个微前端的微应用：

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
import { runApp } from 'ice'
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

runApp(appConfig)
```

`appConfig.icestark` 完整的配置项说明：

- type: string, framework|child
- Layout: Component, 系统对应的布局组件
- getApps: function，获取所有微应用数据，单个微应用的完整配置字段请参考 icestark 文档
- appRouter:
  - NotFoundComponent: 404 组件
  - LoadingComponent: 应用切换时的 Loading 组件

### 常见问题

#### 如何监听微应用切换

`icestark` 通过 `onRouteChange`、`onAppEnter` 和 `onAppLeave` 来监听微应用间的切换，在 icejs 研发框架下可以通过在对应的 Layout 中实现相关钩子的监听。Layout 中接收 props 属性如下：

- pathname：微应用路由切换信息，对应 `onRouteChange`
- appEnter：渲染微应用的信息， `onAppEnter`
- appLeave：卸载微应用的信息，对应 `onAppLeave`

在 Layout 使用相关属性时，结合对应属性是否发生变更来执行相应操作：

```js

const BasicLayout = ({ pathname, appLeave, appEnter, children }) => {
  useEffect(() => {
    console.log(`微应用路由发生变化：${pathname}`);
  }, [pathname]);

  useEffect(() => {
    console.log(`卸载微应用：${appLeave.path}`);
  }, [appLeave]);

  useEffect(() => {
    console.log(`渲染微应用：${appEnter.path}`);
  }, [appEnter]);

  return (
    <div>
      {children}
    </div>
  );
}

```

#### 动态修改微应用列表

初始化微应用列表可以如上文介绍在应用入口 `src/app.ts` 中配置 `getApps` 属性即可，如果需要动态修改微应用列表，可以通过 Layout 接收的 `updateApps` 属性进行修改：

```js
const BasicLayout = ({ updateApps, children }) => {
  useEffect(() => {
    updateApps([{
      path: '/seller',
      title: '商家平台',
      url: [
        '//ice.alicdn.com/icestark/child-seller-react/index.js',
        '//ice.alicdn.com/icestark/child-seller-react/index.css',
      ],
    }]);
  }, []);

  return (
    <div>
      {children}
    </div>
  );
}
```

## 微应用

通过物料模板快速创建一个微前端的微应用：

``` bash
# 创建微应用
$ npm init ice icestark-child @icedesign/stark-child-scaffold
$ cd icestark-child
$ npm install
$ npm start
```

同框架应用一样，微应用也会默认引入插件 `build-plugin-icestark`，同时在应用入口 `src/app.ts` 中配置了微应用相关的信息：

```diff
import { runApp } from 'ice'

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

runApp(appConfig)
```

只需要这么简单，你的 SPA 应用就可以变成微前端的微应用了。

关于微前端的更多内容，请查看文档 [icestark](/docs/icestark/about)。
