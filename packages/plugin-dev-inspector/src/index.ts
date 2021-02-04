import { createLaunchEditorMiddleware } from 'react-dev-inspector/plugins/webpack';

const plugins = ({ onGetWebpackConfig }) => {
  onGetWebpackConfig((config) => {
    // inject source file path/line/column to JSX data attributes props
    config.module
      .rule('inspector')
      .test(/\.(jsx?|tsx)$/)
      .exclude
      .add(/node_modules/)
      .add(/\.ice\//)
      .end()
    // eslint-disable-next-line @typescript-eslint/indent
    .use('inspector')
      .loader('react-dev-inspector/plugins/webpack/inspector-loader')
      .options({})
      .end();

    // inject PWD (current working directory) env for runtime
    config
      .plugin('DefinePlugin')
      .tap(([args]) => [{ ...args,  'process.env.PWD': JSON.stringify(process.env.PWD) }]);

    // add webpack dev server middleware for launch IDE app with api request
    config.devServer.set('before', (app) => {
      app.use(createLaunchEditorMiddleware());
    });
  });
};

export default plugins;
