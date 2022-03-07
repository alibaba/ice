import * as path from 'path';
import * as fs from 'fs-extra';
import { getMpaEntries, formatPath, analyzeRuntime, analyzeAuth } from '@builder/app-helpers';
import { generateMPAEntries } from '@builder/mpa-config';
import { IPlugin } from 'build-scripts';

interface ITemplate {
  [key: string]: string[];
}
interface IMpaConfig {
  template?: ITemplate;
  openPage?: string;
  rewrites?: {[key: string]: string} | boolean;
}

type Mode = 'webpack' | 'vite';

const plugin: IPlugin = (api) => {
  const { context, registerUserConfig, registerCliOption, modifyUserConfig, onGetWebpackConfig, log, setValue, getValue, applyMethod, onHook } = api;
  const { rootDir, userConfig, commandArgs, command } = context;
  const { mpa } = userConfig;

  // register mpa in build.json
  registerUserConfig({
    name: 'mpa'
  });

  // support --mpa-entry to specify mpa entry
  registerCliOption({
    name: 'mpa-entry',
    commands: ['start'],
  });

  if (mpa) {
    const mpaEntries = getMpaEntries(api);
    let entries = mpaEntries.reduce((acc, { entryName, entryPath }) => {
      return {
        ...acc,
        [entryName]: entryPath
      };
    }, {});
    const finalEntries = {};
    if (commandArgs.mpaEntry) {
      const arr = commandArgs.mpaEntry.split(',');
      arr.forEach((pageName: string) => {
        const entryName = pageName.toLocaleLowerCase();
        if (entries[entryName]) {
          finalEntries[entryName] = entries[entryName];
        }
      });
      if (Object.keys(finalEntries).length > 0) {
        entries = finalEntries;
        log.info('已启用 --mpa-entry 指定多页入口 \n', JSON.stringify(entries));
      } else {
        log.warn(`--mpa-entry ${commandArgs.entry}`, '未能匹配到指定入口');
      }
    } else {
      log.info('使用多页面模式 \n', JSON.stringify(entries));
    }

    const mpaRewrites = (mpa as IMpaConfig)?.rewrites || {};
    let serverPath: string;
    if (commandArgs.mpaEntry) {
      const arr = commandArgs.mpaEntry.split(',');
      const pageName = arr[0].toLocaleLowerCase();
      serverPath = mpaRewrites[pageName] || pageName;
    } else {
      const defaultEntryNames = Object.keys(entries);
      let pageName = '';
      if (typeof (mpa as IMpaConfig).openPage === 'string') {
        pageName = (mpa as IMpaConfig).openPage.split('.html')[0];
      } else {
        pageName = defaultEntryNames[0];
      }
      // compatible with openPage configured with upper camel case
      const pageNameLowerCase = pageName.toLocaleLowerCase();
      serverPath = mpaRewrites[pageNameLowerCase] || pageNameLowerCase;
    }
    setValue('SERVER_PATH', serverPath);

    let parsedEntries = null;
    const redirectEntries = [];
    // compatible with undefined TEMP_PATH
    // if disableRuntime is true, do not generate mpa entries
    if (getValue('TEMP_PATH')) {
      parsedEntries = generateMPAEntries(api, {
        executeGenerateTasks: command !== 'build' || !userConfig.optimizeRuntime,
        entries: mpaEntries,
        framework: 'react',
        targetDir: getValue('TEMP_PATH'),
      });
    }
    let finalMPAEntries = {};
    if (parsedEntries) {
      Object.keys(parsedEntries).forEach((entryKey) => {
        const { finalEntry, runAppPath } = parsedEntries[entryKey];
        finalMPAEntries[entryKey] = finalEntry;
        if (runAppPath) {
          redirectEntries.push({
            entryPath: finalEntry,
            runAppPath,
          });
        }
      });
      if (userConfig.optimizeRuntime) {
        onHook('before.build.load', async (options) => {
          await Promise.all(Object.keys(parsedEntries).map(async (entryKey) => {
            const { generator, generateTasks, entryPath } = parsedEntries[entryKey];
            // 仅针对使用了运行时能力的入口进行分析
            function addDisableRuntime(pluginName: string) {
              generator.addDisableRuntime(pluginName);
              log.info('[analyze]' ,`${pluginName} removed after runtime analyse`);
            }
            if (generator) {
              const { viteConfig, webpackConfig } = options as any;
              let alias;
              let mode: Mode = 'webpack';
              if (viteConfig) {
                alias = viteConfig?.resolve?.alias;
                mode = 'vite';
              } else if (webpackConfig) {
                alias = webpackConfig?.[0].chainConfig?.toConfig?.()?.resolve?.alias;
              }
              const runtimeUsedMap = await analyzeRuntime([entryPath], {
                // SPA 下有目录规范上更加精准的判断， MPA 通过 createStore 引入进行判断
                customRuntimeRules: { 'build-plugin-ice-store': ['createStore'] },
                rootDir,
                mode,
                alias,
                analyzeRelativeImport: true,
              });
              Object.keys(runtimeUsedMap).forEach((pluginName) => {
                const isUsed = runtimeUsedMap[pluginName];
                if (!isUsed) {
                  if (pluginName === 'build-plugin-ice-auth') {
                    try {
                      const hasAuthConfig = analyzeAuth(entryPath);
                      if (!hasAuthConfig) {
                        addDisableRuntime(pluginName);
                      }
                    } catch (e) {
                      console.log('[Error] errors occurred with analyze runApp');
                    }  
                  } else {
                    addDisableRuntime(pluginName);
                  }
                }
              });
              (generateTasks || []).forEach((generateTask) => {
                generateTask();
              });
            }
          }));
        });
      }
    } else {
      finalMPAEntries = entries;
    }
    // modify entry
    modifyUserConfig('entry', finalMPAEntries);
    if (redirectEntries.length > 0) {
      applyMethod('addImportDeclaration', {
        multipleSource: {
          runApp: redirectEntries.map(({ entryPath, runAppPath }) => ({
            filename: entryPath,
            value: formatPath(runAppPath),
            type: 'normal',
          })),
        },
      });
    }
    // set page template
    onGetWebpackConfig(config => {
      setPageTemplate(rootDir, entries, (mpa as any).template || {}, config, setValue);
      // disable mpa rewrite rules when config mpa.rewrites as false
      if ((userConfig.mpa as IMpaConfig)?.rewrites !== false) {
        config.devServer.historyApiFallback({
          rewrites: Object.keys(entries).map((pageName) => {
            return {
              from: new RegExp(`^/${mpaRewrites[pageName] || pageName}/*`),
              to: `/${pageName}.html`,
            };
          })
        });
      }
    });
  }
};

