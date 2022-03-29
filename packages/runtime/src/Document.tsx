import * as React from 'react';
import type { PageData, AppData } from './types';

interface DocumentContext {
  html?: string;
  entryAssets?: string[];
  pageAssets?: string[];
  pageData?: PageData;
  appData?: AppData;
}

const Context = React.createContext<DocumentContext>(null);

Context.displayName = 'DocumentContext';

export const useDocumentContext = () => {
  const value = React.useContext(Context);
  return value;
};

export const DocumentContextProvider = Context.Provider;

export function Meta() {
  const { pageData } = useDocumentContext();
  const meta = pageData.pageConfig.meta || [];

  return (
    <>
      {meta.map(([name, value]) => <meta key={name} name={name} content={value} />)}
    </>
  );
}

export function Title() {
  const { pageData } = useDocumentContext();
  const title = pageData.pageConfig.title || [];

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageAssets, entryAssets, pageData } = useDocumentContext();
  const customLinks = pageData.pageConfig.links || [];
  const blockLinks = customLinks.filter((link) => link.block);

  const styles = pageAssets.concat(entryAssets).filter(path => path.indexOf('.css') > -1);

  return (
    <>
      {
        blockLinks.map(link => {
          const { block, ...props } = link;
          return <script key={link.href} {...props} />;
        })
      }
      {styles.map(style => <link key={style} rel="stylesheet" type="text/css" href={style} />)}
    </>
  );
}

export function Scripts() {
  const { pageData, pageAssets, entryAssets, appData } = useDocumentContext();
  const { links: customLinks = [], scripts: customScripts = [] } = pageData.pageConfig;

  const scripts = pageAssets.concat(entryAssets).filter(path => path.indexOf('.js') > -1);

  const blockScripts = customScripts.filter(script => script.block);
  const deferredScripts = customScripts.filter(script => !script.block);
  const deferredLinks = customLinks.filter(link => !link.block);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: `window.__ICE_APP_DATA__=${JSON.stringify(appData)}` }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__ICE_PAGE_DATA__=${JSON.stringify(pageData)}` }} />
      {
        blockScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} {...props} />;
        })
      }
      {
        scripts.map(script => {
          return <script key={script} src={script} />;
        })
      }
      {
        deferredLinks.map(link => {
          const { block, ...props } = link;
          return <script key={link.href} {...props} />;
        })
      }
      {
        deferredScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} defer="true" {...props} />;
        })
      }
    </>
  );
}

export function Main() {
  const { html } = useDocumentContext();

  // TODO: set id from config
  // eslint-disable-next-line react/self-closing-comp
  return <div id="ice-container" dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
}
