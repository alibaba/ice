---
title: 本地 Mock 数据
order: 11
---

在前后端分离的开发中，Mock 数据是前端开发中很重要的一个环节，前端可以不必强依赖后端接口，只需要约定好对应的数据接口，前端可以通过 Mock 模拟数据先行开发，在后端接口开发完成后，只需要切换对应的接口地址即可，可以保证项目的同步开发。

在飞冰中，我们提供了完整的 Mock 方案，支持 CRUD 等操作，只需要在项目目录下新建 mock 文件夹，并配置入口文件 `index.ts` 作为路由表的入口，在启动项目服务时工具会同步的启动 Mock 服务。

## 编写 mock 接口

在项目根目录下新建 `mock/index.ts` 文件，并写入以下示例代码：

```ts
export default {
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

启动调试服务后，假设启动的端口是 3333，直接在浏览器里访问 `http://127.0.0.1:3333/api/users` 即可看到接口返回数据。

## 约定规则

默认约定项目 mock 目录下每一个 `(t|j)s` 文件为 mock 服务文件，即需要使用上述规范返回数据接口。
如果存在 mock 服务通用工具脚本和数据脚本，可以将对应的文件存放在 `mock/excludeMock` 目录下，该目录下默认不走 mock 逻辑。

忽略 mock 的文件，可以通过工程配置进行自定义：

```json
{
  "mock": {
    "exclude": ["**/custom/**", "**/*.ts"]
  }
}
```

> 上述规则代表忽略 mock 目录中所有 `custom` 目录下的文件以及所有 ts 类型文件

## 请求数据

```jsx
import { useRequest } from 'ice';

function ListView(props) {
  const { data, loading, error, request } = useRequest({
    url: '/api/users/1',
    method: 'GET',
  });

  useEffect(() => {
    request();
  }, []);

  console.log(data);

  return (
    <>
      // jsx
    </>
  );
}
```

## 使用 Mock.js

[Mock.js](https://github.com/nuysoft/Mock) 是一个随机生成 mock 数据的工具库：

```ts
import * as Mock from 'mockjs';

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

完整的语法情参考 [Mock.js 文档](http://mockjs.com/examples.html) 。
