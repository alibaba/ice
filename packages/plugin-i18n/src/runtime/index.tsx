import * as React from 'react';
import type { RuntimePlugin } from '@ice/runtime';
import detectLocale from '../utils/detectLocale.js';
import type { I18nAppConfig, I18nConfig } from '../types.js';
import getLocaleRedirectPath from '../utils/getLocaleRedirectPath.js';
import { I18nProvider, useLocale, withLocale } from './I18nContext.js';
import hijackHistory from './hijackHistory.js';

const EXPORT_NAME = 'i18nConfig';
// Mock it to avoid ssg error and use new URL to parse url instead of url.parse.
const baseUrl = 'http://127.0.0.1';

const runtime: RuntimePlugin<{ i18nConfig: I18nConfig }> = async (
  {
    appContext,
    addProvider,
    history,
    addResponseHandler,
  },
  runtimeOptions,
) => {
  const { basename, requestContext, appExport } = appContext;
  const exported = appExport[EXPORT_NAME];
  const i18nAppConfig: I18nAppConfig = Object.assign(
    { disableCookie: false },
    (typeof exported === 'function' ? await exported() : exported),
  );
  const disableCookie = typeof i18nAppConfig.disableCookie === 'function'
    ? i18nAppConfig.disableCookie()
    : i18nAppConfig.disableCookie;

  const { i18nConfig } = runtimeOptions;
  const { locales, defaultLocale, autoRedirect } = i18nConfig;

  addProvider(({ children }) => {
    return (
      <I18nProvider
        pathname={requestContext.pathname}
        locales={locales}
        defaultLocale={defaultLocale}
        basename={basename}
        disableCookie={disableCookie}
        headers={requestContext.req?.headers}
      >
        {children}
      </I18nProvider>
    );
  });

  if (history) {
    hijackHistory(history, i18nConfig, disableCookie, basename);
  }

  if (autoRedirect) {
    addResponseHandler((req) => {
      const url = new URL(`${baseUrl}${req.url}`);
      const detectedLocale = detectLocale({
        locales,
        defaultLocale,
        basename,
        pathname: url.pathname,
        headers: req.headers,
        disableCookie: false,
      });

      const localeRedirectPath = getLocaleRedirectPath({
        pathname: url.pathname,
        defaultLocale,
        detectedLocale,
        basename,
      });
      if (localeRedirectPath) {
        url.pathname = localeRedirectPath;

        return {
          statusCode: 302,
          statusText: 'Found',
          headers: {
            location: String(Object.assign(new URL(baseUrl), url)).replace(RegExp(`^${baseUrl}`), ''),
          },
        };
      }
    });
  }
};

export default runtime;

export { useLocale, withLocale };
