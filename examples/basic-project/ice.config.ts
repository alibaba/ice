import { defineConfig } from '@ice/app';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default defineConfig({
  publicPath: '/',
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      webpackConfig.plugins?.push(new BundleAnalyzerPlugin());
    }
    return webpackConfig;
  },
  dropLogLevel: 'warn',
  minify: false,
  plugins: ['@ice/plugin-auth'],
});