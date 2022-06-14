import { expect, it, describe } from 'vitest';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { scanImports } from '../src/service/analyze';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('scan import', () => {
  const alias = { '@': path.join(__dirname, './fixtures/preAnalyze') };
  const rootDir = path.join(__dirname, './fixtures/preAnalyze');

  it('basic scan', async () => {
    const deps = await scanImports([path.join(__dirname, './fixtures/preAnalyze/app.ts')], { alias, rootDir });
    expect(deps).toStrictEqual({ ice: 'ice', react: 'react' });
  });

  it('scan with exclude', async () => {
    const deps = await scanImports([path.join(__dirname, './fixtures/preAnalyze/app.ts')], { alias, rootDir, exclude: ['ice'] });
    expect(deps).toStrictEqual({ react: 'react' });
  });

  it('scan with depImports', async () => {
    const deps = await scanImports([path.join(__dirname, './fixtures/preAnalyze/app.ts')], { alias, rootDir, depImports: { ice: 'ice', react: 'react' } });
    expect(deps).toStrictEqual({ ice: 'ice', react: 'react' });
  });
});