import * as React from 'react';
import type { ComponentType } from 'react';
import type { AppContext } from './types';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';

interface Props {
  appContext: AppContext;
  AppProvider: ComponentType;
  AppRouter: ComponentType;
}

export default function App(props: Props) {
  const { appContext, AppProvider, AppRouter } = props;

  return (
    <AppErrorBoundary>
      <AppContextProvider value={appContext}>
        <AppProvider>
          <AppRouter />
        </AppProvider>
      </AppContextProvider>
    </AppErrorBoundary>
  );
}