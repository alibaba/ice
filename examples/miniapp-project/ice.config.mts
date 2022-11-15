import { defineConfig } from '@ice/app';
import miniapp from '@ice/plugin-miniapp';
console.log('process.env.FOO', process.env.FOO);
export default defineConfig({
  ssg: false,
  hash: true,
  // minify: true,
  dropLogLevel: 'trace',
  outputDir: 'build/wechat',
  alias: {
    components: './src/components',
  },
  plugins: [miniapp({
    nativeConfig: {
      appid: 'tourist'
    }
  })],
  // eslint: false,
  define: {
    ASSETS_VERSION: '1.0.1'
  }
});