function setPageTemplate(rootDir, entries, template = {}, config, setValue) {
  const templateNames = Object.keys(template);
  const entryNames = {};

  templateNames.forEach(templateName => {
    template[templateName].forEach(entryName => {
      const key = entryName.toLocaleLowerCase();
      entryNames[key] = templateName;
    });
  });

  const pages = {};

  const defaultEntryNames = Object.keys(entries);
  defaultEntryNames.forEach(defaultEntryName => {
    const htmlPluginKey = `HtmlWebpackPlugin_${defaultEntryName}`;
    if (config.plugins.get(htmlPluginKey)) {
      const htmlPluginOption = {};
      // modify html template if userConfig mpa.template is specified
      if (entryNames[defaultEntryName]) {
        const entryTemplate = path.join(rootDir, 'public', entryNames[defaultEntryName]);
        if (fs.existsSync(entryTemplate)) {
          (htmlPluginOption as any).template = entryTemplate;
        }
      }

      config.plugin(htmlPluginKey).tap(([args]) => {
        (htmlPluginOption as any).templateParameters = {
          ...(args.templateParameters || {}),
          pageName: defaultEntryName,
        };

        const item = {
          ...args,
          ...htmlPluginOption,
        };

        pages[defaultEntryName] = item;
        return [item];
      });
    }
  });

  setValue('MPA_PAGES', pages);
}

export default plugin;
