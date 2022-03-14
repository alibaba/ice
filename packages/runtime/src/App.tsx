import * as React from 'react';
import type { ComponentType } from 'react';
import type { AppContext, PageWrapper } from './types';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';
import type AppRouter from './AppRouter';

interface Props {
  appContext: AppContext;
  AppProvider: ComponentType;
  AppRouter: typeof AppRouter;
  PageWrappers: PageWrapper<any>[];
}

export default function App(props: Props) {
  const { appContext, AppProvider, AppRouter, PageWrappers } = props;

  return (
    <AppErrorBoundary>
      <AppContextProvider value={appContext}>
        <AppProvider>
          <AppRouter PageWrappers={PageWrappers} />
        </AppProvider>
      </AppContextProvider>
    </AppErrorBoundary>
  );
}