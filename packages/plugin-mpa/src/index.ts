import * as path from 'path';
import * as fs from 'fs-extra';
import { getMpaEntries } from '@builder/app-helpers';
import { generateMPAEntries } from '@builder/mpa-config';
import { IPlugin } from 'build-scripts';

interface ITemplate {
  [key: string]: string[];
}
interface IMpaConfig {
  template?: ITemplate;
  openPage?: string;
  rewrites?: {
    [key: string]: string;
  };
}

const plugin: IPlugin = (api) => {
  const { context, registerUserConfig, registerCliOption, modifyUserConfig, onGetWebpackConfig, log, setValue, getValue, applyMethod } = api;
  const { rootDir, userConfig, commandArgs } = context;
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
      parsedEntries = generateMPAEntries(api, { entries: mpaEntries, framework: 'react', targetDir: getValue('TEMP_PATH') });
    }
    let finalMPAEntries = {};
    if (parsedEntries) {
      Object.keys(parsedEntries).forEach((entryKey) => {
        const { finalEntry, shouldRedirectRunApp, runAppPath } = parsedEntries[entryKey];
        finalMPAEntries[entryKey] = finalEntry;
        if (shouldRedirectRunApp) {
          redirectEntries.push({
            entryPath: finalEntry,
            runAppPath,
          });
        }
      });
    } else {
      finalMPAEntries = entries;
    }
    // modify entry
    modifyUserConfig('entry', finalMPAEntries);
    applyMethod('addImportDeclaration', {
      multipleSource: {
        runApp: redirectEntries.map(({ entryPath, runAppPath }) => ({
          filename: entryPath,
          value: runAppPath,
          type: 'normal',
        })),
      },
    });
    // set page template
    onGetWebpackConfig(config => {
      setPageTemplate(rootDir, entries, (mpa as any).template || {}, config);
      config.devServer.historyApiFallback({
        rewrites: Object.keys(entries).map((pageName) => {
          return {
            from: new RegExp(`^/${mpaRewrites[pageName] || pageName}/*`),
            to: `/${pageName}.html`,
          };
        }),
      });
    });
  }
};

function setPageTemplate(rootDir, entries, template = {}, config) {
  const templateNames = Object.keys(template);
  const entryNames = {};

  templateNames.forEach(templateName => {
    template[templateName].forEach(entryName => {
      const key = entryName.toLocaleLowerCase();
      entryNames[key] = templateName;
    });
  });

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
        return [
          {
            ...args,
            ...htmlPluginOption,
          }
        ];
      });
    }
  });
}

export default plugin;
