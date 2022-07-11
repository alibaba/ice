import replaceBasename from './replaceBasename';

/**
 * 开启国际化路由时，通过 pathname 获取当前语言
 */
function getDetectedLocaleFromPathname(
  { 
    pathname, 
    locales,
    defaultLocale,
    basename,
  }: { 
    pathname: string;
    locales: string[];
    defaultLocale: string;
    basename?: string;
  }) {
  const normalizedPathname = replaceBasename(pathname, basename);
  const pathnameParts = normalizedPathname.split('/').filter(pathnamePart => pathnamePart);

  let detectedLocale = defaultLocale;
  for (let index = 0; index < locales.length; index++) {
    const locale = locales[index];
    if (pathnameParts[0] === locale) {
      detectedLocale = locale;
      break;
    }
  }

  return detectedLocale;
}

export default getDetectedLocaleFromPathname;
