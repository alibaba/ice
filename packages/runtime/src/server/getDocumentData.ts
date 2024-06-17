import type { DocumentDataLoaderConfig, RequestContext } from '../types.js';

interface Options {
  loaderConfig: DocumentDataLoaderConfig;
  requestContext: RequestContext;
  documentOnly: boolean;
}

export default async function getDocumentData(options: Options) {
  const { loaderConfig, requestContext, documentOnly } = options;
  if (loaderConfig) {
    const { loader } = loaderConfig;
    if (typeof loader === 'function') {
      return await loader(requestContext, { documentOnly });
    } else {
      console.warn('Document dataLoader only accepts function.');
    }
  }
}
