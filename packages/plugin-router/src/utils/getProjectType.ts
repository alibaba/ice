import * as globby from 'globby';

export declare type ProjectType = 'ts' | 'js';

function getProjectType ( rootDir ): ProjectType {
  const entryNameArr = ['app', 'index'];

  const tsEntryFiles = entryNameArr.reduce((files, entryName) => {
    files.push(...globby.sync([`src/${entryName}.@((t|j)s?(x))`, `src/pages/*/${entryName}.@((t|j)s?(x))`], { cwd: rootDir }));
    return files;
  }, []);
  return tsEntryFiles.length ? 'ts' : 'js';
}

export {
  getProjectType
};