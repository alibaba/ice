import * as path from 'path';
import * as globby from 'globby';
import { formatPath } from '@builder/app-helpers';

function generateEntry(api, { framework, targetDir, pageEntry, entryName }) {
  const { context: { userConfig: { web: webConfig = {} }, rootDir } } = api;
  const entryFolder = path.join(targetDir, 'mpaEntry');
  const entryPath = path.join(entryFolder, `${entryName}.tsx`);
  const templatePath = path.join(__dirname, `./template/${framework}.ts.ejs`);
  const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: rootDir });
  api.applyMethod('addRenderFile', templatePath, entryPath, {
    hydrate: Boolean(webConfig.hydrate || webConfig.ssr || webConfig.snapshot),
    resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`,
    globalStyle: globalStyles.length && formatPath(path.join(rootDir, globalStyles[0]))
  });
  return entryPath;
}

export default generateEntry;
