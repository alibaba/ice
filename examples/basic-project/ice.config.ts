import { defineUserConfig } from '@ice/cli';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default defineUserConfig({
  publicPath: '/',
  webpack: (webpackConfig) => {
    if (process.env.NODE_ENV !== 'test') {
      webpackConfig.plugins?.push(new BundleAnalyzerPlugin());
    }
    return webpackConfig;
  },
});