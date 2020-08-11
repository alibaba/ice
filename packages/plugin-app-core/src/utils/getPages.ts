import * as path from 'path';
import * as fse from 'fs-extra';

function getPages(rootDir: string, srcDir: string): string[] {
  const pagesPath = path.join(rootDir, srcDir, 'pages');
  return fse.existsSync(pagesPath) ? fse.readdirSync(pagesPath)
    .filter((page) => {
      // filter .xxx and _xxx
      return !/^[._]/.test(page);
    })
    .map((page) => {
      const { name } = path.parse(page);
      return name;
    }) : [];
}

export default getPages;
