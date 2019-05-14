import * as path from 'path';

const config = {
  page: {
    enable: true,
    path: path.join(__dirname, './page'),
  },

  dependency: {
    enable: true,
    path: path.join(__dirname, './dependency'),
  },

  dev: {
    enable: true,
    path: path.join(__dirname, './dev'),
  },
};

export default config;
