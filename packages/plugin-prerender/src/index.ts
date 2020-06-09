import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as  PrerenderSPAPlugin from 'prerender-spa-plugin';

const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;

const plugin: IPlugin = ({ context, onGetWebpackConfig }, options) => {
  const { rootDir, userConfig } = context;

  // const isMpa = userConfig.mpa as boolean;
  const outputDir = (userConfig.outputDir || 'build') as string;
  const { routes = ['/'], minify = {}, renderer = {} }: any = options;

  onGetWebpackConfig((config) => {
    config.optimization
      .minimizer('prerenderSPAPlugin')
      .use(PrerenderSPAPlugin, [{
        staticDir: path.join(rootDir, outputDir),
        routes,
        indexPath: path.join(rootDir, outputDir, 'index.html'),
        minify,
        renderer: new Renderer(renderer)
      }]);
  });
};

export default plugin;