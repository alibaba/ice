import * as React from 'react';
import type { ReactNode } from 'react';
import { useAppContext } from './AppContext.js';
import { useAppData } from './AppData.js';
import { getMeta, getTitle, getLinks, getScripts } from './routesConfig.js';
import type { AppContext, RouteMatch, AssetsManifest } from './types';

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

export function Meta() {
  const { matches, routesConfig } = useAppContext();
  const meta = getMeta(matches, routesConfig);

  return (
    <>
      {meta.map(item => <meta key={item.name} {...item} />)}
      <meta name="ice-meta-count" content={meta.length.toString()} />
    </>
  );
}

export function Title() {
  const { matches, routesConfig } = useAppContext();
  const title = getTitle(matches, routesConfig);

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { routesConfig, matches, assetsManifest } = useAppContext();

  const routeLinks = getLinks(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        routeLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} data-route-link />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts() {
  const { routesData, routesConfig, matches, assetsManifest, documentOnly } = useAppContext();
  const appData = useAppData();

  const routeScripts = getScripts(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const appContext: AppContext = {
    appData,
    routesData,
    routesConfig,
    assetsManifest,
    appConfig: {},
  };

  return (
    <>
      {/*
       * disable hydration warning for csr.
       * initial app data may not equal csr result.
       */}
      <script suppressHydrationWarning={documentOnly} dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=${JSON.stringify(appContext)}` }} />
      {
        routeScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} {...props} data-route-script />;
        })
      }
      {
        scripts.map(script => {
          return <script key={script} src={script} />;
        })
      }
    </>
  );
}

export function Main() {
  const { main } = useDocumentContext();

  return (
    <div id="ice-container" >
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