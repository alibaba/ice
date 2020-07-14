---
title: 通过插件定制运行时能力
order: 3
---

插件运行时能力通过 `src/runtime.ts` 定义，结构如下

```javascript
export default ({ appConfig, addDOMRender, setRenderRouter, modifyRoutes, ...rest }) => {
  const { loglevel } = appConfig;
};
```

## API

### appConfig

对应 `src/app.ts` 用户自定义的 appConfig。详细字段见 [应用入口](/docs/guide/basic/app)。

### buildConfig

对应 `build.json` 用户自定义内容。仅包含 `router`、`store`、`ssr` 字段。

```javascript
export default ({ buildConfig }) => {
  const { router, store, ssr } = buildConfig;
};
```

### context

应用运行上下文。包含`initialData` 和`pageInitialProps`，分别对应[应用级数据](/docs/guide/advance/ssr#应用级数据)和[页面级数据](/docs/guide/advance/ssr#页面级数据) 。

### setRenderRouter

设置 renderRouter。

```javascript
export default ({ setRenderRouter }) => {
  // renderRouter 入参为路由数组
  const renderRouter = (routes) => () => {
    return <div>route</div>;
  };
  setRenderRouter(renderRouter);
};
```

### addProvider

为应用包裹 Provider：

```js
export default ({ addProvider }) => {
  const StoreProvider = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
  }
  addProvider(StoreProvider);
};
```

### addDOMRender

修改 DOMRender。默认使用[react-dom](https://reactjs.org/docs/react-dom.html)。

```javascript
export default ({ addDOMRender }) => {
  // App: React 组件
  // appMountNode: App 挂载点
  const DOMRender = ({ App, appMountNode }) => {
    render(<App />, appMountNode);
  };
  addDOMRender(DOMRender);
};
```

### wrapperRouteComponent

为所有页面级组件做一层包裹：

```js
// 默认能力：在页面组件上挂载 pageConfig.title 的属性，即可自动设置页面 title
import { useEffect } from 'react';

export default ({ wrapperRouteComponent }) => {
  wrapperRouteComponent((PageComponent) => {
    const { title } = PageComponent.pageConfig || {};

    if (!title) {
      return PageComponent;
    }
    const TitleWrapperedComponent = () => {
      useEffect(() => {
        document.title = title;
      }, []);

      return <PageComponent />
    }
    return TitleWrapperedComponent;
  });
};
```

### modifyRoutes

动态修改路由。

```javascript
export default ({ modifyRoutes }) => {
  modifyRoutes(routes => {
    const modifiedRoutes = modify(routes); // 修改路由
    return modifiedRoutes;
  });
};
```

### createHistory

创建history，基于[history](https://github.com/ReactTraining/history)。

```javascript
export default ({ createHistory }) {
  // type: history 模式，可选类型 hash browser memory
  // basename: 基准路由
  // 返回值：与 type 相对应的 createHashHistory createBrowserHistory createMemoryHistory 详情见：https://github.com/ReactTraining/history/blob/master/docs/api-reference.md
  createHistory(type, basename);
};
```

