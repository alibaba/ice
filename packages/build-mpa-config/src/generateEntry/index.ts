import * as path from 'path';
import * as globby from 'globby';
import { formatPath } from '@builder/app-helpers';
import getRaxRenderData from './getRaxRenderData';

function generateEntry(api, options) {
  const { context: { rootDir } } = api;
  const { framework, targetDir, pageEntry, entryName } = options;
  const entryFolder = path.join(targetDir, 'mpaEntry');
  const entryPath = path.join(entryFolder, `${entryName}.tsx`);
  const templatePath = path.join(__dirname, `../template/${framework}.ts.ejs`);
  const globalStyles = globby.sync(['src/global.@(scss|less|css)'], { cwd: rootDir });

  const renderData = {
    globalStyle: globalStyles.length && formatPath(path.join(rootDir, globalStyles[0])),
    resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`,
  };

  api.applyMethod('addRenderFile', templatePath, entryPath, framework === 'rax' ? getRaxRenderData(api, renderData, options) : renderData);
  return entryPath;
}

export default generateEntry;
