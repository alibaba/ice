import type { QueryClientConfig } from '@tanstack/react-query';
import type { DevtoolsButtonPosition, DevtoolsPosition, DevToolsErrorType } from '@tanstack/query-devtools';
import type { QueryClient } from '@tanstack/react-query';

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
