import { IOnGetWebpackConfig } from '@alib/build-scripts';
import { DefineVariablePlugin } from '../plugins/webpack/DefineVariablePlugin';
import { declVarPlugin } from '../plugins/postcss/declVarPlugin';
import { funcCollectPlugin } from '../plugins/postcss/funcCollectPlugin';
import { getThemesData } from '../utils/themesUtil';

const injectVariable = (onGetWebpackConfig: IOnGetWebpackConfig, defaultName: string, jsPath: string) => {
  const themeVars = getThemesData()[defaultName];
  const pluginsFactory = (type: 'sass' | 'less') => [
    funcCollectPlugin({ data: getThemesData(), type }),
    declVarPlugin({ varsMap: themeVars, type })
  ];

  // Less 变量 value 转为同名 css-var
  onGetWebpackConfig(config => {
    const entryNames = Object.keys(config.entryPoints.entries());

    entryNames.forEach((name) => {
      config.entry(name).prepend(jsPath);
    });

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

    config.plugin('define-variable-plugin').use(DefineVariablePlugin, [{ defaultName }]);
  });
};

export {
  injectVariable
};