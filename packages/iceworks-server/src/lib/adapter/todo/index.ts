import * as path from 'path';
import * as junk from 'junk';
import * as recursiveReaddir from 'recursive-readdir';
import { isBinaryFileSync } from 'isbinaryfile';
import * as LineByLine from 'line-by-line';
import { IProject, ITodoModule, ITodoMsg, ITodo } from '../../../interface';
import config from '../config';

const { title,  description, cover, isAvailable } = config['todo'];

async function matchFileContent(filePath: string): Promise<ITodoMsg[]> {
  const input = new LineByLine(filePath);
  let result: ITodoMsg[] = [];
  let currentFileLineNumber = 1;

  return new Promise((resolve) => {
    input.on('line', (line) => {
      if (line.length < 1000) {
        result = result.concat(retrieveMessagesFromLine(line, currentFileLineNumber));
      }

      currentFileLineNumber++;
    });

    input.on('end', () => {
      resolve(result);
    });
  });
}

function retrieveMessagesFromLine(lineString, lineNumber): ITodoMsg[] {
  const result: ITodoMsg[] = [];

  const CHECK_PATTERN = ['NOTE', 'OPTIMIZE', 'TODO', 'HACK', 'FIXME'];

  CHECK_PATTERN.forEach(pattern => {
    // match rules：`// ${pattern} ${content}`  example: // FIXME something to do
    const reg = new RegExp(`(?:^|[^:])\\/[/*]\\s*${pattern}\\b\\s*(?:\\(([^:]*)\\))*\\s*:?\\s*(.*)`, 'i');
    const matchResults = lineString.match(reg);

    if (matchResults && matchResults.length) {
      const message: ITodoMsg = {
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

function ignoreFile(filePath: string, stats) {
  return stats.isDirectory() && junk.is(filePath) && isBinaryFileSync(filePath);
}

export default class Todo implements ITodoModule {
  public readonly title: string = title;
  public readonly description: string = description;
  public readonly cover: string = cover;
  public readonly isAvailable: boolean = isAvailable;
  public readonly project: IProject;
  public readonly storage: any;

  constructor(params: {project: IProject; storage: any; }) {
    this.project = params.project;
  }

  public async getList(): Promise<ITodo[]> {
    const files: string[] = await new Promise((resolve, reject) => {
      recursiveReaddir(this.project.path, ['node_modules', '.*', ignoreFile], (err, res) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(res);
      });
    });

    const result: ITodo[] = [];

    if (files.length) {
      for (const filePath of files) {
        const messages: ITodoMsg[] = await matchFileContent(filePath);
        if (messages.length) {
          result.push({
            messages,
            path: path.relative(this.project.path, filePath)
          });
        }
      }
    }

    return result;
  }
}
