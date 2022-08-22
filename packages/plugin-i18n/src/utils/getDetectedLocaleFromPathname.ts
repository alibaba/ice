import replaceBasename from './replaceBasename';

interface GetDetectedLocalFromPathnameParams {
  pathname: string;
  locales: string[];
  basename?: string;
}
/**
 * 开启国际化路由时，通过 pathname 获取当前语言
 */
function getDetectedLocaleFromPathname({ pathname, locales, basename }: GetDetectedLocalFromPathnameParams) {
  const normalizedPathname = replaceBasename(pathname, basename);
  const pathnameParts = normalizedPathname.split('/').filter(pathnamePart => pathnamePart);

  // 从路径获取locale时，默认路径不再命中默认语言，返回空字符串，调用业务需执行兜底默认语言
  let detectedLocale = '';
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
