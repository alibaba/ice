import * as React from 'react';
import type { WindowContext, RouteMatch, AssetsManifest } from './types.js';
import { useAppContext } from './AppContext.js';
import { useAppData } from './AppData.js';
import { getMeta, getTitle, getLinks, getScripts } from './routesConfig.js';
import getCurrentRoutePath from './utils/getCurrentRoutePath.js';

interface DocumentContext {
  main: React.ReactNode | null;
}

const Context = React.createContext<DocumentContext | undefined>(undefined);

Context.displayName = 'DocumentContext';

function useDocumentContext() {
  const value = React.useContext(Context);
  return value;
}

export const DocumentContextProvider = Context.Provider;

interface MetaProps extends React.HTMLAttributes<HTMLMetaElement>{
  MetaElement?: React.ComponentType<React.HTMLAttributes<HTMLMetaElement>>;
}

export function Meta(props: MetaProps) {
  const { matches, routesConfig } = useAppContext();
  const meta = getMeta(matches, routesConfig);
  const {
    MetaElement = 'meta',
  } = props;

  return (
    <>
      {meta.map(item => <MetaElement key={item.name} {...props} {...item} />)}
      <MetaElement {...props} name="ice-meta-count" content={meta.length.toString()} />
    </>
  );
}

interface TitleProps extends React.HTMLAttributes<HTMLTitleElement>{
  TitleElement?: React.ComponentType<React.HTMLAttributes<HTMLTitleElement>>;
}

export function Title(props: TitleProps) {
  const { matches, routesConfig } = useAppContext();
  const title = getTitle(matches, routesConfig);
  const {
    TitleElement = 'title',
    ...rest
  } = props;

  return (
    <TitleElement {...rest}>{title}</TitleElement>
  );
}

interface LinksProps extends React.LinkHTMLAttributes<HTMLLinkElement>{
  LinkElement?: React.ComponentType<React.LinkHTMLAttributes<HTMLLinkElement>>;
}

export function Links(props: LinksProps) {
  const { routesConfig, matches, assetsManifest } = useAppContext();
  const {
    LinkElement = 'link',
    ...rest
  } = props;

  const routeLinks = getLinks(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const styles = entryAssets.concat(pageAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        routeLinks.map(routeLinkProps => {
          return <LinkElement key={routeLinkProps.href} {...rest} {...routeLinkProps} data-route-link />;
        })
      }
      {styles.map(style => <LinkElement key={style} {...rest} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

interface ScriptsProps extends React.ScriptHTMLAttributes<HTMLScriptElement>{
  ScriptElement?: React.ComponentType<React.ScriptHTMLAttributes<HTMLScriptElement>> | string;
}

export function Scripts(props: ScriptsProps) {
  const { routesConfig, matches, assetsManifest } = useAppContext();
  const {
    ScriptElement = 'script',
    ...rest
  } = props;

  const routeScripts = getScripts(matches, routesConfig);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  // Page assets need to be load before entry assets, so when call dynamic import won't cause duplicate js chunk loaded.
  let scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  if (assetsManifest.dataLoader) {
    scripts.unshift(`${assetsManifest.publicPath}${assetsManifest.dataLoader}`);
  }

  // Unique scripts for duplicate chunks.
  const jsSet = {};
  scripts = scripts.filter((script) => {
    if (jsSet[script]) return false;
    jsSet[script] = true;
    return true;
  });

  return (
    <>
      <Data ScriptElement={ScriptElement} />
      {
        routeScripts.map(routeScriptProps => {
          return <ScriptElement key={routeScriptProps.src} {...rest} {...routeScriptProps} data-route-script />;
        })
      }
      {
        scripts.map(script => {
          return <ScriptElement key={script} src={script} {...rest} />;
        })
      }
    </>
  );
}

interface DataProps {
  ScriptElement?: React.ComponentType<React.ScriptHTMLAttributes<HTMLScriptElement>> | string;
}

// use app context separately
export function Data(props: DataProps) {
  const { routesData, documentOnly, matches, routesConfig, downgrade } = useAppContext();
  const appData = useAppData();
  const {
    ScriptElement = 'script',
  } = props;

  const matchedIds = matches.map(match => match.route.id);
  const routePath = getCurrentRoutePath(matches);
  const windowContext: WindowContext = {
    appData,
    routesData,
    routesConfig,
    routePath,
    downgrade,
    matchedIds,
    documentOnly,
  };

  return (
    // Disable hydration warning for csr, initial app data may not equal csr result.
    // Should merge global context when there are multiple <Data />.
    <ScriptElement
      suppressHydrationWarning={documentOnly}
      dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=Object.assign(${JSON.stringify(windowContext)}, window.__ICE_APP_CONTEXT__ || {})` }}
    />
  );
}

export function Main(props: React.HTMLAttributes<HTMLDivElement>) {
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
