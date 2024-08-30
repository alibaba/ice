import * as Stream from 'stream';
import type * as StreamType from 'stream';
import * as ReactDOMServer from 'react-dom/server';
import { getAllAssets } from '../Document.js';
import type { ServerAppRouterProps, RenderOptions } from '../types.js';

const { Writable } = Stream;

export interface OnAllReadyParams {
  renderAssets: string[];
}
export type OnAllReady = (OnAllReadyParams) => void;
export interface OnShellReadyParams {
  renderAssets: string[];
}
export type OnShellReady = (OnShellReadyParams) => void;
export interface RenderToPipeableStreamOptions {
  onShellReady?: OnShellReady;
  onShellError?: (error: unknown) => void;
  onAllReady?: OnAllReady;
  onError?: (error: unknown) => void;
}

export type NodeWritablePiper = (
  res: StreamType.Writable,
  options?: RenderToPipeableStreamOptions,
) => void;

export type RenderToNodeStreamOptions = {
  renderOptions: RenderOptions;
  routerContext: ServerAppRouterProps['routerContext'];
};
export function renderToNodeStream(
  element: React.ReactElement,
  renderToNodeStreamOptions: RenderToNodeStreamOptions,
): NodeWritablePiper {
  return (res, options) => {
    const {
      renderOptions,
    } = renderToNodeStreamOptions;
    const {
      preRender = false,
      getAssets = false,
    } = renderOptions;

    const { pipe } = ReactDOMServer.renderToPipeableStream(element, {
      onShellReady() {
        // Pip after onAllReady when pre render SSR.
        if (!preRender) {
          pipe(res);
        }

        const {
          onShellReady,
        } = options || {};

        if (!onShellReady) return;

        const {
          renderOptions,
          routerContext,
        } = renderToNodeStreamOptions;

        const {
          assetsManifest,
        } = renderOptions;

        const {
          matches,
          loaderData,
        } = routerContext;

        const renderAssets = getAssets ? getAllAssets(loaderData, matches, assetsManifest) : [];

        onShellReady({
          renderAssets,
        });
      },
      onShellError(error) {
        options?.onShellError && options?.onShellError(error);
      },
      onError(error) {
        options?.onError && options?.onError(error);
      },
      onAllReady() {
        // For pre render SSR.
        if (preRender) {
          const {
            renderOptions,
            routerContext,
          } = renderToNodeStreamOptions;

          const {
            assetsManifest,
          } = renderOptions;

          const {
            matches,
            loaderData,
          } = routerContext;

          let renderAssets = getAllAssets(loaderData, matches, assetsManifest);
          if (typeof window !== 'undefined' && window.renderAssets) {
            renderAssets = renderAssets.concat(window.renderAssets);
          }

          options?.onAllReady && options?.onAllReady({
            renderAssets,
          });

          // Pipe after collecting assets.
          pipe(res);
        } else {
          options?.onAllReady && options?.onAllReady({
            renderAssets: [],
          });
        }
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
