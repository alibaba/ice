import * as path from 'path';
import { IPlugin } from '@alib/build-scripts';
import { readdir } from 'fs-extra';
import { setAPI } from './utils/setAPI';
import { setVariable } from './utils/setVariable';
import { ICE_TEMP, PLUGIN_DIR } from './constant';
import { injectThemes } from './utils/injectThemes';
import { detectCssFile, getDefaultTheme, checkThemesEnabled, getThemeName } from './utils/common';

/**
 * 多主题编译时处理
 * 
 * RFC：https://github.com/alibaba/ice/issues/4223
 */
const plugin: IPlugin = async (api) => {
  const {
    context,
    log,
    onGetWebpackConfig,
    getValue,
    applyMethod
  } = api;
  const { rootDir } = context;
  const themesPath = path.resolve(rootDir, 'src/themes');
  const themesEnabled = await checkThemesEnabled(themesPath);

  const iceTemp = getValue(ICE_TEMP);
  const jsPath = path.resolve(iceTemp, PLUGIN_DIR, 'injectTheme.js');   // .ice/themes/injectTheme.js

  if (!themesEnabled) {
    log.verbose('🤔 未找到主题文件，不开启多主题适配');
    return;
  }

  const files = await readdir(themesPath);
  const themesPathList = files
    .filter(detectCssFile(themesPath))
    .map(file => path.resolve(themesPath, file));
  const themesNames = themesPathList.map(getThemeName);

  const { isExist, defaultName } = getDefaultTheme(themesNames);
  if (!isExist) {
    log.info(`🤔 未找到默认主题文件（default.css），自动配置 ${defaultName} 为初始主题`);
  }

  injectThemes(api, jsPath, themesPathList);    // 注入主题数据与变更能力
  setAPI(api, defaultName, themesNames);        // 设置需要 ice 暴露出的 API (Hooks / Provider)

  setVariable(onGetWebpackConfig, defaultName);

  applyMethod('watchFileChange', /themes\/.*/, async (event: string) => {
    if (event === 'change' || event === 'add' || event === 'unlink') {
      log.warn('主题文件发生改变');
    }
  });
};

export default plugin;