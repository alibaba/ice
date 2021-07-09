import * as path from 'path';
import { IPluginAPI } from 'build-scripts';
import { DefineVariablePlugin } from '../plugins/webpack/DefineVariablePlugin';
import { declVarPlugin } from '../plugins/postcss/declVarPlugin';
import { ICE_TEMP, PLUGIN_DIR } from '../constant';
import { funcCollectPlugin } from '../plugins/postcss/funcCollectPlugin';

const injectVariable = ({ onGetWebpackConfig, getValue }: IPluginAPI, defaultName: string) => {
  const iceTemp = getValue(ICE_TEMP);
  const jsPath = path.resolve(iceTemp, PLUGIN_DIR, 'injectTheme.js');

  const pluginsFactory = (type: 'sass' | 'less') => ([
    funcCollectPlugin({ type }),
    declVarPlugin({ defaultName, type })
  ]);

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
        .use('postcss-loader-v6')
        .loader(require.resolve('postcss-loader'))
        .options({ postcssOptions: { plugins: pluginsFactory('less'), parser: 'postcss-less' } })
        .after('less-loader');
    });

    ['scss', 'scss-module'].forEach(rule => {
      config.module
        .rule(rule)
        .use('postcss-loader-v6')
        .loader(require.resolve('postcss-loader'))
        .options({ postcssOptions: { plugins: pluginsFactory('sass'), parser: 'postcss-scss' } })
        .after('sass-loader');
    });

    config.plugin('define-variable-plugin').use(DefineVariablePlugin, [{ defaultName }]);
  });
};

export {
  injectVariable
};