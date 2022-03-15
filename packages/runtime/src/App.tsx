import * as React from 'react';
import AppErrorBoundary from './AppErrorBoundary.js';
import { AppContextProvider } from './AppContext.js';
import type Runtime from './runtime.js';

interface Props {
  runtime: Runtime;
}

export default function App(props: Props) {
  const { runtime } = props;

  const appContext = runtime.getAppContext();
  const { appConfig } = appContext;
  const { strict } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

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