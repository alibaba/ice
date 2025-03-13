import React from 'react';
import { AppErrorBoundary, usePublicAppContext } from '@ice/runtime';
import { AppWrapper } from './connect.js';

export default function App() {
  const { appConfig } = usePublicAppContext();
  const { strict, errorBoundary } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;
  const ErrorBoundary = errorBoundary ? AppErrorBoundary : React.Fragment;

  return (
    <StrictMode>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </StrictMode>
  );
}
