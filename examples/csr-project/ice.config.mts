import { defineConfig } from '@ice/app';
import auth from '@ice/plugin-auth';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';

export default defineConfig(() => ({
  publicPath: '/',
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      webpackConfig.plugins?.push(new SpeedMeasurePlugin());
    }
    return webpackConfig;
  },
  dropLogLevel: 'warn',
  plugins: [
    auth(),
  ],
  eslint: true,
  ssr: false,
  ssg: false,
}));
