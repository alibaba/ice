import * as React from 'react';
import { useDocumentContext } from './DocumentContext.js';

export function Meta() {
  const { pageConfig = {} } = useDocumentContext();
  const { meta = [] } = pageConfig;

  return (
    <>
      {meta.map(([name, value]) => <meta key={name} name={name} content={value} />)}
    </>
  );
}

export function Title() {
  const { pageConfig = {} } = useDocumentContext();
  const { title = '' } = pageConfig;

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { pageConfig = {}, pageAssets = {} } = useDocumentContext();
  const { links: customLinks = [] } = pageConfig;
  const { links = [] } = pageAssets;

  const blockLinks = customLinks.filter((link) => link.block);

  return (
    <>
      {
        blockLinks.map(link => {
          const { block, ...props } = link;
          return <script key={link.href} {...props} />;
        })
      }
      {links.map(link => <link key={link.href} {...link} />)}
    </>
  );
}

export function Scripts() {
  const { pageConfig = {}, pageAssets = {} } = useDocumentContext();
  const { links: customLinks = [], scripts: customScripts = [] } = pageConfig;
  const { scripts = [] } = pageAssets;

  const blockScripts = customScripts.filter(script => script.block);
  const deferredScripts = customScripts.filter(script => !script.block);
  const deferredLinks = customLinks.filter(link => !link.block);

  return (
    <>
      {
        blockScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} {...props} />;
        })
      }
      {
        scripts.map(script => {
          return <script key={script.src} {...script} />;
        })
      }
      {/* main entry */}
      <script src="./main.js" />
      {
        deferredLinks.map(link => {
          const { block, ...props } = link;
          return <script key={link.href} {...props} />;
        })
      }
      {
        deferredScripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} deffer="true" {...props} />;
        })
      }
    </>
  );
}

export function Root() {
  const { html } = useDocumentContext();

  // eslint-disable-next-line react/self-closing-comp
  return <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
}
