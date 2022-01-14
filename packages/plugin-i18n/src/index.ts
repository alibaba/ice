import { IPluginAPI } from 'build-scripts';
import path from 'path';
import { I18nConfig } from './types';
import { LOCALE_COOKIE_KEY } from './constants';
import { expressI18nMiddleware } from './middleware';

export default async function (
  { onGetWebpackConfig, getValue, applyMethod, context }: IPluginAPI, 
  i18nConfig: I18nConfig,
) {
  checkI18nConfig(i18nConfig);

  const { i18nRouting = true, redirect = false } = i18nConfig;

  const { userConfig: { ssr } } = context;

  const iceTemp = getValue<string>('TEMP_PATH');
  const i18nTempDir = path.join(iceTemp, 'plugins', 'i18n');

  applyMethod('modifyRenderData', (originRenderData) => {
    return { ...originRenderData, i18n: { ...i18nConfig } };
  });

  // copy templates to .ice/i18n dir
  applyMethod(
    'addPluginTemplate', 
    path.join(__dirname, 'templates'), 
    { LOCALE_COOKIE_KEY, i18nConfig, i18nRouting }
  );
  applyMethod(
    'addPluginTemplate',
    {
      template: path.join(__dirname, '../src/utils'),
      targetDir: 'i18n/utils',
    },
  );

  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/i18n', path.join(i18nTempDir, 'index.tsx'));

    const onBeforeSetupMiddleware = config.devServer.get('onBeforeSetupMiddleware'); // webpack 5
    const originalDevServeBefore = onBeforeSetupMiddleware || config.devServer.get('before');

    function devServerBefore(...args: any[]) {
      const [devServer] = args;
      let app;
      if (onBeforeSetupMiddleware) {
        app = devServer.app;
      } else {
        app = devServer;
      }

      const pattern = /^\/?((?!\.(js|css|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf|ico)).)*$/;
      app.get(pattern, expressI18nMiddleware(i18nConfig));

      if (typeof originalDevServeBefore === 'function') {
        originalDevServeBefore(...args);
      }
    }

    if (ssr && redirect) {
      if (onBeforeSetupMiddleware) {
        config.merge({
          devServer: {
            onBeforeSetupMiddleware: devServerBefore,
          }
        });
      } else {
        config.merge({
          devServer: {
            before: devServerBefore,
          }
        });
      }
    }
  });

  // export API
  // import { useLocale, getAllLocales, getDefaultLocale, getLocale } from 'ice';
  applyMethod(
    'addExport', 
    { 
      source: './plugins/i18n', 
      importSource: '$$ice/plugins/i18n',
      exportMembers: ['useLocale', 'getAllLocales', 'getDefaultLocale', 'getLocale']
    });
}

function checkI18nConfig(i18nConfig: I18nConfig) {
  const { locales, defaultLocale } = i18nConfig;
  if (!locales) {
    console.error(`[build-plugin-ice-i18n] locales should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (!defaultLocale) {
    console.error(`[build-plugin-ice-i18n] defaultLocale should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}