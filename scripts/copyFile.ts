import path from 'path';
import fse from 'fs-extra';

export default async function copyOneFile(file: string, cwd: string) {
  const from = path.join(cwd, file);
  const to = path.join(cwd, file.replace(/\/src\//, '/esm/'));
  await fse.copy(from, to);
}
