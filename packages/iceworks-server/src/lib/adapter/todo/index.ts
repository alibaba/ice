import * as fs from 'fs-extra';
import * as path from 'path';
import * as junk from 'junk';
import { isBinaryFileSync } from 'isbinaryfile';
import * as EventEmitter from 'events';
import * as LineByLine from 'line-by-line';
import { IProject } from '../../../interface';

function readdirSync(targetPath) {
  if (fs.existsSync(targetPath)) {
    return fs.readdirSync(targetPath).filter(junk.not);
  }
  return [];
}

function recursiveReaddirSync(dirPath, rootDir) {
  let list = [];
  let stats;
  const files = readdirSync(dirPath);
  const ignoreFiles = ['node_modules'];

  files.forEach((file) => {
    if (ignoreFiles.includes(file)) {
      return;
    }
    const fullPath = path.join(dirPath, file);
    stats = fs.lstatSync(fullPath);
    if (stats.isDirectory()) {
      list = list.concat(recursiveReaddirSync(fullPath, rootDir));
    } else if (!isBinaryFileSync(fullPath)) {
      list.push([path.relative(rootDir, fullPath), fullPath]);
    }
  });

  return list;
}

function retrieveMessagesFromLine(lineString, lineNumber) {
  const result = [];

  const CHECK_PATTERN = ['NOTE', 'OPTIMIZE', 'TODO', 'HACK', 'FIXME'];

  CHECK_PATTERN.forEach(pattern => {
    const regex = new RegExp(`(?:^|[^:])\\/[/*]\\s*${pattern}\\b\\s*(?:\\(([^:]*)\\))*\\s*:?\\s*(.*)`, 'i');
    const matchResults = lineString.match(regex);

    if (matchResults && matchResults.length) {
      const message = {
        content: '',
        type: pattern,
        line: lineNumber,
      };

      if (matchResults[2] && matchResults[2].length) {
        message.content = matchResults[2].trim();
      }

      result.push(message);
    }
  });

  return result;
}

export default class Todo {
  public readonly project: IProject;

  public readonly storage: any;

  constructor(params: {project: IProject; storage: any; }) {
    this.project = params.project;
  }

  private async matchFileContent(filePath) {
    const input = new LineByLine(filePath);
    const result = { totalLines: 0, messages: [] };
    let currentFileLineNumber = 1;

    return new Promise((resolve) => {
      input.on('line', (line) => {
        if (line.length < 1000) {
          result.messages = result.messages.concat(retrieveMessagesFromLine(line, currentFileLineNumber));
        }

        currentFileLineNumber++;
      });

      input.on('end', () => {
        result.totalLines = currentFileLineNumber;

        resolve(result);
      });
    });
  }

  public async getList() {
    const srcDir = this.project.path;
    const files = recursiveReaddirSync(srcDir, srcDir);

    const result = [];

    if (files.length) {
      for (const [ filePath, fullPath ] of files) {
        const matchInfo: any = await this.matchFileContent(fullPath);
        if (matchInfo.messages.length) {
          result.push({
            path: filePath,
            ...matchInfo
          });
        }
      }
    }

    return result;
  }
}
