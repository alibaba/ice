import projects from './projects';
import exclude from './excludeMock';

const status = 'SUCCESS';
// mock/index.js
export default {
  'GET /api/repo': {
    status,
    data: {
      group: 'ice.js',
      url: 'http://github.com/ice-lab/ice.js'
    }
  },
  'GET /api/projects': {
    status,
    data: projects
  },
  'GET /api/exclude': exclude,
};
