import * as path from 'path';
import * as fs from 'fs-extra';
import { downloadAndGenerateProject } from '..';

jest.setTimeout(10 * 1000);

const tmpPath = path.resolve(__dirname, '../../.tmp');
fs.removeSync(tmpPath);

test('downloadAndGenerateProject build-scripts', async () => {
  const projectDir = path.resolve(tmpPath, 'build-scripts');
  await fs.ensureDir(projectDir);

  await downloadAndGenerateProject(projectDir, '@alifd/scaffold-lite');
  // await fs.remove(projectDir);
});

test('downloadAndGenerateProject ice-scripts@2.x', async () => {
  const projectDir = path.resolve(tmpPath, 'ice-scripts-2.x');
  await fs.ensureDir(projectDir);

  await downloadAndGenerateProject(projectDir, '@icedesign/pro-scaffold', '3.0.12');
  // await fs.remove(projectDir);
});

test('downloadAndGenerateProject ice-scripts@1.x', async () => {
  const projectDir = path.resolve(tmpPath, 'ice-scripts-1.x');
  await fs.ensureDir(projectDir);

  await downloadAndGenerateProject(projectDir, '@icedesign/pro-scaffold', '2.0.12');
  // await fs.remove(projectDir);
});
