import * as React from 'react';
import type { WindowContext, RouteMatch, AssetsManifest } from './types.js';
import { useAppContext, useAppData } from './AppContext.js';
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

export type MetaType = (props: MetaProps) => JSX.Element;

export const Meta: MetaType = (props: MetaProps) => {
  const { matches, loaderData } = useAppContext();
  const meta = getMeta(matches, loaderData);
  const {
    MetaElement = 'meta',
  } = props;

  return (
    <>
      {meta.map(item => <MetaElement key={item.name} {...props} {...item} />)}
      <MetaElement {...props} name="ice-meta-count" content={meta.length.toString()} />
    </>
  );
};

interface TitleProps extends React.HTMLAttributes<HTMLTitleElement>{
  TitleElement?: React.ComponentType<React.HTMLAttributes<HTMLTitleElement>>;
}

export type TitleType = (props: TitleProps) => JSX.Element;

export const Title: TitleType = (props: TitleProps) => {
  const { matches, loaderData } = useAppContext();
  const title = getTitle(matches, loaderData);
  const {
    TitleElement = 'title',
    ...rest
  } = props;

  return (
    <TitleElement {...rest}>{title}</TitleElement>
  );
};

interface LinksProps extends React.LinkHTMLAttributes<HTMLLinkElement>{
  LinkElement?: React.ComponentType<React.LinkHTMLAttributes<HTMLLinkElement>>;
}

export type LinksType = (props: LinksProps) => JSX.Element;

export const Links: LinksType = (props: LinksProps) => {
  const { loaderData, matches, assetsManifest } = useAppContext();
  const {
    LinkElement = 'link',
    ...rest
  } = props;

  const routeLinks = getLinks(matches, loaderData);
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
};

interface ScriptsProps extends React.ScriptHTMLAttributes<HTMLScriptElement>{
  ScriptElement?: React.ComponentType<React.ScriptHTMLAttributes<HTMLScriptElement>> | string;
}

export type ScriptsType = (props: ScriptsProps) => JSX.Element;

export const Scripts: ScriptsType = (props: ScriptsProps) => {
  const { loaderData, matches, assetsManifest } = useAppContext();

  const {
    ScriptElement = 'script',
    ...rest
  } = props;

  const routeScripts = getScripts(matches, loaderData);
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
};

export function useScripts() {
  const { loaderData, matches, assetsManifest } = useAppContext();
  const routeScripts = getScripts(matches, loaderData);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  // Page assets need to be load before entry assets, so when call dynamic import won't cause duplicate js chunk loaded.
  let scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);
  if (assetsManifest.dataLoader) {
    scripts.unshift(`${assetsManifest.publicPath}${assetsManifest.dataLoader}`);
  }

  return [].concat(routeScripts).concat(scripts);
}

export function useRenderMode() {
  const { renderMode } = useAppContext();
  return renderMode;
}

interface DataProps {
  ScriptElement?: React.ComponentType<React.ScriptHTMLAttributes<HTMLScriptElement>> | string;
}

export type DataType = (props: DataProps) => JSX.Element;

// use app context separately
export const Data: DataType = (props: DataProps) => {
  const { documentOnly, matches, downgrade, renderMode, serverData, loaderData, revalidate } = useAppContext();
  const appData = useAppData();
  const {
    ScriptElement = 'script',
  } = props;

  const matchedIds = matches.map(match => match.route.id);
  const routePath = encodeURI(getCurrentRoutePath(matches));
  const windowContext: WindowContext = {
    appData,
    loaderData,
    routePath,
    downgrade,
    matchedIds,
    documentOnly,
    renderMode,
    serverData,
    revalidate,
  };

  return (
    // Disable hydration warning for csr, initial app data may not equal csr result.
    // Should merge global context when there are multiple <Data />.
    <ScriptElement
      suppressHydrationWarning={documentOnly}
      dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=Object.assign(${JSON.stringify(windowContext)}, window.__ICE_APP_CONTEXT__ || {});` }}
    />
  );
};

export type MainType = (props: React.HTMLAttributes<HTMLDivElement>) => JSX.Element;

export const Main: MainType = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { main } = useDocumentContext();
  const { appConfig } = useAppContext();
  return (
    <div id={appConfig.app.rootId} {...props}>
      {main}
    </div>
  );
};

/**
 * merge assets info for matched route
 */
export function getPageAssets(matches: RouteMatch[], assetsManifest: AssetsManifest): string[] {
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
