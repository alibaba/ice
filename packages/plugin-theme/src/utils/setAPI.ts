import * as path from 'path';
import { IPluginAPI } from '@alib/build-scripts';
import { PLUGIN_DIR, ICE_TEMP } from '../constant';

/**
 * 设置暴露出的 API
 */
const setAPI = ({
  applyMethod,
  onGetWebpackConfig,
  getValue,
}: IPluginAPI, defaultName: string, themes: string[]) => {
  const iceTemp = getValue(ICE_TEMP);
  const themesStr = themes.map(str => `'${str}'`).join(' | ');

  // 复制模板到 .ice/themes 目录下
  const templateSourceDir = path.join(__dirname, '../../template');
  applyMethod(
    'addTemplateDir',
    { templateDir: templateSourceDir, targetDir: PLUGIN_DIR },
    { themes: themesStr, defaultTheme: `'${defaultName}'` }
  );

  // 设置 $ice/themes -> .ice/themes/index.tsx
  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/themes', path.join(iceTemp, PLUGIN_DIR, 'index.tsx'));
  });

  // 导出接口
  // import { useTheme } from 'ice';
  applyMethod('addExport', { source: './themes', importSource: '$$ice/themes', exportMembers: ['useTheme'] });
};

export {
  setAPI
};