import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { renderToPipeableStream } from 'react-server-dom-webpack/server.node';
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

  if (req.url?.indexOf('rsc') === -1) {
    return renderDocument(serverContext, renderOptions, appContext, matches);
  }

  const routeModules = await loadRouteModules(matches.map(({ route: { id, lazy } }) => ({ id, lazy })));

  const element = (
    <AppContextProvider value={appContext}>
      {renderMatches(matches, routeModules)}
    </AppContextProvider>
  );

  const { pipe } = renderToPipeableStream(
    element,
    clientManifest,
  );

  pipe(res);
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
  res.send(`<!DOCTYPE html>${htmlStr}`);
}

