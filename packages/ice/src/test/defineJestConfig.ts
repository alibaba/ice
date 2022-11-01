import * as path from 'path';
import type { Config as JestConfig } from 'jest';
import fse from 'fs-extra';
import type { Config } from '@ice/webpack-config/esm/types';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import getTaskConfig from './getTaskConfig.js';

const { merge } = lodash;

type UserConfig = JestConfig | (() => Promise<JestConfig>);

export default function defineJestConfig(userConfig: UserConfig): () => Promise<JestConfig> {
  return async () => {
    // Support jest configuration (object or function) Ref: https://jestjs.io/docs/configuration
    let customConfig: JestConfig;
    if (typeof userConfig === 'function') {
      customConfig = await userConfig();
    } else {
      customConfig = userConfig;
    }

    const defaultConfig = await getDefaultConfig();

    return merge(defaultConfig, customConfig);
  };
}

async function getDefaultConfig(): JestConfig {
  const taskConfig = await getTaskConfig();
  const { config: { alias = {} } } = taskConfig;

  const moduleNameMapper = generateModuleNameMapper(alias);

  return {
    moduleNameMapper,
  };
}

function generateModuleNameMapper(alias: Config['alias']) {
  const moduleNameMapper = {};
  for (const key in alias) {
    const aliasPath = alias[key];
    if (aliasPath === false) {
      continue;
    }
    const isDir = path.isAbsolute(aliasPath) && fse.lstatSync(aliasPath).isDirectory();
    moduleNameMapper[`^${key}${isDir ? '/(.*)' : ''}`] = `${aliasPath}${isDir ? '/$1' : ''}`;
  }

  return moduleNameMapper;
}
