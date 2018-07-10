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
