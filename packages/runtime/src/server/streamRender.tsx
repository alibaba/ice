import * as Stream from 'stream';
import type * as StreamType from 'stream';
import * as ReactDOMServer from 'react-dom/server';

const { Writable } = Stream;

export type NodeWritablePiper = (
  res: StreamType.Writable,
  next?: (err?: Error) => void
) => void;

export function renderToNodeStream(
  element: React.ReactElement,
  generateStaticHTML: boolean,
): NodeWritablePiper {
  return (res, next) => {
    const { pipe } = ReactDOMServer.renderToPipeableStream(
      element,
      {
        onShellReady() {
          if (!generateStaticHTML) {
            pipe(res);
          }
        },
        onAllReady() {
          if (generateStaticHTML) {
            pipe(res);
          }
          next();
        },
        onError(error: Error) {
          next(error);
        },
      },
    );
  };
}

/**
 * Environments with Web Streams, like Deno and modern edge runtimes, should use renderToReadableStream instead.
 */
export function renderToReadableStream(
  element: React.ReactElement,
): NodeWritablePiper {
  return (res, next) => {
    const readable = (ReactDOMServer as any).renderToReadableStream(element, {
      onError: (error) => {
        next(error);
      },
    });

    const reader = readable.getReader();
    const decoder = new TextDecoder();
    const process = () => {
      reader.read().then(({ done, value }) => {
        if (done) {
          next();
        } else {
          const s = typeof value === 'string' ? value : decoder.decode(value);
          res.write(s);
          process();
        }
      });
    };

    process();
  };
}

export function piperToString(input): Promise<string> {
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

    input(stream, (error) => {
      if (error) {
        reject(error);
      }
    });
  });
}