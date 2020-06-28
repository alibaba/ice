import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as fs from 'fs-extra';

const plugin: IPlugin = ({ context, registerUserConfig, registerCliOption, modifyUserConfig, log }) => {
  const { rootDir, userConfig, commandArgs } = context;

  // register mpa in build.json
  registerUserConfig({
    name: 'mpa',
    validation: 'boolean',
  });

  // support --mpa-entry to specify mpa entry
  registerCliOption({
    name: 'mpa-entry',
    commands: ['start'],
  });

  if (userConfig.mpa) {
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
      arr.forEach((entryName) => {
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

export default plugin;
