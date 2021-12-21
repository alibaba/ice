import { IPluginAPI } from 'build-scripts';
import * as path from 'path';
import { parse as cookieParse } from 'cookie';
import { pick as acceptLanguagePick } from 'accept-language-parser';
import { LocaleConfig } from './types';

const LOCALE_COOKIE_KEY = 'ice_locale';

export default async function (
  { onGetWebpackConfig, getValue, applyMethod }: IPluginAPI, 
  localeConfig: LocaleConfig,
) {
  const { locales, defaultLocale } = localeConfig;

  const iceTemp = getValue<string>('TEMP_PATH');

  applyMethod('modifyRenderData', (originRenderData) => {
    return { ...originRenderData, locales, defaultLocale };
  });

  // copy templates to .ice/locale dir
  const templatesDir = path.join(__dirname, 'templates');
  applyMethod('addPluginTemplate', templatesDir, { locales, defaultLocale, LOCALE_COOKIE_KEY });

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
        const detectedLocale = getDetectedLocale(localeConfig, req.headers);
        const redirectUrl = getRedirectUrl(req, { default: defaultLocale, detected: detectedLocale });
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
  });

  // export API
  // import { useLocale } from 'ice';
  applyMethod('addExport', { source: './plugins/locale', importSource: '$$ice/plugins/locale', exportMembers: ['useLocale'] }); 
}

function getDetectedLocale(localeConfig: LocaleConfig, requestHeader: Record<string, any>) {
  const detectedLocale = getLocaleFromCookie(localeConfig, requestHeader) || 
  getAcceptPreferredLocale(localeConfig, requestHeader) ||
  localeConfig.defaultLocale;

  return detectedLocale;
}

function getLocaleFromCookie(localeConfig: LocaleConfig, requestHeader: Record<string, any>) {
  const { cookie = '' } = requestHeader;
  const cookies = cookieParse(cookie);
  const iceLocale = cookies[LOCALE_COOKIE_KEY];

  return iceLocale
    ? localeConfig.locales.find(locale => iceLocale === locale)
    : undefined;
}

function getAcceptPreferredLocale(localeConfig: LocaleConfig, requestHeader: Record<string, any>) {
  const acceptLanguageValue = requestHeader['accept-language'];
  const language = acceptLanguagePick(localeConfig.locales, acceptLanguageValue);

  return language;
}

function getRedirectUrl(req: any, locale: { default: string, detected: string }){
  const parsedUrl = req._parsedUrl;
  const { pathname, search } = parsedUrl;
  const isRootPath = pathname === '/';
  if (isRootPath && locale.default !== locale.detected) {
    return `${pathname}${locale.detected}${search}`;
  }

  return undefined;
}