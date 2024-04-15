import * as React from 'react';
import { createIntl, createIntlCache, RawIntlProvider, useIntl } from 'react-intl';
import type { IntlShape } from 'react-intl';
import type { RuntimePlugin } from '@ice/runtime/types';
import type { LocaleConfig } from './types.js';

interface RuntimeOptons {
  localeMessages?: Record<string, Record<string, string>>;
}

const EXPORT_NAME = 'locale';
const cache = createIntlCache();
let intl: IntlShape = null;

const getDefaultLocale = () => {
  return (typeof navigator !== 'undefined' && navigator.language) || 'zh-CN';
};
const runtime: RuntimePlugin<RuntimeOptons> = async ({
  addProvider,
  appContext,
}, runtimeOptions) => {
  const { appExport } = appContext;
  const exported = appExport[EXPORT_NAME];
  const localeConfig: LocaleConfig = (typeof exported === 'function' ? await exported() : exported) || {};
  const { getLocale, ...l } = localeConfig;
  const locale = getLocale ? getLocale() : getDefaultLocale();
  console.log('locale', locale);
  console.log('localeMessages', runtimeOptions.localeMessages?.[locale]);
  intl = createIntl({
    ...l,
    messages: runtimeOptions.localeMessages?.[locale] || {},
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
