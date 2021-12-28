import { IPluginAPI } from 'build-scripts';
import path from 'path';
import { LocaleConfig } from './types';
import { LOCALE_COOKIE_KEY } from './constants';
import { expressLocaleMiddleware } from './localeMiddleware';

export default async function (
  { onGetWebpackConfig, getValue, applyMethod, context }: IPluginAPI, 
  localeConfig: LocaleConfig,
) {
  checkLocaleConfig(localeConfig);

  const { locales, defaultLocale, localeRoute = true } = localeConfig;

  const { userConfig: { ssr } } = context;

  const iceTemp = getValue<string>('TEMP_PATH');
  const localesTempDir = path.join(iceTemp, 'plugins', 'locale');

  applyMethod('modifyRenderData', (originRenderData) => {
    return { ...originRenderData, locales, defaultLocale };
  });

  // copy templates to .ice/locale dir
  applyMethod(
    'addPluginTemplate', 
    path.join(__dirname, 'templates'), 
    { LOCALE_COOKIE_KEY, localeConfig, localeRoute }
  );
  applyMethod(
    'addPluginTemplate',
    {
      template: path.join(__dirname, '../src/utils'),
      targetDir: 'locale/utils',
    },
    { LOCALE_COOKIE_KEY, localeConfig, localeRoute }
  );

  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/locale', path.join(localesTempDir, 'index.tsx'));

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
      app.get(pattern, expressLocaleMiddleware(localeConfig));

      if (typeof originalDevServeBefore === 'function') {
        originalDevServeBefore(...args);
      }
    }

    if (ssr) {      
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
      source: './plugins/locale', 
      importSource: '$$ice/plugins/locale',
      exportMembers: ['useLocale', 'getAllLocales', 'getDefaultLocale', 'getLocale']
    }); 
}

function checkLocaleConfig(localeConfig: LocaleConfig) {
  const { locales, defaultLocale } = localeConfig;
  if (!locales) {
    console.error(`[build-plugin-ice-locale] locales should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (!defaultLocale) {
    console.error(`[build-plugin-ice-locale] defaultLocale should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }
}