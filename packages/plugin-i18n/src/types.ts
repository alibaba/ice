export interface I18nConfig {
  /**
   * The locales which you want to support in your app.
   */
  locales: string[];
  /**
   * The default locale which is used when visiting a non-locale prefixed path. e.g `/home`.
   */
  defaultLocale: string;
  /**
   * Automatically redirect to the correct path which is based on user's preferred locale.
   */
  autoRedirect?: boolean;
}

export interface I18nAppConfig {
  /**
   * Weather or not current application cookie is blocked(authorized).
   * If it is, we will not get the locale value(ice_locale) from cookie.
   * @default {false}
   */
  disabledCookie?: boolean | (() => boolean);
}

export function defineI18nConfig(
  configOrDefineConfig: I18nAppConfig | (() => I18nAppConfig),
): I18nAppConfig {
  if (typeof configOrDefineConfig === 'function') {
    return configOrDefineConfig();
  }
  return configOrDefineConfig;
}
