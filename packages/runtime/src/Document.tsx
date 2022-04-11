import * as React from 'react';
import { useAppContext } from './AppContext.js';
import { getPageAssets, getEntryAssets } from './assets.js';

export function Meta() {
  const { pageData } = useAppContext();
  const meta = pageData.pageConfig.meta || [];

  return (
    <>
      {meta.map(item => <meta key={item.name} {...item} />)}
      <meta
        name="ice-meta-count"
        content={meta.length.toString()}
      />
    </>
  );
}

export function Title() {
  const { pageData } = useAppContext();
  const title = pageData.pageConfig.title || [];

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageData, matches, assetsManifest } = useAppContext();

  const customLinks = pageData.pageConfig.links || [];

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);
  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        customLinks.map(link => {
          const { block, ...props } = link;
          return <link key={link.href} {...props} />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts() {
  const { pageData, initialData, matches, assetsManifest, documentOnly } = useAppContext();

  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  const { scripts: customScripts = [] } = pageData.pageConfig;

  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const appContext = {
    initialData,
    pageData,
    assetsManifest,
  };

  return (
    <>
      {/*
       * disable hydration warning for csr.
       * initial app data may not equal csr result.
       */}
      <script suppressHydrationWarning={documentOnly} dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_CONTEXT__=${JSON.stringify(appContext)}` }} />
      {
        customScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} defer {...props} />;
        })
      }
      {/*
       * script must be deferred.
       * if there are other dom after this tag, and hydrate before parsed all dom,
       * hydrate will fail due to inconsistent dom nodes.
       */}
      {
        scripts.map(script => {
          return <script key={script} defer src={script} />;
        })
      }
    </>
  );
}

export function Main(props) {
  const { documentOnly } = useAppContext();

  // disable hydration warning for csr.
  // document is rendered by hydration.
  // initial content form "ice-container" is empty, which will not match csr result.
  return (
    <div id="ice-container" suppressHydrationWarning={documentOnly} >
      {props.children}
    </div>
  );
}