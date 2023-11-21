import * as Stream from 'stream';
import type * as StreamType from 'stream';
import * as ReactDOMServer from 'react-dom/server';

const { Writable } = Stream;

export interface OnAllReadyParams {
  renderAssets: string[];
}
export type OnAllReady = (OnAllReadyParams) => void;
export interface RenderToPipeableStreamOptions {
  onShellReady?: () => void;
  onShellError?: (error: unknown) => void;
  onAllReady?: OnAllReady;
  onError?: (error: unknown) => void;
}

export type NodeWritablePiper = (
  res: StreamType.Writable,
  options?: RenderToPipeableStreamOptions,
) => void;

export function renderToNodeStream(
  element: React.ReactElement,
): NodeWritablePiper {
  return (res, options) => {
    const { pipe } = ReactDOMServer.renderToPipeableStream(element, {
      onShellReady() {
        pipe(res);
        options?.onShellReady && options.onShellReady();
      },
      onShellError(error) {
        options?.onShellError && options?.onShellError(error);
      },
      onError(error) {
        options?.onError && options?.onError(error);
      },
      onAllReady() {
        options?.onAllReady && options?.onAllReady({
          renderAssets: (typeof window === 'undefined') ? [] : (window.renderAssets || []),
        });
      },
    });
  };
}

export function pipeToString(input): Promise<string> {
  return new Promise((resolve, reject) => {
    const bufferedChunks: any[] = [];

    const stream = new Writable({
      writev(chunks, callback) {
        chunks.forEach((chunk) => bufferedChunks.push(chunk.chunk));
        callback();
      },
    });

    stream.on('finish', () => {
      const result = Buffer.concat(bufferedChunks).toString();
      resolve(result);
    });

    stream.on('error', (error) => {
      reject(error);
    });

    input(stream, {
      onError: (error) => {
        reject(error);
      },
    });
  });
}