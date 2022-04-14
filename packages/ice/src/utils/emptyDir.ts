import fse from 'fs-extra';

export default async function emptyDir(dir: string) {
  if (await fse.pathExists(dir)) {
    await fse.emptyDir(dir);
  }
}
