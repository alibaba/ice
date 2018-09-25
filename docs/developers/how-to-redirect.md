---
title: 如何跳转页面
category: 项目开发手册
order: 9
---

# 如何跳转页面

### 常规跳转

通过 `<Link />` 标签组件跳转，定义 `to` 属性完成路径跳转，等同于点击一个 `<a />` 标签。

引入标签：

```js
import { Link } from 'react-router-dom';
```

1.  字符串写法

```js
<Link to="/courses?sort=name" />
```

2.  对象写法

可以携带额外的数据 `state` 到路由中。

```js
<Link
  to={{
    pathname: '/courses',
    search: '?sort=name',
    hash: '#the-hash',
    state: { fromDashboard: true },
  }}
/>
```

### 主动调用

一般在某些操作后跳转路由使用，例如权限验证，表单提交后等。

用法：通过 `@withRouter` 将 `history` 对象注入到组件上，之后通过调用 `this.props.history.push()` `this.props.history.replace()` 等 API 跳转路由。

示例：

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
