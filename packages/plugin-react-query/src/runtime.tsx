import * as React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { RuntimePlugin } from '@ice/runtime/types';
import type { ReactQueryConfig } from './types';

const EXPORT_CONFIG_NAME = 'reactQueryConfig';

const runtime: RuntimePlugin = ({ addProvider, appContext }) => {
  const { appExport } = appContext;
  const reactQueryConfig = appExport[EXPORT_CONFIG_NAME] as ReactQueryConfig;
  const queryClient = new QueryClient({
    ...(reactQueryConfig?.queryClientConfig || {}),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        ...(reactQueryConfig?.queryClientConfig.defaultOptions?.queries || {}),
      },
    },
  });
  const ProviderWrapper = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
        { reactQueryConfig?.devTools &&
          <ReactQueryDevtools
            {...(reactQueryConfig.devTools || {})}
          /> }
      </QueryClientProvider>
    );
  };
  addProvider(ProviderWrapper);
};

export default runtime;
