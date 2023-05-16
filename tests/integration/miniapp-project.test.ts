import path from 'path';
import { expect, test, describe, afterAll } from 'vitest';
import * as fse from 'fs-extra';

import { buildFixture } from '../utils/build';

const example = 'miniapp-project';
const outputDir = path.join(__dirname, `../../examples/${example}`, 'build', 'wechat');

describe(`build ${example}`, () => {
  test('build miniapp assets', async () => {
    await buildFixture(example, {
      target: 'wechat-miniprogram',
    });
  });
});

describe(`check ${example} assets`, () => {
  test('app.js existence', async () => {
    const appJsPath = path.join(outputDir, 'app.js');
    const appJsExists = await fse.pathExists(appJsPath);
    expect(appJsExists).toStrictEqual(true);
  });

  test('project.config.json existence', async () => {
    const projectConfigPath = path.join(outputDir, 'project.config.json');
    const projectConfigExists = await fse.pathExists(projectConfigPath);
    expect(projectConfigExists).toStrictEqual(true);
  });

  afterAll(async () => {
    fse.removeSync(outputDir);
  });
});
