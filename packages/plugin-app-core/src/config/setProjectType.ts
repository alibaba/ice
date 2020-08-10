import * as globby from 'globby';
import { PROJECT_TYPE } from '../constant';

export default (api) => {
  const { context, setValue } = api;
  const { rootDir } = context;
  const tsEntryFiles = globby.sync(['src/app.@(ts?(x))', 'src/pages/*/app.@(ts?(x))'], {
    cwd: rootDir
  });
  const projectType = tsEntryFiles.length ? 'ts' : 'js';

  setValue(PROJECT_TYPE, projectType);
};
