import replaceBasename from './replaceBasename';

/**
 * 开启国际化路由时，通过 pathname 获取当前语言
 */
function getDetectedLocaleFromPathname(pathname: string, locales: string[], basename?: string) {
  const normalizedPathname = replaceBasename(pathname, basename);
  const pathnameParts = normalizedPathname.split('/').filter(pathnamePart => pathnamePart);

  let detectedLocale: string | undefined;

  // eslint-disable-next-line no-restricted-syntax
  for (const locale of locales) {
    if (pathnameParts[0] === locale) {
      detectedLocale = locale;
      break;
    }
  }

  return detectedLocale;
}

export default getDetectedLocaleFromPathname;
