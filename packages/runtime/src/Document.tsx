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

export function Title() {
  const { matches, routeData } = useDocumentContext();
  let title;

  matches.forEach(match => {
    const { componentName } = match.route;
    title = routeData?.[componentName]?.pageConfig?.title;
  });

  return (
    <title>{title}</title>
  );
}

export function Links() {
  const { matches, routeData, assets } = useDocumentContext();
  // get block custom links
  let links = getLinks(matches, routeData, true);

  matches.forEach(match => {
    const { componentName } = match.route;

    if (assets[componentName] && assets[componentName].links) {
      assets[componentName].links.forEach((link) => {
        links.push({
          rel: 'stylesheet',
          type: 'text/css',
          href: link,
        });
      });
    }
    // links.push({
    //   rel: 'stylesheet',
    //   type: 'text/css',
    //   // TODO: get from build manifest
    //   href: `./${componentName}.css`,
    // });
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
  const { matches, routeData, assets } = useDocumentContext();
  let scripts = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const customScripts = routeData?.[componentName]?.pageConfig?.scripts;

    scripts = customScripts ? scripts.concat(customScripts) : scripts;

    if (assets[componentName] && assets[componentName].scripts) {
      assets[componentName].scripts.forEach((script) => {
        scripts.push({
          src: script,
        });
      });
    }
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
