import * as path from 'path';
import { ICE_TEMP } from '../constant';

interface IOptions {
  framework: string;
  alias: string;
}

export default (api, options: IOptions) => {
  const { onGetWebpackConfig, context, getValue } = api;
  const { alias, framework } = options;
  const { rootDir } = context;
  const tempPath = getValue(ICE_TEMP);
  const aliasMap = [
    [`${alias}$`, path.join(tempPath, 'index.ts')],
    [`${alias}`, path.join(tempPath, 'pages') ],
    ['alias', path.join(tempPath)],
    ['@', path.join(rootDir, 'src')],
  ];

  onGetWebpackConfig((config: any) => {
    aliasMap.forEach(alias => {
      const hasAlias = config.resolve.alias.has(alias[0]);
      if(!hasAlias) {
        config.resolve.alias.set(alias[0], alias[1]);
      }
    });

    if (framework === 'react') {
      // add alias of basic dependencies
      const basicDependencies = [
        ['react', rootDir],
        ['react-dom', rootDir]
      ];
      basicDependencies.forEach((dep: string[] | string): void => {
        const [depName, searchFolder] = Array.isArray(dep) ? dep : [dep];
        const aliasPath = searchFolder
          ? require.resolve(depName, { paths: [searchFolder] })
          : require.resolve(depName);
        config.resolve.alias.set(depName, path.dirname(aliasPath));
      });
    }
  });
};
