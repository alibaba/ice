import glob from 'glob';
import path from 'path';
import fse from 'fs-extra';
import { run } from './shell';

(async () => {
  await run('npm run clean');

  const fileParten = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${fileParten}`);

  const cwd = path.join(process.cwd(), 'packages');
  const files = glob.sync(fileParten, { cwd, nodir: true });
  // eslint-disable-next-line
  for (const file of files) {
    const from = path.join(cwd, file);
    const to = path.join(cwd, file.replace(/\/src\//, '/lib/'));
    // eslint-disable-next-line
    await fse.mkdirp(path.dirname(to));
    // eslint-disable-next-line
    await fse.copyFile(from, to);
  }
  await run('npx tsc --build ./tsconfig.json');
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});
