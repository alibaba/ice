import * as path from 'path';
import { readFileSync, writeFileSync } from 'fs-extra';
import { IPlugin } from '@alib/build-scripts';
import { PLUGIN_DIR, THEMES, ICE_TEMP } from '../constant';
import { transformType } from './common';

/**
 * 设置暴露出的 API
 */
const setAPI: IPlugin = ({
  applyMethod,
  onGetWebpackConfig,
  getValue
}) => {
  const iceTemp = getValue(ICE_TEMP);
  const themes = getValue(THEMES) ?? [];

  // 复制模板到 .ice/themes 目录下
  const templateSourceDir = path.join(__dirname, '../template');
  applyMethod('addTemplateDir', { templateDir: templateSourceDir, targetDir: PLUGIN_DIR });

  // 设置 $ice/themes -> .ice/themes/index.ts
  onGetWebpackConfig((config) => {
    config.resolve.alias.set('$ice/themes', path.join(iceTemp, PLUGIN_DIR, 'index.ts'));
  });

  // 将 iceTemp 中的 types.ts 的 Themes 类型替换为为所有主题名称组成的联合类型，方便类型提示
  const typeFilePath = path.join(iceTemp, PLUGIN_DIR, 'types.ts');
  const typeSource = readFileSync(typeFilePath, 'utf8');
  writeFileSync(typeFilePath, transformType('Themes', themes, typeSource));

  // 导出接口
  // import { useTheme } from 'ice';
  applyMethod('addExport', { source: './themes', importSource: '$$ice/themes', exportMembers: ['useTheme'] });
};

export {
  setAPI
};