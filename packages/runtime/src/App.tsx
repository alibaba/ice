import React from 'react';
import { useAppContext } from '@ice/runtime-kit';
import AppErrorBoundary from './AppErrorBoundary.js';

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
