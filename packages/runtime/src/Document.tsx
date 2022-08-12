import * as React from 'react';
import type { ReactNode } from 'react';
import { useAppContext } from './AppContext.js';
import { useAppData } from './AppData.js';
import { getMeta, getTitle, getLinks, getScripts } from './routesConfig.js';
import type { AppContext, RouteMatch, AssetsManifest } from './types.js';
import getCurrentRoutePath from './utils/getCurrentRoutePath.js';

interface DocumentContext {
  main: ReactNode | null;
}

const Context = React.createContext<DocumentContext | undefined>(undefined);

Context.displayName = 'DocumentContext';

function useDocumentContext() {
  const value = React.useContext(Context);
  return value;
}

export const DocumentContextProvider = Context.Provider;

export function Meta(props) {
  const { matches, routesConfig } = useAppContext();
  const meta = getMeta(matches, routesConfig);

  return (
    <>
      {meta.map(item => <meta key={item.name} {...props} {...item} />)}
      <meta {...props} name="ice-meta-count" content={meta.length.toString()} />
    </>
  );
}

export function Title(props) {
  const { matches, routesConfig } = useAppContext();
  const title = getTitle(matches, routesConfig);

  return (
    <title {...props}>{title}</title>
  );
}

export function Links(props) {
  const { routesConfig, matches, assetsManifest } = useAppContext();

  const routeLinks = getLinks(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const styles = entryAssets.concat(pageAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        routeLinks.map(link => {
          const { block, ...routeLinkProps } = link;
          return <link key={link.href} {...props} {...routeLinkProps} data-route-link />;
        })
      }
      {styles.map(style => <link key={style} {...props} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts(props) {
  const { routesData, routesConfig, matches, assetsManifest, documentOnly, routeModules, basename } = useAppContext();
  const appData = useAppData();

  const routeScripts = getScripts(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  // Page assets need to be load before entry assets, so when call dynamic import won't cause duplicate js chunk loaded.
  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const matchedIds = matches.map(match => match.route.id);
  const routePath = getCurrentRoutePath(matches);

  const appContext: AppContext = {
    appData,
    routesData,
    routesConfig,
    assetsManifest,
    appConfig: {},
    matchedIds,
    routeModules,
    routePath,
    basename,
  };

  return (
    <>
      {/*
       * disable hydration warning for CSR.
       * initial app data may not equal CSR result.
       */}
      <script suppressHydrationWarning={documentOnly} dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=${JSON.stringify(appContext)}` }} />
      {
        routeScripts.map(script => {
          const { block, ...routeScriptProps } = script;
          return <script key={script.src} {...props} {...routeScriptProps} data-route-script />;
        })
      }
      {
        scripts.map(script => {
          return <script key={script} src={script} {...props} />;
        })
      }
    </>
  );
}

export function Main(props) {
  const { main } = useDocumentContext();
  const { appConfig } = useAppContext();
  return (
    <div id={appConfig.app.rootId} {...props}>
      {main}
    </div>
  );
}

/**
 * merge assets info for matched route
 */
export function getPageAssets(matches: RouteMatch[], assetsManifest: AssetsManifest): string[] {
  // TODO：publicPath from runtime
  const { pages, publicPath } = assetsManifest;

  let result = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const assets = pages[componentName];
    assets && assets.forEach(filePath => {
      result.push(`${publicPath}${filePath}`);
    });
  });

  return result;
}

export function getEntryAssets(assetsManifest: AssetsManifest): string[] {
  const { entries, publicPath } = assetsManifest;
  let result = [];

  Object.values(entries).forEach(assets => {
    result = result.concat(assets);
  });

  return result.map(filePath => `${publicPath}${filePath}`);
}
