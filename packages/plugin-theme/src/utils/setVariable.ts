import * as path from 'path';
import { IOnGetWebpackConfig } from '@alib/build-scripts';
import { ThemeVarsType } from './injectThemes';

const setVariable = (onGetWebpackConfig: IOnGetWebpackConfig, themeVars: ThemeVarsType) => {
  const loaderPath = path.join(__dirname, '../loader');

  // Less 变量 value 转为同名 css-var
  onGetWebpackConfig(config => {
    // Map 暂时先根据 default 生成
    // 如果检测到 Less/Sass 变量名存在于 Map 中，则替换变量

    ['less', 'less-module'].forEach(rule => {
      config.module
        .rule(rule)
        .use('theme-loader')
        .loader(loaderPath)
        .options({
          type: 'less',
          themeVars
        });
    });

    ['scss', 'scss-module'].forEach(rule => {
      config.module
        .rule(rule)
        .use('theme-loader')
        .loader(loaderPath)
        .options({
          type: 'sass',
          themeVars
        });
    });
  });
};

export {
  setVariable
};