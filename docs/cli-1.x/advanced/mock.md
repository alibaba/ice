---
title: 数据 Mock
order: 4
---

在前后端分离的开发中，Mock 数据是前端开发中很重要的一个环节，前端可以不必强依赖后端接口，只需要约定好对应的数据接口，前端可以通过 Mock 模拟数据先行开发，在后端接口开发完成后，只需要切换对应的接口地址即可，可以保证项目的同步开发。

在飞冰中，我们提供了完整的 Mock 方案，支持 CRUD 等操作，只需要在项目目录下新建 mock 文件夹，并配置入口文件 index.js  作为路由表的入口，在启动项目服务时工具会同步的启动 Mock 服务。

## 编写 mock 接口

在项目根目录下新建 `mock/index.js` 文件，并写入以下示例代码：

```js
// mock/index.js
module.exports = {
  // 同时支持 GET 和 POST
  '/api/users/1': { data: {} },
  '/api/foo/bar': { data: {} },

  // 支持标准 HTTP
  'GET /api/users': { users: [1, 2] },
  'DELETE /api/users': { users: [1, 2] },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id: id });
  },
};
```

启动调试服务后，假设启动的端口是 4444，直接在浏览器里访问 `http://127.0.0.1/api/users` 即可看到接口返回数据。

## 实际应用

在实际项目中，我们推荐将所有接口请求收敛在 `src/api/` 文件夹里，目录组织如下：

```
src/
  - api/
    - user.js
    - project.js
    - index.js
  - components/
  - pages/
```

```js
// api/user.js
export async function login(params) {
  return axios({
    url: '/api/login',
    method: 'post',
    data: params,
  });
}

export async function postUserRegister(params) {
  return axios({
    url: '/api/register',
    method: 'post',
    data: params,
  });
}


// api/project.js
export async function getList(query) {
  return axios({
    url: '/api/project',
    method: 'GET',
    params: query
  });
}

// api/index.js
export user from './user';
export project from './project';

// src/pages/Home/index.jsx
import { user as userApi, project as projectApi } from '../../api';
await userApi.login();
```