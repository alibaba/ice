import * as path from 'path';
import { IPlugin } from 'build-scripts';
import { get } from 'lodash';
import { setExposeAPI } from './workflow/setExposeAPI';
import { injectVariable } from './workflow/injectVariable';
import { getDefaultTheme, checkThemesEnabled, getThemesName } from './utils/common';
import { setThemesData } from './utils/themesUtil';
import { watchThemeFiles } from './workflow/watcher';

interface Options {
  ['theme']?: string
}

/**
 * 多主题编译时处理
 * 
 * RFC：https://github.com/alibaba/ice/issues/4223
 */
const plugin: IPlugin = async (api, options = {}) => {
  const {
    context,
    log,
  } = api;
  const { rootDir } = context;
  const _theme = get(<Options>options, 'theme', 'default');
  const themesPath = path.resolve(rootDir, 'src/themes');
  const themesEnabled = await checkThemesEnabled(themesPath);

  if (!themesEnabled) {
    log.verbose('🤔 未找到主题文件，不开启多主题适配');
    return;
  }

  const { themesNames, themesPathList } = await getThemesName(themesPath);

  const { isExist, defaultName } = getDefaultTheme(themesNames, _theme);
  if (!isExist) {
    log.info(`🤔 未找到默认主题文件（${_theme}.css），自动配置 ${defaultName} 为初始主题`);
  }

  await setThemesData(themesPathList);                 // 生成变量并设置 themesData
  injectVariable(api, defaultName);              // 注入所有（包括分析生成）的变量与需要注入的逻辑
  setExposeAPI(api, defaultName, themesNames);   // 设置需要 ice 暴露出的 API (Hooks / Provider)

  watchThemeFiles(api, themesPath, _theme);              // 监听主题文件（src/themes）更新
};

export default plugin;