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
    const mpaEntry = {};
    pages.forEach((pageName) => {
      const entryName = pageName.toLocaleLowerCase();
      const pageEntry = getPageEntry(rootDir, pageName);
      mpaEntry[entryName] = `src/pages/${pageName}/${pageEntry}`;
    });
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

  let pageEntry = 'index';
  pageRootFiles.forEach(file => {
    if (/^app(.tsx?|.jsx?)$/.test(file)) {
      pageEntry = 'app';
    }
  });
  return pageEntry;
}

export default plugin;
