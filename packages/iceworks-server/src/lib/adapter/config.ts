import * as path from 'path';

const config = {
  page: {
    enable: true,
    path: path.join(__dirname, './page'),
  },

  dev: {
    enable: true,
    path: path.join(__dirname, './dev'),
  },
};

export default config;
