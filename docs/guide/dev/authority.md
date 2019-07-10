---
title: 权限管理
order: 7
---

在前后端分离设计中，权限管理是中后台应用中经常会涉及的一个话题，在分析模板中的权限管理之前，我们先来梳理下常见的权限管理指的是什么。

在理解权限控制之前，需要明白两个概念：资源和权限。什么是资源，对于一个系统来说，系统内部的所有信息都可以理解为这个系统的资源。页面是资源、数据是资源、按钮是资源、图片是资源。而权限就是访问某个资源所需要的标识。无论系统的权限如何设计，在用户登录时，都可以计算得出用户所拥有的权限标识集合，也就确定了该用户能访问哪些系统资源，权限控制的本质是控制登录用户对于系统资源的访问，可以细分为一下几种方式：

- 登录授权，用户没有登录只能访问登录页面，如果处于登录状态则跳转到当前用户的默认首页；
- 路由授权，当前登录用户的角色，如果对一个 URL 没有权限访问，则跳转到 403 页面；
- 数据授权，当访问一个没有权限的 API，则跳转到 403 页面；
- 操作授权，当页面中某个按钮或者区域没有权限访问则在页面中隐藏

## 实际应用

在前后端分离设计中，通常的做法是由服务端提供权限数据接口或者将当前用户角色写到 `cookie` 中，前端根据接口数据或当前用户角色做对应的路由拦截控制和页面数据的渲染。在模板中，我们将权限组件写在 `src/components/Auth/index.jsx` 中。

```js
import React from 'react';
import Exception from '@/components/Exception';
import cookie from 'cookie';

const Auth = ({ children, authorities = [] }) => {
  // 服务端将 authority 保存在 cookie 中，前端只负责取 cookie
  const { authority } = cookie.parse(document.cookie);

  if (authorities.indexOf(authority) === -1) {
    // 也可以跳转到统一的无权限页面，具体看业务需求
    return (
      <Exception
        statusCode="403"
        description="抱歉，你没有权限访问该页面"
      />
    );
  }

  return children;
};

const withAuth = (params) => (WrapperedComponent) => {
  return (props) => {
    return (
      <Auth {...params}>
        <WrapperedComponent {...props} />
      </Auth>
    );
  };
};

export { withAuth };

export default Auth;
```

### 如何使用

可以使用上面的 `withAuth` 控制页面的权限：

```js
import React from 'react';
import { withAuth } from '@/components/Auth';

function BasicList() {
  return (
    <div className="list-page">
      <Table />
    </div>
  );
}

export default withAuth({
  authorities: ['admin', 'user'],
})(BasicList);
```

上述代码表示用户角色为 `admin` 和 `user` 的可以访问 `BasicList` 页面，否则显示无权限。

如果页面中某个组件要根据角色判断是否显示，可以使用 `Auth` 组件：

```js
<Auth authorities={['admin', 'user']}>
  <Button>auth</Button>
</Auth>
```
