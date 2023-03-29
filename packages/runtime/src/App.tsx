
import React from 'react';
import AppErrorBoundary from './AppErrorBoundary.js';
import { useAppContext } from './AppContext.js';

export default function App({ children }) {
  const { appConfig } = useAppContext();
  const { strict, errorBoundary } = appConfig.app;
  const StrictMode = strict ? React.StrictMode : React.Fragment;
  const ErrorBoundary = errorBoundary ? AppErrorBoundary : React.Fragment;

  return (
    <StrictMode>
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </StrictMode>
  );
}
