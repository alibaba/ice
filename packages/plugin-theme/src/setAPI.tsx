import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import { PLUGIN_DIR } from './constant';

/**
 * 设置暴露出的 API
 */
const setAPI: IPlugin = ({
  applyMethod,
  onGetWebpackConfig,
  getValue
}) => {
  const iceTemp = getValue('TEMP_PATH');

  // 复制模板到 .ice/themes 目录下
  const templateSourceDir = path.join(__dirname, '../template');
  applyMethod('addTemplateDir', { templateDir: templateSourceDir, targetDir: PLUGIN_DIR });

  // 设置 $ice/themes -> .ice/themes/index.ts
  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/themes', path.join(iceTemp, PLUGIN_DIR, 'index.ts'));
  });

  // 导出接口
  // import { useTheme } from 'ice';
  applyMethod('addExport', { source: './themes', importSource: '$$ice/themes', exportMembers: ['useTheme'] });
};

export {
  setAPI
};