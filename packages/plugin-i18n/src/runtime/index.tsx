import * as React from 'react';
import type { RuntimePlugin } from '@ice/runtime/types';
import { I18nProvider } from './I18nContext.js';
import modifyHistory from './modifyHistory.js';

const runtime: RuntimePlugin = async ({ appContext, addProvider, history }, runtimeOptions) => {
  const { basename, routePath, requestContext } = appContext;
  const { i18nConfig } = runtimeOptions;

  addProvider(({ children }) => {
    return (
      <I18nProvider
        pathname={routePath}
        i18nConfig={i18nConfig}
        basename={basename}
        headers={requestContext?.req?.headers}
      >
        {children}
      </I18nProvider>
    );
  });

  if (history) {
    modifyHistory(history, i18nConfig, basename);
  }
};

export default runtime;
