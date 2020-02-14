import * as path from 'path'
import * as fse from 'fs-extra'

function getPages(rootDir: string): string[] {
  return fse.readdirSync(path.join(rootDir, 'src/pages'))
    .filter((page) => {
      // filter .xxx and _xxx
      return !/^[._]/.test(page);
    })
    .map((page) => {
      const { name } = path.parse(page);
      return name.replace(/^\S/,(s) => s.toUpperCase());
    });
}

export default getPages;