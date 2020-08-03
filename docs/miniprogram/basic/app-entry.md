---
title: 应用入口
order: 2
---

# 应用入口

`app.js` 用于对应用进行全局的动态配置，如生命周期配置等。

## 启动应用

您可通过默认生成的代码运行应用而无需任何配置：

```ts
import { runApp } from 'ice';

runApp();
```

## 生命周期

```ts
import { runApp } from 'ice';

const appConfig = {
  app: {
    // 应用启动的时候触发
    onLaunch() {

    },

    // 应用唤起时触发
    // 应用从后台切到前台的时候触发
    onShow() {

    },

    // 应用从前台切到后台的时候触发
    onHide() {

    },

    // 监听全局错误
    onError(error) {

    },
    
    // 点击 tab item 的时候触发
    // 传入参数为一个对象，包含：
    //  - from: 点击来源
    //  - path: 被点击 tabItem 的页面路径
    //  - text: 被点击 tabItem 按钮文字
    //  - index: 被点击 tabItem 的序号，从0开始
    onTabItemClick ({ from, path, text, index }) {

    }
  }
};

runApp(appConfig);
```
