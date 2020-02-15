import * as fs from 'fs-extra';

export default async function checkEmpty(dir: string): Promise<boolean> {
  let files: string[] = await fs.readdir(dir);
  // filter some special files
  files = files.filter((filename) => {
    return [
      'node_modules', '.git', '.DS_Store', '.iceworks-tmp',
      'build', '.bzbconfig',
    ].indexOf(filename) === -1;
  });
  if (files.length && files.length > 0) {
    return false;
  } else {
    return true;
  }
};
