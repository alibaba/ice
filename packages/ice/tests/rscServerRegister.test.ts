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
  it('basic client component', async () => {
    const fileInfo = await getFileInfo('client/clientInput1.tsx');
    const content = rscCodeTransform(fileInfo);
    const { content: expectContent } = await getFileInfo('client/clientOutput1.tsx');
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
});
