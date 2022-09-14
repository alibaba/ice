import type { CookieSetOptions } from 'universal-cookie';

export interface I18nConfig {
  // 国际化语言列表
  locales: string[];
  // 默认国际化语言
  defaultLocale: string;
  // 自动重定向
  autoRedirect?: true;
  // 国际化路由
  i18nRouting?: false;
  // cookie 参数
  cookieOptions?: CookieSetOptions;
}

export interface I18nAppConfig {
  blockCookie?: boolean | Function;
}
