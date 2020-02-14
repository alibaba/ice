import * as path from 'path';
import * as fs from 'fs-extra';
import { downloadAndGenerateProject } from '..';

test('downloadAndGenerateProject', async () => {
  const projectDir = path.resolve(__dirname, 'tmp');

  await fs.remove(projectDir);
  await fs.ensureDir(projectDir);

  await downloadAndGenerateProject(projectDir, '@alifd/fusion-design-pro');

  await fs.remove(projectDir);
});
