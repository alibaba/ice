---
title: Mock 方案
order: 6
category: ICE Design Pro
---

在前后端分离的开发中，Mock 数据是前端开发中很重要的一个环节，前端可以不必强依赖后端接口，只需要约定好对应的数据接口，前端可以通过 Mock 模拟数据先行开发，在后端接口开发完成后，只需要切换对应的接口地址即可，可以保证项目的同步开发。

在飞冰中，我们提供了完整的 Mock 方案，支持 CRUD 等操作，只需要在项目目录下新建 mock 文件夹，并配置入口文件 index.js 作为路由表的入口，在启动项目服务时工具会同步的启动 Mock 服务。

新建路由表

在项目根目录下创建 `projectName/mock/index.js` 文件

```
// mock/index.js
const foo = require('./foo.json');
const bar = require('./bar');

module.exports = {
  // 同时支持 GET 和 POST
  '/api/users/1': foo,
  '/api/foo/bar': bar(),

  // 支持标准 HTTP
  'GET /api/users': { users: [1, 2] },
  'DELETE /api/users': { users: [1, 2] },

  // 支持自定义函数，API 参考 express4
  'POST /api/users/create': (req, res) => {
    res.end('OK');
  },

  // 支持参数
  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id: id });
  },
};
```

通过 Iceworks 启动项目服务，假设启动的端口是 [http://localhost:4444](http://localhost:4444/)，打开浏览器如下：

![](https://cdn.yuque.com/lark/0/2018/png/71071/1531298503243-62862b39-3a29-4ab5-b7f4-b2ef7f30ed08.png)

## 实际应用

在模板中我们将服务接口统一维护在 `src/api/index.js` 中作为入口文件，有利于统一管理和可维护性，然后在需要引用的地方 `import { xxx } from '@api'` 即可；当然，也可以按照功能模块对接口进行归类：

目录组织：

```
// 目录组织：

- api
  - User.js
  - Home.js
  - index.js
```

```
// User.js

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

export async function postUserLogout() {
  return axios({
    url: '/api/logout',
    method: 'post',
  });
}

export async function getUserProfile() {
  return axios('/api/profile');
}
```
