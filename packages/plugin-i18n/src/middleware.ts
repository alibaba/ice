import { I18nConfig } from './types';
import getLocaleData from './utils/getLocaleData';

export function expressI18nMiddleware(i18nConfig: I18nConfig, basename?: string) {
  return function (req, res, next) {
    const { headers, _parsedUrl } = req;
    const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, i18nConfig, basename });
    if (redirectUrl) {
      res.redirect(307, redirectUrl);
    } else {
      next();
    }
  };
}

export function koaI18nMiddleware(i18nConfig: I18nConfig, basename?: string) {
  return async function (ctx, next) {
    const { req, res } = ctx;
    const { headers, _parsedUrl } = req;
    const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, i18nConfig, basename });

    if (redirectUrl) {
      res.redirect(307, redirectUrl);
    }
    await next();
  };
}