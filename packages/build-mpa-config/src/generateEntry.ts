import * as path from 'path';
import { formatPath } from '@builder/app-helpers';

function generateEntry(api, { framework, targetDir, pageEntry, entryName }) {
  const { context: { userConfig: { web: webConfig = {} } } } = api;
  const entryFolder = path.join(targetDir, 'mpaEntry');
  const entryPath = path.join(entryFolder, `${entryName}.tsx`);
  const templatePath = path.join(__dirname, `./template/${framework}.ts.ejs`);
  api.applyMethod('addRenderFile', templatePath, entryPath, {
    hydrate: Boolean(webConfig.ssr || webConfig.snapshot),
    resourcePath: `${formatPath(path.extname(pageEntry) ? pageEntry.split('.').slice(0, -1).join('.') : pageEntry)}`
  });
  return entryPath;
}

export default generateEntry;
