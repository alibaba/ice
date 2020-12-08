import * as path from 'path';
import { formatPath } from '@builder/app-helpers';

function generateEntry(api, { framework, targetDir, pageEntry, entryName }) {
  const entryFolder = path.join(targetDir, 'mpaEntry');
  const entryPath = path.join(entryFolder, `${entryName}.tsx`);
  const templatePath = path.join(__dirname, `./template/${framework}.ts.ejs`);
  api.applyMethod('addRenderFile', templatePath, entryPath, { resourcePath: `${formatPath(pageEntry.split('.').slice(0, -1).join('.'))}`});
  return entryPath;
}

export default generateEntry;
