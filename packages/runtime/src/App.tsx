import * as React from 'react';
import type { RenderOptions } from './types';
import AppErrorBoundary from './AppErrorBoundary.js';
import AppRouter from './AppRouter.js';

export default function App(props: RenderOptions) {
  const { context, appConfig } = props;
  const { strict } = appConfig.app || {};
  const StrictMode = strict ? React.StrictMode : React.Fragment;

  return (
    <StrictMode>
      <AppErrorBoundary>
        <AppRouter {...props} />
      </AppErrorBoundary>
    </StrictMode>
  );
}