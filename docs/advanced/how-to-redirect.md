---
title: 如何实现页面间的跳转
category: 进阶指南
order: 2
---

本文档介绍使用 react-router 的单页面应用如何实现页面跳转。

### 组件跳转

通过 `<Link />` 标签组件跳转，定义 `to` 属性完成路径跳转，等同于点击一个 `<a />` 标签。

引入标签：

```js
import { Link } from 'react-router-dom';

class Demo extends React.Component {
  render() {
    return (
      <div>
        <Link to="/courses?sort=name" />

        {/* 可以携带额外的数据 `state` 到路由中。 */}
        <Link
          to={{
            pathname: '/courses',
            search: '?sort=name',
            hash: '#the-hash',
            state: { fromDashboard: true },
          }}
        />
      </div>
    )
  }
}
```

### 方法调用

一般在某些操作后跳转路由使用，例如权限验证，表单提交后等。

#### 1. withRouter

如果调用方法的地方在 React 组件内部，可以直接在组件上添加 `withRouter` 的装饰器，然后组件内可以通过 `props` 获取到相关 API：

```js
import React from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
class ShowTheLocation extends React.Component {
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  handleHistoryPush = () => {
    const { history } = this.props;
    history.push('/new-path');
  };

  render() {
    const { location } = this.props;
    return (
      <div>
        <div>当前路径： {location.pathname}</div>
        <button onClick={this.handleHistoryPush}>点击跳转新页面</button>
      </div>
    );
  }
}
```

#### 2. history API

如果不满足第一种方法的使用条件，比如单独抽离的某个方法中，则需要单独使用 history 的三方包，一般情况下不推荐这种情况，实际业务里应该很少需要：

首先添加依赖：

```bash
$ npm install --save history
```

然后在代码中使用：

```js
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

export default function checkAuth() {

  ajax('/api/checkAuth').then((res) => {
    if (res.data.noAuth) {
      history.push('/page/noAuth');
    }
  });

};
```
