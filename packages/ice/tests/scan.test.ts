import { expect, it, describe } from 'vitest';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { scanImports } from '../src/service/analyze';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('scan import', () => {
  const alias = { '@': path.join(__dirname, './fixtures/scan') };
  const rootDir = path.join(__dirname, './fixtures/scan');

  it('basic scan', async () => {
    const deps = await scanImports([path.join(__dirname, './fixtures/scan/app.ts')], { alias, rootDir });
    expect(deps['@ice/runtime'].name).toEqual('@ice/runtime');
    expect(/(@ice\/)?runtime\/package\.json/.test(deps['@ice/runtime'].pkgPath!)).toBeTruthy();
    expect(deps['@ice/runtime/client'].name).toEqual('@ice/runtime/client');
    expect(/(@ice\/)?runtime\/package\.json/.test(deps['@ice/runtime/client'].pkgPath!)).toBeTruthy();
    expect(deps.react.name).toEqual('react');
    expect(/react\/package\.json/.test(deps['react'].pkgPath!)).toBeTruthy();
  });

  it('scan with exclude', async () => {
    const deps = await scanImports([path.join(__dirname, './fixtures/scan/app.ts')], { alias, rootDir, exclude: ['@ice/runtime'] });
    expect(deps.react.name).toEqual('react');
    expect(/react\/package\.json/.test(deps['react'].pkgPath!)).toBeTruthy();
    expect(deps['@ice/runtime']).toBeUndefined();
  });

  it('scan with depImports', async () => {
    const deps = await scanImports(
      [path.join(__dirname, './fixtures/scan/app.ts')],
      { alias, rootDir, depImports: { '@ice/runtime': { name: '@ice/runtime' }, react: { name: 'react' } } }
    );
    expect(deps['@ice/runtime'].name).toEqual('@ice/runtime');
    expect(deps['@ice/runtime'].pkgPath).toBeUndefined();
    expect(deps.react.name).toEqual('react');
    expect(deps.react.pkgPath).toBeUndefined();
  });
});
