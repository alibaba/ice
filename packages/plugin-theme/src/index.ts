import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import { readdir } from 'fs-extra';
import { setAPI } from './utils/setAPI';
import { DEFAULT, THEMES } from './constant';
import { injectThemes } from './utils/injectThemes';
import { detectCssFile, getDefaultThemes, getEnableThemes, getThemeName } from './utils/common';

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
  const themesNames = themesPathList.map(getThemeName);

  const { isExist, defaultName } = getDefaultThemes(themesNames);
  if (!isExist) {
    log.info(`🤔 未找到默认主题文件（default），自动配置 ${defaultName} 为初始主题`);
  }

  setValue(THEMES, themesNames);      // 传入所引入的主题名称
  setValue(DEFAULT, defaultName);     // 传入默认主题名称

  setAPI(api);                        // 设置需要 ice 暴露出的 API (Hooks / Provider)
  injectThemes(api, themesPathList);  // 注入主题数据与变更能力

  // TODO: 正式编译过程
  // Less/Scss 文件中的定义的变量转为 css-var
};

export default plugin;