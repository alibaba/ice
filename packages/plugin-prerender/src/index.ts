import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as  PrerenderSPAPlugin from 'prerender-spa-plugin';

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const plugin: IPlugin = ({ context, onGetWebpackConfig }, options) => {
  const { rootDir, userConfig } = context;
  const outputDir = (userConfig.outputDir || 'build') as string;
  const { routes = ['/'], minify = {}, renderer = {} }: any = options;

  onGetWebpackConfig((config) => {
    if (userConfig.mpa) {
      routes.forEach((route: string) => {
        const entryName = route.replace('/', '');

        config.plugin(`HtmlWebpackPlugin_${entryName}`).tap((args) => {
          return [{ ...args[0], filename: `${entryName}/index.html` }];
        })
          .end()
          .plugin(`PrerenderSPAPlugin_${entryName}`).use(PrerenderSPAPlugin, [{
            staticDir: path.join(rootDir, outputDir),
            routes: [route],
            indexPath: path.join(rootDir, outputDir, `/${entryName}/index.html`),
            minify,
            renderer: new Renderer(renderer)
          }]);
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