import { createRequire } from 'module';
import type { Plugin } from '@ice/app/types';

const require = createRequire(import.meta.url);
const PLUGIN_NAME = '@ice/plugin-react-query';

const plugin: Plugin<void> = () => {
  return {
    name: PLUGIN_NAME,
    setup: ({ generator, onGetConfig }) => {
      generator.addExport({
        specifier: [
          // Core API export from @tanstack/react-query
          'useQuery',
          'useMutation',
          'useQueryClient',
          'useMutationState',
          'useSuspenseQuery',
          'useSuspenseInfiniteQuery',
          'useSuspenseQueries',
          'queryOptions',
          'infiniteQueryOptions',
          'QueryClientProvider',
          'useQueryClient',
          'QueryErrorResetBoundary',
          'useQueryErrorResetBoundary',
          'useIsRestoring',
          'IsRestoringProvider',
        ],
        source: '@tanstack/react-query',
        type: false,
      });
      onGetConfig((config) => {
        // Add alias for react-query and react-query-devtools to avoid mismatching versions.
        config.alias = {
          ...config.alias,
          '@tanstack/react-query': require.resolve('@tanstack/react-query'),
          '@tanstack/react-query-devtools': require.resolve('@tanstack/react-query-devtools'),
        };
      });
    },
    runtime: `${PLUGIN_NAME}/runtime`,
    staticRuntime: true,
  };
};

export default plugin;
