---
title: 权限管理
order: 16
---

对于一个 Web 应用，权限管理是经常会涉及的需求之一，通常包含以下几种常见的权限管理类型：

- 页面权限：当用户访问某个没有权限的页面时跳转到无权限页面；
- 操作权限：页面中的某些按钮或区块针对无权限的用户直接隐藏；
- 菜单权限：某些菜单针对无权限的用户直接隐藏（属于操作鉴权的一种）；
- 接口权限：当用户通过操作调用没有权限的接口时跳转到无权限页面。

## 初始化权限数据

大多数情况下权限管理通常需要从服务端获取权限数据，然后在前端通过权限对比以此控制页面、操作等等权限行为。在 icejs 框架中约定通过 `getInitialData` 从服务端获取初始化的权限数据，并且约定返回格式为 `role: []string` 的形式。

> 如果服务端返回的格式不符合 `role: []string` 的形式，则可通过 auth 配置项的 setRole API 对返回的数据进行处理。

```ts
import { createApp, request, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    // 通过 getInitialData 异步获取权限数据
    getInitialData: async () => {
      const role = await request('/api/role');
      return { role }
    }
  },
  auth: {
    // 可选
    // 设置初始化的权限数据
    // 如果设置了 getInitialData，则该函数的参数为 getInitialData 的返回值
    setRole: (initialData) => {
      // 对 getInitialData 获取的权限数据进行格式化处理后返回
      return initialData.role
    },

    // 可选，配置无权限时的视图组件，默认为 null
    noAuthFallback: <div>无权限</div>
  }
};

createApp(appConfig);
```

## 页面权限

页面权限通常也称之为路由权限，如需对某些页面进行权限控制只需在页面组件的 `pageConfig` 中配置准入权限即可。

```ts
import React from 'react';

const Home = () => {
  return <>Home Page</>;
};

Home.pageConfig = {
  // 可选
  // 配置准入权限，若不配置则代表所有角色都可以访问
  roles: ['guest', 'admin'],

  // 可选
  // 自定义准入权限，与 roles 配置项二选一即可，同时配置优先级则高于 roles 配置项
  setRoles: (roles) => { return true; }
};
```

## 操作权限

在某些场景下，如某个组件中要根据角色判断是否有操作权限，我们可以通过 useRole Hooks 在组件中获取权限数据，同时也可以更新权限数据。

### 获取权限数据

```ts
import { useRole } from 'ice';

function RoleList() {
  const [role] = useRole();
  return (
    <>
      当前用户角色：
      {role.map((r, i) => {
        return <span key={i}>{r}</span>
      })}
    </>
  );
}
```

### 设置权限数据

```ts
import { useRole } from 'ice';

function Foo() {
  const [role, setRole] = useRole();

  // 更新权限
  function updateRole() {
    setRole(['user']);
  }

  // 删除权限
  function deleteRole() {
    setRole([]);
  }

  return (
    <>
      当前用户角色：
      {role.map((r, i) => {
        return <span key={i}>{r}</span>
      })}
      <button type="button" onClick={updateRole}>更新权限</button>
      <button type="button" onClick={deleteRole}>删除权限</button>
    </>
  );
}
```

## 菜单鉴权

## 接口鉴权

请参考文档 [数据请求](https://ice.work/docs/guide/basic/request)，业务上封装统一的请求方法，与服务端约定接口协议，前端根据状态码判断无权限、未登录等状态，然后跳转到指定页面。

## API

### useRole

用于在函数组件中获取和设置权限数据的 Hooks。

```ts
const [role, setRole] = useRole();
```

示例：

```tsx
import React from 'react';
import { useRole } from 'ice';

function Foo() {
  const [role, setRole] = useRole();
  // role：当前权限列表数据
  // setRole：设置当前权限列表数据

  return (
    <>Foo</>
  );
}
```

### withRole

用于在 Class 组件中获取和设置权限数据的高阶函数。

```ts
withRole(Component)
```

示例：

```tsx
import React from 'react';

Class Foo extends React.Component {
  render() {
    const { role, setRole } = this.props;
    // role：当前权限列表数据
    // setRole：设置当前权限列表数据
    return (
      <>Foo</>
    )
  }
}

export default withRole(Foo)
``
