import path from 'path';
import glob from 'glob';
import fse from 'fs-extra';
import { run } from './shell';

(async () => {
  await run('npm run clean');

  const filePattern = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${filePattern}`);

  const cwd = path.join(process.cwd(), 'packages');
  const files = glob.sync(filePattern, { cwd, nodir: true });
  // eslint-disable-next-line
  for (const file of files) {
    const from = path.join(cwd, file);
    const to = path.join(cwd, file.replace(/\/src\//, '/esm/'));
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
