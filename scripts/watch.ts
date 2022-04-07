/* eslint @typescript-eslint/explicit-function-return-type:0, no-shadow: 0 */
import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs-extra';
import * as chokidar from 'chokidar';
import { run } from './fn/shell';

(async () => {
  await run('npm run clean');

  const filePatten = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${filePatten}`);

  const cwd = path.join(__dirname, '../packages');
  const files = glob.sync(filePatten, { cwd, nodir: true });
  /* eslint no-restricted-syntax:0 */
  for (const file of files) {
    /* eslint no-await-in-loop:0 */
    await copyOneFile(file, cwd);
  }

  const watcher = chokidar.watch(cwd, { ignoreInitial: true });
  watcher
    .on('all', (event, filePath) => {
      const availableEvents = ['add', 'change'];
      if (availableEvents.includes(event)
        && filePath.match(/.+[\\/]src[\\/].+\.(?!ts$|tsx$|rs$)/)) {
        console.log('non-ts change detected:', filePath);
        copyOneFile(path.relative(cwd, filePath), cwd);
      }
    });
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
