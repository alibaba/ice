import { IOnGetWebpackConfig } from '@alib/build-scripts';
import { declVarPlugin } from './plugin';
import { ThemeVarsType } from './injectThemes';

const setVariable = (onGetWebpackConfig: IOnGetWebpackConfig, themeVars: ThemeVarsType) => {
  const pluginsFactory = (type: 'sass' | 'less') => [
    declVarPlugin({ varsMap: themeVars, type })
  ];

  // Less 变量 value 转为同名 css-var
  onGetWebpackConfig(config => {
    // Map 暂时先根据 default 生成
    // 如果检测到 Less/Sass 变量名存在于 Map 中，则替换变量

    ['less', 'less-module'].forEach(rule => {
      config.module
        .rule(rule)
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({ plugins: pluginsFactory('less'), parser: 'postcss-less' })
        .after('less-loader');
    });

    ['scss', 'scss-module'].forEach(rule => {
      config.module
        .rule(rule)
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({ plugins: pluginsFactory('sass'), parser: 'postcss-scss' })
        .after('sass-loader');
    });
  });
};

export {
  setVariable
};