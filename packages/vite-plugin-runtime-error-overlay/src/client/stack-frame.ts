/* eslint-disable max-classes-per-file */
class ScriptLine {
  public lineNumber: number;

  public content: string;

  public errorLine: boolean;

  constructor(lineNumber: number, content: string, errorLine = false) {
    this.lineNumber = lineNumber;
    this.content = content;
    this.errorLine = errorLine;
  }
}

class StackFrame {
  public functionName: string | null;

  public fileName: string | null;

  public lineNumber: number | null;

  public columnNumber: number | null;

  public originalFunctionName: string | null;

  public originalFileName: string | null;

  public originalLineNumber: number | null;

  public originalColumnNumber: number | null;

  public scriptCode: ScriptLine[] | null;

  public originalScriptCode: ScriptLine[] | null;

  constructor(
    functionName: string | null = null,
    fileName: string | null = null,
    lineNumber: number | null = null,
    columnNumber: number | null = null,
    scriptCode: ScriptLine[] | null = null,
    sourceFunctionName: string | null = null,
    sourceFileName: string | null = null,
    sourceLineNumber: number | null = null,
    sourceColumnNumber: number | null = null,
    sourceScriptCode: ScriptLine[] | null = null
  ) {
    if (functionName && functionName.indexOf('Object.') === 0) {
      functionName = functionName.slice('Object.'.length);
    }
    if (
      // Chrome has a bug with inferring function.name:
      // https://github.com/facebook/create-react-app/issues/2097
      // Let's ignore a meaningless name we get for top-level modules.
      functionName === 'friendlySyntaxErrorLabel' ||
      functionName === 'exports.__esModule' ||
      functionName === '<anonymous>' ||
      !functionName
    ) {
      functionName = null;
    }
    this.functionName = functionName;

    this.fileName = fileName;
    this.lineNumber = lineNumber;
    this.columnNumber = columnNumber;

    this.originalFunctionName = sourceFunctionName;
    this.originalFileName = sourceFileName;
    this.originalLineNumber = sourceLineNumber;
    this.originalColumnNumber = sourceColumnNumber;

    this.scriptCode = scriptCode;
    this.originalScriptCode = sourceScriptCode;
  }

  public getFunctionName(): string {
    return this.functionName || '(anonymous function)';
  }

  public getSource(): string {
    let str = '';
    if (this.fileName != null) {
      str += `${this.fileName}:`;
    }
    if (this.lineNumber != null) {
      str += `${this.lineNumber}:`;
    }
    if (this.columnNumber != null) {
      str += `${this.columnNumber}:`;
    }
    return str.slice(0, -1);
  }

  public toString(): string {
    const functionName = this.getFunctionName();
    const source = this.getSource();
    return `${functionName}${source ? ` (${source})` : ''}`;
  }

  public generateCodeFrame(): string {
    const maxLine = Math.max(...this.originalScriptCode.map(({ lineNumber }) => String(lineNumber).length));
    const codeFrames: string[] = [];
    this.originalScriptCode.forEach((scriptLine) => {
      const { lineNumber, content } = scriptLine;
      codeFrames.push(`${lineNumber}${' '.repeat(maxLine + 1 - String(lineNumber).length)}| ${content}`);
      if (lineNumber === this.originalLineNumber) {
        codeFrames.push(`${' '.repeat(maxLine + 1)}|  ${' '.repeat(this.originalColumnNumber)}^`);
      }
    });
    return `${codeFrames.join('\n')}\n`;
  }
}

export { StackFrame, ScriptLine };
export default StackFrame;