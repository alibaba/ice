import * as ts from 'typescript';
import * as chalk from 'chalk';
import * as os from 'os';
import { codeFrameColumns, SourceLocation } from '@babel/code-frame';
import type { Diagnostic } from 'typescript';

const createFrame = ({
  source,
  location,
}: {
  source: string
  location: SourceLocation
}) => {
  const frame = codeFrameColumns(source, location, {
    forceColor: true,
  })
    .split('\n')
    .map((line: string) => `  ${line}`)
    .join(os.EOL);

  return frame;
};

const formatDiagnosticMessage = (diagnostic: Diagnostic) => {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, os.EOL);
  let loc: SourceLocation | undefined;
  const pos = diagnostic.start === undefined ? null : diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start);
  if (pos && diagnostic.file && typeof diagnostic.start === 'number' && typeof diagnostic.length === 'number') {
    const { line: startLine, character: startCharacter  } = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start);
    const { line: endLine, character: endCharacter } = diagnostic.file?.getLineAndCharacterOfPosition(diagnostic.start + diagnostic.length);
    loc = {
      start: {
        line: startLine + 1, column: startCharacter + 1,
      },
      end: {
        line: endLine + 1, column: endCharacter + 1,
      }
    };
  }
  const errorLabel = chalk.red('error');
  const position = loc
    ? `${chalk.yellow(loc.start.line)}:${chalk.yellow(loc.start.column)}`
    : '';

  return [
    `${os.EOL}${chalk.cyan(diagnostic.file?.fileName)}:${position}`,
    `${errorLabel}: ${message}`,
    `${loc ? createFrame({ source: diagnostic.file.text, location: loc}) : ''}`,
  ].join(os.EOL);
};

export default formatDiagnosticMessage;
