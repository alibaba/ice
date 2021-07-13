import * as path from 'path';
import { IPluginAPI } from 'build-scripts';
import { PLUGIN_DIR, ICE_TEMP } from '../constant';
import { addTemp } from '../utils/common';

/**
 * 设置暴露出的 API
 */
const setExposeAPI = ({
  applyMethod,
  onGetWebpackConfig,
  getValue,
}: IPluginAPI, defaultName: string, themes: string[]) => {
  const iceTemp: string = getValue(ICE_TEMP);

  addTemp(applyMethod, defaultName, themes);

  // 设置 $ice/theme -> .ice/plugins/theme/index.tsx
  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/theme', path.join(iceTemp, PLUGIN_DIR, 'index.tsx'));
  });

  // 导出接口
  // import { useTheme } from 'ice';
  applyMethod('addExport', {
    source: './plugins/theme',
    importSource: '$$ice/plugins/theme',
    exportMembers: ['useTheme']
  });
};

export {
  setExposeAPI,
};