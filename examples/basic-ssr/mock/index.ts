module.exports = {
  'GET /api/user': {
    status: 'SUCCESS',
    data: {
      user: {
        name: 'Jack Ma',
        id: 10001,
      }
    },
  },
  'GET /api/profile': {
    status: 'SUCCESS',
    data: {
      profile: {
        id: 10001,
        name: 'Jack Ma',
        edu: 'Hangzhou Normal University',
        address: 'Hangzhou'
      }
    },
  },
};
