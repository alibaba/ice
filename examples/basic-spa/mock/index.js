const projects = require('./projects');

// mock/index.js
module.exports = {
  'GET /api/repo': {
    status: 'SUCCESS',
    data: {
      group: 'ice.js',
      url: 'http://github.com/ice-lab/ice.js'
    }
  },

  'GET /api/projects': {
   status: 'SUCCESS',
   data: projects
  }
};
