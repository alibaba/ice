---
title: 微前端 icestark
order: 3
---

## 框架应用

通过模板快速创建一个微前端的框架应用：

```bash
$ npm init ice icestark-framework @icedesign/stark-layout-scaffold
$ cd icestark-framework
$ npm install
$ npm start
```

如果不是通过模板创建，则需要按照下面的步骤进行改造：

### 添加插件 build-plugin-icestark

安装插件依赖：

```bash
$ npm i --save-dev build-plugin-icestark
```

在 `build.json` 里引入插件：

```json
{
  "plugins": {
    ["build-plugin-icestark", {
      // 防止与微应用的 webpackJSONP 冲突
      "uniqueName": "frameworkJsonp"
    }],
    ["build-plugin-fusion", {
      "themeConfig": {
        // 防止与微应用里的基础组件 css prefix 冲突
        "css-prefix": "next-icestark-"
      }
    }],
  }
}
```

### 应用入口改造 

应用入口 `src/app.ts` 中配置框架应用的一些运行时信息：

```diff
import { runApp } from 'ice'
+import { ConfigProvider } from '@alifd/next';
+import NotFound from '@/components/NotFound';
+import BasicLayout from '@/layouts/BasicLayout';

const appConfig = {
  app: {
    rootId: 'ice-container',
+    addProvider: ({ children }) => (
+      <ConfigProvider prefix="next-icestark-">{children}</ConfigProvider>
+    ),
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

runApp(appConfig);
```

`appConfig.icestark` 完整的配置项说明：

- type: string, framework|child
- Layout: Component, 系统对应的布局组件
- getApps: function，获取所有微应用数据，单个微应用的完整配置字段请参考 icestark 文档
- appRouter:
  - NotFoundComponent: 404 组件
  - LoadingComponent: 应用切换时的 Loading 组件

## 微应用

通过模板快速创建一个微应用：

``` bash
# 创建微应用
$ npm init ice icestark-child @icedesign/stark-child-scaffold
$ cd icestark-child
$ npm install
$ npm start
```

同主应用一样，微应用也会默认引入插件 `build-plugin-icestark`，同时在应用入口 `src/app.ts` 中配置了微应用相关的信息：

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


## 常见问题

### 如何监听微应用切换

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
};
```

### 动态修改微应用列表

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

### UMD 规范微应用

icestark 从 `1.6.0` 开始支持并推荐使用 UMD 规范的微应用，在微应用层面可以更少的降低跟主应用的耦合：

- 微应用依赖的 `build-plugin-icestark` 版本需要高于 `2.0.0` 才能支持构建出 UMD 规范的微应用
- 主应用依赖的 `@ice/stark` 版本需要高于 `1.6.0` 才能支持渲染 UMD 规范的微应用

#### 微应用导出 UMD 规范的产物

在 `build.json` 中配置 umd 属性即可导出标准 UMD 规范的微应用：

```json
{
  "plugins": [
    ["build-plugin-icestark", {
      "umd": true,
      "library": "microApp" // UMD 模块导出名称，选填。默认为项目 package.json 中的 name 字段
    }]
  ]
}
```

### 主应用对采用 UMD 规范的微应用进行声明

对于 umd 类型的微应用需要在框架应用的微应用列表配置中显示声明：

```diff
const apps = [{
  path: '/seller',
  title: '商家平台',
+  umd: true,
  url: [
    '//ice.alicdn.com/icestark/child-seller-react/index.js',
    '//ice.alicdn.com/icestark/child-seller-react/index.css',
  ],
}];
```
