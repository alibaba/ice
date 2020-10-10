import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as fs from 'fs-extra';

const plugin: IPlugin = (api) => {
  const { context, registerUserConfig, registerCliOption, modifyUserConfig, onGetWebpackConfig, log } = api;
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
    const pagesPath = path.join(rootDir, 'src/pages');
    const pages = fs.existsSync(pagesPath)
      ? fs.readdirSync(pagesPath)
        .filter(page => !/^[._]/.test(page))
        .map(page => path.parse(page).name)
      : [];
    let entries = pages.reduce((acc, pageName) => {
      const entryName = pageName.toLocaleLowerCase();
      const pageEntry = getPageEntry(rootDir, pageName);
      if (!pageEntry) return acc;
      return {
        ...acc,
        [entryName]: `src/pages/${pageName}/${pageEntry}`
      };
    }, {});

    const finalEntries = {};
    if (commandArgs.mpaEntry) {
      const arr = commandArgs.mpaEntry.split(',');
      arr.forEach((pageName) => {
        const entryName = pageName.toLocaleLowerCase();
        if (entries[entryName]) {
          finalEntries[entryName] = entries[entryName];
        }
      });
      if (Object.keys(finalEntries).length > 0) {
        entries = finalEntries;
        log.info('已启用 --map-entry 指定多页入口 \n', JSON.stringify(entries));
      } else {
        log.warn(`--map-entry ${commandArgs.entry}`, '未能匹配到指定入口');
      }
    } else {
      log.info('使用多页面模式 \n', JSON.stringify(entries));
    }

    // set page template
    onGetWebpackConfig(config => {
      if (typeof mpa === 'object' && Object.keys(mpa).length !== 0) {
        const { template } = mpa as any;
        setPageTemplate(rootDir, entries, template, config);
      }
    });

    // modify entry
    modifyUserConfig('entry', entries);
  }
};

function getPageEntry(rootDir, pageName) {
  const pagePath = path.join(rootDir, 'src', 'pages', pageName);
  const pageRootFiles = fs.readdirSync(pagePath);
  const appRegexp = /^app\.(t|j)sx?$/;
  const indexRegexp = /^index\.(t|j)sx?$/;

  return pageRootFiles.find(file => {
    // eslint-disable-next-line
    return appRegexp.test(file) ? 'app' : indexRegexp.test(file) ? 'index' : null;
  });
}

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
      const entryTemplate = path.join(rootDir, 'public', entryNames[defaultEntryName]);

      if (fs.existsSync(entryTemplate)) {
        (htmlPluginOption as any).template = entryTemplate;
      }

      config.plugin(htmlPluginKey).tap((args) => [
        Object.assign(
          {},
          ...args,
          htmlPluginOption
        )
      ]);
    }
  });
}

export default plugin;
