import * as React from 'react';
import { createIntl, createIntlCache, RawIntlProvider, useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { RuntimePlugin } from '@ice/runtime/types';
import type { LocaleConfig } from './types.js';

const EXPORT_NAME = 'locale';
const cache = createIntlCache();

const getDefaultLocale = () => {
  return (typeof navigator !== 'undefined' && navigator.language) || 'zh-CN';
};

const getLocaleMessages = () => {
  return (typeof window !== 'undefined'
    // @ts-ignore
    ? window.__ICE_LOCALE_MESSAGES__
    : global.__ICE_LOCALE_MESSAGES__) || {};
};

const defaultLocale = getDefaultLocale();
let intl: IntlShape = createIntl({
  locale: defaultLocale,
  messages: getLocaleMessages()?.[defaultLocale] || {},
});

const runtime: RuntimePlugin = async ({
  addProvider,
  appContext,
}) => {
  const { appExport } = appContext;
  const exported = appExport[EXPORT_NAME];
  const localeConfig: LocaleConfig = (typeof exported === 'function' ? await exported() : exported) || {};
  const { getLocale, ...l } = localeConfig;
  const locale = getLocale ? getLocale() : getDefaultLocale();

  intl = createIntl({
    ...l,
    messages: getLocaleMessages()?.[locale] || {},
    locale: getLocale ? getLocale() : getDefaultLocale(),
  }, cache);
  addProvider(({ children }) => {
    return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
  });
};

export {
  intl,
  useIntl,
};

export default runtime;
