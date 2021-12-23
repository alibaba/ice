import { IPluginAPI } from 'build-scripts';
import path from 'path';
import { LocaleConfig } from './types';
import { LOCALE_COOKIE_KEY } from './constants';
import { getLocaleData } from './getLocaleData';

export default async function (
  { onGetWebpackConfig, getValue, applyMethod, context }: IPluginAPI, 
  localeConfig: LocaleConfig,
) {
  const { locales, defaultLocale, localeRoute = true } = localeConfig;

  if (!locales) {
    console.error(`[build-plugin-ice-locale] locales should be array but received ${typeof locales}`);
    process.exit(1);
  }
  if (!defaultLocale) {
    console.error(`[build-plugin-ice-locale] defaultLocale should be string but received ${typeof defaultLocale}`);
    process.exit(1);
  }

  const { userConfig: { ssr } } = context;

  const iceTemp = getValue<string>('TEMP_PATH');

  applyMethod('modifyRenderData', (originRenderData) => {
    return { ...originRenderData, locales, defaultLocale };
  });

  // copy templates to .ice/locale dir
  const templatesDir = path.join(__dirname, 'templates');
  applyMethod(
    'addPluginTemplate', 
    templatesDir, 
    { locales, defaultLocale, LOCALE_COOKIE_KEY, localeRoute }
  );

  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/locale', path.join(iceTemp, 'plugins', 'locale', 'index.tsx'));

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
      app.get(pattern, function(req, res, next) {
        const { headers, _parsedUrl } = req;
        const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, localeConfig });
        if (redirectUrl) {
          res.redirect(302, redirectUrl);
        } else {
          next();
        }
      });

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
  // import { useLocale } from 'ice';
  applyMethod('addExport', { source: './plugins/locale', importSource: '$$ice/plugins/locale', exportMembers: ['useLocale'] }); 
}
