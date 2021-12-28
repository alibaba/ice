import { getLocaleData } from './utils/getLocaleData';

export function expressLocaleMiddleware(localeConfig) {
  return function (req, res, next) {
    const { headers, _parsedUrl } = req;
    const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, localeConfig });
    if (redirectUrl) {
      res.redirect(307, redirectUrl);
    } else {
      next();
    }
  };
}

export function koaLocaleMiddleware(localeConfig) {
  return async function (ctx, next) {
    const { req, res } = ctx;
    const { headers, _parsedUrl } = req;
    const { redirectUrl } = getLocaleData({ headers, url: _parsedUrl, localeConfig });

    if (redirectUrl) {
      res.redirect(307, redirectUrl);
    }
    await next();
  };
}