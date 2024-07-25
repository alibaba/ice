export const EXPORT_NAME = 'locale';

export const getDefaultLocale = () => {
  // @ts-ignore
  const defaultLocale = (typeof window !== 'undefined' && window.__ICE_DEFAULT_LOCALE__) ||
    (typeof navigator !== 'undefined' && navigator.language) ||
    'zh-CN';
  return defaultLocale.replace('_', '-');
};

export const getLocaleMessages = () => {
  // @ts-ignore
  const localeMessages = typeof window === 'undefined' ? global.__ICE_LOCALE_MESSAGES__ : window.__ICE_LOCALE_MESSAGES__;
  return localeMessages || {};
};
