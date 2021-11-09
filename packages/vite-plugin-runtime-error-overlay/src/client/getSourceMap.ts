import { RawSourceMap, SourceMapConsumer } from 'source-map';

class SourceMap {
  private sourceMap: SourceMapConsumer;

  constructor(sourceMap: SourceMapConsumer) {
    this.sourceMap = sourceMap;
  }

  public getOriginalPosition(
    line: number,
    column: number
  ): { source: string, line: number, column: number } {
    const {
      line: l,
      column: c,
      source: s,
    } = this.sourceMap.originalPositionFor({
      line,
      column,
    });
    return { line: l, column: c, source: s };
  }

  public getGeneratedPosition(
    source: string,
    line: number,
    column: number
  ): { line: number, column: number } {
    const { line: l, column: c } = this.sourceMap.generatedPositionFor({
      source,
      line,
      column,
    });
    return {
      line: l,
      column: c,
    };
  }

  public getSource(sourceName: string): string {
    return this.sourceMap.sourceContentFor(sourceName) as string;
  }

  public getSources(): string[] {
    return (this.sourceMap as any).sources;
  }
}

function extractSourceMapUrl(
  fileUri: string,
  fileContents: string
): Promise<string> {
  const regex = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;
  let match: any = null;
  for (;;) {
    const next = regex.exec(fileContents);
    if (next == null) {
      break;
    }
    match = next;
  }
  if (!(match && match[1])) {
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(`Cannot find a source map directive for ${fileUri}.`);
  }
  return Promise.resolve(match[1].toString());
}

async function getSourceMap(
  fileUri: string,
  fileContents: string
): Promise<SourceMap> {
  let sm = await extractSourceMapUrl(fileUri, fileContents);
  if (sm.indexOf('data:') === 0) {
    const base64 = /^data:application\/json;([\w=:"-]+;)*base64,/;
    const match2 = sm.match(base64);
    if (!match2) {
      throw new Error(
        'Sorry, non-base64 inline source-map encoding is not supported.'
      );
    }
    sm = sm.substring(match2[0].length);
    sm = window.atob(sm);
    sm = JSON.parse(sm);
    return new SourceMap(new SourceMapConsumer(sm as unknown as RawSourceMap));
  } else {
    const index = fileUri.lastIndexOf('/');
    const url = fileUri.substring(0, index + 1) + sm;
    const obj = await fetch(url).then(res => res.json());
    return new SourceMap(new SourceMapConsumer(obj));
  }
}

export { extractSourceMapUrl, getSourceMap };
export default getSourceMap;
