import path from 'path';
import glob from 'glob';
import concurrently from 'concurrently';
import * as chokidar from 'chokidar';
import { ICE_PKG_PACKAGES } from '../constants';
import copyFile from './copyFile';

(async () => {
  const filePatten = '*/src/**/!(*.ts|*.tsx|*.rs)';
  console.log(`[COPY]: ${filePatten}`);
  const cwd = path.join(process.cwd(), 'packages');
  const files = glob.sync(filePatten, { cwd, nodir: true });
  for (const file of files) {
    await copyFile(file, cwd);
  }

  const watcher = chokidar.watch(cwd, { ignoreInitial: true });
  watcher
    .on('all', (event, filePath) => {
      const availableEvents = ['add', 'change'];
      if (availableEvents.includes(event) &&
        filePath.match(/.+[\\/]src[\\/].+\.(?!ts$|tsx$|rs$)/)) {
        console.log('non-ts change detected:', filePath);
        copyFile(path.relative(cwd, filePath), cwd);
      }
    });

  const waitOnPackagesCompiledCommand = `wait-on ${ICE_PKG_PACKAGES.map(p => `./packages/${p}/esm`).join(' ')}`;
  const { result } = concurrently([
    ...(ICE_PKG_PACKAGES.map(p => ({ command: 'pnpm watch', cwd: path.join(`./packages/${p}`) }))),
    { command: `${waitOnPackagesCompiledCommand} && pnpm tsc --build ./tsconfig.json -w`, cwd: process.cwd() },
  ]);
  await result;
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});
