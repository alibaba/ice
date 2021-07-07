import * as path from 'path';
import { IPluginAPI } from '@alib/build-scripts';
import { PLUGIN_DIR, ICE_TEMP } from '../constant';

const addTemp = (applyMethod: IPluginAPI['applyMethod'], defaultName: string, themes: string[]) => {
  const themesStr = themes.map(str => `'${str}'`).join(' | ');

  // 复制模板到 .ice/themes 目录下
  const templateSourceDir = path.join(__dirname, '../../template');
  applyMethod(
    'addTemplateDir',
    { templateDir: templateSourceDir, targetDir: PLUGIN_DIR },
    { themes: themesStr, defaultTheme: `'${defaultName}'` }
  );
};

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

  // 设置 $ice/themes -> .ice/themes/index.tsx
  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/themes', path.join(iceTemp, PLUGIN_DIR, 'index.tsx'));
  });

  // 导出接口
  // import { useTheme } from 'ice';
  applyMethod('addExport', { source: './themes', importSource: '$$ice/themes', exportMembers: ['useTheme'] });
};

export {
  setExposeAPI,
  addTemp
};