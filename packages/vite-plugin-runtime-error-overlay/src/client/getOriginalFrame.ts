// fork form https://github.com/facebook/create-react-app/blob/main/packages/react-error-overlay/src/utils/mapper.js
import StackFrame from './stack-frame';
import { getSourceMap } from './getSourceMap';
import getLinesAround from './getLinesAround';

async function getOriginalFrame(
  frames: StackFrame[],
  contextLines = 3
): Promise<StackFrame[]> {
  const cache: any = {};
  const files: string[] = [];
  frames.forEach(frame => {
    const { fileName } = frame;
    if (fileName == null) {
      return;
    }
    if (files.indexOf(fileName) !== -1) {
      return;
    }
    files.push(fileName);
  });
  await Promise.all(
    files.map(async fileName => {
      const fetchUrl =
        fileName.indexOf('webpack-internal:') === 0
          ? `/__get-internal-source?fileName=${encodeURIComponent(fileName)}`
          : fileName;

      const fileSource = await fetch(fetchUrl).then(r => r.text());
      const sourceMap = await getSourceMap(fileName, fileSource);
      cache[fileName] = { fileSource, sourceMap };
    })
  );
  return frames.map(frame => {
    const { functionName, fileName, lineNumber, columnNumber } = frame;
    const { sourceMap, fileSource } = cache[fileName as string] || {};
    if (sourceMap == null || lineNumber == null) {
      return frame;
    }
    const { source, line, column } = sourceMap.getOriginalPosition(
      lineNumber,
      columnNumber
    );
    const originalSource = source == null ? [] : sourceMap.getSource(source);
    return new StackFrame(
      functionName,
      fileName,
      lineNumber,
      columnNumber,
      getLinesAround(lineNumber, contextLines, fileSource),
      functionName,
      source,
      line,
      column,
      getLinesAround(line, contextLines, originalSource)
    );
  });
}

export default getOriginalFrame;
