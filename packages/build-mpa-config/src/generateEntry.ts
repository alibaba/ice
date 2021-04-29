import * as path from 'path';
import * as globby from 'globby';
import { formatPath } from '@builder/app-helpers';

function generateEntry(api, { framework, targetDir, pageEntry, entryName, pageConfig = {} }) {
  const { context: { userConfig: { web: webConfig = {} }, rootDir }, getValue } = api;
  const entryFolder = path.join(targetDir, 'mpaEntry');
  const entryPath = path.join(entryFolder, `${entryName}.tsx`);
  const templatePath = path.join(__dirname, `./template/${framework}.ts.ejs`);
  const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: rootDir });
  const customTabBarPath = formatPath(path.join(rootDir, 'src/CustomTabBar/index'));
  const staticConfig = getValue('staticConfig');
  const needCustomTabBar = staticConfig && getValue('CUSTOM_TAB_BAR') && staticConfig.tabBar?.list.some(name => entryName === name);
  api.applyMethod('addRenderFile', templatePath, entryPath, {
    hydrate: Boolean(webConfig.hydrate || webConfig.ssr || webConfig.snapshot || webConfig.staticExport),
    resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`,
    customTabBarPath,
    needCustomTabBar,
    globalStyle: globalStyles.length && formatPath(path.join(rootDir, globalStyles[0])),
    pageConfig: JSON.stringify(pageConfig),
  });
  return entryPath;
}

export default generateEntry;
