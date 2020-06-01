import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as  PrerenderSPAPlugin from 'prerender-spa-plugin';

const plugin: IPlugin = ({ context, onGetWebpackConfig }, options) => {
  const { rootDir, userConfig } = context;

  const outputDir = (userConfig.outputDir || 'build') as string;
  let { routes }: any = options;

  routes = routes || ['/'];

  onGetWebpackConfig((config) => {
    config.optimization
      .minimizer('prerenderSPAPlugin')
      .use(PrerenderSPAPlugin, [{
        staticDir: path.join(rootDir, outputDir),
        routes,  // Required - Routes to render.
        // outputDir: path.join(__dirname, 'prerendered'),
        // indexPath: path.join(__dirname, 'dist', 'index.html'),
        // minify: {
        //   collapseBooleanAttributes: true,
        //   collapseWhitespace: true,
        //   decodeEntities: true,
        //   keepClosingSlash: true,
        //   sortAttributes: true
        // },
        // server: {
        //   port: 8001
        // },
        // postProcess,
      }]);
  });
};

export default plugin;