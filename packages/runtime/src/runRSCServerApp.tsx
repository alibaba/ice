import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
// import { renderToPipeableStream } from 'react-server-dom-webpack/server.node';
import { use } from 'react';
import * as EdgeServer from 'react-dom/server.edge';
import { createFromReadableStream } from 'react-server-dom-webpack/client.edge';
import { renderToReadableStream } from 'react-server-dom-webpack/server.edge';
import { AppContextProvider } from './AppContext.js';
import { DocumentContextProvider } from './Document.js';
import { loadRouteModules } from './routes.js';
import getAppConfig from './appConfig.js';
import getRequestContext from './requestContext.js';
import getLocation from './utils/getLocation.js';
import addLeadingSlash from './utils/addLeadingSlash.js';
import matchRoutes from './matchRoutes.js';
import type {
  AppContext,
  ServerContext,
  RouteMatch,
  RouteModules,
  ServerRenderOptions as RenderOptions,
} from './types.js';
// @ts-ignore
// @ts-ignore

export async function runRSCServerApp(serverContext: ServerContext, renderOptions: RenderOptions) {
  const { req, res } = serverContext;

  const {
    app,
    createRoutes,
    renderMode,
    basename,
    serverOnlyBasename,
    clientManifest,
    assetsManifest,
    Document,
  } = renderOptions;

  const location = getLocation(req.url);
  const requestContext = getRequestContext(location, serverContext);
  const routes = createRoutes({
    requestContext,
    renderMode,
  });
  const finalBasename = addLeadingSlash(serverOnlyBasename || basename);
  const matches = matchRoutes(routes, location, finalBasename);

  const appConfig = getAppConfig(app);
  const appContext: AppContext = {
    appConfig,
    appData: null,
    renderMode,
    assetsManifest,
    basename: finalBasename,
    matches: [],
  };

  // if (req.url?.indexOf('rsc') === -1) {
  //   return renderDocument(serverContext, renderOptions, appContext);
  // }

  const routeModules = await loadRouteModules(matches.map(({ route: { id, lazy } }) => ({ id, lazy })));

  const element = (
    <>
      {renderMatches(matches, routeModules)}
    </>
  );

  const stream = renderToReadableStream(element, clientManifest);
  const [renderStream, forwardStream] = stream.tee();

  const moduleMap = {};

  for (const key in clientManifest) {
    const { id } = clientManifest[key];
    moduleMap[id] = {
      id: id,
      name: '*',
    };

    moduleMap[id]['*'] = {
      ...clientManifest[key],
      chunks: [],
    };
  }

  const response = createFromReadableStream(renderStream, {
    moduleMap: moduleMap,
  });

  function App() {
    const documentContext = {
      main: use(response),
    };

    return (
      <AppContextProvider value={appContext}>
        <DocumentContextProvider value={documentContext}>
          <Document pagePath="/" />
        </DocumentContextProvider>
      </AppContextProvider>
    );
  }

  const forwardReader = forwardStream.getReader();

  const rscChunks = [];

  function readRSCTree() {
    res.write('<script>!window.__next_f && (window.__next_f = []);</script>');

    forwardReader.read().then(({ done, value }) => {
      if (value) {
        rscChunks.push(value);
      }

      if (done) {
        return;
      } else {
        const responsePartial = decodeText(value, textDecoder);
        const scripts = `<script>self.__next_f.push(${htmlEscapeJsonString(
          JSON.stringify([1, responsePartial]),
        )})</script>`;
        res.write(scripts);
        readRSCTree();
      }
    });
  }

  readRSCTree();

  const appStream = await EdgeServer.renderToReadableStream(<App />);
  startReadingFromStream(res, appStream);
}

function startReadingFromStream(response, stream) {
  let reader = stream.getReader();

  function progress(_ref) {
    let { done } = _ref,
        { value } = _ref;

    if (done) {
      response.end();
      return;
    }

    response.write(value);
    return reader.read().then(progress).catch(error);
  }

  function error(e) {
    console.log(e);
  }

  reader.read().then(progress).catch(error);
}

function renderMatches(matches: RouteMatch[], routeModules: RouteModules) {
  return matches.reduceRight((children, match) => {
    if (match.route) {
      const Component = routeModules[match.route.id].default;

      return React.createElement(Component, {
        children,
      });
    }

    return children;
  }, React.createElement(null));
}

function renderDocument(requestContext, renderOptions, appContext) {
  const { res } = requestContext;

  const {
    Document,
  } = renderOptions;

  const documentContext = {
    main: null,
  };

  const htmlStr = ReactDOMServer.renderToString(
    <AppContextProvider value={appContext}>
      <DocumentContextProvider value={documentContext}>
        <Document />
      </DocumentContextProvider>
    </AppContextProvider>,
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(`<!DOCTYPE html>${htmlStr}`);
}

const ESCAPE_LOOKUP: { [match: string]: string } = {
  '&': '\\u0026',
  '>': '\\u003e',
  '<': '\\u003c',
  '\u2028': '\\u2028',
  '\u2029': '\\u2029',
};

const ESCAPE_REGEX = /[&><\u2028\u2029]/g;

function htmlEscapeJsonString(str: string): string {
  return str.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
}

const textDecoder = new TextDecoder();

function decodeText(
  input: Uint8Array | undefined,
  textDecoder: TextDecoder,
) {
  return textDecoder.decode(input, { stream: true });
}

function encodeText(input: string) {
  return new TextEncoder().encode(input);
}