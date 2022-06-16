import { run } from './shell';

(async () => {
  // DO NOT CHANGE ORDERS due to dependencies.
  await run('npm run build', { cwd: './packages/bundles' });
  await run('npm run build', { cwd: './packages/jsx-runtime' });
  await run('npm run build', { cwd: './packages/runtime' });
  await run('npm run build', { cwd: './packages/route-manifest' });
  await run('npm run build', { cwd: './packages/types' });
  await run('npm run build', { cwd: './packages/webpack-config' });
  await run('npm run build', { cwd: './packages/ice' });
  await run('npm run build', { cwd: './packages/plugin-auth' });
  await run('npm run build', { cwd: './packages/rax-compat' });
  await run('npm run build', { cwd: './packages/plugin-rax-compat' });
})().catch((e) => {
  console.trace(e);
  process.exit(128);
});
