import { expect, it, describe } from 'vitest';
import { importStyle } from '../src/index';

describe('import style', () => {
  it('simple import', async () => {
    const sourceCode = 'import { Button } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result?.code).toBe(`${sourceCode}\nimport 'antd/es/button/style';`);
  });
  it('custom style', async () => {
    const sourceCode = 'import { Button } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: (name) => `antd/es/${name.toLocaleLowerCase()}/style` });
    expect(result?.code).toBe(`${sourceCode}\nimport 'antd/es/button/style';`);
  });
  it('mismatch import', async () => {
    const sourceCode = 'import { Button } from \'antd-mobile\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result?.code).toBe(`${sourceCode}`);
  });
  it('multiple import', async () => {
    const sourceCode = 'import { Button, Table } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result?.code).toBe(`${sourceCode}\nimport 'antd/es/button/style';\nimport 'antd/es/table/style';`);
  });
  it('named import', async () => {
    const sourceCode = 'import { Button as Btn } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result?.code).toBe(`${sourceCode}\nimport 'antd/es/button/style';`);
  });
  it('default import', async () => {
    const sourceCode = 'import * as antd from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result?.code).toBe(`${sourceCode}`);
  });
  it('sourcemap', async () => {
    const sourceCode = 'import * as antd from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true, sourceMap: true });
    expect(!!result?.map).toBe(true);
  });
  it('none import', async () => {
    const sourceCode = 'export const a = \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result).toBe(null);
  });

  it('parse error', async () => {
    const sourceCode = 'export antd, { Button } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result).toBe(null);
  });
  it('import error', async () => {
    const sourceCode = 'import antd, { Button } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: true });
    expect(result?.code).toBe(sourceCode);
  });
  it('style false', async () => {
    const sourceCode = 'import { Button } from \'antd\';';
    const result = await importStyle(sourceCode, { libraryName: 'antd', style: false });
    expect(result).toBe(null);
  });
});
