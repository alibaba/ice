/* eslint @typescript-eslint/explicit-function-return-type:0, no-shadow: 0 */
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as nsfw from 'nsfw';
import { run } from './fn/shell';

(async () => {
  await run('npm run clean');

  const fileParten = '*/src/**/!(*.ts|*.tsx)';
  console.log(`[COPY]: ${fileParten}`);

  const cwd = path.join(__dirname, '../packages');
  const files = glob.sync(fileParten, { cwd, nodir: true });
  const fileSet = new Set();
  /* eslint no-restricted-syntax:0 */
  for (const file of files) {
    /* eslint no-await-in-loop:0 */
    await copyOneFile(file, cwd);
    fileSet.add(path.join(cwd, file));
  }

  const watcher = await nsfw(cwd, (e) => {
    e.forEach((e) => {
      if (e.action === nsfw.actions.CREATED || e.action === nsfw.actions.MODIFIED ||  e.action === nsfw.actions.RENAMED) {
        // eslint-disable-next-line
        const filePath = e.newFile ? path.join(e.directory, e.newFile!) : path.join(e.directory, e.file!);
        if (fileSet.has(filePath)) {
          console.log('non-ts change detected:', filePath);
          copyOneFile(path.relative(cwd, filePath), cwd);
        }
      }
    });
  });

  watcher.start();

  await run('npx tsc --build ./tsconfig.json -w');
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});

async function copyOneFile(file, cwd) {
  const from = path.join(cwd, file);
  const to = path.join(cwd, file.replace(/\/src\//, '/lib/'));
  await fs.copy(from, to);
}
