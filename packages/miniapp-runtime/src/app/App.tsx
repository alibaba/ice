import React from 'react';
import { AppErrorBoundary, useAppContext } from '@ice/runtime';
import { AppWrapper } from './connect.js';

interface Props {
  AppProvider: React.ComponentType<any>;
}

export default function App(props: Props) {
  const { AppProvider } = props;
  const { appConfig } = useAppContext();
  const { strict, errorBoundary } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;
  const ErrorBoundary = errorBoundary ? AppErrorBoundary : React.Fragment;

  return (
    <StrictMode>
      <ErrorBoundary>
        <AppProvider>
          <AppWrapper />
        </AppProvider>
      </ErrorBoundary>
    </StrictMode>
  );
}
