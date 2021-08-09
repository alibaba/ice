import { join } from 'path';
import * as fse from 'fs-extra';

function SSGWebpackPlugin(options) {
  this.options = options;
}

interface RenderRoute {
  path: string;
  html: string;
  strict?: boolean;
  sensitive?: boolean;
  exact?: boolean;
}

SSGWebpackPlugin.prototype.apply = function (compiler) {
  const { renderFilePath, buildDir, command } = this.options;
  compiler.hooks.afterEmit.tap('SSGWebpackPlugin', async () => {
    const routeConfigsPath = join(buildDir, 'server', 'ssg-data.json');
    const routeConfigs = [];

    // eslint-disable-next-line
    const render = require(renderFilePath);
    const htmlTemplate = fse.readFileSync(join(buildDir, 'index.html'), 'utf8');
    const renderRoutes: RenderRoute[] = await render.default({ htmlTemplate, command });
    const defaultRoute = renderRoutes.find(renderRoute => renderRoute.path === '/__ice_default_route__');
    renderRoutes.forEach((renderRoute) => {
      const { html, path } = renderRoute;
      const htmlPath = join(buildDir, path, 'index.html');
      // write html
      fse.ensureFileSync(htmlPath);
      fse.writeFileSync(htmlPath, html);
      // write html and other route configs to json, ensure  ssgRender function can find the html
      // e.g.
      // [
      //   {
      //     "path": "/",
      //     "html": "<html>xx</html>",
      //     "strict": true
      //   }
      // ]
      routeConfigs.push(renderRoute);
    });
    fse.ensureFileSync(routeConfigsPath);
    fse.writeJSONSync(routeConfigsPath, { defaultHtml: defaultRoute.html, routes: routeConfigs }, { spaces: 2 });
  });
};

export default SSGWebpackPlugin;
