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
  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
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
