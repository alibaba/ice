---
title: 数据模拟 Mock
order: 7
---

:::caution
小程序端不支持该能力。
:::

在前后端分离的开发中，Mock 数据是前端开发中很重要的一个环节，前端可以不必强依赖后端接口，只需要约定好对应的数据接口，前端可以通过 Mock 模拟数据先行开发，在后端接口开发完成后，只需要切换对应的接口地址即可，可以保证项目的同步开发。

ice.js 提供了开箱即用的 Mock 方案，支持 CRUD 等操作，在启动本地调试时会自动启用 Mock 服务。

## 目录约定

只需要在项目目录下新建 `/mock` 目录，并增加 `js` 或 `ts` 文件作为 `mock` 服务文件。比如有以下的目录结构：

```markdown
├── mock
|  ├── index.ts
|  └── user.ts
├── src
└── package.json
```

`mock` 目录下的 `index.ts` 和 `user.ts` 会被识别为 Mock 服务文件。

如果某些文件不需要被 mock 服务解析，可以通过工程配置进行自定义：

```js title="ice.config.mts"
import { defineConfig } from '@ice/app';

export default defineConfig(() => ({
  mock: {
    // 忽略 mock 目录中 custom 目录下的文件以及 api.ts 文件
    exclude: ["custom/**", "api.ts"]
  },
}));
```

## 编写 Mock 接口

在 mock 服务文件中写入以下代码：

```ts title="./mock/user.ts"
export default {
  'GET /api/users': [
    { name: 'foo', id: 0 },
    { name: 'bar', id: 1 },
  ],
}
```

启动调试服务后，假设启动的端口是 `3000`，直接在浏览器里访问 <http://127.0.0.1:3000/api/users> 即可看到接口返回数据。

### 请求方法

默认支持 `GET`, `POST`, `PUT`, `DELETE`, `PATCH`, `HEAD`, `OPTIONS` 请求方法。示例代码如下：

```ts
export default {
  // 当 HTTP 请求方法是 GET，可以省略请求方法
  '/api/users': [{ name: 'foo', id: 1 }, { name: 'bar', id: 2 }],
  // 等同于上面的写法
  'GET /api/users': [{ name: 'foo', id: 1 }, { name: 'bar', id: 2 }],

  'POST /api/user': { users: [1, 2] },

  'DELETE /api/users/1': { name: 'foo' },
}
```

### 返回值

返回值支持 `String`、`Array`、`Object` 类型。比如：

```ts
export default {
  // 返回值是 String 类型
  'GET /api/name': 'foo',
  // 返回值 Array 类型 
 'POST /api/users': [
    { name: 'foo', id: 0 },
    { name: 'bar', id: 1 },
  ],
  // 返回值是 Object 类型
  'DELETE /api/users/1': { name: 'bar', id: 1 },
}
```

除此以外，还可以使用函数的形式来计算返回值，这在需要动态返回接口数据时很有用，如：

```ts
import type { Request, Response } from '@ice/app';

export default {
  'POST /api/users/:id': (request: Request, response: Response) => {
    const { id } = request.params;
    response.send({ id: id });
  },
}
```

## 关闭 Mock

当后端接口开发完成以后。此时可以通过以下命令关闭 Mock 服务：

```bash
# 关闭 Mock 服务
$ npm run start -- --no-mock
```

这样我们可以请求到后端返回的数据了。

## 使用 Mock.js

[Mock.js](https://github.com/nuysoft/Mock) 是一个随机生成 mock 数据的工具库，可以帮助我们快速生成随机的模拟数据。

```ts
import mockjs from 'mockjs';

export default {
  'GET /api/list': (req, res) => {
    const list = Mock.mock({
      'list|1-10': [
        {
          'id|+1': 1,
        },
      ],
    });
    res.send({
      status: 'SUCCESS',
      data: {
        list,
      }
    });
  },
};
```

完整的语法请参考 [Mock.js 文档](http://mockjs.com/examples.html)。

## 处理请求数据

如果用户希望使用一些中间件来处理请求的数据（`req` 对象），可以参考以下的示例代码：

```ts
import bodyParser from 'body-parser';
import type { Request, Response } from 'express';

export default {
  'POST /api/login': (req: Request, res: Response) => {
    bodyParser.json({ limit: '5mb', strict: false })(req, res, () => {
      console.log(req.body);

      res.send({});
    })
  },
}
```
