import * as path from 'path';
import * as fse from 'fs-extra';
import { TEMP_PATH, ICE_TEMP } from '../constant';

export default (api, options) => {
  const { context, setValue } = api;
  const { rootDir } = context;

  const { framework } = options;
  const isRax = framework === 'rax';

  const tempDir = isRax ? 'rax' : 'ice';
  const tempPath = path.join(rootDir, `.${process.env.__FRAMEWORK_NAME__ || tempDir}`);
  setValue(TEMP_PATH, tempPath);
  setValue(ICE_TEMP, tempPath);

  fse.ensureDirSync(tempPath);
  fse.emptyDirSync(tempPath);
};
