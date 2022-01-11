import * as fse from 'fs-extra';
import { minify } from 'html-minifier';

const replaceHtmlContent = (htmlFilePath: string, serverBundlePath: string) => {
  const bundle = fse.readFileSync(serverBundlePath, 'utf-8');
  const html = fse.readFileSync(htmlFilePath, 'utf-8');
  const minifiedHtml = minify(html, { collapseWhitespace: true, quoteCharacter: '\'' }).replace(/`/g, '&#x60;');
  // `"` in the regulation expression is to be compatible with the minifier(such as terser)
  const newBundle = bundle.replace(/['"]global.__ICE_SERVER_HTML_TEMPLATE__['"]/, `\`${minifiedHtml}\``);
  fse.writeFileSync(serverBundlePath, newBundle, 'utf-8');
};

export default replaceHtmlContent;
