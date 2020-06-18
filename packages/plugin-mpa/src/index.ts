import { IPlugin } from '@alib/build-scripts';
import * as path from 'path';
import * as fs from 'fs-extra';

const plugin: IPlugin = ({ context, registerUserConfig, modifyUserConfig }) => {
  const { rootDir, userConfig } = context;

  if (userConfig.mpa) {
    const pagesPath = path.join(rootDir, 'src/pages');
    const pages = fs.existsSync(pagesPath)
      ? fs.readdirSync(pagesPath)
        .filter(page => !/^[._]/.test(page))
        .map(page => path.parse(page).name)
      : [];
    const mpaEntry = pages.reduce((acc, pageName) => {
      const entryName = pageName.toLocaleLowerCase();
      const pageEntry = getPageEntry(rootDir, pageName);
      if (!pageEntry) return;
      return {
        ...acc,
        [entryName]: `src/pages/${pageName}/${pageEntry}`
      };
    }, {});
    // modify entry
    modifyUserConfig('entry', mpaEntry);
  }
  // register mpa in build.json
  registerUserConfig({
    name: 'mpa',
    validation: 'boolean',
  });
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
