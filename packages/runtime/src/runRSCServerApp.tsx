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

// This utility is based on https://github.com/zertosh/htmlescape
// License: https://github.com/zertosh/htmlescape/blob/0527ca7156a524d256101bb310a9f970f63078ad/LICENSE
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

export async function runRSCServerApp(serverContext: ServerContext, renderOptions: RenderOptions) {
  const { req, res } = serverContext;

  const {
    app,
    createRoutes,
    renderMode,
    basename,
    serverOnlyBasename,
    clientManifest: clientManifestMapping,
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

  renderDocument(serverContext, renderOptions, appContext, matches);

  const routeModules = await loadRouteModules(matches.map(({ route: { id, lazy } }) => ({ id, lazy })));

  const element = (
    <AppContextProvider value={appContext}>
      {renderMatches(matches, routeModules)}
    </AppContextProvider>
  );

  // Merge client manifest for match route.
  const clientManifest = {};
  matches.forEach(match => {
    const { componentName } = match.route;
    const manifest = clientManifestMapping[`rsc_${componentName}`];
    if (manifest) {
      Object.assign(clientManifest, manifest);
    }
  });

  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  res.write('<script>self.__rsc_data=self.__rsc_data||[];</script>');

  function decorateWrite(write) {
    return function (data) {
      const chunk = decoder.decode(data, { stream: true });
      const modifiedData = `<script>self.__rsc_data.push(${htmlEscapeJsonString(JSON.stringify([chunk]))})</script>`;

      return write.call(this, encoder.encode(modifiedData));
    };
  }

  res.write = decorateWrite(res.write);

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
  res.write(`<!DOCTYPE html>${htmlStr}`);
}

