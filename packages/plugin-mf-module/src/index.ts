import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import { getWebpackConfig } from 'build-scripts-config';
import getPkgInfo from './getPkgInfo';
import { ModuleFederation } from './types';

// eslint-disable-next-line
const chalk = require('chalk');

const plugin: IPlugin = ({ context, registerTask  }) => {
  const { command, userConfig, webpack, commandArgs, pkg, rootDir } = context;

  const moduleFederation = ((userConfig)).moduleFederation as any as ModuleFederation;

  if (!moduleFederation?.exposes) {
    console.log(chalk.red('moduleFerderation must be set!'));
    return;
  }

  const mode = command === 'start' ? 'development' : 'production';
  const baseConfig = getWebpackConfig(mode);

  baseConfig.name('MicroMFModule');

  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
    'process.env.SERVER_PORT': JSON.stringify(commandArgs.port),
  };
  baseConfig.plugin('DefinePlugin')
    .use((webpack as any).DefinePlugin, [defineVariables])
    .end();

  // clear entry point
  baseConfig.entryPoints.clear();

  //
  const { pkgName, dependencies } = getPkgInfo(pkg);

  // @ts-ignore
  const { ModuleFederationPlugin } = webpack?.container;

  const exposes = Object.keys(moduleFederation.exposes).reduce((pre, next) => {
    const expose = moduleFederation.exposes[next];
    return {
      ...pre,
      next: path.isAbsolute(expose) ? expose: path.join(rootDir, expose),
    };
  }, {});

  const singleton = {
    react: {
      singleton: true,
    },
    'react-dom': {
      singleton: true,
    }
  };

  const shared = {
    ...dependencies as object,
    ...singleton,
  };

  baseConfig.plugin('mf').use(ModuleFederationPlugin, [
    {
      name: pkgName,
      library: { type: 'var', name: pkgName },
      filename: 'remoteEntry.js',
      ...moduleFederation,
      exposes,
      shared,
    },
  ]);

  registerTask('icestark-mf-module', baseConfig);
};

export default plugin;
