---
title: 通过插件定制运行时能力
order: 3
---

插件运行时能力通过 `src/module.ts` 定义，结构如下

```javascript
export default ({ appConfig, addDOMRender, setRenderRouter, modifyRoutes }) => {
  const { loglevel } = appConfig;
}
```

## API

### appConfig

对应 `src/app.ts` 用户自定义的 appConfig

### addProvider

为应用包裹 Provider：

```js
export default ({ addProvider }) => {
  const StoreProvider = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
  }
  addProvider(StoreProvider);
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