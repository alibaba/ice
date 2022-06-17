import path from 'path';
import glob from 'glob';
import concurrently from 'concurrently';
import { ICE_PKG_PACKAGES } from '../constants';
import copyFile from './copyFile';

(async () => {
  const filePattern = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${filePattern}`);

  const cwd = path.join(process.cwd(), 'packages');
  const files = glob.sync(filePattern, { cwd, nodir: true });
  // eslint-disable-next-line
  for (const file of files) {
    copyFile(file, cwd);
  }

  const waitOnPackagesCompiledCommand = `wait-on ${ICE_PKG_PACKAGES.map(p => `./packages/${p}/esm`).join(' ')}`;
  const { result } = concurrently([
    ...(ICE_PKG_PACKAGES.map(p => ({ command: 'pnpm build', cwd: path.join(`./packages/${p}`) }))),
    { command: `${waitOnPackagesCompiledCommand} && pnpm tsc --build ./tsconfig.json`, cwd: process.cwd() },
  ]);
  await result;
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});