import { Document } from '../dom/document.js';

import {
  ICE_CONTAINER,
  BODY,
  HEAD,
  HTML,
} from '../constants/index.js';
import env from '../env.js';

/* eslint-disable no-inner-declarations */
function createDocument(): Document {
  /**
     * <document>
     *   <html>
     *     <head></head>
     *     <body>
     *       <ice-container id="app" />
     *     </body>
     *   </html>
     * </document>
     */
  const doc = new Document();
  const documentCreateElement = doc.createElement.bind(doc);
  const html = documentCreateElement(HTML);
  const head = documentCreateElement(HEAD);
  const body = documentCreateElement(BODY);
  const iceContainer = documentCreateElement(ICE_CONTAINER);
  iceContainer.id = ICE_CONTAINER;

  doc.appendChild(html);
  html.appendChild(head);
  html.appendChild(body);
  body.appendChild(iceContainer);

  doc.documentElement = html;
  doc.head = head;
  doc.body = body;

  return doc;
}
const document = env.document = createDocument();

export {
  document,
};
