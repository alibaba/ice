---
title: 单页应用文件按需加载
category: 进阶指南
order: 10
---

随着项目页面的不断增加，打包产生的 `index.js`文件也会越来越大。可通过修改路由的写法，达到按需加载的目的。

比如：访问 `home` 页面的时候，只会加载都应的  `home.js`。

## 基础路由

默认的路由代码是这么书写的

routes.jsx

```js
/**
   * 定义应用路由
   */
import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

export default (
  <Router history={browserHistory}>
    <Route path="/">
      <IndexRoute component={HomePage} />
      <Route path="*" component={NotFoundPage} />
    </Route>
  </Router>
);

```

##  修改步骤

### 1. 安装 `history@3.x` 版本

执行命令 `def add history@3.x` 即可。

### 2. 创建路由模板

```js
import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

/**
 * 应用的基础路径
 * @example
 * http://www.taobao.com/app/ice => basename: /app/ice
 */
const history = useRouterHistory(createHistory)({
  basename: '/'
});

const appRoutes = {};

export default <Router history={history} routes={appRoutes} />;

``` 

### 3. 将原有路由改写到 appRoutes 对象中

> 参考项目： https://github.com/ReactTraining/react-router/blob/v3/examples/huge-apps/app.js

> API 参考: https://github.com/ReactTraining/react-router/blob/v3/examples/huge-apps/app.js


```js
import React from 'react';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';

/**
 * 应用的基础路径
 * @example
 * http://www.taobao.com/app/ice => basename: /app/ice
 */
const history = useRouterHistory(createHistory)({
  basename: '/'
});

const appRoutes = {
  path: '/',
  getIndexRoute(partialNextState, callback) {
    require.ensure([], function(require) {
      // 默认首页, 如无特殊需求不要修改此部分代码
      callback(null, {
        getComponents(nextState, callback) {
          require.ensure([], require => {
            callback(null, require('./pages/Home'));
          });
        }
      });
    });
  },
  getChildRoutes(partialNextState, callback) {
    require.ensure([], function(require) {
      // 当需要增加页面时, 以以下方式添加
      callback(null, [
        require('./pages/notfound/route')
      ]);
    });
  }
};

export default <Router history={history} routes={appRoutes} />;
```

### 4. 逐个添加 pages 的 route.jsx 文件

如 notfound 的页面

```js
module.exports = {
  path: '*',
  getIndexRoute(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, {
        component: require('./index')
      });
    });
  }
};
```

## 总结

通过动态路由的能力，能将复杂多页面按需加载，更是大大降低最后打包文件的大小。

官方指导文档： <https://github.com/ReactTraining/react-router/blob/v3/docs/guides/DynamicRouting.md>


> 以上文档基于 react-router@3.x 版本适用。