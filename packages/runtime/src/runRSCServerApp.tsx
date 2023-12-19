
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
// @ts-ignore
import * as ReactDOMServerEdge from 'react-dom/server.edge';
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
import createServerComponentRenderer from './server/createServerComponentRenderer.js';

if (!global.ReadableStream) {
  global.ReadableStream = require('stream/web').ReadableStream;
}

if (!global.WritableStream) {
  global.WritableStream = require('stream/web').WritableStream;
}

if (!global.TransformStream) {
  global.TransformStream = require('stream/web').TransformStream;
}

export async function runRSCServerApp(serverContext: ServerContext, renderOptions: RenderOptions) {
  const { req, res } = serverContext;

  const {
    app,
    createRoutes,
    renderMode,
    basename,
    serverOnlyBasename,
    clientManifest,
    serverManifest,
    assetsManifest,
    routePath,
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

  // renderDocument(serverContext, renderOptions, appContext, matches);

  const routeModules = await loadRouteModules(matches.map(({ route: { id, lazy } }) => ({ id, lazy })));

  const clientReferenceManifest = createClientReferenceManifest(clientManifest, serverManifest, matches);

  const rscWriter = createWritableStream(res);
  const Main = createServerComponentRenderer(() => {
    return renderMatches(matches, routeModules);
  }, {
    writable: rscWriter,
    clientReferenceManifest,
    serverComponentsErrorHandler: (err) => {
      console.error(err);
    },
  });

  const documentContext = {
    main: (
      <React.Suspense>
        <Main />
      </React.Suspense>
    ),
  };

  function App() {
    return (
      <AppContextProvider value={{ ...appContext, matches }}>
        <DocumentContextProvider value={documentContext}>
          <Document pagePath={routePath} />
        </DocumentContextProvider>
      </AppContextProvider>
    );
  }

  const appStream = await ReactDOMServerEdge.renderToReadableStream(<App />, {
    onError: (err) => {
      console.error(err);
    },
  });
  const htmlWriter = createWritableStream(res, true);
  appStream.pipeTo(htmlWriter);
}

// Merge client manifest for match route.
function createClientReferenceManifest(clientManifest, serverManifest, matches) {
  const clientModules = {};
  const ssrModuleMapping = {};
  matches.forEach(match => {
    const { componentName } = match.route;
    const manifest = clientManifest[`rsc_${componentName}`];
    if (manifest) {
      Object.assign(clientModules, manifest);
    }

    const ssrManifest = serverManifest[`rsc_${componentName}`];
    if (ssrManifest) {
      Object.assign(ssrModuleMapping, ssrManifest);
    }
  });

  const clientReferenceManifest = {
    clientModules,
    ssrModuleMapping,
    moduleLoading: {
      prefix: '',
      crossOrigin: null,
    },
  };

  return clientReferenceManifest;
}

// Write chunk to node response.
function createWritableStream(response, close?: boolean) {
  const config: any = {
    write(chunk) {
      return new Promise(resolve => {
        response.write(chunk);
        resolve(null);
      });
    },
    abort(error) {
      console.log(error);
    },
  };

  if (close) {
    config.close = () => {
      response.end();
    };
  }

  const writable = new WritableStream(config);
  return writable;
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

function renderDocument(requestContext, renderOptions, appContext, matches) {
  const { res } = requestContext;

  const {
    Document,
    routePath,
  } = renderOptions;

  const documentContext = {
    main: null,
  };

  const htmlStr = ReactDOMServer.renderToString(
    <AppContextProvider value={{ ...appContext, matches }}>
      <DocumentContextProvider value={documentContext}>
        <Document pagePath={routePath} />
      </DocumentContextProvider>
    </AppContextProvider>,
  );

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write(`<!DOCTYPE html>${htmlStr}`);
}

