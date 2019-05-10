import * as path from 'path';

export default class Project {
  public readonly name: string;

  public readonly folderPath: string;

  constructor(folderPath: string) {
    this.name = path.basename(folderPath);
    this.folderPath = folderPath;
  }
}
