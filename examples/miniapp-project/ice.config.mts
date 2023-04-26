import { defineConfig } from '@ice/app';
import miniapp from '@ice/plugin-miniapp';
export default defineConfig({
  ssg: false,
  hash: true,
  minify: true,
  dropLogLevel: 'trace',
  outputDir: 'build/wechat',
  alias: {
    components: './src/components',
  },
  plugins: [miniapp({
    nativeConfig: {
      appid: 'tourist',
    },
  })],
  // eslint: false,
  define: {
    ASSETS_VERSION: JSON.stringify('1.0.1'),
  },
});
