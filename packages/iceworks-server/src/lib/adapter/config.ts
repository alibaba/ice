import * as path from 'path';

const config = {
  project: {
    enable: true,
    path: path.join(__dirname, './project'),
  },

  dev: {
    enable: true,
    path: path.join(__dirname, './dev'),
  },
};

export default config;
