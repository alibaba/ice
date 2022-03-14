import * as path from 'path';
import { TEMP_PATH } from '../constant';

interface IOptions {
  framework: string;
  alias: string;
}

export default (api, options: IOptions) => {
  const { onGetWebpackConfig, context, getValue } = api;
  const { alias, framework } = options;
  const { rootDir } = context;
  const tempPath = getValue(TEMP_PATH);

  const aliasMap = [
    [`${alias}$`, path.join(tempPath, 'index.ts')],
    [`${alias}`, path.join(tempPath, 'pages') ],
    ['@', path.join(rootDir, 'src')],
    // add alias for modular import
    [`$$${alias}`, tempPath],
    ['$$framework', tempPath],
  ];

  onGetWebpackConfig((config: any) => {
    // eslint-disable-next-line
    aliasMap.forEach(alias => {
      const hasAlias = config.resolve.alias.has(alias[0]);
      if(!hasAlias) {
        config.resolve.alias.set(alias[0], alias[1]);
      }
    });

    // add alias of basic dependencies
    let basicDependencies = [];
    if (framework === 'react') {
      basicDependencies = [
        ['react', rootDir],
        ['react-dom', rootDir]
      ];
    } else if (framework === 'rax') {
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
