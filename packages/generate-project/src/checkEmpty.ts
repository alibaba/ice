import * as fs from 'fs-extra';
import * as inquirer from 'inquirer';

export default async function checkEmpty(dir: string): Promise<boolean> {
  let files: string[] = await fs.readdir(dir);
  // filter some special files
  files = files.filter((filename) => {
    return [
      'node_modules', '.git', '.DS_Store', '.iceworks-tmp',
    ].indexOf(filename) === -1;
  });
  if (files.length && files.length > 0) {
    if (process.stdout.isTTY) {
      const { go } = await inquirer.prompt({
        type: 'confirm',
        name: 'go',
        message:
          'The existing file in the current directory. Are you sure to continue ？',
        default: false,
      });
      return go;
    } else {
      return false;
    }
  } else {
    return true;
  }
};
