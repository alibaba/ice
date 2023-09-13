import * as path from 'path';
import { expect, it, describe } from 'vitest';
import fse from 'fs-extra';
import { rscCodeTransform } from '../src/esbuild/rscServerRegister';

const rootDir = path.join(__dirname, './fixtures/rscTransform');

async function getFileInfo(filePath: string) {
  filePath = path.join(rootDir, filePath);
  const content = await fse.readFile(filePath, 'utf-8');
  return { content, path: filePath };
}

describe('rsc client test', () => {
  it('basic tsx client component', async () => {
    const fileInfo = await getFileInfo('client/clientInput1.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('client/clientOutput1.tsx');
    expect(content).toBe(expectContent);
  });

  it('basic jsx client component', async () => {
    const fileInfo = await getFileInfo('client/clientInput2.jsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('client/clientOutput2.jsx');
    expect(content).toBe(expectContent);
  });

  it('basic js client component', async () => {
    const fileInfo = await getFileInfo('client/clientInput3.js');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('client/clientOutput3.js');
    expect(content).toBe(expectContent);
  });
});

describe('rsc server test', () => {
  it('basic server component', async () => {
    const fileInfo = await getFileInfo('server/serverInput1.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('server/serverOutput1.tsx');
    expect(content).toBe(expectContent);
  });

  it('server component with export function and typescript', async () => {
    const fileInfo = await getFileInfo('server/serverInput2.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('server/serverOutput2.tsx');
    expect(content).toBe(expectContent);
  });

  it('server component with private function and typescript', async () => {
    const fileInfo = await getFileInfo('server/serverInput3.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('server/serverOutput3.tsx');
    expect(content).toBe(expectContent);
  });

  it('server component with global statement', async () => {
    const fileInfo = await getFileInfo('server/serverInput4.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('server/serverOutput4.tsx');
    expect(content).toBe(expectContent);
  });

  it('server component with export variables', async () => {
    const fileInfo = await getFileInfo('server/serverInput5.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('server/serverOutput5.tsx');
    expect(content).toBe(expectContent);
  });
});

describe('rsc boundary conditions', () => {
  it('use client not at first line', async () => {
    const fileInfo = await getFileInfo('others/otherInput1.tsx');
    const content = rscCodeTransform(fileInfo);
    expect(content.indexOf('createClientModuleProxy') === -1).toBeTruthy();
  });

  it('\'use client\' has been commented out', async () => {
    const fileInfo = await getFileInfo('others/otherInput2.tsx');
    const content = rscCodeTransform(fileInfo);
    expect(content.indexOf('createClientModuleProxy') === -1).toBeTruthy();
  });

  it('with both use client and use server', async () => {
    const fileInfo = await getFileInfo('others/otherInput3.tsx');
    try {
      let content = rscCodeTransform(fileInfo);
    } catch (e) {
      expect(e.message === 'Cannot have both "use client" and "use server" directives in the same file.').toBeTruthy();
    }
  });
});
