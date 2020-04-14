import * as glob from 'glob';
import * as path from 'path';
import * as fs from 'fs-extra';
import { run } from './fn/shell';

(async () => {
  await run('npm run clean');
  await run('npx tsc --build ./tsconfig.json');

  const fileParten = '*/src/**/!(*.ts|*.tsx)';
  console.log(`[COPY]: ${fileParten}`);

  const cwd = path.join(__dirname, '../packages');
  const files = glob.sync(fileParten, { cwd, nodir: true });
  // eslint-disable-next-line
  for (const file of files) {
    const from = path.join(cwd, file);
    const to = path.join(cwd, file.replace(/\/src\//, '/lib/'));
    // eslint-disable-next-line
    await fs.mkdirp(path.dirname(to));
    // eslint-disable-next-line
    await fs.copyFile(from, to);
  }

})().catch((e) => {
  console.trace(e);
  process.exit(128);
});
