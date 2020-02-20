---
title: 权限管理
order: 9
---

对于一个 Web 应用，权限管理是经常会涉及的一个话题，在介绍权限管理方案之前，我们先来梳理下常见的权限管理包含哪些方面：

- 路由鉴权：当用户访问某个没有权限的页面时跳转到无权限页面
- 接口鉴权：当用户通过操作调用没有权限的接口时跳转到无权限页面
- 操作鉴权：页面中的某些按钮或区块针对无权限的用户直接隐藏
- 菜单鉴权：某些菜单针对无权限的用户直接隐藏（属于操作鉴权的一种）

## 权限组件

设计一个权限组件首先要知道当前用户的角色，角色信息通常存在服务端，因此我们需要服务端将当前用户的角色输出到前端，推荐服务端将当前用户角色写在 cookie 中，然后在前端代码中读取角色信息。

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
 * <Auth authorities={['admin']} hidden={true}>
 *  <Button />
 * </Auth>
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

/**
 * HOC 方式使用
 *
 * withAuth({
 *  authorities: ['admin'],
 * })(ListPage);
 */
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

路由鉴权针对页面级组件，直接在组件层面使用上面的 `withAuth` 控制页面的权限：

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

// 仅 admin 角色可访问该页面
export default withAuth({
  authorities: ['admin'],
})(List);
```

### 接口鉴权

请参考文档[前后端通信](/docs/guide/dev/ajax)，业务上封装统一的请求方法，与服务端约定接口协议，前端根据状态码判断无权限、未登录等状态，然后跳转到指定页面。

### 操作鉴权

如果页面中某个组件要根据角色判断是否显示，可以使用 `Auth` 组件，同时传入 `hidden={true}`：

```jsx
<Auth authorities={['admin']} hidden={true}>
  <Button>删除</Button>
</Auth>
```

### 菜单鉴权

当需要对某些菜单项进行权限控制，只需在对应的菜单项设置 authorities 属性即可，当前用户的权限如果与 authorities 中指定的权限不匹配，菜单项将不显示。

```js
// src/config/menu.js
const headerMenuConfig = [
  // ...
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice',
    external: true,
    newWindow: true,
    icon: 'message',
    authorities: ['admin'], // 当前用户权限为 admin 时显示菜单，否则隐藏
  },
];

const asideMenuConfig = [
  {
    name: '文章管理',
    path: '/post',
    icon: 'edit',
    authorities: ['admin', 'user'], // 当前用户权限为 admin 或者 user 时显示菜单，否则隐藏
    children: [
      {
        name: '文章列表',
        path: '/post/list',
        authorities: ['user'], // 当前用户权限为 user 时显示菜单，否则隐藏
      },
      {
        name: '添加文章',
        path: '/post/create'
      },
    ],
  }
];
```

控制菜单项渲染也是使用 `Auth` 组件实现，当菜单项有配置 authorites 属性时，使用 `Auth` 组件包裹，权限不匹配时组件隐藏。

```jsx
/**
 * 根据权限决定是否渲染某个表单项
 * @param {object} item - 菜单项组件
 * @param {array} authorities - 菜单项允许权限数组
 * @param {string} key - 当前菜单项的 key
 * @return {object} 渲染的菜单项
 */
function renderAuthItem(item, authorities, key) {
  if (authorities) {
    return (
      <Auth
        authorities={authorities}
        hidden
        key={key}
      >
        {item}
      </Auth>
    );
  } else {
    return item;
  }
}
```
