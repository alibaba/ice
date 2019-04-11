---
title: 如何实现静态资源的按需加载
order: 7
---

当页面规模、依赖组件达到一定量之后，打包后的文件也会随之增大，但在浏览某个页面的时候并不需要一次性加载所有内容，只需要当前页面的资源即可，此时可以参考本文档实现静态资源的切割及按需加载。

## 基本用法

通过 <https://www.npmjs.com/package/react-loadable> 组件能轻松完成项目应用的按需加载。

1. 首先需要安装该依赖包 `react-loadable`
2. 对页面进行按需加载配置

修改 `src/pages/Home/index.js` 文件内容

```js
// before: src/pages/Home/index.js
import Home from './Home';

export default Home;
```

---

```js
// after: src/pages/Home/index.js
import Loadable from 'react-loadable';

// 定义加载组件，用于在加载过程中显示加载动画
const Loading = () => {
  return <div>loading...</div>;
};

export default loadable({
  loader: () => import('./Home'),
  loading: Loading,
});
```

经过这样的修改打包后，`Home` 则会打包成 `0.js` ，当访问到 Home 页面时则会自动加载 `0.js` 。

> 0 代表一个编号, 可能还会是其他数字。

## 定义构建出的文件名称

当页面比较多的时候，就无法知道 `0.js` `1.js` 对应的到底是哪个页面。此时可以编号的名称。

`/* webpackChunkName: "编号名称" */` 注释语法声明当前的模块名。

```js
// src/pages/Home/index.js
import Loadable from 'react-loadable';

export default loadable({
  loader: () => import(/* webpackChunkName: "home" */ './Home')
});
```

经过注释声明后，打包后的文件名为 `home.js`，其他未声明的还是以数字定义文件名。