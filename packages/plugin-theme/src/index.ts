import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import { readdir } from 'fs-extra';
import { detectCssFile, getDefaultThemes, getEnableThemes } from './utils/common';
import { DEFAULT, THEMES } from './constant';
import { setAPI } from './setAPI';
import { getThemesVars } from './utils/themeCode';

/**
 * 多主题编译时处理
 * 
 * RFC：https://github.com/alibaba/ice/issues/4223
 */
const plugin: IPlugin = async (api) => {
  const {
    context,
    log,
    setValue,
  } = api;
  const { rootDir } = context;
  const themesPath = path.resolve(rootDir, 'src/themes');
  const enableThemes = getEnableThemes(themesPath);

  if (!enableThemes) {
    log.info('🤔 未找到主题文件，不开启多主题适配');
    return;
  }

  const files = await readdir(themesPath);
  const themesPathList = files.filter(detectCssFile(themesPath));
  const themesNames = themesPathList.map(file => file.split('.')[0]);
  setValue(THEMES, themesNames);     // 传入所引入的主题名称

  const { isExist, defaultName } = getDefaultThemes(themesNames);
  if (!isExist) {
    log.info(`🤔 未找到默认主题文件（default），自动配置 ${defaultName} 为初始主题`);
  }
  setValue(DEFAULT, defaultName);   // 传入默认主题名称

  setAPI(api);      // 设置需要 ice 暴露出的 API (Hooks / Provider)

  // 1. 将 themes 所有变量注入到 themesVar
  // 2. 通过 themesVar 生产注入代码
  // 3. 配置 webpack Entry

  // TODO: 正式编译过程
};

export default plugin;