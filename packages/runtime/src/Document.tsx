import * as React from 'react';
import { useDocumentContext } from './DocumentContext.js';

export function Meta() {
  const { metas } = useDocumentContext();

  return (
    <>
      {metas && metas.map(meta => <meta {...meta} />)}
    </>
  );
}

export function Links() {
  const { links } = useDocumentContext();
  return (
    <>
      {links && links.map(link => <link {...link} />)}
    </>
  );
}

export function Scripts() {
  const { scripts } = useDocumentContext();
  return (
    <>
      {
        scripts && scripts.map(script =>
          // eslint-disable-next-line react/self-closing-comp
          <script {...script} ></script>,
        )
      }
    </>
  );
}

export function Root() {
  const { html } = useDocumentContext();

  // eslint-disable-next-line react/self-closing-comp
  return <div id="root" dangerouslySetInnerHTML={{ __html: html || '' }}></div>;
}