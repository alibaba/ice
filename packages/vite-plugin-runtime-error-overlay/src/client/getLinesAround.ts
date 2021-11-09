import { ScriptLine } from './stack-frame';

function getLinesAround(
  line: number,
  count: number,
  lines: string[] | string
): ScriptLine[] {
  if (typeof lines === 'string') {
    lines = lines.split('\n');
  }
  const result: ScriptLine[] = [];
  for (
    let index = Math.max(0, line - 1 - count);
    index <= Math.min(lines.length - 1, line - 1 + count);
    ++index
  ) {
    result.push(new ScriptLine(index + 1, lines[index], index === line - 1));
  }
  return result;
}

export default getLinesAround;
