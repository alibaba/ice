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
  const { appConfig, routes } = appContext;
  const { strict } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  const AppProvider = runtime.composeAppProvider() || React.Fragment;
  const PageWrappers = runtime.getWrapperPageRegistration();
  const AppRouter = runtime.getAppRouter();

  if (!routes || routes.length === 0) {
    throw new Error('Please add routes(like pages/index.tsx) to your app.');
  }

  let element;
  if (routes.length === 1 && !routes[0].children) {
    const Page = routes[0].component;
    element = <Page />;
  } else {
    element = <AppRouter PageWrappers={PageWrappers} />;
  }

  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppContextProvider value={appContext}>
          <AppProvider>
            {element}
          </AppProvider>
        </AppContextProvider>
      </AppErrorBoundary>
    </StrictMode>
  );
}