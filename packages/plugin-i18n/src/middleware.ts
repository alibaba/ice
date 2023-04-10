import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { I18nConfig } from './types.js';
import detectLocale from './utils/detectLocale.js';
import getLocaleRedirectPath from './utils/getLocaleRedirectPath.js';

export default function createI18nMiddleware(i18nConfig: I18nConfig, basename?: string): Middleware {
  const middleware: ExpressRequestHandler = async function (req, res, next) {
    const detectedLocale = detectLocale({
      i18nConfig,
      basename,
      pathname: req.path,
      headers: req.headers,
    });
    const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

    const localeRedirectPath = getLocaleRedirectPath({
      pathname: req.path,
      defaultLocale: i18nConfig.defaultLocale,
      detectedLocale,
      basename,
    });
    if (localeRedirectPath) {
      url.pathname = localeRedirectPath;
      res.redirect(
        String(Object.assign(new URL(`${req.protocol}://${req.get('host')}`), url)),
      );
    } else {
      next();
    }
  };

  return {
    name: 'plugin-i18n-auto-redirect',
    middleware,
  };
}
