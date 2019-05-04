import * as path from 'path';

export = {
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  io: {
    enable: true,
    package: 'egg-socket.io',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },

  projectClient: {
    enable: true,
    path: path.join(__dirname, '../lib/plugin/project-client'),
  }
};
