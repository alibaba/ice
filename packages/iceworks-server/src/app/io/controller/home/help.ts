import * as path from 'path';

export default (app) => {
  const { Controller } = app;

  return class HelpController extends Controller {
    async getPath({ args }) {
      return path.join(...args);
    }
  };
};
