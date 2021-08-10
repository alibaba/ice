import { join } from 'path';
import * as fse from 'fs-extra';

interface RenderRoute {
  path: string;
  html: string;
  strict?: boolean;
  sensitive?: boolean;
  exact?: boolean;
}

// this webpack plugin only works on build mode
function SSGWebpackPlugin(options) {
  this.options = options;
}

SSGWebpackPlugin.prototype.apply = function (compiler) {
  const { serverFilePath, buildDir } = this.options;
  compiler.hooks.afterEmit.tap('SSGWebpackPlugin', async () => {
    const renderDataPath = join(buildDir, 'server', 'render-data.json');
    const renderData = [];

    // eslint-disable-next-line
    const server = require(serverFilePath);
    const htmlTemplate = fse.readFileSync(join(buildDir, 'index.html'), 'utf8');
    const renderRoutes: RenderRoute[] = await server.default({ htmlTemplate });
    const defaultRoute = renderRoutes.find(renderRoute => renderRoute.path === '/__ice_default_page__');
    renderRoutes.forEach((renderRoute) => {
      const { html, path } = renderRoute;
      const htmlPath = join(buildDir, path, 'index.html');
      // write route html
      fse.ensureFileSync(htmlPath);
      fse.writeFileSync(htmlPath, html);
      // save html and other route configs to json, ensure ssgRender function can find the html
      // e.g.: const renderRoute = { path: "/", html: "<html>xx</html>",  strict: true }
      renderData.push(renderRoute);
    });
    // write
    fse.ensureFileSync(renderDataPath);
    fse.writeJSONSync(renderDataPath, { defaultHtml: defaultRoute.html, renderRoutes: renderData }, { spaces: 2 });
  });
};

export default SSGWebpackPlugin;
