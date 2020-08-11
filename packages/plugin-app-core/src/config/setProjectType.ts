import * as globby from 'globby';
import getSourceDir from '../utils/getSourceDir';
import { PROJECT_TYPE } from '../constant';

export default (api) => {
  const { context, setValue } = api;
  const { rootDir, userConfig } = context;
  const srcDir = getSourceDir(userConfig.entry)
  const tsEntryFiles = globby.sync([`${srcDir}/app.@(ts?(x))`, `${srcDir}/pages/*/app.@(ts?(x))`], {
    cwd: rootDir
  });
  const projectType = tsEntryFiles.length ? 'ts' : 'js';

  setValue(PROJECT_TYPE, projectType);
};
