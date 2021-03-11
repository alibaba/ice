import * as path from 'path';
import * as fse from 'fs-extra';
import * as cheerio from 'cheerio';
import { IPluginAPI } from '@alib/build-scripts';

export default (api: IPluginAPI, { remoteName, compileKeys, runtimeFolder, injectBundles, externalMap }) => {
  const { context, getValue, modifyUserConfig, onGetWebpackConfig } = api;
  const { userConfig } = context;
  // create boostrap for mf
  const bootstrapPath = path.join(getValue('TEMP_PATH'), 'bootstrap.ts');
  fse.writeFileSync(bootstrapPath, 'import(\'../src/app\')', 'utf-8');
  modifyUserConfig((modfiyConfig) => {
    const remotePlugins = [[require.resolve('./babelPluginRemote'), { libs: compileKeys, remoteName }]];
    return {
      babelPlugins: Array.isArray(modfiyConfig.babelPlugins) ? modfiyConfig.babelPlugins.concat(remotePlugins) : remotePlugins,
      entry: bootstrapPath,
      moduleFederation: {
        name: 'app',
        remoteType: 'window',
        remotes: [remoteName],
      },
      sourceDir: 'src',
    };
  });
  onGetWebpackConfig((config) => {
    config.plugin('CopyWebpackPlugin').tap(([args]) => {
      // serve remoteRuntime foder
      return [[...args, { from: runtimeFolder, to: path.join(args[0].to, 'remoteRuntime') }]];
    });

    const externals = [];
    if (userConfig.externals) {
      externals.push(userConfig.externals);
    }
    externals.push(externalMap);
    config.externals(externals);
    // inject runtime entry and externals umd
    if (config.plugins.get('HtmlWebpackPlugin')) {
      config
        .plugin('HtmlWebpackPlugin')
        .tap(([args]) => {
          const templateContent = fse.readFileSync(args.template);
          const $ = cheerio.load(templateContent);
          injectBundles.forEach((bundleUrl) => {
            if (path.extname(bundleUrl) === '.js') {
              $('head').append(`<script src="${bundleUrl}"></script>`);
            } else {
              $('head').append(`<link rel="stylesheet" type="text/css" href="${bundleUrl}">`);
            }
          });
          delete args.template;
          return [{
            ...args,
            templateContent: $.html(),
          }];
        });
    }
  });
};
