---
title: 如何实现静态资源的按需加载
category: 进阶指南
order: 3
---

当页面规模、依赖组件达到一定量之后，打包后的文件也会随之增大，但在浏览某个页面的时候并不需要一次性加载所有内容，只需要当前页面的资源即可，此时可以参考本文档实现静态资源的切割及按需加载。

## 实现

通过 <https://www.npmjs.com/package/react-loadable> 组件能轻松完成项目应用的按需加载。

- 步骤 1. 首先需要安装该依赖包 `react-loadable`

- 步骤 2. 对页面进行按需加载配置

修改 `src/pages/xxx/index.js` 文件内容

```js
// before
import List from './List';

export default List;
```

---

```js
// after
import Loadable from 'react-loadable';
import Loading from './my-loading-component'; // 定义个加载组件，用于在加载过程中显示加载动画

export default loadable({
  loader: () => import('./List'),
  loading: LoadingIndicator,
});
```

```js
// my-loading-component
import React from 'react';

const LoadingIndicator = () => {
  return <div>loading...</div>;
};

export default LoadingIndicator;
```

经过这样的修改打包后，`List` 则会打包成 `0.js` ，当访问到 List 页面时则会自动加载 `0.js` 。

> 0 代表一个编号, 可能还会是其他数字。

## 进阶用法

当页面比较多的时候，就无法知道 `0.js` `1.js` 对应的到底是哪个页面。此时可以编号的名称。

`/* webpackChunkName: "编号名称" */` 注释语法声明当前的模块名。

```js
// after 改进后
import Loadable from 'react-loadable';
import Loading from './my-loading-component'; // 定义个加载组件，用于在加载过程中显示加载动画

export default loadable({
  loader: () => import(/* webpackChunkName: "list" */ './List'),
  loading: LoadingIndicator,
});
```

经过注释声明后，打包后的文件名为 `list.js`，其他未声明的还是以数字定义文件名。
