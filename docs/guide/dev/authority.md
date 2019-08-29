---
title: 权限管理
order: 9
---

对于一个 Web 应用，权限管理是经常会涉及的一个话题，在介绍模板中的权限管理方案之前，我们先来梳理下常见的权限管理包含哪些方面：

- 路由鉴权：当用户访问某个没有权限的页面时跳转到无权限页面
- 接口鉴权：当用户通过操作调用没有权限的接口时跳转到无权限页面
- 操作鉴权：页面中的某些按钮或区块针对无权限的用户直接隐藏

## 权限组件

设计一个权限组件首先要知道当前用户的角色，角色信息通常存在服务端，因此我们需要服务端将当前用户的角色输出到前端，推荐服务端将当前用户权限写在 cookie 中并且设置为 `HttpOnly` 防止角色信息被篡改。

接着我们来实现权限组件：

```js
// src/components/Auth/index.jsx
import React from 'react';
import cookie from 'cookie';

// Exception 组件需要业务自己实现
import Exception from '@/components/Exception';

/**
 * Auth Component
 *
 * @params {array} authorities 允许哪些角色使用
 * @params {boolean} hidden 无权限时是否直接隐藏
 */
export function Auth({ children, authorities = [], hidden }) {
  // 服务端将当前用户角色 authority 保存在 cookie 中，前端负责读取 cookie
  const { authority } = cookie.parse(document.cookie);
  const hasAuth = authorities.indexOf(authority) !== -1;

  if (hasAuth) {
    // 有权限直接渲染内容
    return children;
  } else {
    // 无权限
    if (hidden) {
      // 无权限则不显示内容
      return null
    } else {
      // 无权限则显示指定 UI，也可以跳转到统一的无权限页面
      return (
        <Exception
          statusCode="403"
          description="抱歉，你没有权限访问该页面"
        />
      );
    }
  }
};

// HOC 方式使用
export function withAuth(params) => (WrapperedComponent) => {
  return (props) => {
    return (
      <Auth {...params}>
        <WrapperedComponent {...props} />
      </Auth>
    );
  };
};
```

## 使用 Auth 组件

### 路由鉴权

可以使用上面的 `withAuth` 控制页面的权限：

```js
// src/pages/List
import React from 'react';
import { withAuth } from '@/components/Auth';

function List() {
  return (
    <div className="list-page">
      <Table />
    </div>
  );
}

// 仅 admin 和 user 的角色可访问该页面
export default withAuth({
  authorities: ['admin', 'user'],
})(List);
```

### 操作鉴权

如果页面中某个组件要根据角色判断是否显示，可以使用 `Auth` 组件，同时传入 `hidden={true}`：

```jsx
<Auth authorities={['admin']} hidden={true}>
  <Button>删除</Button>
</Auth>
```

### 接口鉴权

接口鉴权推荐按照文档[前后端通信](/docs/guide/dev/ajax)，封装统一的业务请求方法，与服务端约定接口协议，前端根据状态码判断无权限、未登录等状态，然后跳转到指定页面。
