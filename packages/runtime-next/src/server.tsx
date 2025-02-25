import type { ServerResponse, IncomingMessage } from 'http';
import type * as StreamType from 'stream';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { getAppConfig, AppContextProvider, DocumentContextProvider } from '@ice/runtime-kit';
import type { ServerContext, AppContext } from '@ice/runtime-kit';

export interface OnAllReadyParams {
  renderAssets: string[];
}
export type OnAllReady = (params: OnAllReadyParams) => void;
export interface OnShellReadyParams {
  renderAssets: string[];
}
export type OnShellReady = (params: OnShellReadyParams) => void;
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

interface Piper {
  pipe: NodeWritablePiper;
  fallback: Function;
}

interface Response {
  statusCode: number;
  statusText: string;
  value?: string | Piper;
  headers?: Record<string, string>;
}

export async function sendResponse(
  req: IncomingMessage,
  res: ServerResponse,
  { statusCode, statusText, headers = {}, value }: Response,
): Promise<void> {
  res.statusCode = statusCode;
  res.statusMessage = statusText;

  for (const [name, value] of Object.entries(headers)) {
    res.setHeader(name, value);
  }

  if (value && req.method !== 'HEAD') {
    res.end(value);
  } else {
    res.end();
  }
}

export const getDocumentResponse = async (
  serverContext: ServerContext,
  renderOptions: any,
): Promise<Response> => {
  // TODO: get matches by serverContext.
  const {
    assetsManifest,
    app,
    Document,
    basename,
    routesConfig = {},
    serverData,
    routePath = '',
  } = renderOptions;

  const appConfig = getAppConfig(app);
  const appContext: AppContext = {
    assetsManifest,
    appConfig,
    appData: null,
    loaderData: {},
    matches: [],
    routes: [],
    documentOnly: true,
    renderMode: 'CSR',
    routePath: '',
    basename,
    downgrade: false,
    serverData,
    documentData: null,
  };

  const documentContext = { main: null };
  const htmlStr = ReactDOMServer.renderToString(
    // @ts-ignore fix the type error by union react types.
    <AppContextProvider value={appContext}>
      {/* @ts-ignore fix the type error by union react types */}
      <DocumentContextProvider value={documentContext}>
        {Document ? <Document pagePath={routePath} /> : null}
      </DocumentContextProvider>
    </AppContextProvider>,
  );

  return {
    value: `<!DOCTYPE html>${htmlStr}`,
    statusText: '',
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
    statusCode: 200,
  };
};

export const renderDocumentToResponse = async (
  serverContext: ServerContext,
  renderOptions: any,
): Promise<void> => {
  const { req, res } = serverContext;
  const response = await getDocumentResponse(serverContext, renderOptions);
  if (req && res) {
    await sendResponse(req, res, response);
  }
};

export { getAppConfig };
