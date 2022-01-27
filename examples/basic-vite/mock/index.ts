const status = 'SUCCESS';
// mock/index.js
export default {
  'GET /api/repo': {
    status,
    data: {
      group: 'ice.js',
      url: 'https://github.com/ice-lab/ice.js'
    }
  },
};
