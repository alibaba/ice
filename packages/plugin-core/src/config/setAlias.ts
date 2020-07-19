import * as path from 'path';
import { ICE_TEMP } from '../constant';

export default (api, options) => {
  const { onGetWebpackConfig, context, getValue } = api;
  const { rootDir } = context;
  const tempPath = getValue(ICE_TEMP);
  const aliasKey = options.framework === 'rax' ? 'raxapp' : 'ice';
  const aliasMap = [
    [`${aliasKey}$`, path.join(tempPath, 'index.ts')],
    [`${aliasKey}`, path.join(tempPath, 'pages') ],
    ['@', path.join(rootDir, 'src')]
  ];

  onGetWebpackConfig((config: any) => {
    aliasMap.forEach(alias => config.resolve.alias.set(alias[0], alias[1]));
  });
};
