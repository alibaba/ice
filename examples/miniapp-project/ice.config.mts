import { defineConfig } from '@ice/app';
import pluginMiniapp from '@ice/plugin-miniapp';

export default defineConfig({
  alias: {
    components: './src/components',
  },
  // TODO:
  // proxy: {}
  sourceMap: false,
  plugins: [pluginMiniapp()],
  // eslint: false,
});
