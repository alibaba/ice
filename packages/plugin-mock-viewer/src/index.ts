import type { Plugin } from '@ice/app/types';
import type { WebpackMockViewerOptions } from '@ali/webpack-mock-viewer';
import WebpackMockViewer from '@ali/webpack-mock-viewer';


const mockViewer: Plugin<WebpackMockViewerOptions> = (options?: WebpackMockViewerOptions) => ({
  // name 可选，插件名称
  name: 'plugin-mock-viewer',
  // setup 必选，用于定制工程构建配置
  setup: ({ context, onGetConfig }) => {
    onGetConfig((webpackConfig) => {
      if (context.command === 'start') {
        if (!webpackConfig.plugins) webpackConfig.plugins = [];
        // 添加 webpack 插件
        webpackConfig.plugins.push(new WebpackMockViewer(options));
      }
      return webpackConfig;
    });
  },
});

export default mockViewer;
