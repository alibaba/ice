import type { I18nConfig } from '../types.js';
import getLocaleFromCookie from './getLocaleFromCookie.js';
import normalizeLocalePath from './normalizeLocalePath.js';
import getPreferredLocale from './getPreferredLocale.js';

interface DetectLocaleParams {
  i18nConfig: I18nConfig;
  pathname: string;
  basename?: string;
  headers?: {
    [key: string]: string | string[];
  };
}

export default function detectLocale({
  i18nConfig,
  pathname,
  basename,
  headers = {},
}: DetectLocaleParams): string {
  const { pathLocale } = normalizeLocalePath({ pathname, locales: i18nConfig.locales, basename });
  const preferredLocale = getPreferredLocale(i18nConfig.locales, headers);
  debugger;
  const detectedLocale = (
    pathLocale ||
    getLocaleFromCookie(i18nConfig.locales, headers) ||
    preferredLocale ||
    i18nConfig.defaultLocale
  );

  return detectedLocale;
}
