import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as  PrerenderSPAPlugin from 'prerender-spa-plugin';

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const plugin: IPlugin = ({ context, applyMethod, onGetWebpackConfig }, options) => {
  const { rootDir, userConfig } = context;
  const outputDir = (userConfig.outputDir || 'build') as string;
  const { routes = ['/'], minify = {}, renderer = {} }: any = options;
  onGetWebpackConfig((config) => {
    if (userConfig.mpa) {
      const pages = applyMethod('getPages', rootDir);
      const prerenderRoutes = pages.filter((page) => {
        return routes.find(route => route.replace('/', '') === page.toLocaleLowerCase());
      });
      console.log('prerenderRoutes', prerenderRoutes);
      pages.forEach((page: string) => {
        const entryName = page.toLocaleLowerCase();
        const entryKey = `HtmlWebpackPlugin_${entryName}`;
        if (config.plugins.get(entryKey)) {
          config.plugin(entryKey).tap((args) => {
            return [{ ...args, filename: `${entryName}.html/index.html` }];
          });
          config.plugin(entryName).use(PrerenderSPAPlugin, [{
            staticDir: path.join(rootDir, outputDir),
            routes: [`/${entryName}.html`],
            indexPath: path.join(rootDir, outputDir, `/${entryName}.html/index.html`),
            minify,
            renderer: new Renderer(renderer)
          }]);
        }
      });
    } else {
      config.plugin('prerenderSPAPlugin').use(PrerenderSPAPlugin, [{
        staticDir: path.join(rootDir, outputDir),
        routes,
        indexPath: path.join(rootDir, outputDir, 'index.html'),
        minify,
        renderer: new Renderer(renderer)
      }]);
    }
  });
};

export default plugin;