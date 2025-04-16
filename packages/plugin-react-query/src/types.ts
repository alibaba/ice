import type { QueryClientConfig, QueryClient } from '@tanstack/react-query';
import type { DevtoolsButtonPosition, DevtoolsPosition, DevToolsErrorType } from '@tanstack/query-devtools';

interface DevtoolsOptions {
  initialIsOpen?: boolean;
  buttonPosition?: DevtoolsButtonPosition;
  position?: DevtoolsPosition;
  client?: QueryClient;
  errorTypes?: Array<DevToolsErrorType>;
  styleNonce?: string;
  shadowDOMTarget?: ShadowRoot;
}

export interface ReactQueryConfig {
  devTools?: DevtoolsOptions;
  queryClientConfig?: QueryClientConfig;
}
