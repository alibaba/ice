import createService from '../createService.js';
import type test from '../commands/test.js';

export default async function getTaskConfig() {
  const rootDir = process.cwd();
  const { run } = await createService({
    rootDir,
    command: 'test',
    commandArgs: {},
  });
  const { taskConfigs } = (await run()) as ReturnType<typeof test>;
  const webTaskConfig = taskConfigs.find((taskConfig) => taskConfig.name === 'web');
  return webTaskConfig;
}
