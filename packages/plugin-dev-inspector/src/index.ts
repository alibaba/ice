import * as path from 'path';
import * as fse from 'fs-extra';
import { createLaunchEditorMiddleware } from 'react-dev-inspector/plugins/webpack';

const plugins = ({ onGetWebpackConfig, getValue, applyMethod }) => {
  const iceTempPath = getValue('TEMP_PATH');
  // copy types
  fse.copySync(path.join(__dirname, '../src/types.ts'), path.join(iceTempPath, 'inspector/types.ts'));
  // set IInspectorProps to IAppConfig
  applyMethod('addAppConfigTypes', { source: './inspector/types', specifier: '{ IInspectorProps }', exportName: 'inspector?: IInspectorProps' });
  // export InspectorConfig to the public
  applyMethod('addTypesExport', { source: './inspector/types' });

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
