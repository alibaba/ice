import * as path from 'path';
import * as chokidar from 'chokidar';

export default (api, options: any = {}) => {
  const { registerMethod, context, applyMethod } = api;
  const { rootDir } = context;
  const { render } = options;

  const watchEvents = [];
  registerMethod('watchFileChange', (pattern, action) => {
    watchEvents.push([pattern, action]);
  });
  chokidar.watch(path.join(rootDir, 'src'), {
    ignoreInitial: true,
  }).on('all', (event, filePath) => {
    watchEvents.forEach(([pattern, action]) => {
      filePath = applyMethod('formatPath', filePath);
      if (pattern instanceof RegExp && pattern.test(filePath)) {
        action(event, filePath);
      } else if (typeof pattern === 'string' && filePath.includes(pattern)) {
        action(event, filePath);
      }
    });
  });

  // watch pages change
  watchEvents.push([/src\/pages\/[A-Za-z.$]+$/, () => {
    render();
  }]);

  // rerender when global style file added or removed
  watchEvents.push([/src\/global.(scss|less|styl|css)/, async (event: string) => {
    if (event === 'unlink' || event === 'add') {
      await render();
    }
  }]);
};
