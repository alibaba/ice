import * as path from 'path';
import * as fse from 'fs-extra';
import replaceUrl from './replaceUrl';

export default function generateCSRHTML(htmlPath: string, options: { replaceCDN: boolean, baseDir: string }): string {
  const { replaceCDN, baseDir } = options;
  let htmlContent = fse.readFileSync(path.isAbsolute(htmlPath) ? htmlPath : path.join(baseDir, htmlPath), 'utf-8');
  if (replaceCDN) {
    // 预发环境：replace g.alicdn.com with dev.g.alicdn.com
    htmlContent = replaceUrl(htmlContent);
  }
  return htmlContent;
}