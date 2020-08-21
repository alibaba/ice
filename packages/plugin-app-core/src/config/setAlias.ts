import * as path from 'path';
import { TEMP_PATH } from '../constant';

export default (api, options) => {
  const { onGetWebpackConfig, context, getValue } = api;
  const { rootDir } = context;
  const tempPath = getValue(TEMP_PATH);
  const aliasKey = options.framework === 'rax' ? 'rax-app' : 'ice';
  const aliasMap = [
    [`${aliasKey}$`, path.join(tempPath, 'index.ts')],
    [`${aliasKey}`, path.join(tempPath, 'pages') ],
    ['@', path.join(rootDir, 'src')],
    ['aliasKey', path.join(tempPath)]
  ];


  onGetWebpackConfig((config: any) => {
    aliasMap.forEach(alias => {
      const hasAlias = config.resolve.alias.has(alias[0]);
      if(!hasAlias) {
        config.resolve.alias.set(alias[0], alias[1]);
      }
    });
    let basicDependencies = [];
    // add alias of basic dependencies
    if (options.framework === 'react') {
      basicDependencies = [
        ['react', rootDir],
        ['react-dom', rootDir]
      ];
    } else if (options.framework === 'rax') {
      basicDependencies = [
        ['rax', rootDir]
      ];
    }
    basicDependencies.forEach((dep: string[] | string): void => {
      const [depName, searchFolder] = Array.isArray(dep) ? dep : [dep];
      const aliasPath = searchFolder
        ? require.resolve(depName, { paths: [searchFolder] })
        : require.resolve(depName);
      config.resolve.alias.set(depName, path.dirname(aliasPath));
    });
  });
};
