import { I18nConfig } from '../types';
import replaceBasename from './replaceBasename';

function normalizeLocalePath(
  pathname: string,
  i18nConfig: I18nConfig,
  basename?: string,
) {
  pathname = replaceBasename(pathname, basename);
  const { defaultLocale, locales } = i18nConfig;
  const subPaths = pathname.split('/');
  let detectedLocale = defaultLocale;

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of locales) {
    if (subPaths[1] && subPaths[1] === locale) {
      detectedLocale = locale;
      subPaths.splice(1, 1);
      pathname = subPaths.join('/') || '/';
      break;
    }
  }

  return {
    pathname,
    detectedLocale,
  };
}

export default normalizeLocalePath;
