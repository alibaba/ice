import * as globby from 'globby';
import getSourceDir from '../utils/getSourceDir';
import { PROJECT_TYPE } from '../constant';

export default (api) => {
  const { context, setValue } = api;
  const { rootDir, userConfig } = context;
  const srcDir = userConfig.sourceDir || getSourceDir(userConfig.entry);
  const tsFiles = globby.sync(`${srcDir}/**/*.{ts,tsx}`, {
    cwd: rootDir
  });
  const projectType = tsFiles.length ? 'ts' : 'js';

  setValue(PROJECT_TYPE, projectType);
};
