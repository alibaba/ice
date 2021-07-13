import * as path from 'path';
import * as atImport from 'postcss-import';
import { IPlugin } from 'build-scripts';
import { get } from 'lodash';
import { ICE_TEMP, PLUGIN_DIR } from './constant';
import { setExposeAPI } from './workflow/setExposeAPI';
import { getDefaultTheme, checkThemesEnabled, getThemesName } from './utils/common';
import { funcCollectPlugin } from './plugins/postcss/funcCollectPlugin';
import { declVarPlugin } from './plugins/postcss/declVarPlugin';
import { DefineVariablePlugin } from './plugins/webpack/DefineVariablePlugin';
import { parseThemesData, setThemesData, getThemesData, getThemesDataStr } from './utils/themesUtil';
import { watchThemeFiles } from './workflow/watcher';
import { resolver } from './plugins/helper/resolver';

interface Options {
  theme?: string    // 默认主题
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
    onGetWebpackConfig,
    getValue
  } = api;
  const { rootDir } = context;
  const themeProperty = get(<Options>options, 'theme', 'default');
  const themesPath = path.resolve(rootDir, 'src/themes');

  /** 
   * 是否开启
   */
  const themesEnabled = await checkThemesEnabled(themesPath);
  if (!themesEnabled) {
    log.verbose('🤔 未找到主题文件，不开启多主题适配');
    return;
  }

  const { themesNames, themesPathList } = await getThemesName(themesPath);

  /** 
   * 获取主题默认值
   */
  const { isExist, defaultName } = getDefaultTheme(themesNames, themeProperty);
  if (!isExist) {
    log.info(`🤔 未找到默认主题文件（${themeProperty}.css），自动配置 ${defaultName} 为初始主题`);
  }

  /** 
   * Extract css vars 
   */
  const initialThemesData = await parseThemesData(themesPathList, defaultName);
  setThemesData(initialThemesData);

  /**
   * 生成对应 less / sass 的 postcss 插件
   */
  const pluginsFactory = (type: 'sass' | 'less') => ([
    // 消费初始化生成的 initialThemesData，且生成并持久化新的 themesData
    funcCollectPlugin({
      type,
      data: initialThemesData,
      setData: (data) => setThemesData(data, true)    // 持久化存储
    }),

    atImport({
      resolve: resolver as any
    }),

    // 获取 setThemesData 后的 varsMap
    declVarPlugin({
      type,
      getVarsMap: () => getThemesData()[defaultName]
    })
  ]);

  /**
   * Webpack Config
   */
  onGetWebpackConfig(config => {
    /**
     * Replace less/sass vars by css vars
     */
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

    /**
     * inject window.__themeData__
     * DefineVariablePlugin: 在 loader 执行之后注入代码
     * 
     * getCode 会在相应阶段执行
     */
    config.plugin('define-variable-plugin').use(DefineVariablePlugin, [
      {
        getCode: () => {
          // get data form cache
          const data = getThemesData();
          return `window.__themesData__ = ${getThemesDataStr(data, defaultName)};\n`;
        }
      }
    ]);

    /**
     * inject window.__handleTheme__(themeName)
     * 依赖 window.__themeData__
     */
    const entryNames = Object.keys(config.entryPoints.entries());
    const jsPath = path.resolve(getValue(ICE_TEMP), PLUGIN_DIR, 'injectTheme.js');
    entryNames.forEach((name) => {
      config.entry(name).prepend(jsPath);
    });
  });

  /**
   * import { useTheme } from 'ice'; 
   */
  setExposeAPI(api, defaultName, themesNames);

  /**
   * 监听主题文件（src/themes）更新 
   */
  watchThemeFiles(api, themesPath, themeProperty);
};

export default plugin;