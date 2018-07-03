# mock-dev-server

mock-dev-server 是一个 express 服务的中间件

读取项目目录下的 `mock/index.js` 文件生成，会配置对应的接口。

## 示例

```js
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

## 服务代码使用方法

```js
// server.js
const express = require('express');

const mockServer = require('mock-server');

const app = express();

mockServer(app);

app.get('/', (req, res) => res.send('hello world'));

app.listen(6001, () => {
  console.log('Example app listening on port 6001!');
  console.log('http://127.0.0.1:6001');
});
```
