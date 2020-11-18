import * as path from 'path';
import { formatPath } from '@builder/app-helpers';
import { ensureDirSync, writeFileSync } from 'fs-extra';

function generateEntry({ framework, type, targetDir, pageEntry, entryName }) {
  // eslint-disable-next-line
  const entryCode = require(`./template/${framework}`).default({ type, resourcePath: `${formatPath(pageEntry)}`});
  const entryFolder = path.join(targetDir, 'mpaEntry');
  ensureDirSync(entryFolder);
  const entryPath = path.join(entryFolder, `${entryName}.tsx`);
  writeFileSync(path.join(entryFolder, `${entryName}.tsx`), entryCode);
  return entryPath;
}

export default generateEntry;
