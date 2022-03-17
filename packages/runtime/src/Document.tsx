import * as React from 'react';
import { useDocumentContext } from './DocumentContext.js';

export function Meta() {
  const { matches, routeData } = useDocumentContext();
  let meta = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const pageMeta = routeData?.[componentName]?.pageConfig?.meta;
    meta = pageMeta ? meta.concat(pageMeta) : meta;
  });

  return (
    <>
      {meta.map(([name, value]) => <meta key={name} name={name} content={value} />)}
    </>
  );
}

export function Links() {
  const { matches, routeData } = useDocumentContext();
  // get block custom links
  let links = getLinks(matches, routeData, true);

  matches.forEach(match => {
    const { componentName } = match.route;
    links.push({
      rel: 'stylesheet',
      type: 'text/css',
      // TODO: get from build manifest
      href: `./${componentName}.css`,
    });
  });

  return (
    <>
      {links && links.map(link => <link key={link.href} {...link} />)}
    </>
  );
}

function getLinks(matches, routeData, isBlock) {
  const result = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const pageLinks = routeData?.[componentName]?.pageConfig?.links;

    pageLinks && pageLinks.forEach((link) => {
      const { block, ...linkInfo } = link;
      if (block === isBlock) {
        result.push(linkInfo);
      }
    });
  });

  return result;
}

export function Scripts() {
  const { matches, routeData } = useDocumentContext();
  let scripts = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const customScripts = routeData?.[componentName]?.pageConfig?.scripts;

    scripts = customScripts ? scripts.concat(customScripts) : scripts;

    // pages bundles
    scripts.push({
      // TODO: get from build manifest
      src: `./${componentName}.js`,
    });
  });

  const deferLinks = getLinks(matches, routeData, false);

  return (
    <>
      {
        scripts.map(script => {
          const { block, ...props } = script;
          return <script key={script.src} async={block === false} {...props} />;
        })
      }
      {/* main entry */}
      <script src="./main.js" />
      {deferLinks && deferLinks.map(link => <link key={link.href} {...link} />)}
    </>
  );
}

export function Root() {
  const { html } = useDocumentContext();

  // eslint-disable-next-line react/self-closing-comp
  return <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
}
