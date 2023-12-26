import { defineConfig } from '@ice/app';

export default defineConfig({
  ssr: true,
  // TODO: support esm format and resolve runtime dependencies to compiled dependencies.
  server: {
    bundle: true,
    format: 'cjs',
  },
  rsc: true,
});
