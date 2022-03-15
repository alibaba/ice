import * as React from 'react';
import type { ComponentType } from 'react';
import type { AppContext, PageWrapper } from './types';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';
import type AppRouter from './AppRouter';
import type Runtime from './runtime.js';

interface Props {
  runtime: Runtime;
  AppRouter: typeof AppRouter;
}

export default function App(props: Props) {
  const { runtime, AppRouter } = props;

  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const { strict } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();

  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppContextProvider value={appContext}>
          <AppProvider>
            <AppRouter PageWrappers={PageWrappers} />
          </AppProvider>
        </AppContextProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}