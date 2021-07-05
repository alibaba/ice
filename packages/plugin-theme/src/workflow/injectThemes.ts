import { IPluginAPI } from '@alib/build-scripts';
import { setThemesData } from '../utils/themesUtil';

/**
 * 注入主题数据与主题动态变更逻辑
 * 
 * TODO: Lazy Load CSS variable data
 */
const injectThemes = ({ onGetWebpackConfig }: IPluginAPI, jsPath: string, themesPathList: string[]) => {
  // 将 themes 所有变量注入到 themesVar
  setThemesData(themesPathList);

  // 配置 injectTheme.js 引入 webpack Entry
  onGetWebpackConfig(config => {
    const entryNames = Object.keys(config.entryPoints.entries());
    entryNames.forEach((name) => {
      config.entry(name).prepend(jsPath);
    });
  });
};

export {
  injectThemes
};