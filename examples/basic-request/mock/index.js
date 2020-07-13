module.exports = {
  'GET /api/repo': {
    name: 'icejs',
    url: 'http://github.com/ice-lab/ice.js'
  },

  'GET /api/user': {
    name: 'taoxiaobao',
    age: '21'
  },

  'GET /api2/user': {
    name: 'taobao',
    age: '18'
  },

  'DELETE /api/user/123': {
    user: 123
  },

  'POST /api/users/:id': (req, res) => {
    const { id } = req.params;
    res.send({ id });
  },
};
