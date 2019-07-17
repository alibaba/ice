import * as path from 'path';
import * as LineByLine from 'line-by-line';
import { IProject, ITodoModule, ITodoMsg, ITodo } from '../../../../interface';
import recursiveReaddir from '../../../recursiveReaddir';

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

export default class Todo implements ITodoModule {
  public readonly project: IProject;

  public readonly storage: any;

  constructor(params: {project: IProject; storage: any }) {
    this.project = params.project;
  }

  public async getList(): Promise<ITodo[]> {
    const files: string[] = await recursiveReaddir(this.project.path);

    const result: ITodo[] = [];
    await Promise.all(files.map(async (filePath) => {
      const messages: ITodoMsg[] = await matchFileContent(filePath);
      if (messages.length) {
        result.push({
          messages,
          path: path.relative(this.project.path, filePath),
        });
      }
    }));

    return result;
  }
}
