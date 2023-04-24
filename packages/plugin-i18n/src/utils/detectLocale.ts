import type { I18nConfig } from '../types.js';
import getLocaleFromCookie from './getLocaleFromCookie.js';
import normalizeLocalePath from './normalizeLocalePath.js';
import getPreferredLocale from './getPreferredLocale.js';

interface DetectLocaleParams {
  locales: I18nConfig['locales'];
  defaultLocale: I18nConfig['defaultLocale'];
  pathname: string;
  disableCookie: boolean;
  basename?: string;
  headers?: {
    [key: string]: string | string[];
  };
}

export default function detectLocale({
  locales,
  defaultLocale,
  pathname,
  basename,
  disableCookie,
  headers = {},
}: DetectLocaleParams): string {
  const detectedLocale = (
    normalizeLocalePath({ pathname, locales, basename }).pathLocale ||
    (!disableCookie && getLocaleFromCookie(locales, headers)) ||
    getPreferredLocale(locales, headers) ||
    defaultLocale
  );

  return detectedLocale;
}
