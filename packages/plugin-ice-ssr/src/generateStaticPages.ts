import { join } from 'path';
import * as fse from 'fs-extra';

interface PageData {
  path: string;
  html: string;
  strict?: boolean;
  sensitive?: boolean;
  exact?: boolean;
}

/**
 * generate pages html and pages-data.json file
 */
async function generateStaticPages(buildDir: string, renderPagesBundlePath: string) {
  const pagesDataPath = join(buildDir, 'server', 'pages-data.json');

  // eslint-disable-next-line
  const renderPages = require(renderPagesBundlePath);
  const htmlTemplate = fse.readFileSync(join(buildDir, 'index.html'), 'utf8');
  const pagesData: PageData[] = await renderPages.default({ htmlTemplate });

  // write pages html
  pagesData.forEach((pageData) => {
    const { html, path } = pageData;
    const htmlPath = join(buildDir, path, 'index.html');
    fse.ensureFileSync(htmlPath);
    fse.writeFileSync(htmlPath, html);
  });

  // write pages data to json
  fse.ensureFileSync(pagesDataPath);
  fse.writeJSONSync(pagesDataPath, pagesData, { spaces: 2 });
}

export default generateStaticPages;
