import * as React from 'react';
import { useDocumentContext } from './DocumentContext.js';

export function Meta() {
  const { matches, routeData } = useDocumentContext();
  let metas = [];

  matches.forEach(match => {
    const { route } = match;
    const { componentName } = route;

    const customMetas = routeData?.[componentName]?.pageConfig?.metas;

    // custom scripts
    if (customMetas) {
      metas = metas.concat(customMetas);
    }
  });

  return (
    <>
      {metas && metas.map(meta => <meta {...meta} />)}
    </>
  );
}

export function Links() {
  const { matches, routeData } = useDocumentContext();
  const links = [];

  matches.forEach(match => {
    const { route } = match;
    const { componentName } = route;
    const customLinks = routeData?.[componentName]?.pageConfig?.links;

    // custom scripts
    if (customLinks) {
      customLinks.forEach((link) => {
        const { block, ...props } = link;
        if (block) {
          links.push(props);
        }
      });
    }

    // pages bundles
    links.push({
      // TODO: get from build manifest
      src: `./${componentName}.css`,
    });
  });

  return (
    <>
      {links && links.map(link => <link key={link.href} {...link} />)}
    </>
  );
}

export function Scripts() {
  const { matches, routeData } = useDocumentContext();
  const scripts = [];

  matches.forEach(match => {
    const { route } = match;
    const { componentName } = route;
    const customScripts = routeData?.[componentName]?.pageConfig?.scripts;

    // custom scripts
    if (customScripts) {
      customScripts.forEach((script) => {
        const { block, ...props } = script;
        if (block) {
          scripts.push(props);
        }
      });
    }

    // pages bundles
    scripts.push({
      // TODO: get from build manifest
      src: `./${componentName}.js`,
    });
  });

  return (
    <>
      {
        scripts.map(script => <script key={script.src} {...script} />)
      }
      {/* main entry */}
      <script src="./main.js" />
    </>
  );
}

export function Root() {
  const { html } = useDocumentContext();

  // eslint-disable-next-line react/self-closing-comp
  return <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
}
