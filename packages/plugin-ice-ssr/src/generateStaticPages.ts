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
  const pagesData = [];

  // eslint-disable-next-line
  const ssgRender = require(renderPagesBundlePath);
  const htmlTemplate = fse.readFileSync(join(buildDir, 'index.html'), 'utf8');
  const renderPages: PageData[] = await ssgRender.default({ htmlTemplate });

  renderPages.forEach((renderPage) => {
    const { html, path } = renderPage;
    const htmlPath = join(buildDir, path, 'index.html');
    // write page html
    fse.ensureFileSync(htmlPath);
    fse.writeFileSync(htmlPath, html);
    // save html and other route configs to json, ensure ssgRender function can find the html
    // e.g.: const renderRoute = { path: "/", html: "<html>xx</html>",  strict: true }
    pagesData.push(renderPage);
  });
  // write pages data to json
  fse.ensureFileSync(pagesDataPath);
  fse.writeJSONSync(pagesDataPath, pagesData, { spaces: 2 });
}

export default generateStaticPages;
