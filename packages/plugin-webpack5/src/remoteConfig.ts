import * as path from 'path';
import * as fse from 'fs-extra';
import * as cheerio from 'cheerio';
import { IPluginAPI } from '@alib/build-scripts';

export default (api: IPluginAPI, { remoteName, compileKeys, runtimeFolder, injectBundles, externals, bootstrap }) => {
  const { getValue, modifyUserConfig, onGetWebpackConfig, context } = api;
  // create boostrap for mf
  let bootstrapEntry = '';
  if (!bootstrap) {
    bootstrapEntry = path.join(getValue('TEMP_PATH'), 'bootstrap.ts');
    fse.writeFileSync(bootstrapEntry, 'import(\'../src/app\')', 'utf-8');
  } else {
    bootstrapEntry = path.isAbsolute(bootstrap) ? bootstrap : path.join(context.rootDir, bootstrap);
  }
  modifyUserConfig((modfiyConfig) => {
    const remotePlugins = [[require.resolve('./babelPluginRemote'), { libs: compileKeys, remoteName }]];
    return {
      babelPlugins: Array.isArray(modfiyConfig.babelPlugins) ? modfiyConfig.babelPlugins.concat(remotePlugins) : remotePlugins,
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

    // modify entry by onGetWebpackConfig while polyfill will take effect with src/app
    // config.entryPoints.clear();
    config.entry('index').values().forEach(entry => {
      if (entry.match(/\/src\/app/)) {
        config.entry('index').delete(entry);
      }
    });
    config.entry('index').add(bootstrapEntry);
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
