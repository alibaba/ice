import { defineConfig } from '@ice/app';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
import auth from '@ice/plugin-auth';

export default defineConfig({
  publicPath: '/',
  define: {
    HAHA: JSON.stringify(true),
    'process.env.HAHA': JSON.stringify(true),
  },
  transform: (code, id) => {
    if (id.includes('src/pages')) {
      console.log('transform page:', id);
    }
    return code;
  },
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
  dropLogLevel: 'warn',
  plugins: [auth()],
  eslint: true,
});
