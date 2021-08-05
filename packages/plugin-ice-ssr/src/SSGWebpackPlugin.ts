import { join } from 'path';
import * as fse from 'fs-extra';

function SSGWebpackPlugin(options) {
  this.options = options;
}

SSGWebpackPlugin.prototype.apply = function (compiler) {
  const { renderFilePath, buildDir, command } = this.options;
  compiler.hooks.afterEmit.tap('SSGWebpackPlugin', async () => {
    // eslint-disable-next-line
    const render = require(renderFilePath);
    const htmlTemplate = fse.readFileSync(join(buildDir, 'index.html'), 'utf8');
    const routesHtml = await render.default({ htmlTemplate, command });
    routesHtml.forEach(({ html, path }) => {
      const pathArr = path.split('/').filter((item: string) => item);
      const htmlPath = join(buildDir, ...pathArr, 'index.html');
      fse.ensureFileSync(htmlPath);
      fse.writeFileSync(htmlPath, html);
    });
  });
};

export default SSGWebpackPlugin;
