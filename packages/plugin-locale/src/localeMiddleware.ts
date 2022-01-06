import { LocaleConfig } from './types';
import getLocaleData from './utils/getLocaleData';

export function expressLocaleMiddleware(localeConfig: LocaleConfig, basename?: string) {
  return function (req, res, next) {
    const { headers, _parsedUrl } = req;
    const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, localeConfig, basename });
    if (redirectUrl) {
      res.redirect(307, redirectUrl);
    } else {
      next();
    }
  };
}

export function koaLocaleMiddleware(localeConfig: LocaleConfig, basename?: string) {
  return async function (ctx, next) {
    const { req, res } = ctx;
    const { headers, _parsedUrl } = req;
    const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, localeConfig, basename });

    if (redirectUrl) {
      res.redirect(307, redirectUrl);
    }
    await next();
  };
}