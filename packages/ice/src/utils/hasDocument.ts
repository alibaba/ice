import * as path from 'path';
import fg from 'fast-glob';

export default function hasDocument(rootDir: string) {
  const document = fg.sync('document.{tsx,ts,jsx,js}', {
    cwd: path.join(rootDir, 'src'),
  });
  return document.length > 0;
}
